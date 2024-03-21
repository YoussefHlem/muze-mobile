// Libraries
import { createSlice } from "@reduxjs/toolkit";

// user inital state
const initialState = {
  user: {
    pk: null,
    username: null,
    email: null,
    firstName: null,
    lastName: null,
    signUpDone: null,
    userImage: {
      blobName: "",
      blobUrl: "",
    },
  },
  isSignUpDone: null,
  signedOut: true,
  genres: [],
  userDetails: {},
  userStudios: [],
  userBookings: [],
  userStudioBookings: [],
  searchedUser: {},
  searchedUserFollowers: [],
  searchedUserPosts: [],
  myRoomDetails: {},
  signUpProcessDone: false,
  authToken: null,
};

// creating slice which includes different auth actions
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state = initialState, { payload }) => {
      state.user = payload.user;
      state.signedOut = false;
    },
    setUserImage: (state = initialState, { payload }) => {
      state.user.userImage = payload;
    },
    setGenres: (state, action) => {
      state.genres = action.payload;
    },
    setUserDetails: (state, action) => {
      state.userDetails = action.payload;
    },
    setAnimationKey: (state, action) => {
      state.signUpProcessDone = action.payload;
    },
    setUserStudios: (state, action) => {
      state.userStudios = action.payload;
    },
    setUserBookings: (state, action) => {
      state.userBookings = action.payload;
    },
    setSearchedUserDetails: (state, action) => {
      state.searchedUser = action.payload;
    },
    setSearchedUserFollowers: (state, action) => {
      state.searchedUserFollowers = action.payload;
    },
    setSearchedUserPosts: (state, action) => {
      state.searchedUserPosts = action.payload;
    },
    setMyRoomDetails: (state, action) => {
      state.myRoomDetails = action.payload;
    },
    setUserStudioBookings: (state, action) => {
      state.userStudioBookings = action.payload;
    },
    setIsUserSignUpDone: (state, action) => {
      state.isSignUpDone = action.payload;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
  },
});

// select slice state
export const selectUser = (state) => state.user;

// exporting reducer actions
export const {
  setUser,
  tokenrefresh,
  signout,
  setUserDetails,
  setUserImage,
  setGenres,
  setUserStudios,
  setSearchedUserDetails,
  setSearchedUserFollowers,
  setSearchedUserPosts,
  setUserBookings,
  setMyRoomDetails,
  setUserStudioBookings,
  setIsUserSignUpDone,
  setAnimationKey,
  setAuthToken,
} = userSlice.actions;

// exporting reducer for store config
export default userSlice.reducer;
