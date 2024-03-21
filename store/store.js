// Libraries
import { configureStore } from "@reduxjs/toolkit";

// Reducers
import userReducer from "./services/userSlice";
import usersSlice from "./services/usersSlice";
import chatSlice from "./services/chatSlice";
import searchSlice from "./services/searchSlice";
import themeReducer from "./services/themeSlice";
import utilsReducer from "./services/utilsSlice";
import videoSlice from "./services/videoSlice";
import bookingSlice from "./services/bookingSlice";

// configuring the redux-store
const store = configureStore({
  reducer: {
    user: userReducer,
    chat: chatSlice,
    users: usersSlice,
    utils: utilsReducer,
    theme: themeReducer,
    booking: bookingSlice,
    search: searchSlice,
    video: videoSlice,
  },
});

export default store;
