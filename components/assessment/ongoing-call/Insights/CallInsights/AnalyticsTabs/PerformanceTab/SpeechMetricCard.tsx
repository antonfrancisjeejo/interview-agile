
'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";

interface SpeechMetricProps {
  label: string;
  value: string;
  description: string;
  icon: LucideIcon;
  progressPercentage: number;
  colorClass: string;
}

export function SpeechMetricCard({
  label,
  value,
  description,
  icon: Icon,
  progressPercentage,
  colorClass
}: SpeechMetricProps) {
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
        <div className="text-lg font-bold text-primary mb-2">{value}</div>
        <div className="h-1.5 bg-muted rounded-full overflow-hidden">
          <div 
            className={`h-1.5 rounded-full ${colorClass}`}
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </CardContent>
    </Card>
  );
}
