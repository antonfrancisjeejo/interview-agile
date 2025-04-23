"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Star, MessageSquare, Clock, Zap } from "lucide-react";

interface PerformanceMetricsCardProps {
  overallScore: number;
  communicationScore: number;
  technicalScore: number;
  timeManagementScore: number;
}

const PerformanceMetricsCard = ({
  overallScore,
  communicationScore,
  technicalScore,
  timeManagementScore,
}: PerformanceMetricsCardProps) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Performance Metrics</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Star className="h-4 w-4 text-yellow-500" />
              <span className="font-medium">Overall Score</span>
            </div>
            <span className="text-lg font-bold">{overallScore}%</span>
          </div>
          <Progress value={overallScore} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <MessageSquare className="h-4 w-4 text-blue-500" />
              <span className="font-medium">Communication</span>
            </div>
            <span className="text-sm">{communicationScore}%</span>
          </div>
          <Progress value={communicationScore} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Zap className="h-4 w-4 text-purple-500" />
              <span className="font-medium">Technical Skills</span>
            </div>
            <span className="text-sm">{technicalScore}%</span>
          </div>
          <Progress value={technicalScore} className="h-2" />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-green-500" />
              <span className="font-medium">Time Management</span>
            </div>
            <span className="text-sm">{timeManagementScore}%</span>
          </div>
          <Progress value={timeManagementScore} className="h-2" />
        </div>
      </CardContent>
    </Card>
  );
};

export default PerformanceMetricsCard;
