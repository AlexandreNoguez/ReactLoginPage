/* eslint-disable no-underscore-dangle */
import { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

import Header from "../../components/Header";
import Repositories from "../../components/Repositories";
import SearchBar from "../../components/SearchBar";
import { AuthContext } from "../../contexts/auth";
import {
    getRepositories,
    createRepository,
    deleteRepository,
} from "../../services/api";

import "./styles.css";

function HomePage() {
    const { handleLogout, user } = useContext(AuthContext);
    const [repositories, setRepositories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingError, setLoadingError] = useState(false);

    const loadData = async (query = "") => {
        try {
            const response = await getRepositories(user?._id, query);
            console.log("getRepo", response);
            setRepositories(response.data);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoadingError(true);
        }
    };

    useEffect(() => {
        loadData();
    }, []);

    const handleSearch = (query) => {
        loadData(query);
        // console.log("query", query);
    };
    const handleDeleteRepo = async (repository) => {
        // console.log("delete repo", repository);
        await deleteRepository(user?._id, repository._id);
        loadData();
    };
    const handleAddNewRepo = async (url) => {
        try {
            await createRepository(user?._id, url);
            await loadData();
        } catch (error) {
            console.error(error);
            setLoadingError(true);
        }
    };

    if (loadingError) {
        return (
            <div className="loading">
                Erro ao carregar.
                <Link onClick={handleLogout} to="/">
                    Voltar
                </Link>
            </div>
        );
    }

    if (loading) {
        return <div className="loading">Carregando...</div>;
    }

    return (
        <div>
            <Header handleLogout={handleLogout} />
            <SearchBar handleSearch={handleSearch} />
            <Repositories
                repositories={repositories}
                handleDeleteRepo={handleDeleteRepo}
                handleAddNewRepo={handleAddNewRepo}
            />
        </div>
    );
}

export default HomePage;
