/* eslint-disable react/prop-types */
/* eslint-disable react/no-unstable-nested-components */
/* eslint-disable react/jsx-no-constructed-context-values */
import { useContext } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import { AuthContext } from "./contexts/auth";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import NewRegister from "./pages/NewRegister";
import UserTerms from "./pages/UserTerms";

function AppRoutes() {
    function Private({ children }) {
        const { authenticated, loading } = useContext(AuthContext);

        if (loading) {
            return <div className="isLoadingTrue">Carregando...</div>;
        }

        if (!authenticated) {
            return <Navigate to="/" />;
        }
        return children;
    }
    return (
        <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/cadastro" element={<NewRegister />} />
            <Route path="/termos" element={<UserTerms />} />
            <Route
                path="/home"
                element={
                    <Private>
                        <HomePage />
                    </Private>
                }
            />
            <Route
                path="*"
                element={
                    <Private>
                        <LoginPage />
                    </Private>
                }
            />
        </Routes>
    );
}

export default AppRoutes;
