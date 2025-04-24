/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import { Track } from "livekit-client";
import {
  useLocalParticipant,
  useParticipantTracks,
  useTrackTranscription,
} from "@livekit/components-react";

const useUserVoiceAgent = () => {
  // Get the local participant
  const agent = useLocalParticipant().localParticipant;

  // If the agent is null or undefined, return an empty transcription array or a default value
  if (!agent) {
    return { userTranscriptions: [] };
  }

  // Find the audio track for the local participant
  const audioTrack = useParticipantTracks(
    [Track.Source.Microphone],
    agent?.identity
  )[0];

  // Get transcription from the audio track
  const { segments: userTranscriptions = [] } =
    useTrackTranscription(audioTrack) || {};

  // Return the transcription or an empty array if not available
  return {
    userTranscriptions,
  };
};

export default useUserVoiceAgent;
