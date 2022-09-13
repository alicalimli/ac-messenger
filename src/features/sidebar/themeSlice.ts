import { createSlice } from "@reduxjs/toolkit";

type InitialState = {
  darkmode: boolean;
};

const initialState = { darkmode: false };

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

export const { toggleDarkmode } = themeSlice.actions;

export default themeSlice.reducer;
