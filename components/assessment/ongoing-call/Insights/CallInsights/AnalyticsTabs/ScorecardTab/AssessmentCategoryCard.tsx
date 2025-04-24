"use client";
import React from "react";
import { CheckCircle, AlertCircle, AlertTriangle, XCircle } from "lucide-react";

export function AssessmentCategoryCard({
  title,
  score,
  description,
  criteria,
}: {
  title: string;
  score: number;
  description: string;
  criteria: { text: string; completed: boolean }[];
}) {
  // Helper function to determine color class based on score
  const getScoreColorClasses = (score: number) => {
    if (score >= 95)
      return "border-green-300 bg-green-50 dark:bg-green-950/40 dark:border-green-800/60";
    if (score >= 85)
      return "border-blue-300 bg-blue-50 dark:bg-blue-950/40 dark:border-blue-800/60";
    if (score >= 75)
      return "border-amber-300 bg-amber-50 dark:bg-amber-950/40 dark:border-amber-800/60";
    return "border-red-300 bg-red-50 dark:bg-red-950/40 dark:border-red-800/60";
  };

  // Helper function to get the appropriate icon
  const getScoreIcon = (score: number) => {
    if (score >= 95)
      return (
        <CheckCircle className="w-5 h-5 text-green-600 dark:text-green-400" />
      );
    if (score >= 85)
      return (
        <AlertCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
      );
    if (score >= 75)
      return (
        <AlertTriangle className="w-5 h-5 text-amber-600 dark:text-amber-400" />
      );
    return <XCircle className="w-5 h-5 text-red-600 dark:text-red-400" />;
  };

  return (
    <div
      className={`border rounded-md overflow-hidden ${getScoreColorClasses(
        score
      )}`}
    >
      <div className="p-3 border-b bg-white/70 dark:bg-black/20">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {getScoreIcon(score)}
            <h3 className="font-bold text-sm">{title}</h3>
          </div>
          <div className="flex items-center">
            <span className="text-sm font-bold px-2 py-1 rounded-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700">
              {score}%
            </span>
          </div>
        </div>
        <p className="mt-1.5 text-xs text-gray-700 dark:text-gray-300">
          {description}
        </p>
      </div>

      <div className="p-3">
        <h4 className="text-xs font-semibold mb-2 text-gray-800 dark:text-gray-200">
          Assessment Criteria
        </h4>
        <ul className="space-y-2">
          {criteria.map((criterion, criterionIndex) => (
            <li key={criterionIndex} className="flex items-center space-x-2">
              <div
                className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${
                  criterion.completed ? "bg-green-500" : "bg-amber-400"
                }`}
              >
                {criterion.completed && (
                  <CheckCircle className="w-3 h-3 text-white" />
                )}
              </div>
              <span className="text-xs">{criterion.text}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
