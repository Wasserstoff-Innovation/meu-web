import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IPopupTypes } from "../../constants/popupTypes";
// Define a type for the slice state
interface popupState {
  showPopup: boolean;
  popupType: IPopupTypes;
  popupData?: unknown;
}

// Define the initial state using that type
const initialState: popupState = {
  showPopup: false,
  popupType: "DEFAULT",
  popupData: undefined,
};

export const popupSlice = createSlice({
  name: "popup",
  initialState,
  reducers: {
    togglePopup: (state) => {
      state.showPopup = !state.showPopup;
    },
    setPopupType: (state, action: PayloadAction<IPopupTypes>) => {
      state.popupType = action.payload;
    },
    setPopupData: (state, action: PayloadAction<unknown>) => {
      state.popupData = action.payload;
    },
  },
});

export const { togglePopup, setPopupType, setPopupData } = popupSlice.actions;

export default popupSlice.reducer;
