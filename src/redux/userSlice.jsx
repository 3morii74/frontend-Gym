// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    token: localStorage.getItem('token') || null,
    verification: false
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
