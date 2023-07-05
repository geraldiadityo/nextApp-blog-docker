import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";

import { fetchWrapper } from "@/helpers/fetch-wrapper";

const { publicRuntimeConfig } = getConfig();

const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));

export const userServices = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
    logout
};

async function login(data){
    const user = await fetchWrapper.post(`${baseUrl}/auth`,data);
    userSubject.next(user);
    localStorage.setItem("user", JSON.stringify(user));
}

function logout() {
    localStorage.removeItem("user");
    userSubject.next(null);
    Router.push("/users/auth");
}

async function getDataPost(userId, published){
   return await fetchWrapper.get(`${baseUrl}/users/posts/${userId}/${published}`);
}