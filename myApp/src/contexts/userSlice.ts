import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrentUser, UserSession } from "../types/types";

interface AppUser {
  user: CurrentUser | null;
  session: UserSession | null;
}

const initialState: AppUser = {
  user: null,
  session: null,
};

const authSlice = createSlice({
  name: "appUser",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<CurrentUser>) => {
      state.user = action.payload;
    },

    setSession: (state, action: PayloadAction<UserSession>) => {
      state.session = action.payload;
    },

    clearUser: (state) => {
      state.user = null;
      state.session = null;
    },

    updateUserProfile: (state, action: PayloadAction<Partial<CurrentUser>>) => {
      if (state.user) {
        state.user = { ...state.user, ...action.payload };
      }
    },
  },
});

export const { setUser, setSession, clearUser, updateUserProfile } =
  authSlice.actions;

export default authSlice.reducer;
