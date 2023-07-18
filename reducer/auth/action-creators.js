import { deleteCookie } from "cookies-next";
import { authenticated, deAuthenticated, restoreAuthState } from "./auth-slice";

export const loginUser = (user) => async (dispatch) => {
    dispatch(authenticated(user));
};

export const logoutUser = (user) => async (dispatch) => {
    dispatch(deAuthenticated(user));
    deleteCookie("token");
};

export const checkLogin = (user) => async (dispatch) => {
    dispatch(restoreAuthState(user));
};
