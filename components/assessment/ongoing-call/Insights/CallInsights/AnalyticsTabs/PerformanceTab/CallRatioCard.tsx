"use client";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SpeechMetricProps {
  label: string;
  description: string;
  icon: LucideIcon;
  callTime: number;
  userCallTime: number;
}

export function CallRatioCard({
  label,
  description,
  icon: Icon,
  callTime,
  userCallTime,
}: SpeechMetricProps) {
  const { userPercentage, aiPercentage } = useMemo(() => {
    const userPct = (userCallTime / callTime) * 100;
    const aiPct = ((callTime - userCallTime) / callTime) * 100;

    return {
      userPercentage: Math.round(userPct),
      aiPercentage: Math.round(aiPct),
    };
  }, [callTime, userCallTime]);
  return (
    <Card className="border shadow-sm hover:shadow-md transition-all duration-300">
      <CardContent className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <div className="h-8 w-8 rounded-full bg-primary/10 text-primary flex items-center justify-center">
            <Icon className="h-4 w-4" />
          </div>
          <h4 className="text-sm font-medium">{label}</h4>
        </div>
        <p className="text-xs text-muted-foreground mb-2">{description}</p>
        <div className="text-lg font-bold text-primary mb-2">
          Talk: {userPercentage}%
        </div>
        <div className="text-lg font-bold text-primary mb-2">
          Listen: {aiPercentage}%
        </div>
      </CardContent>
    </Card>
  );
}
