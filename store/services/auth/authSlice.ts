/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { getAuthUser, updateProfilePicture } from "./authApi";



const initialState = {

loading: {
    getMe: false,
    avatar: false,
    },

    req_success: {
    getMe: false,
    avatar: false,
    },
    auth_user:null
 
};

const AuthSlice = createSlice({
  name: "AuthSlice",
  initialState,
  reducers: {},
  extraReducers: (builder) => {

      //GET AUTH USER INFO START FROM HERE--->
      builder.addCase(getAuthUser.pending, (state) => {
        state.loading.getMe = true;
        state.req_success.getMe = false;
        state.req_success.avatar = false;
      });
      builder.addCase(
        getAuthUser.fulfilled,
        (state, { payload }: PayloadAction<any>) => {
          state.loading.getMe = false;
          state.req_success.getMe = true;
          state.auth_user = payload.data;
        }
      );
      builder.addCase(getAuthUser.rejected, (state) => {
        state.loading.getMe = false;
      });
      //GET AUTH USER INFOEND FROM HERE --->


          //UPDATE PROFILE PICTURE INFO START FROM HERE--->
    builder.addCase(updateProfilePicture.pending, (state) => {
        state.loading.avatar = true;
        state.req_success.avatar = false;
      });
      builder.addCase(
        updateProfilePicture.fulfilled,
        (state, {}: PayloadAction<any>) => {
          state.loading.avatar = false;
          state.req_success.avatar = true;
        }
      );
      builder.addCase(updateProfilePicture.rejected, (state) => {
        state.loading.avatar = false;
      });
      //UPDATE PROFILE PICTURE FROM HERE --->
    
  },
});

export const {} = AuthSlice.actions;

export default AuthSlice.reducer;
