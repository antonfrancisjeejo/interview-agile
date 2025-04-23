"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface InterviewOverviewCardProps {
  title: string;
  value: number;
  total: number;
  description?: string;
}

const InterviewOverviewCard = ({
  title,
  value,
  total,
  description,
}: InterviewOverviewCardProps) => {
  const percentage = (value / total) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-2xl font-bold">{value}</span>
            <span className="text-sm text-gray-500">/ {total}</span>
          </div>
          <Progress value={percentage} className="h-2" />
          {description && (
            <p className="text-sm text-gray-500">{description}</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default InterviewOverviewCard;
