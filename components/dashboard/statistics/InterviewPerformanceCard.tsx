"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticValue } from "./StatisticValue";

const InterviewPerformanceCard = () => {
  return (
    <Card className="bg-gradient-to-br from-lavender-50 to-lavender-100 dark:from-lavender-900/20 dark:to-lavender-800/20">
      <CardHeader>
        <CardTitle>Interview Performance</CardTitle>
      </CardHeader>
      <CardContent>
        <StatisticValue value="12" label="This Month" />
      </CardContent>
    </Card>
  );
};

export default InterviewPerformanceCard;
