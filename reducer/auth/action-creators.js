import { deleteCookie } from "cookies-next";
import { authenticated, deAuthenticated, restoreAuthState } from "./auth-slice";

export const loginUser = (user) => async (dispatch) => {
    dispatch(authenticated(user));
};

export const logoutUser = (user) => async (dispatch) => {
    dispatch(deAuthenticated(user));
};

export const checkLogin = (user) => async (dispatch) => {
    dispatch(restoreAuthState(user));
};
