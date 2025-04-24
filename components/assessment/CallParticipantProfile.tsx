"use client";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

export function CallParticipantProfile() {
  const isMobile = useIsMobile();
  const personaBadges = [
    {
      text: "medium",
      colorClass:
        "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
    },
    {
      text: "Neutral",
      colorClass:
        "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
    },
  ];

  return (
    <div className="flex flex-col items-center my-1 sm:my-2">
      <div className="relative">
        <div className="absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 bg-green-400 rounded-full border-2 border-white dark:border-gray-800 animate-pulse"></div>
        <Avatar
          className={`${
            isMobile ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
          } mb-1.5 sm:mb-3 border-4 border-white dark:border-gray-700 shadow-xl ring-2 ring-blue-400/30`}
        >
          <AvatarImage
            src={
              "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&crop=faces&auto=format&fit=crop"
            }
            alt={"image"}
          />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm sm:text-lg">
            {"Satis Chaudahry".substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-medium text-blue-700 dark:text-blue-300">
        {"Name here"}
      </h3>
      <div className="flex flex-col gap-0.5 sm:gap-1.5 mt-1 sm:mt-2 items-center">
        {personaBadges.map((badge, index) => (
          <span
            key={index}
            className={`px-1.5 sm:px-2.5 py-0.5 ${badge.colorClass} text-[10px] sm:text-xs rounded-full font-medium`}
          >
            {badge.text}
          </span>
        ))}
      </div>
    </div>
  );
}
