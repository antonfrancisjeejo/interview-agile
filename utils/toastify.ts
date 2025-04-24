/* eslint-disable @typescript-eslint/no-explicit-any */
import { toast } from "react-toastify";

/* eslint-disable @typescript-eslint/naming-convention */
export const REQUIRED_TOASTER = (data: any) => {
  // console.log("message::", data);
  // console.log("message read::", data.message);
  toast.success(data.message);
};

export const ERROR_TOASTER = (error: any) => {
  toast.error(error.response.data.message);
};
