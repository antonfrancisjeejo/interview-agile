"use client";

import { cn } from "@/lib/utils";
import InterviewParticipant from "./InterviewParticipant";

interface InterviewSidebarProps {
  className?: string;
  participants: Array<{
    id: string;
    name: string;
    role: string;
    avatar?: string;
  }>;
}

const InterviewSidebar = ({
  className,
  participants,
}: InterviewSidebarProps) => {
  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-lg font-semibold">Participants</h3>
      <div className="space-y-2">
        {participants.map((participant) => (
          <InterviewParticipant
            key={participant.id}
            name={participant.name}
            role={participant.role}
          />
        ))}
      </div>
    </div>
  );
};

export default InterviewSidebar;
