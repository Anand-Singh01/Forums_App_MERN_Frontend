import { createSlice } from "@reduxjs/toolkit";

interface WebsocketState {
  readyState: 0 | 1 | 2;
}

const initialState: WebsocketState = {
  readyState: 0,
};

const wsSlice = createSlice({
  name: "wsSlice",
  initialState,
  reducers: {
    setReadySate: (state, action) => {
      state.readyState = action.payload;
    },
  },
});

export default wsSlice.reducer;
export const { setReadySate } = wsSlice.actions;
