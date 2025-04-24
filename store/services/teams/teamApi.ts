/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { ERROR_TOASTER } from "@/utils/toastify";

export const getAllTeams = createAsyncThunk(
  "getAllTeams",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.get(`/company-admin/team`);
      return res.data.data;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);

export const addTeam = createAsyncThunk(
  "addTeam",
  async (
    { data, onSuccess }: { data: any; onSuccess?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.post(`/company-admin/team`, data);
      onSuccess?.();
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

export const updateTeam = createAsyncThunk(
  "updateTeam",
  async (
    { id, data, onSuccess }: { id: number; data: any; onSuccess?: () => void },
    { rejectWithValue }
  ) => {
    try {
      const res = await axiosInstance.put(`/company-admin/team/${id}`, data);
      onSuccess?.();
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

export const deleteTeam = createAsyncThunk(
  "deleteTeam",
  async (id: number, { rejectWithValue }) => {
    try {
      const res = await axiosInstance.delete(`/company-admin/team/${id}`);
      return res?.data;
    } catch (error: any) {
      ERROR_TOASTER(error);
      if (!error.response) {
        throw error;
      }
      return rejectWithValue(error.response.data);
    }
  }
);
