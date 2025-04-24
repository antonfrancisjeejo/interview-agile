/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from "react";
import { CheckCircle, CrossIcon } from "lucide-react";
import { getPercentage } from "@/utils/math";
import { getScoreColorClasses, getScoreIcon } from "./color";

export function ColdCalling({ data }: { data: any }) {
  return (
    <div
      className={`border rounded-md overflow-hidden ${getScoreColorClasses(
        getPercentage(data?.score, 30)
      )}`}
    >
      <div className="p-3 border-b bg-white/70 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getScoreIcon(getPercentage(data?.score, 30))}
            <h3 className="font-bold text-sm">Cold Call Introduction</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {getPercentage(data?.score, 30)}%
            </span>
          </div>
        </div>
        {/* <p className="mt-1.5 text-xs text-gray-700 dark:text-gray-300">
          Your introduction was clear, concise, and engaging.
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
                data?.questions.q1 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q1 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Did the sales rep establish a strong opening that immediately
              engaged the customer?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q2 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q1 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Did the rep introduce themselves and their company professionally?
            </span>
          </li>
          <li className="flex items-center space-x-2">
            <div
              className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                data?.questions.q3 ? "bg-green-500" : "bg-amber-400"
              }`}
            >
              {data?.questions.q1 ? (
                <CheckCircle className="w-3 h-3 text-white" />
              ) : (
                <CrossIcon className="w-3 h-3 text-white" />
              )}
            </div>
            <span className="text-xs">
              Was the value proposition communicated clearly within the first 30
              seconds?
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
}
