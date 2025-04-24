/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { CheckCircle, CrossIcon } from "lucide-react";
import { getScoreColorClasses, getScoreIcon } from "./color";
import { getPercentage } from "@/utils/math";

export function ClosingQuestion({ data }: { data: any }) {
  return (
    <div
      className={`border rounded-md overflow-hidden ${getScoreColorClasses(
        getPercentage(data?.score, 20)
      )}`}
    >
      <div className="p-3 border-b bg-white/70 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getScoreIcon(getPercentage(data?.score, 20))}
            <h3 className="font-bold text-sm">Assumptive Closing Questions</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {getPercentage(data?.score, 20)}%
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
                data?.questions.q10 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q10 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Did the rep use persuasive techniques to move the conversation
              forward?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q11 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q11 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Were closing strategies (e.g., assumptive closes, trial closes)
              used effectively?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q12 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q12 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Did the rep handle objections smoothly and with confidence?
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
