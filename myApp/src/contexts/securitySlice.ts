import { SecurityScreenType } from "./../types/types.d";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SecurityScreenContext {
  currentFeature: SecurityScreenType;
}

const initialState: SecurityScreenContext = {
  currentFeature: "features",
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setCurrentFeature(state, action: PayloadAction<SecurityScreenType>) {
      state.currentFeature = action.payload;
    },
  },
});

export const { setCurrentFeature } = securitySlice.actions;
export default securitySlice.reducer;
