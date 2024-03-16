// Libraries
import { createSlice } from "@reduxjs/toolkit";

// user inital state
const initialState = {
  genresList: [],
  skillsList: [],
  userTypes: [],
  instruments: [],
};

// creating slice which includes different auth actions
export const utilsSlice = createSlice({
  name: "utils",
  initialState,
  reducers: {
    setGenresList: (state = initialState, { payload }) => {
      state.genresList = payload;
    },
    setSkillsList: (state = initialState, { payload }) => {
      state.skillsList = payload;
    },
    setUserTypes: (state = initialState, { payload }) => {
      state.userTypes = payload;
    },
    setInstrumentsList: (state = initialState, { payload }) => {
      state.instruments = payload;
    },
  },
});

// select slice state
export const selectUtils = (state) => state.utils;

// exporting reducer actions
export const {
  setGenresList,
  setSkillsList,
  setUserTypes,
  setInstrumentsList,
} = utilsSlice.actions;

// exporting reducer for store config
export default utilsSlice.reducer;
