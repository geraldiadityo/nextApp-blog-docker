import { fetchWrapper } from "@/helpers/fetch-wrapper";
import { publicRuntimeConfig } from "@/next.config";

const baseUrl = `${publicRuntimeConfig.apiUrl}/role`;

export const roleService = {
    getall,
    getOne,
    add,
    edit,
    delete: _delete
};

async function getall(){
    return await fetchWrapper.get(`${baseUrl}`);
}

async function getOne(id){
    return await fetchWrapper.get(`${baseUrl}/${id}`);
}

async function add(data){
    return await fetchWrapper.post(`${baseUrl}`,data);
}

async function edit(id, data){
    return await fetchWrapper.put(`${baseUrl}/${id}`,data);
}

async function _delete(id){
    return await fetchWrapper.delete(`${baseUrl}/${id}`);
}