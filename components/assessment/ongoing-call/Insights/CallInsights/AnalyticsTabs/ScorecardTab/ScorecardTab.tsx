"use client";
import React from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   assessmentCategories,
//   overallScore,
// } from "../../../../../../../../data/scorecardData";

import { OverallScoreCard } from "./OverallScoreCard";
// import { AssessmentCategoryCard } from "./AssessmentCategoryCard";
import { ColdCalling } from "./ColdCalling";
import {
  AnalyticsDataProps,
  AnalyticsState,
} from "@/store/services/analytics/types";
import { RootState, useAppSelector } from "@/store/store";
import { PainPoint } from "./PainPoint";
import { SimpleAndConcise } from "./SimpleAndConcise";
import { ClosingQuestion } from "./ClosingQuestion";
import { Meeting } from "./Meeting";
// import {
//   AnalyticsDataProps,
//   AnalyticsState,
// } from "@/store/services/analytics/types";
// import { RootState, useAppSelector } from "@/store/store";

export function ScorecardTab() {
  const { data }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });

  const analyticsData = data as AnalyticsDataProps;
  return (
    <ScrollArea className="h-full flex-1">
      <div className="space-y-6 p-4">
        {/* Overall Score Circle - updated design */}
        {/* <OverallScoreCard
          overallScore={overallScore}
          categories={assessmentCategories}
        /> */}
        {/* Detailed Assessment Categories */}
        {/* {assessmentCategories.map((category, index) => (
          <AssessmentCategoryCard
            key={index}
            title={category.title}
            score={category.score}
            description={category.description}
            criteria={category.criteria}
          />
        ))} */}
        <ColdCalling data={analyticsData.first_impression_and_engagement} />
        <PainPoint data={analyticsData.identifying_customer_needs} />
        <SimpleAndConcise
          data={analyticsData.clarity_and_conversational_flow}
        />
        <ClosingQuestion data={analyticsData.guiding_towards_a_decision} />
        <Meeting data={analyticsData.securing_a_next_step} />
        <div className="h-4" />{" "}
        {/* Add some padding at the bottom for better scrolling */}
      </div>
    </ScrollArea>
  );
}
