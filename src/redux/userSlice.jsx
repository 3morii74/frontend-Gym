// src/redux/userSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    userData: null,
    token: localStorage.getItem('token') || null, // Keep token from localStorage if available
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
    },
});

export const { setUserData, setToken } = userSlice.actions;

export default userSlice.reducer;
