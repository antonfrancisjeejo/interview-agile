import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  theme: "dark" | "light" | undefined;
}
const getTheme = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("theme") as "dark" | "light" | undefined;
  }
  return undefined;
};
const initialState: ThemeState = {
  theme: getTheme(),
};

const ThemeSlice = createSlice({
  name: "ThemeSlice",

  initialState,
  reducers: {
    setThemeMode(state, action: PayloadAction<"dark" | "light" | undefined>) {
      console.log("action::", action.payload);
      state.theme = action.payload;
    },
  },
});

export const { setThemeMode } = ThemeSlice.actions;

export default ThemeSlice.reducer;
