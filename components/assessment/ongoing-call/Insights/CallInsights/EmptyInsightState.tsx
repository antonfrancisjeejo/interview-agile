

'use client'
import React from "react";
import { FileText } from "lucide-react";

export function EmptyInsightState() {
  return (
    <div className="p-6 bg-muted/20 text-center text-muted-foreground flex flex-col items-center justify-center h-full rounded-md border border-muted/40">
      <div className="bg-primary/10 rounded-full p-3 mb-4">
        <FileText className="h-8 w-8 text-primary" />
      </div>
      <div className="space-y-2">
        <p className="text-lg font-medium">Select a past call to view insights</p>
        <p className="text-sm text-muted-foreground">Click on any call from the list to see detailed analysis</p>
      </div>
    </div>
  );
}
