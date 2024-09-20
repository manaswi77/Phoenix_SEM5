import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ScreenState } from "../types/types";

interface ScreenStateType {
  isLoggedIn: boolean;
  currentScreen: ScreenState;
}

const initialState: ScreenStateType = {
  isLoggedIn: false,
  currentScreen: "welcome",
};

const screenSlice = createSlice({
  name: 'screen',
  initialState,
  reducers: {
      setIsLoggedIn(state, action:PayloadAction<boolean>) {
          state.isLoggedIn = action.payload;
      },
      setCurrentScreen(state, action: PayloadAction<ScreenState>) {
          state.currentScreen = action.payload;
      }
  }
});

export const { setIsLoggedIn, setCurrentScreen } = screenSlice.actions;
export default screenSlice.reducer;