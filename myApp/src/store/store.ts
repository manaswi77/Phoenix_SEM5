import { configureStore } from "@reduxjs/toolkit";
import screenReducer from "../contexts/screenSlice";
import communityPostReducer from "../contexts/communityPostsSlice";
import changePasswordReducer from "../contexts/changePasswordSlice";
import securityScreenReducer from "../contexts/securityFeatureSlice";

export const store = configureStore({
  reducer: {
    screen: screenReducer,
    communityPosts: communityPostReducer,
    changePassword: changePasswordReducer,
    securityFeature: securityScreenReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
