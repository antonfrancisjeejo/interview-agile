import React, { memo } from "react";
import { Clock } from "lucide-react";
import { AgentState } from "@livekit/components-react";

interface CallHeaderProps {
  duration: string;
  agentState: AgentState;
}

export const CallHeader = memo(({ duration, agentState }: CallHeaderProps) => {
  return (
    <div className="flex items-center justify-between border-b pb-2">
      <div className="flex flex-col">
        <h2 className="text-base font-semibold text-blue-900 dark:text-blue-100">
          {agentState === "connecting" || agentState === "initializing"
            ? "Connecting..."
            : agentState === "disconnected"
            ? "Call Ended"
            : "Ongoing Call"}
        </h2>
        <div className="flex items-center gap-2 mt-0.5 text-sm text-blue-600 dark:text-blue-300">
          <Clock className="h-3.5 w-3.5" />
          <span>{duration}</span>
        </div>
      </div>
    </div>
  );
});

CallHeader.displayName = "CallHeader";
