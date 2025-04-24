// app/providers.tsx
"use client";

import { Provider } from "react-redux";
import { ReactNode } from "react";
import Store from "./store";

export function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={Store}>{children}</Provider>;
}
