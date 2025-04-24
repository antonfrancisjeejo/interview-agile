
'use client'
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { LucideIcon } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

interface InfoCardProps {
  label: string;
  value: string;
  icon: LucideIcon;
  description?: string;
}

export function InfoCard({ label, value, icon: Icon, description }: InfoCardProps) {
  const cardContent = (
    <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-4">
        <div className="text-xs text-muted-foreground">{label}</div>
        <div className="font-medium mt-2 flex items-center gap-2">
          <Icon className="h-4 w-4 text-primary" />
          {value}
        </div>
      </CardContent>
    </Card>
  );

  if (description) {
    return (
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            {cardContent}
          </TooltipTrigger>
          <TooltipContent>
            <p className="text-sm">{description}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return cardContent;
}
