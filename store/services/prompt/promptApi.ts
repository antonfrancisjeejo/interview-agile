/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_TOASTER } from "@/utils/toastify";

export const getAnalyticsPrompt = createAsyncThunk(
  "getAnalyticsPrompt",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company-user/prompts/${id}`);
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
