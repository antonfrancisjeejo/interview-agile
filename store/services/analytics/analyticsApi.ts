/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_TOASTER } from "@/utils/toastify";

export const addAnalyticsDetailsToDB = createAsyncThunk(
  "addAnalyticsDetailsToDB",
  async ({ data }: { data: any }, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.post(`/company-user/chat-history`, data);
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

export const getAnalyticsDetailsById = createAsyncThunk(
  "getAnalyticsDetailsById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company-user/chat-history/${id}`);
      return res?.data?.data;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getPersonaById = createAsyncThunk(
  "getPersonaById",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company-user/prompts/${id}`);
      return res?.data?.data;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
