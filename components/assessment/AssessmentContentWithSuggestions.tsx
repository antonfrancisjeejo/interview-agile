/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import React from "react";
import { PersonaGrid } from "./PersonGrid";
import { AISuggestionsCard } from "./AISuggestionsCard";

export function AssessmentContentWithSuggestions(props: any) {
  const { personas, handleNavigate } = props;

  // Get relevant metrics for the key improvement area

  // This would typically come from an analysis of the rep's performance data

  return (
    <div className="space-y-6">
      {/* Optimized recommendation alert */}
      {/* <div className="bg-amber-50 p3 p-4 rounded-2xl border border-amber-200 dark:bg-amber-900/20 dark:border-amber-800/30 py-3">
        <div className="flex items-start justify-between">
          <div className="flex flex-1 w-7xl">
            <AlertCircle className="h-5 w-5 text-amber-600 dark:text-amber-500 mt-0.5 flex-shrink-0" />
            <div className="ml-3 flex-1">
              <AlertTitle className="text-amber-800 dark:text-amber-500 font-medium mb-1">
                {overallRecommendation.title}
              </AlertTitle>
              <AlertDescription className="text-amber-700 dark:text-amber-400">
                {overallRecommendation.description}
              </AlertDescription>
            </div>
          </div>
          <div className=" flex items-center justify-center gap-6 ml-4 pl-4 border-l border-amber-200 dark:border-amber-700/30">
            {objectionHandlingMetric && (
              <div>
                <div className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-0.5">
                  Confidence Score
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-sm mr-2">
                    {objectionHandlingMetric.score}/100
                  </span>
                  {objectionHandlingMetric.improvement &&
                  objectionHandlingMetric.improvement > 0 ? (
                    <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-0.5" />+
                      {objectionHandlingMetric.improvement}
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                      {objectionHandlingMetric.improvement}
                    </span>
                  )}
                </div>
              </div>
            )}

            {clarityMetric && (
              <div>
                <div className="text-xs text-amber-700 dark:text-amber-400 font-medium mb-0.5">
                  Clarity Score
                </div>
                <div className="flex items-center">
                  <span className="font-bold text-sm mr-2">
                    {clarityMetric.score}/100
                  </span>
                  {clarityMetric.improvement &&
                  clarityMetric.improvement > 0 ? (
                    <span className="flex items-center text-xs text-green-600 dark:text-green-400">
                      <TrendingUp className="h-3 w-3 mr-0.5" />+
                      {clarityMetric.improvement}
                    </span>
                  ) : (
                    <span className="flex items-center text-xs text-red-600 dark:text-red-400">
                      <TrendingDown className="h-3 w-3 mr-0.5" />
                      {clarityMetric.improvement}
                    </span>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div> */}

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Left column (3/5 width on desktop) - Personas */}

        <div className="lg:col-span-3 space-y-4 ">
          <PersonaGrid personas={personas} onStartCall={handleNavigate} />
        </div>
        {/* Right column (2/5 width on desktop) - AI Suggestions */}
        <div className="lg:col-span-2 space-y-6">
          <AISuggestionsCard />
        </div>
      </div>
    </div>
  );
}
