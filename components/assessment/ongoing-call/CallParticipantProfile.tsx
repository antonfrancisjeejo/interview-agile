import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";

interface ParticipantProfileProps {
  name: string;
  image: string;
  isSpeaking?: boolean;
  isAi?: boolean;
  mood?: string;
  level?: string;
  isUser?: boolean;
}

export function CallParticipantProfile({
  name,
  image,
  isSpeaking = false,
  isAi = false,
  mood,
  level,
  isUser,
}: ParticipantProfileProps) {
  const isMobile = useIsMobile();

  return (
    <div className="flex flex-col items-center my-1 sm:my-2">
      <div className={`relative ${isSpeaking ? "speaking-animation" : ""}`}>
        <div
          className={`absolute -top-1 sm:-top-2 -right-1 sm:-right-2 w-3 sm:w-4 h-3 sm:h-4 ${
            isSpeaking ? "bg-green-500" : "bg-green-400"
          } rounded-full border-2 border-white dark:border-gray-800 ${
            isSpeaking ? "animate-ping" : "animate-pulse"
          }`}
        ></div>
        <Avatar
          className={`${
            isMobile ? "h-12 w-12" : "h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24"
          } mb-1.5 sm:mb-3 border-4 ${
            isSpeaking
              ? "border-blue-300 dark:border-blue-600"
              : "border-white dark:border-gray-700"
          } shadow-xl ${
            isSpeaking ? "ring-4 ring-blue-400/50" : "ring-2 ring-blue-400/30"
          } transition-all duration-300`}
        >
          <AvatarImage src={image} alt={name} className="object-cover" />
          <AvatarFallback className="bg-gradient-to-br from-blue-400 to-purple-500 text-white text-sm sm:text-lg">
            {name.substring(0, 2)}
          </AvatarFallback>
        </Avatar>
      </div>
      <h3
        className={`text-sm sm:text-base md:text-lg font-medium ${
          isSpeaking
            ? "text-blue-600 dark:text-blue-300"
            : "text-blue-700 dark:text-blue-300"
        } transition-colors duration-300`}
      >
        {name}
      </h3>
      <div className="flex  gap-0.5 sm:gap-1.5 mt-1 sm:mt-2 items-center">
        {/* {isAi && mood && (
          <span className="px-1.5 sm:px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] sm:text-xs rounded-full font-medium">
            {level}
          </span>
        )} */}

        {isAi && level && (
          <span className="px-1.5 sm:px-2.5 py-0.5 bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300 text-[10px] sm:text-xs rounded-full font-medium">
            {mood}
            {/* {getFormatedMood(mood)} */}
          </span>
        )}
        {isUser && (
          <span className="px-1.5 sm:px-2.5 py-0.5 bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300 text-[10px] sm:text-xs rounded-full font-medium">
            Sales Representative
          </span>
        )}
      </div>
    </div>
  );
}
