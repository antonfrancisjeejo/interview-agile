/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

import { addTeam, getAllTeams, deleteTeam, updateTeam } from "./teamApi";
import { TeamState } from "./types";

const initialState: TeamState = {
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
  teams: [],
  team: null,
};

const TeamSlice = createSlice({
  name: "TeamSlice",

  initialState,
  reducers: {
    setTeam: (state, action: PayloadAction<any>) => {
      state.team = action.payload;
    },
    resetTeam: (state) => {
      state.team = null;
    },
  },
  extraReducers: (builder) => {
    //ADD TEAM START FROM HERE--->
    builder.addCase(addTeam.pending, (state) => {
      state.loading.add = true;
      state.req_success.add = false;
    });
    builder.addCase(addTeam.fulfilled, (state, {}: PayloadAction<any>) => {
      state.loading.add = false;
      state.req_success.add = true;
    });
    builder.addCase(addTeam.rejected, (state) => {
      state.loading.add = false;
    });
    //ADD TEAM END FROM HERE--->

    //ADD TEAM START FROM HERE--->
    builder.addCase(getAllTeams.pending, (state) => {
      state.loading.get = true;
      state.req_success.get = false;
    });
    builder.addCase(
      getAllTeams.fulfilled,
      (state, { payload }: PayloadAction<any>) => {
        state.teams = payload;
        state.loading.get = false;
        state.req_success.get = true;
      }
    );
    builder.addCase(getAllTeams.rejected, (state) => {
      state.loading.get = false;
    });

    //ADD TEAM START FROM HERE--->
    builder.addCase(updateTeam.pending, (state) => {
      state.loading.update = true;
      state.req_success.update = false;
    });
    builder.addCase(updateTeam.fulfilled, (state, {}: PayloadAction<any>) => {
      state.loading.update = false;
      state.req_success.update = true;
    });
    builder.addCase(updateTeam.rejected, (state) => {
      state.loading.update = false;
    });

    builder.addCase(deleteTeam.pending, (state) => {
      state.loading.delete = true;
      state.req_success.delete = false;
    });
    builder.addCase(deleteTeam.fulfilled, (state, {}: PayloadAction<any>) => {
      state.loading.delete = false;
      state.req_success.delete = true;
    });
    builder.addCase(deleteTeam.rejected, (state) => {
      state.loading.delete = false;
    });
  },
});

export const { setTeam, resetTeam } = TeamSlice.actions;

export default TeamSlice.reducer;
