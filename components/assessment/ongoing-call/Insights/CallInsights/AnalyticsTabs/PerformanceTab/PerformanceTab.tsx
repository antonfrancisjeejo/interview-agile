"use client";
import React, { useMemo } from "react";
import { Calendar, Clock } from "lucide-react";
import { InfoCard } from "./InfoCard";
import { SpeechMetricsSection } from "./SpeechMetricsSection";
import { RootState, useAppSelector } from "@/store/store";
import { AnalyticsState } from "@/store/services/analytics/types";
import { formatMeaningfulTime } from "@/utils/time";
import { formatCreatedAtDate, getTodayDate } from "@/utils/date";
import { useSearchParams } from "next/navigation";

export function PerformanceTab() {
  // Speech metrics data
  const searchParams = useSearchParams();
  const personaId = searchParams.get("personaId");
  const { calltime, createdAt }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );
  const formattedCallTime = useMemo(() => {
    return formatMeaningfulTime(calltime);
  }, [calltime]);

  const todayDate = useMemo(() => {
    if (personaId) {
      return formatCreatedAtDate(createdAt);
    } else {
      return getTodayDate();
    }
  }, [personaId, createdAt]);

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <InfoCard label="Call Date" value={todayDate} icon={Calendar} />

        <InfoCard label="Duration" value={formattedCallTime} icon={Clock} />
      </div>

      <SpeechMetricsSection />
    </div>
  );
}
