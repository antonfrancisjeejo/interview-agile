"use client";

import UpcomingInterviewsCard from "./statistics/UpcomingInterviewsCard";
import InterviewPerformanceCard from "./statistics/InterviewPerformanceCard";
import RecentActivityCard from "./statistics/RecentActivityCard";

const StatisticsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <UpcomingInterviewsCard />
      <InterviewPerformanceCard />
      <RecentActivityCard />
    </div>
  );
};

export default StatisticsCards;
