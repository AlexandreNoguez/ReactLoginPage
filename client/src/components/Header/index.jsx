import { useContext } from "react";
import { AuthContext } from "../../contexts/auth";

function Header({ handleLogout }) {
    const { user } = useContext(AuthContext)
    return (
        <header className="homeHeader">
            <h1>Repo Storage</h1>
            <span>Olá! <strong>{user.name}</strong></span>
            <button type="submit" onClick={handleLogout}>
                Sair
            </button>
        </header>
    );
}

export default Header;
