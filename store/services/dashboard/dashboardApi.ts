/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_TOASTER } from "@/utils/toastify";

export const getRecentChatHistory = createAsyncThunk(
  "getChatHistoryRecent",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company-user/chat-history`);
      // Transform API response into expected format
      const formattedData = res?.data?.data?.chat?.map((chat: any) => ({
        id: chat.id,
        persona: {
          name: chat.prompt.name, // Nested prompt name
          difficulty: chat.prompt.difficulty,
          mood: chat.prompt.mood,
          image: chat.prompt.image,
          id: chat.prompt.id,
        },
        audioLink: chat.audioLink,
        date: chat.createdAt, // Assuming API returns a timestamp
        score: chat.analyticsData?.final_score || 0, // Handle missing score
        duration: chat.analyticsData?.callTime
          ? chat.analyticsData.callTime >= 60
            ? `${(chat.analyticsData.callTime / 60).toFixed(1)} min`
            : `${chat.analyticsData.callTime} sec`
          : "N/A",
        feedback: chat.analyticsData?.ai_coach_review?.final_suggestions
          ? chat.analyticsData.ai_coach_review.final_suggestions.join(", ")
          : "No feedback available",
        status: "Completed", // Adjust if the API provides a status
        analyticsData: chat.analyticsData,
      }));

      // console.log("formattedData", formattedData);

      return formattedData;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const getCallLogWithUserId = createAsyncThunk(
  "getCallLogWithUserId",
  async (userId: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(
        `/company-admin/invitation/sales-representatives/call-logs/${userId}`
      );
      // Transform API response into expected format
      const formattedData = res?.data?.data?.chat?.map((chat: any) => ({
        id: chat.id,
        persona: {
          name: chat.prompt.name, // Nested prompt name
          difficulty: chat.prompt.difficulty,
          mood: chat.prompt.mood,
          image: chat.prompt.image,
          id: chat.prompt.id,
        },
        audioLink: chat.audioLink,
        date: chat.createdAt, // Assuming API returns a timestamp
        score: chat.analyticsData?.final_score || 0, // Handle missing score
        duration: chat.analyticsData?.callTime
          ? chat.analyticsData.callTime >= 60
            ? `${(chat.analyticsData.callTime / 60).toFixed(1)} min`
            : `${chat.analyticsData.callTime} sec`
          : "N/A",
        feedback: chat.analyticsData?.ai_coach_review?.final_suggestions
          ? chat.analyticsData.ai_coach_review.final_suggestions.join(", ")
          : "No feedback available",
        status: "Completed", // Adjust if the API provides a status
        analyticsData: chat.analyticsData,
      }));

      // console.log("formattedData", formattedData);

      return formattedData;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
