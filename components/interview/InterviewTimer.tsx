"use client";

import { useEffect, useState } from "react";
import { Clock } from "lucide-react";

interface InterviewTimerProps {
  startTime?: Date;
}

const InterviewTimer = ({ startTime }: InterviewTimerProps) => {
  const [duration, setDuration] = useState<string>("00:00");

  useEffect(() => {
    if (!startTime) return;

    const interval = setInterval(() => {
      const now = new Date();
      const diff = now.getTime() - startTime.getTime();
      const minutes = Math.floor(diff / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      setDuration(
        `${minutes.toString().padStart(2, "0")}:${seconds
          .toString()
          .padStart(2, "0")}`
      );
    }, 1000);

    return () => clearInterval(interval);
  }, [startTime]);

  return (
    <div className="flex items-center gap-2 text-sm text-gray-500">
      <Clock className="h-4 w-4" />
      <span>{duration}</span>
    </div>
  );
};

export default InterviewTimer;
