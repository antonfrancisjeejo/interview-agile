"use client";
import React, { useEffect } from "react";
import { AgentState, useVoiceAssistant } from "@livekit/components-react";
import { CallParticipantProfile } from "./CallParticipantProfile";
import { CallVisualization } from "./CallVisualization";
import { useIsMobile } from "@/hooks/use-mobile";

interface User {
  name: string;
  role: string;
  organization: string;
  image: string;
}

interface CallContentProps {
  user: User;
  speakingParticipant?: "user" | "persona" | null;
  setAgentState: (state: AgentState) => void;
  agentState: AgentState;
  name: string;
  mood: string;
  level: string;
  image: string;
}

export function CallContent({
  user,
  setAgentState,
  agentState,
  name,
  mood,
  level,
  image,
}: CallContentProps) {
  const { state } = useVoiceAssistant();
  const isMobile = useIsMobile();

  // const participants = useParticipants(); // Get participant object
  // const isUserSpeaking = useIsSpeaking(participants[0]);
  // const isAiSpeaking = useIsSpeaking(
  //   participants.length > 1 ? participants[1] : participants[0]
  // );
  const userData = JSON.parse(localStorage.getItem("prd_user") || "{}");
  // const { userData } = useAuth();

  useEffect(() => {
    setAgentState(state);
  }, [state, setAgentState]);

  // Create the persona badges
  // const personaBadges = [
  //   {
  //     text: persona.difficulty,
  //     colorClass:
  //       "bg-purple-100 dark:bg-purple-900/40 text-purple-700 dark:text-purple-300",
  //   },
  //   {
  //     text: persona.mood,
  //     colorClass:
  //       "bg-amber-100 dark:bg-amber-900/40 text-amber-700 dark:text-amber-300",
  //   },
  // ];

  // // Create the user badges
  // const userBadges = [
  //   {
  //     text: user.organization,
  //     colorClass:
  //       "bg-blue-100 dark:bg-blue-900/40 text-blue-700 dark:text-blue-300",
  //   },
  //   {
  //     text: user.role,
  //     colorClass:
  //       "bg-green-100 dark:bg-green-900/40 text-green-700 dark:text-green-300",
  //   },
  // ];

  return (
    <div className="flex justify-center items-center gap-8 py-4">
      {/* Persona Profile */}
      <CallParticipantProfile
        name={name}
        image={image}
        isSpeaking={agentState === "speaking"}
        isAi={true}
        mood={mood}
        level={level}
      />

      {/* Call visualization */}
      <div className="w-48">
        <CallVisualization speakingParticipant={state !== "disconnected"} />
      </div>

      {/* User Profile */}
      <CallParticipantProfile
        name={`${userData.firstName ?? ""} ${userData.lastName ?? ""}`}
        image={user.image}
        isSpeaking={agentState === "listening"}
        isAi={false}
        isUser={true}
      />
    </div>
  );
}
