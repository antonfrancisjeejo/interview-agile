"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { FileText, X, Eye } from "lucide-react";

interface ResumeFile {
  name: string;
  url?: string;
}

interface UploadedResumesProps {
  resumes: ResumeFile[];
  onRemove: (index: number) => void;
}

const UploadedResumes = ({ resumes, onRemove }: UploadedResumesProps) => {
  if (resumes.length === 0) return null;

  return (
    <div className="mb-8">
      <h2 className="text-xl font-semibold mb-4">Uploaded Resumes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {resumes.map((resume, index) => (
          <Card
            key={index}
            className="relative group hover:shadow-md transition-shadow"
          >
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <FileText className="h-5 w-5 text-purple-600" />
                  <span className="truncate max-w-[180px] font-medium">
                    {resume.name}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8"
                    onClick={() => {
                      if (resume.url) {
                        window.open(resume.url, "_blank");
                      }
                    }}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50"
                    onClick={() => onRemove(index)}
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default UploadedResumes;
