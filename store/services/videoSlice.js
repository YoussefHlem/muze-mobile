import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  video: [],
};

const videoSlice = createSlice({
  name: "video",
  initialState,
  reducers: {
    setVideoData: (state, action) => {
      state.video = action.payload;
    },
  },
});

export default videoSlice.reducer;
export const { setVideoData } = videoSlice.actions;
