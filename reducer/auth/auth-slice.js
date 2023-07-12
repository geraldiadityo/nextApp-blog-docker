import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isLoggedIn: false,
    user: null
};

export const authSlice = createSlice({
    name: 'auth',
    initialState: initialState,
    reducers: {
        deAuthenticated: (state) => {
            state.isLoggedIn = false;
        },
        authenticated: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        },
        restoreAuthState: (state, action) => {
            state.isLoggedIn = true;
            state.user = action.payload;
        }
    },
});

export const { deAuthenticated, authenticated, restoreAuthState } = authSlice.actions;
export default authSlice.reducer;
