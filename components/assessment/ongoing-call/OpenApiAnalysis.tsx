/* eslint-disable react/display-name */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { systemResponsePrompt } from "@/utils/prompt";
import { useEffect, useRef, forwardRef, useImperativeHandle } from "react";
import { addAnalyticsDetailsToDB } from "@/store/services/analytics/analyticsApi";
import Insights from "./Insights/Insights";
import { getAnalyticsPrompt } from "@/store/services/prompt/promptApi";
import { RootState, useAppDispatch, useAppSelector } from "@/store/store";
import { PromptState } from "@/store/services/prompt/types";
import {
  setAnalysisLoading,
  setAnalysisSuccess,
  setAnalyticsdata,
  setTranscription,
  setAnalyticsWpm,
} from "@/store/services/analytics/analyticsSlice";
import { AnalyticsState } from "@/store/services/analytics/types";
import { useAgent } from "@/hooks/use-agent";
import { calculateWPM } from "@/utils/math";
import { ANALYTICS_ERROR } from "@/utils/constant";
import { useParams } from "next/navigation";
import { useConnectionState, useRoomContext } from "@livekit/components-react";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

type OpenApiAnalysisProps = {
  iscallEnd: boolean;
  roomName: string;
  setError: (error: any) => void;
  error: string;
  updateActualRoomName: (roomName: string) => void;
  interviewId: string;
};

export type OpenApiAnalysisRef = {
  summarize: () => void;
};

const OpenApiAnalysis = forwardRef<OpenApiAnalysisRef, OpenApiAnalysisProps>(
  (
    { iscallEnd, roomName, setError, error, updateActualRoomName, interviewId },
    ref
  ) => {
    const { displayTranscriptions } = useAgent();
    const insightRef = useRef(null);
    const dispatch = useAppDispatch();
    const supabase = createClientComponentClient();

    const transformTranscriptions = (transcriptions: any[]) => {
      return transcriptions.map(({ segment, participant }) => ({
        segment,
        participant: {
          isAgent: participant?.isAgent,
        },
      }));
    };

    const storeTranscriptionsInDB = async (transcriptions: any[]) => {
      try {
        const formattedData = transcriptions.map(
          ({ segment, participant }) => ({
            segment_id: segment.id,
            segment_text: segment.text,
            start_time: segment.startTime,
            end_time: segment.endTime,
            is_final: segment.final,
            language: segment.language,
            first_received_time: segment.firstReceivedTime,
            last_received_time: segment.lastReceivedTime,
            is_agent: participant.isAgent,
            updated_at: new Date().toISOString(),
          })
        );

        const { data, error } = await supabase
          .from("interviews")
          .update({ transcriptions: formattedData })
          .eq("id", interviewId);
        console.log("formattedData", formattedData);
        console.log("data", data);
        console.log("error", error);
        console.log("interviewId", interviewId);

        if (error) throw error;
      } catch (error) {
        console.error("Error storing transcriptions:", error);
      }
    };

    const { prompts }: PromptState = useAppSelector((store: RootState) => {
      return store.PromptSlice;
    });
    const { id } = useParams();
    const {
      req_success,
      calltime,
      persona,
      userCallTime,
      longestMonologue,
      audioLink,
    }: AnalyticsState = useAppSelector((store: RootState) => {
      return store.AnalyticsSlice;
    });

    useEffect(() => {
      if (id) {
        dispatch(getAnalyticsPrompt(Number(id)));
      }
    }, [id]);

    const room = useRoomContext();
    const connectionState = useConnectionState();

    useEffect(() => {
      if (connectionState === "connected") {
        updateActualRoomName(room.name);
      }
    }, [connectionState, room]);

    useEffect(() => {
      if (iscallEnd) {
        const transformedData = transformTranscriptions(displayTranscriptions);
        dispatch(setTranscription(transformedData));
        storeTranscriptionsInDB(displayTranscriptions);
      }
    }, [iscallEnd]);

    useEffect(() => {
      if (displayTranscriptions && displayTranscriptions.length > 0) {
        const transformedData = transformTranscriptions(displayTranscriptions);
        dispatch(setTranscription(transformedData));
        storeTranscriptionsInDB(displayTranscriptions);
      }
    }, [displayTranscriptions, dispatch]);

    const handleSummarize = async () => {
      setError(null);
      console.log("audioLink from summarize", audioLink);
      const conversation = displayTranscriptions.map((item: any) => ({
        role:
          item.participant.metadata === "human" ? "Interviewee" : "Interviewer",
        text: item.segment.text,
      }));
      const humanConversation = displayTranscriptions
        .filter((item: any) => item.participant.isLocal)
        .map((item: any) => item.segment.text)
        .join(" ");

      const wpm = await calculateWPM(humanConversation, userCallTime);
      if (wpm) {
        dispatch(setAnalyticsWpm(wpm));
      }
      if (!conversation || !conversation.length) {
        return;
      }
      if (!prompts) {
        setError(ANALYTICS_ERROR);
        return;
      }
      dispatch(setAnalysisLoading(true));
      try {
        const systemPrompt = `${prompts} ${systemResponsePrompt}`;
        const res = await fetch("/api/analytics", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ conversation, systemPrompt }),
        });

        if (!res.ok) {
          setError(ANALYTICS_ERROR);
          return;
        }

        let data;
        try {
          data = await res.json();
        } catch {
          setError(ANALYTICS_ERROR);
          return;
        }

        if (typeof data?.summary !== "string" || !data?.summary) {
          setError(ANALYTICS_ERROR);
          return;
        }

        dispatch(setAnalysisLoading(false));
        dispatch(setAnalysisSuccess(true));
        if (!error) {
          dispatch(setAnalyticsdata(JSON.parse(data.summary)));
          const details = {
            callTime: calltime,
            wpm,
            longestMonologue,
            userCallTime,
          };
          const conversationData: any = {
            conversationData: displayTranscriptions,
            analyticsData: { ...details, ...JSON.parse(data.summary) },
            roomData: roomName,
            promptId: Number(persona.id),
            audioLink,
          };
          dispatch(addAnalyticsDetailsToDB({ data: conversationData }));
        }
      } catch (error: any) {
        dispatch(setAnalysisLoading(false));
        dispatch(setAnalysisSuccess(false));
        setError(ANALYTICS_ERROR);
      }
    };

    useEffect(() => {
      if (iscallEnd) {
        handleSummarize();
      }
    }, [iscallEnd]);

    // ✅ Exposing `handleSummarize` to the parent
    useImperativeHandle(ref, () => ({
      summarize: handleSummarize,
    }));

    return <div>{req_success.get && <Insights insightRef={insightRef} />}</div>;
  }
);

export default OpenApiAnalysis;
