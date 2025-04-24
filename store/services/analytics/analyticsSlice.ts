/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AnalyticsState } from "./types";
import { getAnalyticsDetailsById, getPersonaById } from "./analyticsApi";

const initialState: AnalyticsState = {
  loading: {
    get: false,
    add: false,
    update: false,
    delete: false,
  },
  req_success: {
    get: false,
    add: false,
    update: false,
    delete: false,
  },
  persona: { id: 0, name: "" },
  data: "",
  transcription: [],
  calltime: 0,
  wpm: 0,
  userCallTime: 0,
  longestMonologue: 0,
  audioLink: "",
  createdAt: "",
};

const AnalyticsSlice = createSlice({
  name: "AnalyticsSlice",

  initialState,
  reducers: {
    setAnalyticsdata: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
    setTranscription: (state, action: PayloadAction<any>) => {
      state.transcription = action.payload;
    },
    setAnalysisCallTime: (state, action: PayloadAction<any>) => {
      state.calltime = action.payload;
    },
    setAnalysisLoading: (state, action: PayloadAction<any>) => {
      state.loading.get = action.payload;
    },
    setAnalysisSuccess: (state, action: PayloadAction<any>) => {
      state.req_success.get = action.payload;
    },
    setPersona: (state, action: PayloadAction<any>) => {
      state.persona = action.payload;
    },
    setAnalyticsUserCallTime: (state, action: PayloadAction<any>) => {
      state.userCallTime = action.payload;
    },
    setAnalyticsWpm: (state, action: PayloadAction<any>) => {
      state.wpm = action.payload;
    },
    setAnalyticsLongestMonologue: (state, action: PayloadAction<any>) => {
      state.longestMonologue = action.payload;
    },
    setAnalyticsAudioLink: (state, action: PayloadAction<any>) => {
      state.audioLink = action.payload;
    },
    resetAllAnalytics: (state) => {
      state.loading = {
        get: false,
        add: false,
        update: false,
        delete: false,
      };
      state.req_success = {
        get: false,
        add: false,
        update: false,
        delete: false,
      };
      state.persona = { id: 0, name: "" };
      state.data = "";
      state.transcription = [];
      state.calltime = 0;
      state.wpm = 0;
      state.userCallTime = 0;
      state.longestMonologue = 0;
      state.audioLink = "";
      state.createdAt = "";
    },
  },
  extraReducers: (builder) => {
    //GET ALL RECENT CHAT HISTORY START FROM HERE--->
    builder.addCase(getAnalyticsDetailsById.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getAnalyticsDetailsById.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.data = payload?.chat?.analyticsData;
        state.transcription = payload?.chat?.conversationData;
        state.wpm = payload.chat?.analyticsData?.wpm;
        state.longestMonologue = payload.chat?.analyticsData?.longestMonologue;
        state.calltime = payload.chat?.analyticsData?.callTime;
        state.createdAt = payload.chat?.createdAt;
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getAnalyticsDetailsById.rejected, (state) => {
      state.loading.get = false;
    });
    //GET ALL  RECENT CHAT HISTORY  END FROM HERE --->

    //GET ALL RECENT CHAT HISTORY START FROM HERE--->
    builder.addCase(getPersonaById.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getPersonaById.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.persona = payload;
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getPersonaById.rejected, (state) => {
      state.loading.get = false;
    });
    //GET ALL  RECENT CHAT HISTORY  END FROM HERE --->
  },
});

export const {
  setAnalyticsdata,
  setTranscription,
  setAnalysisCallTime,
  setAnalysisLoading,
  setAnalysisSuccess,
  setPersona,
  resetAllAnalytics,
  setAnalyticsWpm,
  setAnalyticsLongestMonologue,
  setAnalyticsUserCallTime,
  setAnalyticsAudioLink,
} = AnalyticsSlice.actions;

export default AnalyticsSlice.reducer;
