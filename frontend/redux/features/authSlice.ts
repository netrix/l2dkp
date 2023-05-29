import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { signUpUser, loginUser, logoutUser, checkSession } from '../actions/auth';

// Type for our state
export interface AuthState {
  initialized: boolean;
  authState: boolean;
  loading: boolean;
  error: any;
  success: boolean;
}

// Initial state
const initialState: AuthState = {
  initialized: false,
  authState: false,
  loading: false,
  error: null,
  success: false,
};

// Actual Slice
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    // Action to set the authentication status
    setAuthState(state, action: PayloadAction<boolean>) {
      console.log("setAuthState:", action.payload);
      state.authState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(
        signUpUser.pending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addCase(
        signUpUser.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true; // registration successful
          state.initialized = true;
          state.authState = true;
        }
      )
      .addCase(
        signUpUser.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          state.initialized = true;
        }
      )
      .addCase(
        loginUser.pending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addCase(
        loginUser.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true; // login successful
          state.authState = true;
          state.initialized = true;
        }
      )
      .addCase(
        loginUser.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          state.initialized = true;
        }
      )
      .addCase(
        logoutUser.pending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addCase(
        logoutUser.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true; // logout successful
          state.authState = false;
          state.initialized = true;
        }
      )
      .addCase(
        logoutUser.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          state.initialized = true;
        }
      )
      .addCase(
        checkSession.pending,
        (state) => {
          state.loading = true
          state.error = null
        }
      )
      .addCase(
        checkSession.fulfilled,
        (state, { payload }) => {
          state.loading = false;
          state.success = true
          state.authState = true;
          state.initialized = true;
        }
      )
      .addCase(
        checkSession.rejected,
        (state, { payload }) => {
          state.loading = false;
          state.error = payload;
          state.authState = false;
          state.initialized = true;
        }
      )
  }
});


export const {
  setAuthState,
} = authSlice.actions;

export default authSlice.reducer;