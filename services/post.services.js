import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { publicRuntimeConfig } from "@/next.config";

const baseUrl = `${publicRuntimeConfig.apiUrl}/posts`;

export const postServices = {
    getAllPost,
    getAllByCategorie,
    getOnePost,
};

async function getAllPost(){
    return await fetchWrapper.get(`${baseUrl}`);
}

async function getAllByCategorie(categorie){
    return await fetchWrapper.get(`${baseUrl}/categorie/${categorie}`);
}

async function getOnePost(id){
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}
