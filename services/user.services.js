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
    getAllUser,
    getOneUser,
    addUser,
    deleteUser,
    createArticle,
    updateArticle,
    getArticle,
    deleteArticle,
    publishArticle,
};

async function login(data){
    const user = await fetchWrapper.post(`${baseUrl}/auth`,data);
    return user;
}

async function getAllUser(){
    return await fetchWrapper.get(`${baseUrl}`);
}

async function getOneUser(id){
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function addUser(data){
    return await fetchWrapper.post(`${baseUrl}`,data);
}

async function deleteUser(id){
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
}

async function createArticle(userId, data){
    return await fetchWrapper.upload(`${baseUrl}/posts/${userId}`, data);
}

async function updateArticle(id, data){
    return await fetchWrapper.uploadUpdate(`${baseUrl}/post/${id}`,data);
}

async function getArticle(userId, typePublish){
    return await fetchWrapper.get(`${baseUrl}/posts/${userId}/${typePublish}`);
}

async function getOneArticle(id){
    return await fetchWrapper.get(`${baseUrl}/post/${id}`);
}

async function deleteArticle(id){
    return await fetchWrapper.delete(`${baseUrl}/posts/${id}`);
}

async function publishArticle(id){
    return await fetchWrapper.patch(`${baseUrl}/posts/${id}`);
}


