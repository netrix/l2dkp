import { configureStore } from "@reduxjs/toolkit";
import { raidsApi } from "./services/raidsApi";
import authSliceReducer from "./features/authSlice";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

export const store = configureStore({
  reducer: {
    authSliceReducer,
    [raidsApi.reducerPath]: raidsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({}).concat([raidsApi.middleware]),
  // devTools: process.env.NODE_ENV !== "production",
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
