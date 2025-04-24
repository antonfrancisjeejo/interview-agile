"use client";
import React from "react";
import { ConversationTab } from "./ConversationTab";
import { AnalyticsState } from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";

export function TranscriptPanel() {
  const { persona }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-blue-50/90 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20 sticky top-0 z-10 shadow-sm">
        <h3 className="text-base font-bold text-blue-800 dark:text-blue-200">
          Conversation Transcript
        </h3>
        <p className="text-sm text-blue-600 dark:text-blue-300">
          <span className="font-medium">{persona?.name}</span> dialogue
        </p>

        {/* <div className="mt-2">
          <RecordingPlayer audioUrl={audioUrl} />
        </div> */}
      </div>

      <div className="flex h-full">
        {/* Transcript Box - Now full width */}
        <div className="w-full h-full flex flex-col overflow-hidden">
          <div className="flex-1 overflow-hidden">
            <ConversationTab />
          </div>
        </div>

        {/* Coaching Insights Panel - Removed completely */}
      </div>
    </div>
  );
}
