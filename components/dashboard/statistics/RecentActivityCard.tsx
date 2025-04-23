"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { StatisticValue } from "./StatisticValue";

const RecentActivityCard = () => {
  return (
    <Card className="bg-gradient-to-br from-mint-50 to-mint-100 dark:from-mint-900/20 dark:to-mint-800/20">
      <CardHeader>
        <CardTitle>Recent Activity</CardTitle>
      </CardHeader>
      <CardContent>
        <StatisticValue value="25m" label="Per Interview" />
      </CardContent>
    </Card>
  );
};

export default RecentActivityCard;
