import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  selectedPostIdOnFeed: null as string | null,
};
const postSlice = createSlice({
  name: "postSlice",
  initialState,
  reducers: {
    updateSelectedPostIdOnFeed: (state, action: { payload: string | null }) => {
      state.selectedPostIdOnFeed = action.payload;
    },
  },
});
export const { updateSelectedPostIdOnFeed } = postSlice.actions;
export default postSlice.reducer;