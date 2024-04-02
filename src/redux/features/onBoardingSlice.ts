import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUser } from "../../types/user";
import { EmptyUser } from "../../constants/empty";

// Define a type for the slice state
interface onBoardingState {
  userData: IUser;
}

// Define the initial state using that type
const initialState: onBoardingState = {
  userData: EmptyUser,
};

export const onBoardingSlice = createSlice({
  name: "onBoarding",
  // `createSlice` will infer the state type from the `initialState` argument
  initialState,
  reducers: {
    updateUserData: (state, action: PayloadAction<IUser>) => {
      state.userData = action.payload;
    },
  },
});

export const { updateUserData } = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
