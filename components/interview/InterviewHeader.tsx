"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface InterviewHeaderProps {
  title: string;
  onBack?: () => void;
}

const InterviewHeader = ({ title, onBack }: InterviewHeaderProps) => {
  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-4">
        {onBack && (
          <Button variant="ghost" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
        )}
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
    </div>
  );
};

export default InterviewHeader;
