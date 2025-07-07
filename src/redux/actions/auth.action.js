import api from "@/helper/api.helper" // Helper to make API calls using axios or similar
import { API } from "@/lib/endpoints";
import { createAsyncThunk } from "@reduxjs/toolkit" // Used to create async actions with Redux Toolkit
import { toast } from "react-toastify"; // Library to show toast notifications

/**
 * login
 * Description: Sends a POST request to the login API endpoint with the user credentials.
 * Usage: Triggered when user submits the login form.
 * Success: Shows a success toast message and returns the data to update redux store.
 * Error: Shows an error toast message and returns a rejected value.
 */

const login = createAsyncThunk('LOGIN', async (values, { rejectWithValue }) => {
    try {
        const data = await api.post(API.AUTH.LOGIN, values);
        toast.success(data.message)
        return data;
    } catch (error) {
        toast.error(error.message)
        return rejectWithValue(error)
    }
})

/**
 * forgotPassword
 * Description: Sends a POST request to initiate a forgot password process by email or mobile.
 * Usage: Triggered when user submits their identifier to receive OTP or reset instructions.
 * Success: Shows a success toast and returns the response data.
 * Error: Shows an error toast and rejects the promise with error.
 */

const forgotPassword = createAsyncThunk('FORGOT_PASSWORD', async (values, { rejectWithValue }) => {
    try {
        const data = await api.post(API.AUTH.FORGOT_PASSWORD, values);
        toast.success(data.message)
        return data;
    } catch (error) {
        toast.error(error.message)
        return rejectWithValue(error)
    }
})

/**
 * verifyOTP
 * Description: Verifies the OTP sent to user email or mobile.
 * Usage: Triggered after the user enters the OTP in the verification screen.
 * Success: Shows a success toast and returns the response.
 * Error: Displays an error toast and rejects the value for error handling in redux.
 */

const verifyOTP = createAsyncThunk('VERIFY_OTP', async (values, { rejectWithValue }) => {
    try {
        const data = await api.post(API.AUTH.VERIFY_OTP, values);
        toast.success(data.message)
        return data;
    } catch (error) {
        toast.error(error.message)
        return rejectWithValue(error)
    }
})


/**
 * resetPassword
 * Description: Resets the password after OTP verification is successful.
 * Usage: Triggered when the user submits the new password form.
 * Success: Displays a success toast and returns response to reducer for further navigation/logging in.
 * Error: Displays an error toast and returns rejected error to be handled by redux slice.
 */

const resetPassword = createAsyncThunk('RESET_PASSWORD', async (values, { rejectWithValue }) => {
    try {
        const data = await api.post(API.AUTH.RESET_PASSWORD, values);
        toast.success(data.message)
        return data;
    } catch (error) {
        toast.error(error.message)
        return rejectWithValue(error)
    }
})

export { login, forgotPassword, verifyOTP, resetPassword }