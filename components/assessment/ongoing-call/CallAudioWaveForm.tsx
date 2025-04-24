import React from "react";
import { useIsMobile } from "@/hooks/use-mobile";
import { useCallState } from "@/hooks/useCallState";

export function CallAudioWaveform() {
  const isMobile = useIsMobile();
  const barCount = isMobile ? 20 : 40;

  // Get the current speaking participant from the call state
  const { callState } = useCallState("");
  const isSpeaking = !!callState.speakingParticipant;
  // const isSpeaking = false;

  return (
    <div className="flex justify-center items-end gap-1 sm:gap-1.5 h-16 sm:h-20 md:h-24 mb-8 sm:mb-12 md:mb-16 bg-blue-50/50 dark:bg-blue-900/10 rounded-lg p-2 sm:p-4">
      {Array.from({ length: barCount }).map((_, index) => {
        // Create a more dynamic and interesting waveform pattern
        // Make it more active when someone is speaking
        const animationMultiplier = isSpeaking ? 1.5 : 1;
        const height =
          (20 +
            Math.sin(index * 0.5) * 15 +
            Math.cos(index * 0.3) * 20 +
            Math.random() * 25) *
          (isSpeaking ? animationMultiplier : 1);

        // More bars are active when someone is speaking
        const isActive = isSpeaking ? index % 3 === 0 : index % 4 === 0;

        // When someone is speaking, use their associated color
        let barColor = isActive
          ? "bg-gradient-to-t from-blue-400 to-blue-600 dark:from-blue-500 dark:to-blue-700"
          : "bg-gradient-to-t from-gray-300 to-gray-400 dark:from-gray-600 dark:to-gray-700";

        if (callState.speakingParticipant === "persona" && isActive) {
          barColor =
            "bg-gradient-to-t from-purple-400 to-purple-600 dark:from-purple-500 dark:to-purple-700";
        } else if (callState.speakingParticipant === "user" && isActive) {
          barColor =
            "bg-gradient-to-t from-green-400 to-green-600 dark:from-green-500 dark:to-green-700";
        }

        return (
          <div
            key={index}
            className={`w-1 sm:w-1.5 rounded-full ${barColor} ${
              isSpeaking ? "animate-pulse" : ""
            }`}
            style={{
              height: `${height}%`,
              animationDuration: `${0.8 + Math.random() * 1.2}s`,
            }}
          ></div>
        );
      })}
    </div>
  );
}
