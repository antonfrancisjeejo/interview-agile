import { useState, useEffect } from "react";
import { useToast } from "@/hooks/use-toast";
import type { Tables } from "@/integrations/supabase/types";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

export interface ResumeFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  url?: string;
}

type UserResumeRow = Tables<"user_resumes">;

export const useResumes = () => {
  const [resumes, setResumes] = useState<ResumeFile[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const { toast } = useToast();
  const supabase = createClientComponentClient();

  const loadResumes = async () => {
    try {
      setLoading(true);

      // Check if user is authenticated using getSession
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        console.error("User not authenticated");
        setLoading(false);
        return;
      }

      // Fetch user's resumes
      const { data: resumesData, error } = await supabase
        .from("user_resumes")
        .select("*")
        .eq("user_id", session.user.id);

      if (error) {
        console.error("Error loading resumes:", error);
        toast({
          title: "Error",
          description: "Failed to load resumes",
          variant: "destructive",
        });
        setLoading(false);
        return;
      }

      if (resumesData) {
        const formattedResumes = resumesData.map((resume) => ({
          name: resume.file_name,
          lastModified: new Date(resume.last_modified).getTime(),
          size: resume.file_size,
          type: resume.file_type,
          url: resume.file_path,
        }));
        setResumes(formattedResumes);
      }
    } catch (err) {
      console.error("Error in loadResumes:", err);
    } finally {
      setLoading(false);
    }
  };

  const uploadResume = async (file: File) => {
    try {
      // Check if user is authenticated using getSession
      const {
        data: { session },
      } = await supabase.auth.getSession();
      if (!session) {
        toast({
          title: "Error",
          description: "You must be logged in to upload resumes",
          variant: "destructive",
        });
        return;
      }

      const fileExt = file.name.split(".").pop();
      const fileName = `${crypto.randomUUID()}.${fileExt}`;

      // Upload file to Supabase Storage
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from("resumes")
        .upload(fileName, file);

      if (uploadError) {
        console.error("Storage upload error:", uploadError);
        throw uploadError;
      }

      if (!uploadData?.path) {
        throw new Error("Upload failed - no path returned");
      }

      // Get the public URL for the uploaded file
      const { data: publicURL } = supabase.storage
        .from("resumes")
        .getPublicUrl(uploadData.path);

      // Save resume metadata to database
      const { error: dbError } = await supabase.from("user_resumes").insert({
        file_name: file.name,
        file_path: publicURL.publicUrl,
        file_type: file.type,
        file_size: file.size,
        last_modified: new Date(file.lastModified).toISOString(),
        user_id: session.user.id,
      });

      if (dbError) {
        console.error("Database insert error:", dbError);
        throw dbError;
      }

      // Add the newly uploaded resume to state
      const newResume: ResumeFile = {
        name: file.name,
        lastModified: file.lastModified,
        size: file.size,
        type: file.type,
        url: publicURL.publicUrl,
      };

      setResumes((prev) => [...prev, newResume]);

      toast({
        title: "Success",
        description: `Resume ${file.name} uploaded successfully`,
      });
    } catch (error) {
      console.error("Upload error:", error);
      toast({
        title: "Error",
        description: "Failed to upload resume. Please try again.",
        variant: "destructive",
      });
    }
  };

  const deleteResume = async (resume: ResumeFile) => {
    if (!resume?.url) return;

    try {
      // Extract filename from URL
      const fileName = resume.url.split("/").pop();
      if (!fileName) {
        throw new Error("Invalid file URL");
      }

      // Delete file from storage
      const { error: storageError } = await supabase.storage
        .from("resumes")
        .remove([fileName]);

      if (storageError) {
        console.error("Storage delete error:", storageError);
        throw storageError;
      }

      // Delete record from database
      const { error: dbError } = await supabase
        .from("user_resumes")
        .delete()
        .eq("file_path", resume.url);

      if (dbError) {
        console.error("Database delete error:", dbError);
        throw dbError;
      }

      // Update state by filtering out the deleted resume
      setResumes((prev) => prev.filter((r) => r.url !== resume.url));

      toast({
        title: "Success",
        description: "Resume deleted successfully",
      });
    } catch (error) {
      console.error("Delete error:", error);
      toast({
        title: "Error",
        description: "Failed to delete resume",
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    loadResumes();
  }, []);

  return { resumes, uploadResume, deleteResume, loading };
};
