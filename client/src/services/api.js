import axios from 'axios'
import { toast } from "react-toastify";

export const api = axios.create({
    // baseURL: "http://localhost:3333/api",
    baseURL: import.meta.env.VITE_API_URL,
});

export const createNewUser = async (data) => {
    return api.post("/user", data)
        .then((response) => {
            toast.success("Usuário criado com sucesso.")
        })
        .catch((error) => {
            console.error(error)
        })
};

export const createSession = async (email, password) => {
    try {
        return api.post("/user/authenticate", { email, password })
            .catch((error) =>{
                console.error(error)
                return toast.error("Usuário ou senha inválidos")
            })
    } catch (error) {
        console.log(error)
        return toast.error("Usuário ou senha inválido.")
    }
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

export const createRepository = async (userId, repositoryUrl) => {
    try {
        const repositoryName = getRepositoryName(repositoryUrl);
        const url = `/user/${userId}/repositories/`;
        toast.success("Repositório adicionado com sucesso.")
        return api.post(url, {name: repositoryName, url: repositoryUrl})
    } catch (error) {
        console.error("error do create repository", error)
        return toast.error("Ocorreu alguma falha ao adicionar repositório.")        
    }
        
 
};

export const deleteRepository = async (userId, id) => {
    
    const url = `/user/${userId}/repositories/${id}`;
    await api.delete(url)
        .then((response) => {
            console.info(response)
            return toast.success('Repositório deletado com sucesso.')
        })
        .catch((error)=>{
            console.error(error)
            return toast.error("Falha ao tentar deletar repositório.")
        })
};