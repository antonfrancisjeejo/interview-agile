"use client";
import React from "react";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ScorecardTab } from "./ScorecardTab/ScorecardTab";
import { PerformanceTab } from "./PerformanceTab/PerformanceTab";
// import { RecordingPlayer } from "../../RecordingPlayer/RecordingPlayer";

export function AnalyticsTabs() {
  return (
    <div className="flex flex-col h-full overflow-hidden">
      <Tabs defaultValue="scorecard" className="flex-1 flex flex-col h-full">
        <div className=" w-full justify-start rounded-none border-b bg-amber-50/80 dark:bg-amber-900/30 sticky top-0 z-10 shadow-sm space-x-2">
          <TabsList className="bg-transparent px-6 py-4 ">
            <TabsTrigger
              value="scorecard"
              className="data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-200 data-[state=active]:bg-transparent rounded-none bottom-0 border-b-2 border-transparent py-2 px-5  bg-transparent text-sm font-medium transition-all duration-200 data-[state=active]:shadow-none"
            >
              Scorecard
            </TabsTrigger>
            <TabsTrigger
              value="metrics"
              className="data-[state=active]:border-b-2 data-[state=active]:border-amber-600 data-[state=active]:text-amber-800 dark:data-[state=active]:text-amber-200 data-[state=active]:bg-transparent rounded-none bottom-0 border-b-2 border-transparent py-2 px-5  bg-transparent text-sm font-medium transition-all duration-200 shadow-none data-[state=active]:shadow-none"
            >
              Metrics
            </TabsTrigger>
          </TabsList>
        </div>

        <div className="flex-1 overflow-hidden">
          <TabsContent
            value="scorecard"
            className="m-0 h-full data-[state=active]:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <ScorecardTab />
          </TabsContent>

          <TabsContent
            value="metrics"
            className="m-0 h-full data-[state=active]:flex-1 data-[state=active]:flex data-[state=active]:flex-col"
          >
            <ScrollArea className="flex-1 p-3">
              <PerformanceTab />
            </ScrollArea>
          </TabsContent>
        </div>
      </Tabs>

      {/* Only render the player if showTranscript is false */}
      {/* {!showTranscript && (
        <div className="p-3 border-t bg-blue-50/80 dark:bg-blue-900/30 backdrop-blur-sm shadow-inner">
          <RecordingPlayer audioUrl={selectedHistory.audioUrl} />
        </div>
      )} */}
    </div>
  );
}
