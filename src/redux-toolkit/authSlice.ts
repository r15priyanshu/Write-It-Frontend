import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserType } from "../helpers/custom-interfaces";
import authService from "../services/auth-service";

export interface AuthState {
  isLoggedIn: boolean;
  loggedInUserDetails: UserType | null;
}

const initialState: AuthState = {
  isLoggedIn: authService.isUserLoggedIn(),
  loggedInUserDetails: authService.getLoggedInUserDetails(),
};

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    updateLoggedInUserDetailsAction: (state,action: PayloadAction<UserType>) => {
      state.loggedInUserDetails = action.payload;
      state.isLoggedIn = true;
    },
  },
});

export const { updateLoggedInUserDetailsAction } = authSlice.actions;
export default authSlice.reducer;
