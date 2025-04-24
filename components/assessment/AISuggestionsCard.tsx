"use client";
import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, Zap } from "lucide-react";
import { SuggestionCard } from "./SuggestionCard";
import LastConversastionDetails from "./LastConversastionDetails";
import { DashboardStateProps } from "@/store/services/dashboard/types";
import { RootState, useAppSelector } from "@/store/store";

export function AISuggestionsCard() {
  // Generate AI suggestions based on performance metrics and call history
  const { recentHistory }: DashboardStateProps = useAppSelector(
    (store: RootState) => {
      return store.DashboardSlice;
    }
  );

  return (
    <Card className="border shadow-sm gap-0">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Lightbulb className="h-5 w-5 text-amber-500" />
            <span>AI Coach Suggestions</span>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {/* Conversation Details Card */}
        {/* <div className="bg-slate-50 dark:bg-slate-800/30 rounded-lg p-3 mb-4 border border-slate-200 dark:border-slate-700/30">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-slate-700 dark:text-slate-300">Last Conversation</h3>
            <div className="flex gap-2">
              <Badge className="bg-slate-100 text-slate-800 dark:bg-slate-700/30 dark:text-slate-200">
                {personaDetails.duration}
              </Badge>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-3">
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Persona</p>
              <p className="text-sm font-medium">{personaDetails.name}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Mood</p>
              <p className="text-sm font-medium">{personaDetails.mood}</p>
            </div>
            <div>
              <p className="text-xs text-slate-500 dark:text-slate-400">Difficulty</p>
              <p className="text-sm font-medium">{personaDetails.difficulty}</p>
            </div>
            <div className="col-span-3">
              <p className="text-xs text-slate-500 dark:text-slate-400">Performance Score</p>
              <div className="flex items-center gap-2">
                <Progress value={75} className="h-2 w-full" />
                <span className="text-xs font-medium text-teal-500">75%</span>
              </div>
            </div>
          </div>
        </div> */}
        <LastConversastionDetails recentHistory={recentHistory} />

        <div className="space-y-4 mt-3">
          <div className="border rounded-lg p-5 hover:bg-muted/40 transition-colors space-y-2.5">
            <SuggestionCard />
          </div>
        </div>

        <div className="bg-blue-50/50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-800/30 rounded-md p-3 mt-4">
          <div className="flex items-start gap-3">
            <div className="bg-blue-100 dark:bg-blue-800/40 p-2 rounded-md">
              <Zap className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h4 className="font-medium text-blue-800 dark:text-blue-300">
                AI Coaching Insight
              </h4>
              <p className="text-sm text-blue-700/90 dark:text-blue-400">
                Based on your conversation patterns, try focusing more on
                open-ended questions to better understand customer needs.
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
