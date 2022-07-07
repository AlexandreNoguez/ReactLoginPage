/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { api, createSession } from "../services/api";

// export interface IAuthContext {
//     user?: {
//         email: string;
//         password: string;
//     } | null;
//     authenticated?: boolean;
//     loading: boolean;
//     token: string;
//     handleLogin?: (email: string, password: string) => void;
//     handleLogout?: () => void;
// }

// export interface IAuthContextProvider {
//     children: React.ReactNode;
// }

// export interface IHandleLoginProps {
//     email: string;
//     password: string;
// }

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

    const handleLogin = async (email, password) => {
        const response = await createSession(email, password);
        // console.log("response.data", response.data);
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
                handleLogin,
                handleLogout,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;
