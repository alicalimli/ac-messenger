import { createSlice } from "@reduxjs/toolkit";

type InitialStateType = {
  darkmode: boolean;
};

const initialState: InitialStateType = { darkmode: false };

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggleDarkmode: (state, action) => {
      state.darkmode = !state.darkmode;
    },
    enableDarkmode: (state, action) => {
      state.darkmode = action.payload.darkmode;
    },
  },
});

export const getThemeState = (state: any) => state.theme;

export const { toggleDarkmode, enableDarkmode } = themeSlice.actions;

export default themeSlice.reducer;
