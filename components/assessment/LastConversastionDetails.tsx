import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { DashboardStateProps } from "@/store/services/dashboard/types";
import React from "react";

const LastConversastionDetails = ({
  recentHistory,
}: {
  recentHistory: DashboardStateProps["recentHistory"];
}) => {
  return (
    <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 mb-4 border border-slate-200 dark:border-slate-700/30">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">
          Last Conversation
        </h3>
        <div className="flex gap-2">
          <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-200">
            {/* {getFormattedTime(recentHistory?.analyticsData?.callTime ?? 0)} min */}
          </Badge>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Persona</p>
          <p className="text-sm font-medium">{recentHistory?.persona?.name}</p>
        </div>
        <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">Mood</p>
          {/* <p className="text-sm font-medium"> 
            {getFormatedMood(recentHistory?.persona?.mood)}</p> */}
        </div>
        {/* <div>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Difficulty
          </p>
          <p className="text-sm font-medium">
            {recentHistory?.persona?.difficulty}
          </p>
        </div> */}
        <div className="col-span-3">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Performance Score
          </p>
          <div className="flex items-center gap-2">
            <Progress
              value={recentHistory?.score ?? 0}
              className="h-2 w-full"
            />
            <span className="text-xs font-medium text-teal-500">
              {Math.round(recentHistory?.score ?? 0)}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LastConversastionDetails;
