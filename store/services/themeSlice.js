// Libraries
import { createSlice } from "@reduxjs/toolkit";

// user inital state
const initialState = {
  theme: "dark",
};

// creating slice which includes different auth actions
export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    toggle: (state = initialState, { payload }) => {
      state.theme = payload.theme;
    },
  },
});

// select slice state
export const selectTheme = (state) => state.theme;

// exporting reducer actions
export const { toggle } = themeSlice.actions;

// exporting reducer for store config
export default themeSlice.reducer;
