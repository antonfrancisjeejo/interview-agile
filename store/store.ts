import { configureStore } from "@reduxjs/toolkit";
import { useDispatch, useSelector } from "react-redux";
import type { TypedUseSelectorHook } from "react-redux";
import RootReducer from "@/store/rootReducer";

const Store = configureStore({
  reducer: RootReducer,
  devTools: process.env.NODE_ENV !== "production",
  // middleware: (getDefaultMiddleware: any) =>
  //   getDefaultMiddleware({
  //     serializableCheck: false,
  //   }).concat(thunkMiddleware),
});

export type RootStore = ReturnType<typeof RootReducer>;

export type RootState = ReturnType<typeof Store.getState>;
export type AppDispatch = typeof Store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default Store;
