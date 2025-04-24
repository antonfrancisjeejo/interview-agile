"use client";
import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";

export function CallVisualization() {
  const isMobile = useIsMobile();

  const size = isMobile
    ? {
        outer: "w-16 h-16",
        middle: "w-10 h-10",
        inner: "w-5 h-5",
      }
    : {
        outer: "w-24 h-24",
        middle: "w-16 h-16",
        inner: "w-8 h-8",
      };

  return (
    <div className="h-20 sm:h-40 flex items-center justify-center my-2 sm:my-0">
      <div
        className={`${size.outer} rounded-full bg-gradient-to-br from-blue-400/20 to-purple-400/20 dark:from-blue-500/10 dark:to-purple-500/10 flex items-center justify-center`}
      >
        <div
          className={`${size.middle} rounded-full bg-gradient-to-br from-blue-400/40 to-purple-400/40 dark:from-blue-500/20 dark:to-purple-500/20 flex items-center justify-center`}
        >
          <div
            className={`${size.inner} rounded-full bg-gradient-to-br from-blue-400/60 to-purple-400/60 dark:from-blue-500/30 dark:to-purple-500/30`}
          ></div>
        </div>
      </div>
    </div>
  );
}
