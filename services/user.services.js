import { BehaviorSubject } from "rxjs";
import getConfig from "next/config";
import Router from "next/router";
import { fetchWrapper } from "@/helpers/fetch-wrapper";
const { publicRuntimeConfig } = getConfig();
// const dispatch = useDispatch();
const baseUrl = `${publicRuntimeConfig.apiUrl}/users`;
const userSubject = new BehaviorSubject(typeof window !== 'undefined' && JSON.parse(localStorage.getItem('user')));
export const userServices = {
    user: userSubject.asObservable(),
    get userValue() { return userSubject.value },
    login,
};

async function login(data){
    const user = await fetchWrapper.post(`${baseUrl}/auth`,data);
    return user;
}

async function getDataPost(userId, published){
   return await fetchWrapper.get(`${baseUrl}/users/posts/${userId}/${published}`);
}