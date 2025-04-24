/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosInstance from "@/apiConfigs/axiosInstance";
import { ERROR_TOASTER, REQUIRED_TOASTER } from "@/utils/toastify";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

export const inviteSalesRepresentatives = createAsyncThunk(
    "inviteSalesRepresentatives",
    async ({data}:{data:any}, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.post("/company-admin/invitation/sales-representatives",data);
        REQUIRED_TOASTER(res.data);
        return res.data;
      } catch (error: any) {
        // console.log(error)
        // ERROR_TOASTER(error);
        toast.error("Error sending invitation.")

        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );
export const getSalesRepresentatives = createAsyncThunk(
    "getSalesRepresentatives",
    async (_undefined, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.get("/company-admin/invitation/sales-representatives");
        return res.data;
      } catch (error: any) {
        // console.log(error);
        ERROR_TOASTER(error);
        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

  export const updateSalesRepresentatives = createAsyncThunk(
    "updateSalesRepresentatives",
    async ({data,id}:{data:any,id:any}, { rejectWithValue }) => {
      try {
        const res = await axiosInstance.put(`/company-admin/invitation/sales-representatives/${id}`,data);
        REQUIRED_TOASTER(res.data);
        return res.data;
      } catch (error: any) {
        // console.log(error)
        // ERROR_TOASTER(error);
        toast.error("Error sending invitation.")

        if (!error.response) {
          throw error;
        }
        return rejectWithValue(error.response.data);
      }
    }
  );

