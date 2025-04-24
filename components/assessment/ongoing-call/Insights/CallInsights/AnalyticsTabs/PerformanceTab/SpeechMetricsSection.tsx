"use client";
import React, { useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Mic, MessageCircle, HelpCircle } from "lucide-react";
import { SpeechMetricCard } from "./SpeechMetricCard";
import {
  AnalyticsDataProps,
  AnalyticsState,
} from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";
import { formatMeaningfulTime } from "@/utils/time";
import { CallRatioCard } from "./CallRatioCard";

export function SpeechMetricsSection() {
  const { data, wpm, longestMonologue }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );
  const analyticsData = data as AnalyticsDataProps;

  // Get the appropriate progress color
  const getMetricColor = ({
    label,
    value,
  }: {
    label: string;
    value: number;
  }): string => {
    // For filler words, lower is better
    if (label.includes("filler")) {
      return value <= 5
        ? "bg-green-500"
        : value <= 10
        ? "bg-blue-500"
        : value <= 15
        ? "bg-amber-500"
        : "bg-red-500";
    }

    // For words per minute, mid-range is ideal
    if (label.includes("words per minute")) {
      return value >= 120 && value <= 160
        ? "bg-green-500"
        : value >= 100 && value <= 180
        ? "bg-blue-500"
        : "bg-amber-500";
    }

    // For interruptions, lower is better
    if (label.includes("interruptions")) {
      return value <= 2
        ? "bg-green-500"
        : value <= 4
        ? "bg-blue-500"
        : value <= 6
        ? "bg-amber-500"
        : "bg-red-500";
    }

    // For questions, more is generally better
    if (label.includes("questions")) {
      return value >= 10
        ? "bg-green-500"
        : value >= 6
        ? "bg-blue-500"
        : value >= 3
        ? "bg-amber-500"
        : "bg-red-500";
    }

    // For monologue length, shorter is generally better
    if (label.includes("monologue")) {
      // Convert to seconds

      return value <= 30
        ? "bg-green-500"
        : value <= 60
        ? "bg-blue-500"
        : value <= 90
        ? "bg-amber-500"
        : "bg-red-500";
    }

    // Default color
    return "bg-blue-500";
  };

  // Calculate a value to use for progress bar
  const getMetricProgress = ({ value }: { value: number }): number => {
    return value;
  };
  const formattedLongestMonologue = useMemo(() => {
    return formatMeaningfulTime(longestMonologue);
  }, [longestMonologue]);

  return (
    <Card className="border shadow-md hover:shadow-lg transition-all duration-300">
      <CardContent className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Mic className="h-4 w-4 text-primary" />
          <h3 className="text-sm font-medium">Speech Metrics</h3>
        </div>
        <div className="grid grid-cols-1  lg:grid-cols-3 gap-4">
          {/* {metrics.map((metric, index) => (
            <SpeechMetricCard
              key={index}
              label={metric.label}
              value={metric.value}
              description={metric.description}
              icon={metric.icon}
              progressPercentage={getMetricProgress(metric)}
              colorClass={getMetricColor(metric)}
            />
          ))} */}

          {/* <SpeechMetricCard
            label="Filler Words"
            value="14"
            description={
              "Number of times you used words like 'um', 'uh', 'like'"
            }
            icon={Volume2}
            progressPercentage={getMetricProgress({
              label: "Filler Words",
              value: "14",
              icon: Volume2,
              description:
                "Number of times you used words like 'um', 'uh', 'like'",
            })}
            colorClass={getMetricColor({
              label: "Filler Words",
              value: "14",
              icon: Volume2,
              description:
                "Number of times you used words like 'um', 'uh', 'like'",
            })}
          /> */}

          <SpeechMetricCard
            label="Questions Raised"
            value={analyticsData?.customer_question_raised as unknown as string}
            description={"Total questions you asked during the call"}
            icon={HelpCircle}
            progressPercentage={getMetricProgress({
              value: analyticsData?.customer_question_raised,
            })}
            colorClass={getMetricColor({
              label: "Questions Raised",
              value: analyticsData?.customer_question_raised,
            })}
          />

          <SpeechMetricCard
            label="Longest Monologue"
            value={formattedLongestMonologue}
            description={"Your longest uninterrupted speaking time"}
            icon={MessageCircle}
            progressPercentage={getMetricProgress({
              value: longestMonologue,
            })}
            colorClass={getMetricColor({
              label: "Longest Monologue",
              value: longestMonologue,
            })}
          />

          <SpeechMetricCard
            label="Words Per Minute"
            value={`${wpm as unknown as string} wpm`}
            description={"Your average speaking pace"}
            icon={Mic}
            progressPercentage={getMetricProgress({
              value: wpm,
            })}
            colorClass={getMetricColor({
              label: "Words Per Minute",
              value: wpm,
            })}
          />

          <CallRatioCard
            label="Talk/Listen Ratio"
            description={"How much you spoke vs. how much you listened"}
            icon={Mic}
            callTime={analyticsData?.callTime}
            userCallTime={analyticsData?.userCallTime}
          />
          {/* 
          <SpeechMetricCard
            label="Interruptions"
            value="3"
            description={"Number of times you interrupted the prospect"}
            icon={BarChart3}
            progressPercentage={getMetricProgress({
              label: "Interruptions",
              value: "3",
              icon: BarChart3,
              description: "Number of times you interrupted the prospect",
            })}
            colorClass={getMetricColor({
              label: "Interruptions",
              value: "3",
              icon: BarChart3,
              description: "Number of times you interrupted the prospect",
            })}
          /> */}
        </div>
      </CardContent>
    </Card>
  );
}
