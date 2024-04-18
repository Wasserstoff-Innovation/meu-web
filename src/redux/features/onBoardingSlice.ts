import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IUserwithPrivateData } from "../../types/user";
import { EmptyUser } from "../../constants/empty";

// Define a type for the slice state
interface onBoardingState {
  userData: IUserwithPrivateData;
}

// Define the initial state using that type
const initialState: onBoardingState = {
  userData: EmptyUser,
};

export const onBoardingSlice = createSlice({
  name: "onBoarding",
  initialState,
  reducers: {
    updateUserData: (
      state,
      action: PayloadAction<Partial<IUserwithPrivateData>>
    ) => {
      state.userData = { ...state.userData, ...action.payload };
      console.log("state.userData", state.userData);
    },
  },
});

export const { updateUserData } = onBoardingSlice.actions;

export default onBoardingSlice.reducer;
