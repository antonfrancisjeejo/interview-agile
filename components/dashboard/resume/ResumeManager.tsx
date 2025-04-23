"use client";

import { useState, useRef } from "react";
import FileUpload from "./FileUpload";
import UploadedResumes from "./UploadedResumes";
import { useResumes } from "@/hooks/useResumes";
import { useToast } from "@/hooks/use-toast";

export interface ResumeFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  url?: string;
}

const ResumeManager = () => {
  const [loading, setLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const {
    resumes,
    uploadResume,
    deleteResume,
    loading: resumesLoading,
  } = useResumes();
  const { toast } = useToast();

  const handleFileUpload = async (files: FileList | null) => {
    if (!files || files.length === 0) return;
    setLoading(true);
    try {
      const file = files[0];
      await uploadResume(file);
    } catch (error) {
      console.error("Error uploading file:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (resume: ResumeFile) => {
    setLoading(true);
    try {
      await deleteResume(resume);
    } catch (error) {
      console.error("Error deleting file:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <FileUpload onUpload={handleFileUpload} fileInputRef={fileInputRef} />
      <UploadedResumes resumes={resumes} onDelete={handleDelete} />
    </div>
  );
};

export default ResumeManager;
