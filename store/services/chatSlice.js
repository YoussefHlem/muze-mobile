// Libraries
import { createSlice } from "@reduxjs/toolkit";

// user inital state
const initialState = {
  uuid: null,
  userChats: [],
  chatMessages: [],
  chatData: {},
  activeChat: null,
};

// creating slice which includes different auth actions
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setUUID: (state = initialState, { payload }) => {
      state.uuid = payload;
    },
    setUserChats: (state = initialState, { payload }) => {
      state.userChats = payload;
    },
    setChatMessages: (state = initialState, { payload }) => {
      state.chatMessages = payload;
    },
    setChatData: (state = initialState, { payload }) => {
      state.chatData = payload;
    },
    setActiveChat: (state = initialState, { payload }) => {
      state.activeChat = payload;
    },
  },
});

// exporting reducer actions
export const {
  setUUID,
  setUserChats,
  setChatMessages,
  setChatData,
  setActiveChat,
} = chatSlice.actions;

// exporting reducer for store config
export default chatSlice.reducer;
