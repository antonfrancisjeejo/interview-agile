/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { getAnalyticsPrompt } from "./promptApi";
import { PromptState } from "./types";

const initialState: PromptState = {
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
  prompts: "",
};

const PromptSlice = createSlice({
  name: "PromptSlice",

  initialState,
  reducers: {},
  extraReducers: (builder) => {
    //GET ALL ASSESSMENT  START FROM HERE--->
    builder.addCase(getAnalyticsPrompt.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getAnalyticsPrompt.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.prompts = payload?.data?.prompt;
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getAnalyticsPrompt.rejected, (state) => {
      state.loading.get = false;
    });
    //GET ALL ASSESSMENT END FROM HERE --->
  },
});

// export const {} = PromptSlice.actions;

export default PromptSlice.reducer;
