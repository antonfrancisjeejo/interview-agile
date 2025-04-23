"use client";

import { Button } from "@/components/ui/button";
import { Star, Zap, Clock } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface InterviewItemProps {
  title: string;
  date: string;
  overallScore?: number;
  duration?: string;
  confidence?: number;
}

const InterviewItem = ({
  title,
  date,
  overallScore = 0,
  duration = "0m",
  confidence = 0,
}: InterviewItemProps) => {
  return (
    <div className="p-4 border rounded-lg">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm text-gray-500">{date}</p>
          <div className="mt-2 flex items-center gap-4">
            <div className="flex items-center gap-1">
              <Star className="w-4 h-4" />
              <span>{overallScore}%</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{duration}</span>
            </div>
            <div className="flex items-center gap-1">
              <Zap className="w-4 h-4" />
              <span>{confidence}%</span>
            </div>
          </div>
          <Progress value={overallScore} className="mt-2" />
        </div>
        <Button variant="outline" size="sm">
          View Details
        </Button>
      </div>
    </div>
  );
};

export default InterviewItem;
