/* eslint-disable consistent-return */
import axios from "axios";

export const api = axios.create({
    baseURL: "http://localhost:3333/api",
});

// export interface IApiProps {
//     email: string;
//     password: string;
//     userId: string;
//     query: string;
//     url: string;
//     match: string;
//     repositoryUrl: string;
//     id: string;
// }

export const createNewUser = async (
    name,
    surname,
    email,
    emailCompare,
    password
) => {
    console.log(name, surname, email, emailCompare, password);
};

export const createSession = async (email, password) => {
    return api.post("/user/authenticate", { email, password });
};

export const getRepositories = async (userId, query) => {
    let url = `/user/${userId}/repositories`;
    if (query !== "") {
        url += `?q=${query}`;
    }
    console.log("query", url);
    console.log("userId", userId);
    return api.get(url);
};

const getRepositoryName = (url) => {
    const regex =
        /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()!@:%_\\+.~#?&\\/\\/=]*)/;
    const match = url.match(regex);

    console.log(match);
    if (match[2]) {
        const values = match[2].split("/");
        return `${values[1]}/${values[2]}`;
    }
};

export const createRepository = async (userId, repositoryUrl) => {
    console.log("createRepository", userId, repositoryUrl);
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
