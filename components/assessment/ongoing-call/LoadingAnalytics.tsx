/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */

"use client";
import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Loader, BarChart2, ChevronUp, Check } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";
import { RootState, useAppSelector } from "@/store/store";
import { AnalyticsState } from "@/store/services/analytics/types";
import { useRouter } from "next/navigation";

export function LoadingAnalytics({
  error,
  handleSummarize,
}: {
  error: string;
  handleSummarize: () => void;
}) {
  const [progress, setProgress] = useState(10);

  const { loading, req_success }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );
  const router = useRouter();
  const hanleClick = () => {
    router.push("/company-user/dashboard");
  };

  const getProgress = (prevProgress: number) => {
    const increment = Math.max(1, Math.floor((100 - prevProgress) / 10));
    const newProgress = Math.min(100, prevProgress + increment);
    return newProgress;
  };
  // Simulate progress incrementing
  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prevProgress) => {
        // Slow down progress as it gets higher to create tension
        return getProgress(prevProgress);
      });
    }, 200);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (error) {
      setProgress(10);
    }
  }, [error]);

  return (
    <Card className="flex flex-col items-center justify-center p-6 h-auto bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-100 dark:border-blue-900/30">
      <div className="text-center">
        <div className="relative mx-auto mb-4 h-16 w-16 flex items-center justify-center">
          <div className="absolute inset-0 rounded-full bg-blue-100 dark:bg-blue-900/40 animate-pulse"></div>
          <Loader className="h-10 w-10 text-blue-600 dark:text-blue-400 animate-spin relative" />
        </div>

        <h3 className="text-xl font-semibold text-blue-700 dark:text-blue-300 mb-2">
          Generating Call Analytics
        </h3>
        {!error && (
          <p className="text-blue-600/80 dark:text-blue-400/80 max-w-md mb-4">
            Our AI is analyzing your call performance, speech patterns, and
            conversation quality.
          </p>
        )}
        {error && (
          <p className="text-red-500 dark:text-red-400 max-w-md mb-4">
            {error}
          </p>
        )}
        {!error && (
          <div className="space-y-4 max-w-md mx-auto mt-6">
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-blue-600 dark:text-blue-400">
                  Processing data
                </span>
                <span className="text-sm font-medium text-blue-700 dark:text-blue-300">
                  {progress}%
                </span>
              </div>
              <Progress
                value={progress}
                className="h-2 bg-blue-100 dark:bg-blue-900/40"
              />
            </div>

            <div className="grid grid-cols-2 gap-4 pt-2">
              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-amber-100 dark:bg-amber-900/40 flex items-center justify-center">
                  <ChevronUp className="h-4 w-4 text-amber-600 dark:text-amber-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2.5 w-24">
                    <Skeleton className="h-full w-full bg-amber-200/50 dark:bg-amber-800/30 animate-pulse" />
                  </div>
                  <div className="h-2 w-16 mt-1">
                    <Skeleton className="h-full w-full bg-amber-200/30 dark:bg-amber-800/20 animate-pulse" />
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/40 flex items-center justify-center">
                  <BarChart2 className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                </div>
                <div className="flex-1">
                  <div className="h-2.5 w-20">
                    <Skeleton className="h-full w-full bg-blue-200/50 dark:bg-blue-800/30 animate-pulse" />
                  </div>
                  <div className="h-2 w-12 mt-1">
                    <Skeleton className="h-full w-full bg-blue-200/30 dark:bg-blue-800/20 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        <div className="grid grid-cols-2">
          {/* {!error && req_success.get && !loading.get && (
            <Button
              variant="outline"
              onClick={hanleClick}
              className="flex-1 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
            >
              Back to Dashboard
            </Button>
          )} */}
          {error && (
            <Button
              variant="outline"
              onClick={handleSummarize}
              className="flex-1 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
            >
              Analyze Again
            </Button>
          )}
        </div>
      </div>
    </Card>
  );
}
