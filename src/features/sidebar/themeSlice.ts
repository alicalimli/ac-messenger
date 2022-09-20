import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  darkmode: boolean;
};

const initialState: InitialStateType = { darkmode: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: initialState,
  },
  reducers: {
    toggleDarkmode: (state) => {
      state.value.darkmode = !state.value.darkmode;
    },
  },
});

export const getThemeState = (state: any) => state.theme;

export const { toggleDarkmode } = themeSlice.actions;

export default themeSlice.reducer;
