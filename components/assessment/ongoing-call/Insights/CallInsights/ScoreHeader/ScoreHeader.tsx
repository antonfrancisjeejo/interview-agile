
'use client'
import React from "react";
import { Card } from "@/components/ui/card";
import CircularProgress from "../AnalyticsTabs/ScorecardTab/CircularProgress";

interface ScoreHeaderProps {
  score: string | number;
}

export function ScoreHeader({ score }: ScoreHeaderProps) {
  const numericScore = typeof score === "string" ? parseInt(score.replace("%", "")) : score;
  
  // Determine color based on score
  const getScoreColor = () => {
    if (numericScore >= 90) return "text-green-600 dark:text-green-400";
    if (numericScore >= 80) return "text-blue-600 dark:text-blue-400";
    if (numericScore >= 70) return "text-amber-600 dark:text-amber-400";
    return "text-red-600 dark:text-red-400";
  };

  const getBgColor = () => {
    if (numericScore >= 90) return "bg-green-50 dark:bg-green-950/30";
    if (numericScore >= 80) return "bg-blue-50 dark:bg-blue-950/30";
    if (numericScore >= 70) return "bg-amber-50 dark:bg-amber-950/30";
    return "bg-red-50 dark:bg-red-950/30";
  };

  const getBorderColor = () => {
    if (numericScore >= 90) return "border-green-200 dark:border-green-900/50";
    if (numericScore >= 80) return "border-blue-200 dark:border-blue-900/50";
    if (numericScore >= 70) return "border-amber-200 dark:border-amber-900/50";
    return "border-red-200 dark:border-red-900/50";
  };

  // Score breakdown data
  const scoreBreakdown = [
    { category: "Pitch Clarity", score: 92 },
    { category: "Question Quality", score: 88 },
    { category: "Objection Handling", score: 96 },
    { category: "Closing Technique", score: 86 }
  ];

  return (
    <div className="flex flex-col gap-3">
      {/* Header with overall score */}
      <div className="flex items-center gap-3">
        {/* <div className="relative w-14 h-14 flex-shrink-0">
          <CircularProgress 
            value={numericScore}
            maxValue={100}
            size="sm"
            strokeWidth={8}
            valueColor={numericScore >= 90 ? "#22c55e" : numericScore >= 80 ? "#3b82f6" : numericScore >= 70 ? "#f59e0b" : "#ef4444"}
            trailColor="#e5e7eb"
          >
            <span className={`text-sm font-bold ${getScoreColor()}`}>
              {typeof score === "string" ? score : `${score}%`}
            </span>
          </CircularProgress>
        </div> */}
            <CircularProgress percentage={10}/>
        <div>
          <h3 className="text-sm font-bold text-gray-900 dark:text-gray-100">Overall Performance</h3>
          <p className="text-xs text-gray-600 dark:text-gray-400">Call scoring assessment</p>
        </div>
      </div>
      
      {/* Score breakdown grid */}
      <div className="grid grid-cols-4 gap-2">
        {scoreBreakdown.map((item, index) => (
          <Card key={index} className={`px-3 py-2 ${getBgColor()} border ${getBorderColor()} transition-all duration-200 hover:shadow-md`}>
            <div className="text-center">
              <p className="text-xs text-gray-600 dark:text-gray-400 mb-1">{item.category}</p>
              <p className={`text-sm font-bold ${getScoreColor()}`}>{item.score}%</p>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
