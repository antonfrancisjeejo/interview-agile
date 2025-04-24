"use client";
import React, { useEffect, useRef } from "react";
import {
  TranscriptionSegment,
  Participant,
  TrackPublication,
} from "livekit-client";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AnalyticsState } from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";
import { getTimeDifference } from "@/utils/time";

interface Transcription {
  segment: TranscriptionSegment;
  participant?: Participant;
  publication?: TrackPublication;
}

export function ConversationTab() {
  const { transcription, persona }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );

  const transcriptionData = transcription as Transcription[];

  // Ref for the scroll area container
  const scrollRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom on initial load
  useEffect(() => {
    if (scrollRef.current) {
      const scrollContainer = scrollRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, []);

  return (
    <div className="h-full flex flex-col" ref={scrollRef}>
      <ScrollArea className="flex-1 h-full">
        <div className="p-4">
          {transcriptionData.length > 0 &&
            transcriptionData.map(
              ({ segment, participant }) =>
                segment.text.trim() !== "" && (
                  <div key={segment.id} className="mb-4">
                    <div className="flex flex-col">
                      {/* Speaker name and timestamp - now right-aligned for "You" */}
                      <div
                        className={`flex items-center mb-1 ${
                          participant?.metadata === "human"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        <span
                          className={`text-sm font-semibold ${
                            participant?.metadata !== "human"
                              ? "text-blue-600 dark:text-blue-400"
                              : "text-green-600 dark:text-green-400"
                          }`}
                        >
                          {participant?.metadata !== "human"
                            ? persona.name
                            : "You"}
                        </span>
                        <span className="text-xs text-muted-foreground ml-2">
                          {getTimeDifference(
                            transcriptionData[0].segment.firstReceivedTime,
                            segment.firstReceivedTime
                          )}
                        </span>
                      </div>

                      {/* Message Bubble */}
                      <div
                        className={`rounded-lg p-2.5 text-sm mb-1 ${
                          participant?.metadata !== "human"
                            ? "bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/50 text-left rounded-tl-none ml-0 mr-auto max-w-[85%]"
                            : "bg-green-50 dark:bg-green-900/20 border border-green-100 dark:border-green-800/50 text-left rounded-tr-none ml-auto mr-0 max-w-[85%]"
                        }`}
                      >
                        {segment.text.trim()}
                      </div>
                    </div>
                  </div>
                )
            )}
          <div className="h-4" />{" "}
          {/* Additional space at the bottom to ensure scrollability */}
        </div>
      </ScrollArea>
    </div>
  );
}
