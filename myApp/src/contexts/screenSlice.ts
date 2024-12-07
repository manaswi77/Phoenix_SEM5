import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScreenState } from "../types/types";

interface ScreenStateType {
  isLoggedIn: boolean;
  isEmergency: boolean;
  currentScreen: ScreenState;
}

const initialState: ScreenStateType = {
  isLoggedIn: false,
  isEmergency: false,
  currentScreen: "onboarding",
};

const screenSlice = createSlice({
  name: "screen",
  initialState,
  reducers: {
    setIsLoggedIn(state, action: PayloadAction<boolean>) {
      state.isLoggedIn = action.payload;
    },
    setCurrentScreen(state, action: PayloadAction<ScreenState>) {
      state.currentScreen = action.payload;
    },
    setEmergencyState(state, action: PayloadAction<boolean>) {
      state.isEmergency = action.payload;
    },
  },
});

export const { setIsLoggedIn, setCurrentScreen, setEmergencyState } =
  screenSlice.actions;
export default screenSlice.reducer;
