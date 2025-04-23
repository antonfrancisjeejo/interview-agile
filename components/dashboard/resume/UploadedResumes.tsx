"use client";

import { FileText, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatFileSize } from "@/lib/utils";

interface ResumeFile {
  name: string;
  lastModified: number;
  size: number;
  type: string;
  url?: string;
}

interface UploadedResumesProps {
  resumes: ResumeFile[];
  onDelete: (resume: ResumeFile) => void;
}

const UploadedResumes = ({ resumes, onDelete }: UploadedResumesProps) => {
  if (resumes.length === 0) {
    return (
      <div className="text-center py-8 text-gray-500">
        <p>No resumes uploaded yet</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">Uploaded Resumes</h3>
      <div className="space-y-2">
        {resumes.map((resume, index) => (
          <div
            key={index}
            className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
          >
            <div className="flex items-center gap-3">
              <FileText className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium">{resume.name}</p>
                <p className="text-xs text-gray-500">
                  {formatFileSize(resume.size)} •{" "}
                  {new Date(resume.lastModified).toLocaleDateString()}
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onDelete(resume)}
              className="text-gray-500 hover:text-red-500"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UploadedResumes;
