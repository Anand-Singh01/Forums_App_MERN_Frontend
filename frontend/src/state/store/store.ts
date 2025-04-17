import { configureStore } from "@reduxjs/toolkit";
import chatSlice from "../slices/chatSlice";
import postSlice from "../slices/postSlice";
import userInfoSlice from "../slices/userInfoSlice";
import wsSlice from "../slices/wsSlice";
const store = configureStore({
  reducer: {
    userInfoSlice,
    postSlice,
    chatSlice,
    wsSlice
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
