/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { ERROR_TOASTER, REQUIRED_TOASTER } from "@/utils/toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const getAuthUser = createAsyncThunk(
    "getAuthUser",
    async (_undefined, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.get("/company-user/auth/me");
        return res.data;
      } catch (error: any) {
        ERROR_TOASTER(error);
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

export const updateProfilePicture = createAsyncThunk(
    "updateProfilePicture",
    async (data: any, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.put(
          "/settings/update-profile-picture",
          data,
          {
            headers: {
              "Content-Type": "multipart/form-data", // This is important for form-data
            },
          }
        );
        REQUIRED_TOASTER(res.data);
        return res.data;
      } catch (error: any) {
        ERROR_TOASTER(error);
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
);
  