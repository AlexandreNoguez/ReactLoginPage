/* eslint-disable jsx-a11y/label-has-associated-control */
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";
import "./styles.css";

function LoginPage() {
    const { handleLogin } = useContext(AuthContext);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        // setLoading(true);
        handleLogin(email, password);
        // setLoading(false);
    };

    return (
        <div id="login">
            <div className="login-text">
                <h1 className="title">Organizador de Repos</h1>
                <p className="login-text">
                    Faça seu cadastro e guarde seus repositórios mais
                    consultados de forma ágil e organizada!
                </p>
            </div>
            <form className="form" onSubmit={handleSubmit}>
                <div className="field">
                    <label htmlFor="email">
                        E-mail
                        <input
                            autoComplete="on"
                            type="email"
                            name="email"
                            id="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </label>
                </div>
                <div className="field">
                    <label htmlFor="password">Senha</label>
                    <input
                        autoComplete="on"
                        type="password"
                        name="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="actions">
                    <button type="submit">Entrar</button>
                </div>
                <span className="register">
                    Ainda não possui cadastro?{" "}
                    <strong>
                        <Link to="/cadastro">CADASTRE-SE</Link>
                    </strong>
                </span>
            </form>
        </div>
    );
}

export default LoginPage;
