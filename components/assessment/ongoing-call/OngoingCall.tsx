/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import "@livekit/components-styles";
import {
  AgentState,
  LiveKitRoom,
  RoomAudioRenderer,
} from "@livekit/components-react";

import { MediaDeviceFailure } from "livekit-client";
import { CallHeader } from "./CallHeader";
import { CallContent } from "./CallContent";
import { CallActions } from "./CallActions";

import { useCallState } from "@/hooks/useCallState";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import { ConnectionDetails } from "@/app/api/connection-details/route";
import { CallAudioWaveform } from "./CallAudioWaveForm";
import OpenApiAnalysis from "./OpenApiAnalysis";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import {
  resetAllAnalytics,
  setAnalysisCallTime,
  setAnalyticsAudioLink,
  setAnalyticsLongestMonologue,
  setAnalyticsUserCallTime,
  setPersona,
} from "@/store/services/analytics/analyticsSlice";
import { AgentProvider } from "@/hooks/use-agent";
import { LoadingAnalytics } from "./LoadingAnalytics";
import { AnalyticsState } from "@/store/services/analytics/types";

interface User {
  name: string;
  role: string;
  organization: string;
  image: string;
}

interface OngoingCallProps {
  persona: any;
  user: User;
  onShowTranscript?: () => void;
}

type SummarizeRef = {
  summarize: () => void;
} | null;

