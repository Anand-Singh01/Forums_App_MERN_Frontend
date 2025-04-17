import { createSlice } from "@reduxjs/toolkit";
import { IUserInfo } from "../../shared/interfaces";
import { RootState } from "../store/store";

const initialState = {
  userInfo: {
    userId: "",
    email: "",
    firstName: "",
    lastName: "",
    userName: "",
    profileName: "",
    profilePicture: "",
    dob: new Date(),
  } as IUserInfo,
  auth: {
    isAuthenticated: false,
  },
};

const userInfoSlice = createSlice({
  name: "userInfoSlice",
  initialState,
  reducers: {
    updateAuth: (state, action: { payload: boolean }) => {
      state.auth.isAuthenticated = action.payload;
    },
    updateUserInfo: (state, action: { payload: IUserInfo }) => {
      state.userInfo = action.payload;
    },

    updateUserInfoAndAuth: (state, action: { payload: {data:IUserInfo, isAuthenticated:boolean} }) => {
      state.userInfo = action.payload.data;
      state.auth.isAuthenticated = action.payload.isAuthenticated
    },
  },
});

export const { updateAuth, updateUserInfo, updateUserInfoAndAuth} = userInfoSlice.actions;

export const getUserNameSelector = (state: RootState) =>
  state.userInfoSlice.userInfo.userName;
export const getProfileImageSelector = (state: RootState) =>
  state.userInfoSlice.userInfo.profilePicture;

export default userInfoSlice.reducer;