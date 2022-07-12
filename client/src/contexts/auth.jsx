/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession, createNewUser } from "../services/api";

export const AuthContext = createContext("");

function AuthContextProvider({ children }) {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const isUserLogged = localStorage.getItem("user");
        const token = localStorage.getItem("token");
        if (isUserLogged && token) {
            setUser(JSON.parse(isUserLogged));
            api.defaults.headers.Authorization = `Bearer ${token}`;
        }
        setLoading(false);
    }, []);

    const handleCreateNewUser = async (data) => {

        const response = await createNewUser(data, error);

        const { user } = response.data;
        const { token } = response.data;

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(user);
        navigate("/home");
    };

    const handleLogin = async (email, password) => {
        const response = await createSession(email, password);
        console.log("response.data", response);
        const { user } = response.data;
        const { token } = response.data;
        // console.log("response", response);
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", token);

        // console.log("token do auth", token);
        api.defaults.headers.Authorization = `Bearer ${token}`;
        setUser(user);
        navigate("/home");
    };

    const handleLogout = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        api.defaults.headers.Authorization = null;
        setUser(null);
        navigate("/");
    };
    return (
        <AuthContext.Provider
            value={{
                authenticated: !!user,
                user,
                loading,
                navigate,
                handleLogin,
                handleLogout,
                handleCreateNewUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
