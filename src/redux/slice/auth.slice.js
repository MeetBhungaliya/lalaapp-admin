import { createSlice } from "@reduxjs/toolkit";
import { forgotPassword, login, resetPassword, verifyOTP } from "../actions/auth.action";

/**
 * authSlice
 * Description:
 *    - Manages authentication-related states: login, forgot password, OTP verification, and reset password.
 *    - Tracks loading state to show loaders during API calls.
 *    - On successful login, stores session details in localStorage.
 */
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        loading: false, // Used to control loading indicators globally for auth operations
    },
    reducers: {
        // No synchronous reducers needed currently
    },
    extraReducers: (builder) => {
        builder
            // Login actions
            .addCase(login.pending, (state) => {
                state.loading = true; // Show loader on login request
            })
            .addCase(login.fulfilled, (state, action) => {
                // Store essential auth/session data on successful login
                localStorage.setItem('token', action.payload.data?.token); // Save token for API authorization
                state.loading = false; // Hide loader
            })
            .addCase(login.rejected, (state) => {
                state.loading = false; // Hide loader on login failure
            })

            // Forgot Password actions
            .addCase(forgotPassword.pending, (state) => {
                state.loading = true; // Show loader on forgot password request
            })
            .addCase(forgotPassword.fulfilled, (state) => {
                state.loading = false; // Hide loader after success
            })
            .addCase(forgotPassword.rejected, (state) => {
                state.loading = false; // Hide loader on error
            })

            // OTP Verification actions
            .addCase(verifyOTP.pending, (state) => {
                state.loading = true; // Show loader when verifying OTP
            })
            .addCase(verifyOTP.fulfilled, (state) => {
                state.loading = false; // Hide loader after OTP is verified
            })
            .addCase(verifyOTP.rejected, (state) => {
                state.loading = false; // Hide loader if OTP verification fails
            })

            // Reset Password actions
            .addCase(resetPassword.pending, (state) => {
                state.loading = true; // Show loader when resetting password
            })
            .addCase(resetPassword.fulfilled, (state) => {
                state.loading = false; // Hide loader after password reset
            })
            .addCase(resetPassword.rejected, (state) => {
                state.loading = false; // Hide loader if password reset fails
            });
    },
});

export default authSlice.reducer;

