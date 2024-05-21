import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  gotFriendRequests: [],
};

const gotFriendRequestSlice = createSlice({
  name: "gotFriendRequest",
  initialState,
  reducers: {
    gotFriendRequest: (state, action) => {
      state.gotFriendRequests = action.payload;
    }
  },
});

export const { gotFriendRequest} = gotFriendRequestSlice.actions;
export default gotFriendRequestSlice.reducer;
