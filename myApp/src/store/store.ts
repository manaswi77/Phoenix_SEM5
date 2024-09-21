import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "../contexts/screenSlice";
import communityPostReducer from "../contexts/communityPostsSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    communityPosts: communityPostReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
