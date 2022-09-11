import { createSlice } from "@reduxjs/toolkit";

const themeInitialState = { darkmode: false };

const themeSlice = createSlice({
  name: "theme",
  initialState: {
    value: {
      themeInitialState,
    },
  },
  reducers: {
    toggleDarkmode: (state) => {
      state.value.darkmode = !state.value.darkmode;
    },
  },
});

export const { toggleDarkmode } = themeSlice.actions;

export default themeSlice.reducer;
