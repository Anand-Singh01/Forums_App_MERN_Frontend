import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPostIdOnFeed: null as string | null,
  selectedUserProfileId: null as string | null,
  selectedCommentForReply: {
    commentId: null as string | null,
    userName: null as string | null,
  },
};
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    updateSelectedPostIdOnFeed: (state, action: { payload: string | null }) => {
      state.selectedPostIdOnFeed = action.payload;
    },
    updateselectedUserProfileIdId: (state, action: { payload: string | null }) => {
      state.selectedUserProfileId = action.payload;
    },
    updatesSelectedCommentForReply: (
      state,
      action: {
        payload: {
          commentId: string | null;
          userName: string | null;
        };
      }
    ) => {
      state.selectedCommentForReply = action.payload;
    },
  },
});
export const { updateSelectedPostIdOnFeed, updatesSelectedCommentForReply, updateselectedUserProfileIdId} =
  postSlice.actions;
export default postSlice.reducer;