export function OngoingCall({
  persona,
  user,
  onShowTranscript,
}: OngoingCallProps) {
  const { callState, toggleTranscript, toggleMute } = useCallState(
    persona.name
  );

  const { req_success }: AnalyticsState = useAppSelector((store: RootState) => {
    return store.AnalyticsSlice;
  });

  // const isMobile = useIsMobile();
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const router = useRouter();

  // const { id } = router.query; //

  // console.log("id", router);

  const searchParams = useSearchParams();
  const level = searchParams.get("level") ?? "medium";
  const name = searchParams.get("name") ?? "Dojo AI";
  const mood = searchParams.get("mood") ?? "Neutral";
  const image = searchParams.get("image") ?? "";
  const personaId = searchParams.get("id") ?? "0";

  const [callTime, setCallTime] = useState(0);
  const [userCallTime, setUserCallTime] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [iscallEnd, setIsCallEnd] = useState(false);
  const [error, setError] = useState<any>(null);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const userTimerRef = useRef<NodeJS.Timeout | null>(null);
  const ringtoneRef = useRef<HTMLAudioElement | null>(null);
  const summarizeFunctionRef = useRef<SummarizeRef>(null); // Explicit type

  const [longestMonologue, setLongestMonologue] = useState<any>(0);
  const monologueStartRef = useRef<any>(null);
  const [connectionDetails, updateConnectionDetails] = useState<
    ConnectionDetails | undefined
  >(undefined);
  const [roomName, updateRoomName] = useState<string>("");
  const [agentState, setAgentState] = useState<AgentState>("disconnected");
  const [actualRoomName, updateActualRoomName] = useState<string>("");

  const handleEndCall = async () => {
    if (callTime < 1) {
      router.push(`/dashboard`);
    }
    dispatch(setAnalysisCallTime(callTime));
    dispatch(setAnalyticsUserCallTime(userCallTime));
    dispatch(setAnalyticsLongestMonologue(longestMonologue));
    dispatch(setPersona({ id: personaId, name: name }));
    const audioLink =
      process.env.NEXT_PUBLIC_S3_URL +
      `/recordings/${actualRoomName}/${actualRoomName}_audio.m3u8`;
    dispatch(setAnalyticsAudioLink(audioLink));
    setIsCallActive(false);
    setIsCallEnd(true);
    if (timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }
  };

  const handleToggleTranscript = () => {
    toggleTranscript();
    if (onShowTranscript) {
      onShowTranscript();
    }
  };

  const handleToggleMute = () => {
    toggleMute();
  };
  const handleSummarize = () => {
    if (summarizeFunctionRef.current) {
      summarizeFunctionRef.current.summarize();
      dispatch(resetAllAnalytics());
    }
  };

  // const startRecording = useCallback(async () => {
  //   if (!roomName || !connectionDetails) return;

  //   try {
  //     const response = await fetch("/api/egress", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         action: "start",
  //         roomName,
  //       }),
  //     });

  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to start recording");
  //     }

  //     setRecordingId(data.recordingId);
  //     setIsRecording(true);
  //   } catch (error) {
  //     console.error("Failed to start recording:", error);
  //   }
  // }, [roomName, connectionDetails]);

  // const stopRecording = useCallback(async () => {
  //   try {
  //     const response = await fetch("/api/egress", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({
  //         action: "stop",
  //       }),
  //     });

  //     const data = await response.json();

  //     console.log("recording stopped data", data);

  //     if (!response.ok) {
  //       throw new Error(data.error || "Failed to stop recording");
  //     }

  //     // setRecordingId(null);

  //     return data.audioLink;
  //   } catch (error) {
  //     console.error("Failed to stop recording:", error);
  //   }
  // }, []);

  const onConnectButtonClicked = useCallback(async () => {
    setIsCallActive(true);
    const url = new URL(
      process.env.NEXT_PUBLIC_CONN_DETAILS_ENDPOINT ??
        "/api/connection-details",
      window.location.origin
    );

    // Add query parameters here
    url.searchParams.append("level", searchParams.get("id") || "0");
    url.searchParams.append("origin", window.location.origin);

    const response = await fetch(url.toString());
    const connectionDetailsData = await response.json();
    updateRoomName(connectionDetailsData.roomName);
    updateConnectionDetails(connectionDetailsData);
  }, [level]);

  // useEffect(() => {
  //   if (roomName && !isRecording) {
  //     startRecording();
  //   }
  // }, [roomName, connectionDetails]);

  useEffect(() => {
    if (id) {
      onConnectButtonClicked();
      dispatch(resetAllAnalytics());
    }
  }, [id]);

  useEffect(() => {
    if (!ringtoneRef.current) {
      ringtoneRef.current = new Audio("/ringtone.mp3");
      ringtoneRef.current.loop = true;
      ringtoneRef.current.volume = 0.1; // Set volume to 10%
    }

    if (
      (agentState === "connecting" || agentState === "initializing") &&
      !iscallEnd
    ) {
      ringtoneRef.current
        .play()
        .catch((error: any) => console.error("Error playing ringtone:", error));
    } else {
      ringtoneRef.current.pause();
      ringtoneRef.current.currentTime = 0;
    }

    return () => {
      if (ringtoneRef.current) {
        ringtoneRef.current.pause();
        ringtoneRef.current.currentTime = 0;
      }
    };
  }, [agentState, iscallEnd]);
  useEffect(() => {
    if (
      isCallActive &&
      agentState !== "connecting" &&
      agentState !== "initializing"
    ) {
      timerRef.current = setInterval(
        () => setCallTime((prev) => prev + 1),
        1000
      );
    } else if (!isCallActive && timerRef.current) {
      clearInterval(timerRef.current);
      timerRef.current = null;
    }

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
        timerRef.current = null;
      }
    };
  }, [isCallActive, agentState]);
  useEffect(() => {
    if (isCallActive && agentState === "listening") {
      // if (!isRecording) {
      //   startRecording();
      // }

      // Start of a new monologue
      if (!userTimerRef.current) {
        monologueStartRef.current = Date.now(); // Record start time
        userTimerRef.current = setInterval(
          () => setUserCallTime((prev) => prev + 1),
          1000
        );
      }
    } else {
      // End of current monologue
      if (userTimerRef.current) {
        clearInterval(userTimerRef.current);
        userTimerRef.current = null;

        // Calculate duration if we had a start time
        if (monologueStartRef.current) {
          const duration = Math.floor(
            (Date.now() - monologueStartRef.current) / 1000
          );
          setLongestMonologue((prev: any) => Math.max(prev, duration));
          monologueStartRef.current = null;
        }
      }
    }

    return () => {
      // Cleanup on unmount
      if (userTimerRef.current) {
        clearInterval(userTimerRef.current);
        userTimerRef.current = null;

        if (monologueStartRef.current) {
          const duration = Math.floor(
            (Date.now() - monologueStartRef.current) / 1000
          );
          setLongestMonologue((prev: any) => Math.max(prev, duration));
        }
      }
    };
  }, [isCallActive, agentState]);

  // Memoize the formatted time to avoid recalculating on every render
  // const formattedTime = useMemo(() => getFormattedTime(callTime), [callTime]);

  return (
    <LiveKitRoom
      token={connectionDetails?.participantToken}
      serverUrl={connectionDetails?.serverUrl}
      connect={connectionDetails !== undefined}
      audio={true}
      video={false}
      onMediaDeviceFailure={onDeviceFailure}
      onDisconnected={() => {
        updateConnectionDetails(undefined);
      }}
      className="h-full"
    >
      <div className="flex h-full">
        {/* Main Content Area */}
        <div className="flex-1 flex flex-col gap-4 p-4 overflow-auto">
          {!iscallEnd && (
            <div className="bg-gradient-to-br from-white to-blue-50 dark:from-gray-800 dark:to-gray-900 rounded-xl shadow-lg border border-blue-100 dark:border-blue-900/30 p-4 max-w-4xl mx-auto">
              <div className="flex flex-col gap-4">
                <CallHeader duration={"23"} agentState={agentState} />

                <CallContent
                  user={user}
                  speakingParticipant={callState.speakingParticipant}
                  setAgentState={setAgentState}
                  agentState={agentState}
                  name={name}
                  mood={mood}
                  image={image}
                  level={level}
                />

                <div className="flex flex-col gap-2">
                  <RoomAudioRenderer />
                  <CallAudioWaveform />
                </div>

                <CallActions
                  onEndCall={handleEndCall}
                  startCall={onConnectButtonClicked}
                  onToggleTranscript={handleToggleTranscript}
                  onToggleMute={handleToggleMute}
                  showTranscript={callState.showTranscript}
                  isOnMute={callState.isOnMute}
                />
              </div>
            </div>
          )}
          {iscallEnd && callTime > 1 && !req_success.get && (
            <LoadingAnalytics error={error} handleSummarize={handleSummarize} />
          )}

          <AgentProvider>
            <OpenApiAnalysis
              iscallEnd={iscallEnd}
              roomName={roomName}
              setError={setError}
              error={error}
              ref={summarizeFunctionRef}
              updateActualRoomName={updateActualRoomName}
            />
          </AgentProvider>
        </div>

        {/* Sidebar Area */}
        {callState.showTranscript && (
          <div className="w-80 border-l border-blue-100 dark:border-blue-900/30 bg-white dark:bg-gray-800 overflow-auto ml-4">
            {/* Add your transcript component here */}
          </div>
        )}
      </div>
    </LiveKitRoom>
  );
}

function onDeviceFailure(error?: MediaDeviceFailure) {
  console.error(error);
  alert(
    "Error acquiring camera or microphone permissions. Please make sure you grant the necessary permissions in your browser and reload the tab"
  );
}
