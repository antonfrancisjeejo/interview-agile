"use client";

import { Card } from "@/components/ui/card";
import { Flame, Trophy, Award } from "lucide-react";
import { StatisticValue } from "./statistics/StatisticValue";

const StreakSection = () => {
  return (
    <section className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Interview Streak</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-gradient-to-br from-purple-50 to-white border-purple-100">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 bg-orange-100 rounded-full">
              <Flame className="h-8 w-8 text-orange-500" />
            </div>
            <div>
              <StatisticValue value="7" label="Current Streak" />
              <p className="text-sm text-gray-500 mt-1">
                Keep up the momentum!
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-white border-yellow-100">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 bg-yellow-100 rounded-full">
              <Trophy className="h-8 w-8 text-yellow-500" />
            </div>
            <div>
              <StatisticValue value="15" label="Personal Best" />
              <p className="text-sm text-gray-500 mt-1">
                Your highest streak yet!
              </p>
            </div>
          </div>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-white border-blue-100">
          <div className="p-6 flex items-center gap-4">
            <div className="p-3 bg-blue-100 rounded-full">
              <Award className="h-8 w-8 text-blue-500" />
            </div>
            <div>
              <StatisticValue value="32" label="Top Streak" />
              <p className="text-sm text-gray-500 mt-1">
                All-time community best
              </p>
            </div>
          </div>
        </Card>
      </div>
    </section>
  );
};

export default StreakSection;
