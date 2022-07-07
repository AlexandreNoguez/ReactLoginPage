function Header({ handleLogout }) {
    return (
        <header className="homeHeader">
            <h1>Repo Storage</h1>
            <button type="submit" onClick={handleLogout}>
                Sair
            </button>
        </header>
    );
}

export default Header;
