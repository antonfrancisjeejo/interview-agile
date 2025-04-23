"use client";

import { User } from "lucide-react";

interface InterviewParticipantProps {
  name: string;
  role: string;
}

const InterviewParticipant = ({ name, role }: InterviewParticipantProps) => {
  return (
    <div className="flex items-center gap-3">
      <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
        <User className="h-5 w-5 text-gray-500" />
      </div>
      <div>
        <p className="font-medium">{name}</p>
        <p className="text-sm text-gray-500">{role}</p>
      </div>
    </div>
  );
};

export default InterviewParticipant;
