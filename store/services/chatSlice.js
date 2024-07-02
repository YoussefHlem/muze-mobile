// Libraries
import { createSlice } from "@reduxjs/toolkit";

// user inital state
const initialState = {
  chatData: [],
  profileData: {},
  userChatId: null,
  userChats: [],
  fromProfile: false,
};

// creating slice which includes different auth actions
export const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    setChatData: (state = initialState, { payload }) => {
      state.chatData = payload;
    },
    setProfileData: (state = initialState, { payload }) => {
      state.profileData = payload;
    },
    setUserChatId: (state = initialState, { payload }) => {
      state.userChatId = payload;
    },
    addMessage: (state, { payload }) => {
      state.chatData.push(payload);
    },
    setUserChats: (state = initialState, { payload }) => {
      state.userChats = payload;
    },
    addUserChat: (state, { payload }) => {
      state.userChats.unshift(payload);
    },
    setFromProfile: (state = initialState, { payload }) => {
      state.fromProfile = payload;
    },
  },
});

// exporting reducer actions
export const {
  setChatData,
  setProfileData,
  setUserChatId,
  addMessage,
  setUserChats,
  addUserChat,
  setFromProfile,
} = chatSlice.actions;

// exporting reducer for store config
export default chatSlice.reducer;
