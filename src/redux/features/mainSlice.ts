import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserwithPrivateData } from "../../types/user";
import { Doc } from "@junobuild/core";

// Define a type for the slice state
interface mainState {
  userDoc: Doc<IUserwithPrivateData> | undefined;
  recommendedCards: IUser[];
}

// Define the initial state using that type
const initialState: mainState = {
  userDoc: undefined,
  recommendedCards: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateUserDoc: (state, action: PayloadAction<Doc<IUserwithPrivateData> | undefined>) => {
      state.userDoc = action.payload;
    },
    updateRecommendedCards: (state, action: PayloadAction<IUser[]>) => {
      state.recommendedCards = action.payload;
    },
  },
});

export const { updateUserDoc, updateRecommendedCards } = mainSlice.actions;

export default mainSlice.reducer;
