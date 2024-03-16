// Libraries
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userSlice from "./services/userSlice";
import usersSlice from "./services/usersSlice";
import chatSlice from "./services/chatSlice";
import searchSlice from "./services/searchSlice";
import themeSlice from "./services/themeSlice";
import utilsSlice from "./services/utilsSlice";
import videoSlice from "./services/videoSlice";
import bookingSlice from "./services/bookingSlice";

// configuring the redux-store
const store = configureStore({
  reducer: {
    user: userSlice,
    users: usersSlice,
    chat: chatSlice,
    search: searchSlice,
    theme: themeSlice,
    booking: bookingSlice,
    utils: utilsSlice,
    video: videoSlice,
  },
});

export default store;
