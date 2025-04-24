/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React, { useEffect } from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
// import { personas } from "@/data/personasData";
import { CallHistory } from "./types";
import { CallInsights } from "./CallInsights/CallInsights";
import { AnalyticsState } from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";

const Insights = ({ insightRef }: { insightRef: any }) => {
  // Sample call history data for the insights page

  const personas = [
    {
      id: "1",
      name: "Sarah Chen",
      difficulty: "Easy",
      mood: "Good",
      image:
        "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
    {
      id: "2",
      name: "Michael Peterson",
      difficulty: "Medium",
      mood: "Neutral",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
    {
      id: "3",
      name: "Olivia Roberts",
      difficulty: "Hard",
      mood: "Bad",
      image:
        "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
    {
      id: "4",
      name: "David Lee",
      difficulty: "Medium",
      mood: "Good",
      image:
        "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
    {
      id: "5",
      name: "Emma Wilson",
      difficulty: "Hard",
      mood: "Neutral",
      image:
        "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
    {
      id: "6",
      name: "James Taylor",
      difficulty: "Easy",
      mood: "Bad",
      image:
        "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&h=150&crop=faces&auto=format&fit=crop",
    },
  ];

  const { req_success }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });
  const sampleCallHistory: CallHistory = {
    id: "recent-call",
    personaId: personas[0].id || "1",
    personaName: personas[0].name,
    personaImage: personas[0].image || "/placeholder.svg",
    date: new Date().toLocaleDateString(),
    duration: "3m 45s",
    performance: "96%",
    summary:
      "Great job! You maintained a professional tone and effectively addressed objections.",
    suggestions: [
      "Try to ask more open-ended questions",
      "Spend more time on value proposition",
      "Maintain a conversational tone throughout",
    ],
    audioUrl: "/sample-audio.mp3",
  };

  useEffect(() => {
    if (req_success.get && insightRef) {
      insightRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }, [req_success.get, insightRef]);

  return (
    <div className="flex flex-col h-[calc(100vh-80px)] mt-8" ref={insightRef}>
      <div className="flex justify-between items-center bg-gradient-to-r from-blue-50/90 to-blue-100/50 dark:from-blue-900/40 dark:to-blue-800/20 px-4 py-3 rounded-md shadow-sm mb-4">
        <h1 className="text-lg font-bold text-blue-800 dark:text-blue-200">
          Call Analysis Report
        </h1>
        {/* Download button removed */}
      </div>

      <div className="flex-1">
        <Tabs defaultValue="performance" className="w-full h-full gap-0">
          <div className="w-full justify-start bg-blue-50/90 dark:bg-blue-900/30 p-1.5 mb-3 rounded-md">
            <TabsList className="bg-transparent">
              <TabsTrigger
                value="performance"
                className="text-xs lg:text-sm font-medium py-2 px-2 lg:px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700 dark:data-[state=active]:text-blue-100 rounded-md"
              >
                Performance Analysis
              </TabsTrigger>
              <TabsTrigger
                value="transcript"
                className=" text-xs lg:text-sm font-medium py-2 px-2 lg:px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-blue-800 data-[state=active]:text-blue-700  dark:data-[state=active]:text-blue-100 rounded-md mx-1"
              >
                Transcript
              </TabsTrigger>
              <TabsTrigger
                value="coach"
                className="text-xs lg:text-sm font-medium py-2 px-2 lg:px-6 data-[state=active]:bg-white dark:data-[state=active]:bg-amber-800 data-[state=active]:text-amber-700 dark:data-[state=active]:text-amber-100 rounded-md"
              >
                AI Coach Review
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="performance" className="h-[calc(100%-44px)] mt-0">
            <div className="h-full border border-blue-100 dark:border-blue-900/50 rounded-md shadow-md">
              <CallInsights
                selectedHistory={sampleCallHistory}
                isFullPage={true}
                viewMode="performance"
              />
            </div>
          </TabsContent>

          <TabsContent value="transcript" className="h-[calc(100%-44px)] mt-0">
            <div className="h-full border border-blue-100 dark:border-blue-900/50 rounded-md shadow-md">
              <CallInsights
                selectedHistory={sampleCallHistory}
                isFullPage={true}
                viewMode="transcript"
              />
            </div>
          </TabsContent>

          <TabsContent value="coach" className="h-[calc(100%-44px)] mt-0">
            <div className="h-full border border-amber-100 dark:border-amber-900/50 rounded-md shadow-md">
              <CallInsights
                selectedHistory={sampleCallHistory}
                isFullPage={true}
                viewMode="coach"
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Insights;
