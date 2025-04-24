
import { useState, useEffect } from "react";

export interface Message {
  sender: string;
  text: string;
  timestamp: string;
}

export interface CallState {
  duration: string;
  isActive: boolean;
  showTranscript: boolean;
  messages: Message[];
  isOnMute?: boolean;
  isVideoOn?: boolean;
  speakingParticipant?: "user" | "persona" | null;
}

export interface CallStateOptions {
  initialDuration?: string;
  initialMessages?: Message[];
}

export function useCallState(personaName: string, options: CallStateOptions = {}) {
  const [callState, setCallState] = useState<CallState>({
    duration: options.initialDuration || "00:00",
    isActive: true,
    showTranscript: false,
    isOnMute: false,
    isVideoOn: false,
    speakingParticipant: null,
    messages: options.initialMessages || [
      {
        sender: personaName,
        text: "Hello there! I understand you're interested in our products. What specific features are you looking for?",
        timestamp: "00:05"
      },
      {
        sender: "You",
        text: "Hi! Yes, I'm particularly interested in understanding the durability of your products. Our clients need something that can withstand harsh conditions.",
        timestamp: "00:18"
      },
      {
        sender: personaName,
        text: "That's a great question. Our products are designed to operate in extreme environments. They've been tested in temperatures ranging from -40°C to +60°C and are water and dust resistant with an IP68 rating.",
        timestamp: "00:32"
      }
    ]
  });

  // Simulate speaking animation
  useEffect(() => {
    if (!callState.isActive) return;
    
    // Simulation of speaking turns
    const speakingInterval = setInterval(() => {
      setCallState(prev => ({
        ...prev,
        speakingParticipant: prev.speakingParticipant === "persona" 
          ? "user" 
          : prev.speakingParticipant === "user" 
            ? null
            : "persona"
      }));
    }, 3000);
    
    return () => clearInterval(speakingInterval);
  }, [callState.isActive]);

  const toggleTranscript = () => {
    setCallState(prev => ({
      ...prev,
      showTranscript: !prev.showTranscript
    }));
  };

  const endCall = () => {
    setCallState(prev => ({
      ...prev,
      isActive: false,
      speakingParticipant: null
    }));
  };

  const toggleMute = () => {
    setCallState(prev => ({
      ...prev,
      isOnMute: !prev.isOnMute,
      // If user mutes, they're not speaking
      speakingParticipant: prev.isOnMute === true ? 
        (prev.speakingParticipant === "user" ? null : prev.speakingParticipant) : 
        prev.speakingParticipant
    }));
  };

  const toggleVideo = () => {
    setCallState(prev => ({
      ...prev,
      isVideoOn: !prev.isVideoOn
    }));
  };

  const addMessage = (message: Message) => {
    // When a new message is added, the sender becomes the speaker
    const speakingParticipant = message.sender === personaName ? "persona" : "user";
    
    setCallState(prev => ({
      ...prev,
      messages: [...prev.messages, message],
      speakingParticipant
    }));
  };

  return {
    callState,
    toggleTranscript,
    endCall,
    toggleMute,
    toggleVideo,
    addMessage
  };
}
