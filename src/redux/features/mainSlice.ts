import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { Doc } from "@junobuild/core";

// Define a type for the slice state
interface mainState {
  userDoc: Doc<IUser> | undefined;
}

// Define the initial state using that type
const initialState: mainState = {
  userDoc: undefined,
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<Doc<IUser>>) => {
      state.userDoc = { ...state.userDoc, ...action.payload };
    },
  },
});

export const { updateUserData } = mainSlice.actions;

export default mainSlice.reducer;
