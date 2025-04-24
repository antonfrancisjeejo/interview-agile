/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { Button } from "@/components/ui/button";

import { useRouter } from "next/navigation";
import { Check } from "lucide-react";
import { RootState, useAppSelector } from "@/store/store";
import { AnalyticsState } from "@/store/services/analytics/types";

const CallEndSuccess = ({
  error,
  handleSummarize,
}: {
  error: string;
  handleSummarize: () => void;
}) => {
  const { loading, req_success }: AnalyticsState = useAppSelector(
    (store: RootState) => {
      return store.AnalyticsSlice;
    }
  );
  const router = useRouter();
  const hanleClick = () => {
    router.push("/company-user/dashboard");
  };
  return (
    <div className="  bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30 p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl font-bold mb-8 self-start">Call Summary</h1>
      <div className="flex flex-col items-center justify-center h-[58vh]">
        {" "}
        <div className="w-full max-w-md flex flex-col items-center p-6">
          <div className="bg-green-100 dark:bg-[#2a6349] rounded-full p-4 mb-4">
            <Check className="w-12 h-12 text-green-500 dark:text-[#4eca7c]" />
          </div>

          <h2 className="text-2xl font-bold mb-1">
            Call Completed Successfully
          </h2>
          <p className="text-gray-500 dark:text-gray-400 mb-6">
            Ready to explore the conversation results!
          </p>
          {error && (
            <p className="text-red-500 dark:text-red-400 mb-6">{error}</p>
          )}

          {/* <div className="flex items-center justify-center mb-2">
    <Avatar className="h-12 w-12 bg-gray-300 dark:bg-[#4a5568] border-2 border-white dark:border-[#1a2130] mr-2">
      <AvatarFallback className="text-gray-700 dark:text-white">J</AvatarFallback>
    </Avatar>
    <span className="mr-6">Jackman</span>

    <Avatar className="h-12 w-12 bg-gray-300 dark:bg-[#4a5568] border-2 border-white dark:border-[#1a2130] mr-2">
      <AvatarFallback className="text-gray-700 dark:text-white">J</AvatarFallback>
    </Avatar>
    <span>Deepak JOSHI</span>
  </div> */}

          {/* <p className="text-gray-500 dark:text-gray-400 mb-8">Duration: 12m 34s</p> */}

          <div className="flex  justify-center gap-4 w-full ">
            {/* <Button className="flex-1 cursor-pointer bg-purple-600 hover:bg-purple-700 dark:bg-[#8b5cf6] dark:hover:bg-[#7c3aed] text-white border-none">
              View Analysis Report
            </Button> */}
            {!error && loading.get && (
              <div className="flex justify-center items-center flex-col my-4 ">
                <div className="inline-block animate-spin rounded-full border-4 border-solid border-current h-8 w-8 border-r-transparent"></div>
                <p className="text-gray-500 text-center  mt-2 animate-pulse">
                  Analyzing...
                </p>
              </div>
            )}

            {!error && req_success.get && !loading.get && (
              <Button
                variant="outline"
                onClick={hanleClick}
                className="flex-1 cursor-pointer bg-transparent hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-800 dark:text-white border border-gray-300 dark:border-gray-600"
              >
                Back to Dashboard
              </Button>
            )}
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
      </div>
    </div>
  );
};

export default CallEndSuccess;
