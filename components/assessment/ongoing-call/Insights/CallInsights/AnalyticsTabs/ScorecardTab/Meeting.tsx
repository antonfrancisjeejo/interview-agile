/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { CheckCircle, CrossIcon } from "lucide-react";
import { getScoreColorClasses, getScoreIcon } from "./color";
import { getPercentage } from "@/utils/math";

export function Meeting({ data }: { data: any }) {
  return (
    <div
      className={`border rounded-md overflow-hidden ${getScoreColorClasses(
        getPercentage(data?.score, 10)
      )}`}
    >
      <div className="p-3 border-b bg-white/70 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getScoreIcon(getPercentage(data?.score, 10))}
            <h3 className="font-bold text-sm">Agreed to Set a Meeting</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {getPercentage(data?.score, 10)}%
            </span>
          </div>
        </div>
        {/* <p className="mt-1.5 text-xs text-gray-700 dark:text-gray-300">
          You effectively identified customer pain points.
        </p> */}
      </div>

      <div className="p-3">
        <h4 className="text-xs font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Assessment Criteria
        </h4>
        <ul className="space-y-2">
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q13 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q13 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Did the rep establish a clear next step (e.g., meeting, demo,
              purchase)?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q14 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q14 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Was a follow-up action scheduled and confirmed during the
              conversation?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q15 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q15 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Was there a sense of urgency or encouragement for the customer to
              act?
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
