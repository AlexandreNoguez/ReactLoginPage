/* eslint-disable consistent-return */
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333/api",
});

export const createNewUser = async (data) => {
    console.log('createNewUser', data);
    return api.post("/user", data)
};

export const createSession = async (email, password) => {
    return api.post("/user/authenticate", { email, password });
};

export const getRepositories = async (userId, query) => {
    let url = `/user/${userId}/repositories`;
    if (query !== "") {
        url += `?q=${query}`;
    }
    
    return api.get(url);
};

const getRepositoryName = (url) => {
    const regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;
    const match = url.match(regex);

    if (match[2]) {
        const values = match[2].split("/");
        return `${values[1]}/${values[2]}`;
    }
};

export const createRepository = async (userId, repositoryUrl, error) => {
    const repositoryName = getRepositoryName(repositoryUrl);
    const url = `/user/${userId}/repositories/`;


    return api.post(url, {
        name: repositoryName,
        url: repositoryUrl,
    });
};

export const deleteRepository = async (userId, id) => {
    const url = `/user/${userId}/repositories/${id}`;
    return api.delete(url);
};
