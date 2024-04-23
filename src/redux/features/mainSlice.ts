import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser, IUserwithPrivateData } from "../../types/user";
import { Doc } from "@junobuild/core";

// Define a type for the slice state
interface mainState {
  userDoc: Doc<IUserwithPrivateData> | undefined;
  recommendedCards: IUser[];
  connections: IUserwithPrivateData[];
  sentRequests: IUser[];
  receivedRequests: IUserwithPrivateData[];
}

// Define the initial state using that type
const initialState: mainState = {
  userDoc: undefined,
  recommendedCards: [],
  connections: [],
  sentRequests: [],
  receivedRequests: [],
};

export const mainSlice = createSlice({
  name: "main",
  initialState,
  reducers: {
    updateUserDoc: (
      state,
      action: PayloadAction<Doc<IUserwithPrivateData> | undefined>
    ) => {
      state.userDoc = action.payload;
    },
    updateRecommendedCards: (state, action: PayloadAction<IUser[]>) => {
      state.recommendedCards = action.payload;
    },
    updateConnections: (
      state,
      action: PayloadAction<IUserwithPrivateData[]>
    ) => {
      state.connections = action.payload;
    },
    updateSentRequests: (state, action: PayloadAction<IUser[]>) => {
      state.sentRequests = action.payload;
    },
    updateReceivedRequests: (
      state,
      action: PayloadAction<IUserwithPrivateData[]>
    ) => {
      state.receivedRequests = action.payload;
    },
  },
});

export const {
  updateUserDoc,
  updateRecommendedCards,
  updateConnections,
  updateSentRequests,
  updateReceivedRequests,
} = mainSlice.actions;

export default mainSlice.reducer;
