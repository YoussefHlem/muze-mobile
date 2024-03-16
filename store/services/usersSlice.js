import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: [],
  users: [],
  userId: null,
};

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    getUserDetails: (state, action) => {
      state.user = action.payload;
    },
    getUsersDetials: (state, action) => {
      state.users = action.payload;
    },
    setUserId: (state, action) => {
      state.userId = action.payload;
    },
  },
});

export default usersSlice.reducer;
export const { getUserDetails } = usersSlice.actions;
