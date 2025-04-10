import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPostIdOnFeed: null as string | null,
  selectedCommentForReply: {
    commentId: null as string | null,
    userName: null as string | null,
  },
  selectedPostToEdit:{
    postId:null as string | null,
  },
  selectedPostToDelete:{
    postId:null as string | null,
  }
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
    updateSelectedPostToEdit:(state, action:{payload:string|null})=>{
      state.selectedPostToEdit.postId = action.payload;
    },
    updateSelectedPostToDelete:(state, action:{payload:string|null})=>{
      state.selectedPostToDelete.postId = action.payload;
    }
  },
});
export const { updateSelectedPostIdOnFeed, updatesSelectedCommentForReply, 
  updateSelectedPostToEdit, updateSelectedPostToDelete} =
  postSlice.actions;
export default postSlice.reducer;
