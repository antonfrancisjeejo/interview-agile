/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React from "react";

import { PartyPopper, Award, Trophy, Star } from "lucide-react";
import CircularProgress from "./CircularProgress";
import {
  AnalyticsDataProps,
  AnalyticsState,
} from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";
import { getFeedbackMessage } from "@/utils/string";
import { getPercentage } from "@/utils/math";
import { GradientCircularProgress } from "./circular-progress";

interface AssessmentCategory {
  title: string;
  score: number;
}

interface OverallScoreCardProps {
  overallScore: number;
  categories: AssessmentCategory[];
}

export function OverallScoreCard({
  overallScore,
  categories,
}: OverallScoreCardProps) {
  const { data }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });
  const analyticsData = data as AnalyticsDataProps;
  // console.log("data::", analyticsData);
  // Define color segments with blue as the main color
  const progressSegments = [
    { color: "#4f46e5", percentage: 100 }, // Indigo/blue (full circle)
  ];

  // Determine badge styling and icon based on category
  const getCategoryStyle = (title: string) => {
    const lowerTitle = title.toLowerCase();

    if (lowerTitle.includes("simple") || lowerTitle.includes("concise")) {
      return {
        className:
          "bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm shadow-sm",
        icon: <Star className="h-4 w-4 mr-2" />,
      };
    }
    if (lowerTitle.includes("closing") || lowerTitle.includes("assumptive")) {
      return {
        className:
          "bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm shadow-sm",
        icon: <Star className="h-4 w-4 mr-2" />,
      };
    }
    if (lowerTitle.includes("introduction") || lowerTitle.includes("call")) {
      return {
        className:
          "bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-sm",
        icon: <Award className="h-4 w-4 mr-2" />,
      };
    }
    if (lowerTitle.includes("meeting") || lowerTitle.includes("agreed")) {
      return {
        className:
          "bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-sm",
        icon: <Award className="h-4 w-4 mr-2" />,
      };
    }
    if (lowerTitle.includes("pain") || lowerTitle.includes("uncover")) {
      return {
        className:
          "bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm shadow-sm",
        icon: <Trophy className="h-4 w-4 mr-2" />,
      };
    }

    // Default style
    return {
      className:
        "bg-gray-100 text-gray-800 px-4 py-2 rounded-full text-sm shadow-sm",
      icon: <Star className="h-4 w-4 mr-2" />,
    };
  };

  // Format the score for display
  const passThreshold = 70;
  const isPassing = overallScore >= passThreshold;

  return (
    <div className="relative overflow-hidden bg-white dark:bg-slate-800 p-6 rounded-xl border shadow-md">
      {/* Decorative background elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 dark:bg-blue-900/20 rounded-full -mr-16 -mt-16 opacity-50"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-blue-50 dark:bg-blue-900/20 rounded-full -ml-12 -mb-12 opacity-40"></div>

      <div className="relative flex flex-col md:flex-row items-center md:items-start gap-6">
        {/* Score Circle with blue color */}
        <div className="w-36 h-36 flex-shrink-0 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50/90 via-red-50/90 to-orange-50/90 dark:from-blue-900/20 dark:via-red-900/20 dark:to-orange-900/20 rounded-full blur-sm"></div>
          {/* <CircularProgress percentage={analyticsData.final_score} /> */}
          <GradientCircularProgress
            value={Math.round(analyticsData?.final_score || 0)}
            maxValue={100}
            size="lg"
            strokeWidth={10}
            valueColor="url(#blueRedOrange)"
            trailColor="transparent"
            textColor="#4fd1c5"
          >
            <div className="text-center">
              <span className="text-4xl font-bold text-teal-400 dark:text-teal-400">
                {Math.round(analyticsData?.final_score || 0)}
              </span>
              <span className="text-xl text-teal-400 dark:text-teal-400">
                %
              </span>
            </div>
          </GradientCircularProgress>
          {/* Status indicator */}
          <div className="absolute -right-2 -bottom-2 w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 via-red-500 to-orange-400 shadow-md">
            <PartyPopper className="h-5 w-5 text-white" />
          </div>
        </div>

        {/* Results Content */}
        <div className="flex-1 text-center md:text-left">
          <h3 className="text-2xl font-bold mb-1 flex items-center justify-center md:justify-start gap-2">
            {/* {isPassing ? (
              <>
                Excellent Work!{" "}
                <PartyPopper className="h-5 w-5 text-amber-500" />
              </>
            ) : (
              <>Almost There!</>
            )} */}
            {getFeedbackMessage(analyticsData.final_score)}
          </h3>
          <p className="text-muted-foreground mb-6">
            {passThreshold}% needed to pass
          </p>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-2 mt-2">
            {/* Cold Call Introduction */}
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span className="font-medium">Cold Call Introduction</span>
                </div>
                <span className="font-bold ml-2">
                  {getPercentage(
                    analyticsData?.first_impression_and_engagement?.score,
                    30
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Uncover a Pain Point */}
            <div className="bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Trophy className="h-4 w-4 mr-2" />
                  <span className="font-medium">Uncover a Pain Point</span>
                </div>
                <span className="font-bold ml-2">
                  {getPercentage(
                    analyticsData?.identifying_customer_needs?.score,
                    20
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Simple and Concise */}
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="font-medium">Simple and Concise</span>
                </div>
                <span className="font-bold ml-2">
                  {getPercentage(
                    analyticsData?.clarity_and_conversational_flow?.score,
                    20
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Assumptive Closing Questions */}
            <div className="bg-emerald-100 text-emerald-800 px-4 py-2 rounded-full text-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Star className="h-4 w-4 mr-2" />
                  <span className="font-medium">
                    Assumptive Closing Questions
                  </span>
                </div>
                <span className="font-bold ml-2">
                  {getPercentage(
                    analyticsData?.guiding_towards_a_decision?.score,
                    20
                  )}
                  %
                </span>
              </div>
            </div>

            {/* Agreed to Set a Meeting */}
            <div className="bg-blue-100 text-blue-800 px-4 py-2 rounded-full text-sm shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  <span className="font-medium">Agreed to Set a Meeting</span>
                </div>
                <span className="font-bold ml-2">
                  {getPercentage(
                    analyticsData?.securing_a_next_step?.score,
                    10
                  )}
                  %
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
