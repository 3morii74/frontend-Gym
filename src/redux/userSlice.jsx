// src/redux/userSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie'; // Import js-cookie

const initialState = {
    userData: null,
    token: Cookies.get('access_token') || null, // Initialize from cookies
    verification: Cookies.get('verification_status') === 'true', // Convert string to boolean
};

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
        setToken: (state, action) => {
            state.token = action.payload;
        },
        setVerification: (state, action) => {
            state.verification = action.payload;
        },
    },
});

export const { setUserData, setToken, setVerification } = userSlice.actions;

export default userSlice.reducer;
