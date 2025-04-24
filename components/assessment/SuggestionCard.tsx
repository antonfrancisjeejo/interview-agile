"use client";
import React from "react";
import { ThumbsUp, Wrench } from "lucide-react";
import { DashboardStateProps } from "@/store/services/dashboard/types";
import { RootState, useAppSelector } from "@/store/store";

export function SuggestionCard() {
  const { recentHistory }: DashboardStateProps = useAppSelector(
    (store: RootState) => {
      return store.DashboardSlice;
    }
  );
  return (
    <>
      {/* What Was Done Well Section */}
      <div className="bg-green-50/80 dark:bg-green-900/20 border border-green-100 dark:border-green-800/30 rounded-md p-2.5">
        <div className="flex items-start gap-1.5 mb-1.5">
          <ThumbsUp className="h-4 w-4 text-green-600 dark:text-green-400 flex-shrink-0 mt-0.5" />
          <h3 className="font-medium text-sm text-green-800 dark:text-green-300">
             What Was Done Well
          </h3>
        </div>

        <ul className="space-y-1 pl-5 ">
          {recentHistory?.analyticsData?.ai_coach_review?.what_was_done_well &&
            recentHistory?.analyticsData?.ai_coach_review?.what_was_done_well?.map(
              (item: string) => (
                <li key={item} className="text-green-700 dark:text-green-300 text-xs list-disc">
                  {item}
                </li>
              )
            )}
        </ul>
      </div>

      {/* What Could Be Improved Section */}
      <div className="bg-amber-50/80 dark:bg-amber-900/20 border border-amber-100 dark:border-amber-800/30 rounded-md p-2.5">
        <div className="flex items-start gap-1.5 mb-1.5">
          <Wrench className="h-4 w-4 text-amber-600 dark:text-amber-400 flex-shrink-0 mt-0.5" />
          <h3 className="font-medium text-sm text-amber-800 dark:text-amber-300">
             What Could Be Improved
          </h3>
        </div>

        <ul className="space-y-1 pl-5">
          {recentHistory?.analyticsData?.ai_coach_review
            ?.what_could_be_improved &&
            recentHistory?.analyticsData?.ai_coach_review?.what_could_be_improved?.map(
              (item: string) => (
                <li key={item} className="text-amber-700 dark:text-amber-300 text-xs list-disc">
                  {item}
                </li>
              )
            )}
        </ul>
      </div>
    </>
  );
}
