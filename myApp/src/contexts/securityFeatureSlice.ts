import { SecurityScreenType } from "../types/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SecurityScreenContext {
  currentFeature: SecurityScreenType;
  isSOSButtonEnabled: boolean;
  isSafetyTimerEnabled: boolean;
  safetyTimerTimeInterval: number[];
  SOSButtonContacts: string[];
  safetyTimerContacts: string[];
}

const initialState: SecurityScreenContext = {
  currentFeature: "features",
  isSOSButtonEnabled: false,
  isSafetyTimerEnabled: false,
  safetyTimerTimeInterval: [0, 15],
  SOSButtonContacts: ["", "", ""],
  safetyTimerContacts: ["", "", ""],
};

const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    setCurrentFeature(state, action: PayloadAction<SecurityScreenType>) {
      state.currentFeature = action.payload;
    },
    setSOSButtonState(state) {
      state.isSOSButtonEnabled = !state.isSOSButtonEnabled;
    },
    setSafetyTimerState(state) {
      state.isSafetyTimerEnabled = !state.isSafetyTimerEnabled;
    },
    updateSafetyTimerTimeInterval(state, action: PayloadAction<number[]>) {
      state.safetyTimerTimeInterval = action.payload;
    },
    addSOSButtonContact(state, action: PayloadAction<string>) {
      const newContact = action.payload;
      const emptyIndex = state.SOSButtonContacts.indexOf("");
      if (emptyIndex !== -1) {
        state.SOSButtonContacts[emptyIndex] = newContact;
      } else {
        console.warn("All SOS Button contacts are already filled.");
      }
    },
    addSafetyTimerContact(state, action: PayloadAction<string>) {
      const newContact = action.payload;
      const emptyIndex = state.safetyTimerContacts.indexOf("");
      if (emptyIndex !== -1) {
        state.safetyTimerContacts[emptyIndex] = newContact;
      } else {
        console.warn("All Safety Timer contacts are already filled.");
      }
    },
  },
});

export const {
  setCurrentFeature,
  setSOSButtonState,
  setSafetyTimerState,
  updateSafetyTimerTimeInterval,
  addSOSButtonContact,
  addSafetyTimerContact,
} = securitySlice.actions;
export default securitySlice.reducer;
