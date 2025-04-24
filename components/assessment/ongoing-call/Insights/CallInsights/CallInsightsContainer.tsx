"use client";
import React from "react";
import { DialogHeader } from "@/components/ui/dialog";

import { Card } from "@/components/ui/card";
import { CallHistory } from "../types";
import { EmptyInsightState } from "./EmptyInsightState";
import { AnalyticsTabs } from "./AnalyticsTabs/AnalyticsTabs";
import { TranscriptPanel } from "./TranscriptPanel/TranscriptPanel";
import { AICoachReviewPanel } from "./AICoachReviewPanel/AICoachReviewPanel";
import { CallHeader } from "./CallHeader/CallHeader";
import { ScoreHeader } from "./ScoreHeader/ScoreHeader";

interface CallInsightsProps {
  selectedHistory: CallHistory | null;
  onClose?: () => void;
  isFullPage?: boolean;
  viewMode?: "performance" | "transcript" | "coach";
}

export function CallInsightsContainer({
  selectedHistory,
  onClose,
  isFullPage = false,
  viewMode = "performance",
}: CallInsightsProps) {
  if (!selectedHistory) {
    return <EmptyInsightState />;
  }

  // Performance Analysis View - Shows call performance data
  if (viewMode === "performance" && isFullPage) {
    return (
      <div className="flex flex-col h-full">
        <Card className="h-full flex flex-col min-h-0 border pt-0 border-blue-100 dark:border-blue-900/50 shadow-sm">
          <AnalyticsTabs />
        </Card>
      </div>
    );
  }

  // Transcript View - Shows only transcript without insights panel
  if (viewMode === "transcript" && isFullPage) {
    return (
      <div className="flex flex-col h-full">
        <Card className="h-full flex flex-col pt-0 min-h-0 border border-blue-100 dark:border-blue-900/50 shadow-sm">
          <TranscriptPanel />
        </Card>
      </div>
    );
  }

  // AI Coach Review View - Dedicated view for AI coaching feedback
  if (viewMode === "coach" && isFullPage) {
    return (
      <div className="flex flex-col h-full">
        <Card className="h-full pt-0 flex flex-col min-h-0 border border-amber-100 dark:border-amber-900/50 shadow-sm">
          <AICoachReviewPanel />
        </Card>
      </div>
    );
  }

  // Original dialog version - smaller size
  return (
    <div className="flex flex-col h-full gap-1.5">
      <DialogHeader>
        <CallHeader
          title="Call Analysis"
          date={selectedHistory.date}
          duration={selectedHistory.duration}
          onClose={onClose}
          isFullPage={false}
        />
      </DialogHeader>

      {/* Call Analytics Card - Separate box for analysis */}
      <Card className="rounded-md shadow-sm overflow-hidden ">
        <div className="p-1.5">
          <ScoreHeader score={selectedHistory.performance} />
        </div>
      </Card>

      <div className="flex flex-col lg:flex-row flex-1 overflow-hidden min-h-0 gap-1.5">
        {/* Main content area with analytics */}
        <Card className="w-full lg:w-2/3 flex flex-col min-h-0 overflow-hidden h-[300px] lg:h-[340px] hover:shadow-md transition-shadow duration-300">
          <AnalyticsTabs />
        </Card>

        {/* Persistent transcript panel */}
        <Card className="w-full lg:w-1/3 flex flex-col min-h-0 overflow-hidden h-[300px] lg:h-[340px] hover:shadow-md transition-shadow duration-300">
          <TranscriptPanel />
        </Card>
      </div>
    </div>
  );
}
