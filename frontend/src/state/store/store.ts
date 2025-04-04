import { configureStore } from "@reduxjs/toolkit";
import postSlice from "../slices/postSlice";
import userInfoSlice from "../slices/userInfoSlice";
const store = configureStore({
  reducer: {
    userInfoSlice,
    postSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
