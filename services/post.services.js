import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { publicRuntimeConfig } from "@/next.config";

const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;

export const postServices = {
    getAllPost,
    getOnePost,
};

async function getAllPost(){
    return await fetchWrapper.get(`${baseUrl}`);
}

async function getOnePost(id){
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}