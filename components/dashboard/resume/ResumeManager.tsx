"use client";

import { useState } from "react";
import FileUpload from "./FileUpload";
import UploadedResumes from "./UploadedResumes";

export interface ResumeFile {
  id: string;
  name: string;
  size: number;
  type: string;
  lastModified: number;
  file: File;
}

const ResumeManager = () => {
  const [resumes, setResumes] = useState<ResumeFile[]>([]);

  const handleFileUpload = (files: FileList | null) => {
    if (!files) return;

    const newResumes = Array.from(files).map((file) => ({
      id: Math.random().toString(36).substr(2, 9),
      name: file.name,
      size: file.size,
      type: file.type,
      lastModified: file.lastModified,
      file,
    }));

    setResumes((prev) => [...prev, ...newResumes]);
  };

  const handleDelete = (id: string) => {
    setResumes((prev) => prev.filter((resume) => resume.id !== id));
  };

  return (
    <div className="space-y-6">
      <FileUpload onUpload={handleFileUpload} />
      <UploadedResumes resumes={resumes} onDelete={handleDelete} />
    </div>
  );
};

export default ResumeManager;
