import { createSlice } from "@reduxjs/toolkit";
import { IParticipantDto } from "../../api/chatApi";

const initialState = {
  activeParticipant: null as null | IParticipantDto,
};
const chatSlice = createSlice({
  name: "chatSlice",
  initialState,
  reducers: {
    updateActiveParticipant: (
      state,
      action: { payload: null | IParticipantDto }
    ) => {
      state.activeParticipant = action.payload;
    },
  },
});

export const {updateActiveParticipant} = chatSlice.actions;

export default chatSlice.reducer;
