/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  TranscriptionSegment,
  Participant,
  TrackPublication,
} from "livekit-client";

interface Transcription {
  segment: TranscriptionSegment;
  participant?: Participant;
  publication?: TrackPublication;
}

export interface AnalyticsState {
  loading: {
    get: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
  };
  req_success: {
    get: boolean;
    add: boolean;
    update: boolean;
    delete: boolean;
  };

  persona: { id: number; name: string };
  data: any;
  transcription: Transcription[];
  calltime: number;
  wpm: number;
  userCallTime: number;
  longestMonologue: number;
  audioLink: string;
  createdAt: string;
}

interface Section {
  score: number;
  total_question_passed: number;
  questions: Record<string, boolean>;
}

interface AiCoachReview {
  final_suggestions: string[];
  what_could_be_improved: string[];
  what_was_done_well: string[];
}

export interface AnalyticsDataProps {
  final_score: number;
  first_impression_and_engagement: Section;
  identifying_customer_needs: Section;
  clarity_and_conversational_flow: Section;
  guiding_towards_a_decision: Section;
  securing_a_next_step: Section;
  ai_coach_review: AiCoachReview;
  customer_question_raised: number;
  sales_rep_question_raised: number;
  callTime: number;
  userCallTime: number;
}
