"use client";
import React from "react";
import { CallHistory } from "../types";
import { CallInsightsContainer } from "./CallInsightsContainer";

interface CallInsightsProps {
  selectedHistory: CallHistory | null;
  onClose?: () => void;
  isFullPage?: boolean;
  viewMode?: "performance" | "transcript" | "coach";
}

export function CallInsights({
  selectedHistory,
  onClose,
  isFullPage = false,
  viewMode = "performance",
}: CallInsightsProps) {
  return (
    <div className={isFullPage ? "h-full" : ""}>
      <CallInsightsContainer
        selectedHistory={selectedHistory}
        onClose={onClose}
        isFullPage={isFullPage}
        viewMode={viewMode}
      />
    </div>
  );
}
