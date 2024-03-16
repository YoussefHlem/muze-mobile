import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  searchList: [],
  searchResult: [],
  allArtists: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setSearchList: (state, action) => {
      state.searchList = action.payload;
    },
    setSearchResult: (state, action) => {
      state.searchResult = action.payload;
    },
    setAllArtists: (state, action) => {
      state.allArtists = action.payload;
    },
  },
});

export default searchSlice.reducer;
export const { setSearchList, setSearchResult, setAllArtists } =
  searchSlice.actions;
