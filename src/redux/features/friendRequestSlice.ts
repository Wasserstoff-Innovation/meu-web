// friendRequestSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  friendRequests: [],
};

const friendRequestSlice = createSlice({
  name: "friendRequest",
  initialState,
  reducers: {
    friendRequest: (state, action) => {
      state.friendRequests = action.payload;
    }
  },
});

export const { friendRequest} = friendRequestSlice.actions;
export default friendRequestSlice.reducer;
