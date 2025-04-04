import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPostIdOnFeed: null as string | null,
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
export const { updateSelectedPostIdOnFeed, updatesSelectedCommentForReply } =
  postSlice.actions;
export default postSlice.reducer;
