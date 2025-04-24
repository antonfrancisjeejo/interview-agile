/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { DashboardStateProps } from "./types";
import { getCallLogWithUserId, getRecentChatHistory } from "./dashboardApi";

const initialState: DashboardStateProps = {
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
  chatHistory: [],
  recentHistory: null,
};

const DashboardSlice = createSlice({
  name: "DashboardSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ALL RECENT CHAT HISTORY START FROM HERE--->
    builder.addCase(getRecentChatHistory.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getRecentChatHistory.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.chatHistory = payload;
        state.recentHistory = payload[0];
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getRecentChatHistory.rejected, (state) => {
      state.loading.get = false;
    });
    //GET ALL  RECENT CHAT HISTORY  END FROM HERE --->

    //GET ALL RECENT CHAT HISTORY START FROM HERE--->
    builder.addCase(getCallLogWithUserId.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getCallLogWithUserId.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.chatHistory = payload;
        state.recentHistory = payload[0];
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getCallLogWithUserId.rejected, (state) => {
      state.loading.get = false;
    });
    //GET ALL  RECENT CHAT HISTORY  END FROM HERE --->
  },
});

export const {} = DashboardSlice.actions;

export default DashboardSlice.reducer;
