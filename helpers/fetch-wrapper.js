import { userServices } from "@/services/user.services"
import { getCookie } from "cookies-next";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

export const fetchWrapper = {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
}

function request(method) {
    return (url, body) => {
        const requestOption = {
            method,
            headers: authHeader(url)
        };

        if (body){
            requestOption.headers['Content-Type'] = 'application/json';
            requestOption.body = JSON.stringify(body);
        }

        return fetch(url, requestOption).then(handleResponse);
    }
}

function authHeader(url){
    const isLoggedIn = getCookie('token');
    const isApiUrl = url.startsWith(publicRuntimeConfig.apiUrl);
    if (isLoggedIn && isApiUrl){
        return { authorization: `Bearer ${isLoggedIn}` }
    } else {
        return {}
    }
}

async function handleResponse(response){
    const isJson = response.headers?.get('Content-Type')?.includes('application/json');
    const data = isJson ? await response.json() : null;

    if (!response.ok){
        if ([401, 403].includes(response.status) && userServices.userValue) {
            userServices.logout();
        }

        const error = (data && data.message) || response.statusText;
        return Promise.reject(error);
    }

    return data;
}