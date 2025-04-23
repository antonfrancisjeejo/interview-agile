"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { StatisticValue } from "./StatisticValue";

const UpcomingInterviewsCard = () => {
  return (
    <Card className="bg-gradient-to-br from-coral-50 to-coral-100 dark:from-coral-900/20 dark:to-coral-800/20">
      <CardHeader>
        <CardTitle>Upcoming Interviews</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-2">
          <StatisticValue value="85%" label="Last Interview" />
        </div>
        <Progress value={85} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default UpcomingInterviewsCard;
