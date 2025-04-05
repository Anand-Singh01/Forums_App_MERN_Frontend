import { configureStore } from "@reduxjs/toolkit";
import userInfoSlice from "../slices/userInfoSlice";
const store = configureStore({
  reducer: {
    userInfoSlice,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;