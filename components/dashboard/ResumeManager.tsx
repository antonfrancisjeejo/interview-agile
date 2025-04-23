"use client";

import { useState, useRef, RefObject } from "react";
import UploadedResumes from "./UploadedResumes";
import FileUpload from "./resume/FileUpload";
import { Skeleton } from "@/components/ui/skeleton";
import { useResumes } from "@/hooks/useResumes";
import { toast } from "sonner";

interface ResumeFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  url?: string;
}

interface ResumeManagerProps {
  fileInputRef: RefObject<HTMLInputElement>;
}

const ResumeManager = ({ fileInputRef }: ResumeManagerProps) => {
  const { resumes, uploadResume, deleteResume, loading } = useResumes();
  const [isUploading, setIsUploading] = useState(false);

  const handleResumeUpload = async (files: FileList | null) => {
    if (!files?.length) return;

    for (const file of Array.from(files)) {
      try {
        setIsUploading(true);
        toast.loading(`Uploading ${file.name}...`, {
          id: `upload-${file.name}`,
        });

        await uploadResume(file);

        toast.success(`Successfully uploaded ${file.name}`, {
          id: `upload-${file.name}`,
        });
      } catch (error) {
        toast.error(`Failed to upload ${file.name}`, {
          id: `upload-${file.name}`,
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleRemoveResume = async (index: number) => {
    const resume = resumes[index];
    if (resume) {
      try {
        toast.loading(`Deleting ${resume.name}...`, {
          id: `delete-${resume.name}`,
        });
        await deleteResume(resume);
        toast.success(`Successfully deleted ${resume.name}`, {
          id: `delete-${resume.name}`,
        });
      } catch (error) {
        toast.error(`Failed to delete ${resume.name}`, {
          id: `delete-${resume.name}`,
          description:
            error instanceof Error ? error.message : "Unknown error occurred",
        });
      }
    }
  };

  return (
    <>
      <FileUpload onUpload={handleResumeUpload} fileInputRef={fileInputRef} />
      {loading || isUploading ? (
        <div className="space-y-4">
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
          <Skeleton className="h-20 w-full" />
        </div>
      ) : (
        <UploadedResumes
          resumes={resumes.map((resume) => ({
            name: resume.name,
            url: resume.url,
          }))}
          onRemove={handleRemoveResume}
        />
      )}
    </>
  );
};

export default ResumeManager;
