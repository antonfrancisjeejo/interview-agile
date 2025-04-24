"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ThumbsUp, Wrench, Lightbulb } from "lucide-react";
import { Card } from "@/components/ui/card";
import {
  AnalyticsDataProps,
  AnalyticsState,
} from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";

export function AICoachReviewPanel() {
  // These would come from an API in a real application

  const { data }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });
  const analyticsData = data as AnalyticsDataProps;

  return (
    <div className="flex flex-col h-full">
      <div className="px-4 py-3 border-b bg-gradient-to-r from-amber-50/90 to-amber-100/50 dark:from-amber-900/40 dark:to-amber-800/20 sticky top-0 z-10 shadow-sm">
        <h3 className="text-base font-bold text-amber-800 dark:text-amber-200">
          AI Coach Review
        </h3>
        <p className="text-sm text-amber-600 dark:text-amber-300">
          Structured feedback on your conversation
        </p>
      </div>

      {/* Make only the AI Coach review subsections scrollable */}
      <div className="p-3 flex flex-col h-[calc(100%-60px)]">
        <ScrollArea className="flex-1">
          <div className="space-y-4 pr-2">
            {/* What Was Done Well */}
            <Card className="p-3 bg-emerald-50/80 dark:bg-emerald-900/20 border border-emerald-200 dark:border-emerald-800/50 shadow-sm">
              <div className="flex gap-2 ">
                <ThumbsUp className="h-5 w-5 text-emerald-600 dark:text-emerald-400" />
                <h4 className="font-bold text-emerald-700 dark:text-emerald-300">
                   What Was Done Well
                </h4>
              </div>
              <ul className="space-y-1 pl-5 list-disc text-sm text-gray-700 dark:text-gray-300">
                {analyticsData?.ai_coach_review?.what_was_done_well?.length >
                  0 &&
                  analyticsData?.ai_coach_review?.what_was_done_well?.map(
                    (item, index) => (
                      <li className="capitalize" key={index}>
                        {item}
                      </li>
                    )
                  )}
              </ul>
            </Card>

            {/* Areas for Improvement */}
            <Card className="p-3 bg-amber-50/80 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800/50 shadow-sm">
              <div className="flex gap-2 ">
                <Wrench className="h-5 w-5 text-amber-600 dark:text-amber-400" />
                <h4 className="font-bold text-amber-700 dark:text-amber-300">
                   What Could Be Improved
                </h4>
              </div>
              <ul className="space-y-1 pl-5 list-disc text-sm text-gray-700 dark:text-gray-300">
                {analyticsData?.ai_coach_review?.what_could_be_improved
                  ?.length > 0 &&
                  analyticsData?.ai_coach_review?.what_could_be_improved?.map(
                    (item, index) => (
                      <li className="capitalize" key={index}>
                        {item}
                      </li>
                    )
                  )}
              </ul>
            </Card>

            {/* Final Suggestions */}
            <Card className="p-3 bg-blue-50/80 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800/50 shadow-sm">
              <div className="flex gap-2">
                <Lightbulb className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-bold text-blue-700 dark:text-blue-300">
                   Final Suggestions
                </h4>
              </div>
              <ul className="space-y-1 pl-5 list-disc text-sm text-gray-700 dark:text-gray-300">
                {analyticsData?.ai_coach_review?.final_suggestions?.length >
                  0 &&
                  analyticsData?.ai_coach_review?.final_suggestions?.map(
                    (item, index) => (
                      <li className="capitalize" key={index}>
                        {item}
                      </li>
                    )
                  )}
              </ul>
            </Card>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
