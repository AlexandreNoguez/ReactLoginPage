import axios from 'axios'
import { toast } from "react-toastify";

export const api = axios.create({
    baseURL: "http://localhost:3333/api",
});

export const createNewUser = async (data) => {
    try {
        toast.success("Usuário criado com sucesso!")  
        return api.post("/user", data).then((res) => {
            console.log("res do create", res)
        })
            
    } catch (error) {
        console.error("createNewUser", error)
        return toast.error("Usuário já existente, tente recuperar a senha.") 
    }
};

export const createSession = async (email, password) => {
    try {
        // console.log(email)
        return api.post("/user/authenticate", { email, password })
    } catch (error) {
        console.log(error)
        if(error) return toast.error("Usuário ou senha inválido.")
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