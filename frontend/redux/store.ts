import { configureStore } from "@reduxjs/toolkit";
import authSliceReducer from "./features/authSlice";

export const store = configureStore({
  reducer: {
    authSliceReducer
  },
  // devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
