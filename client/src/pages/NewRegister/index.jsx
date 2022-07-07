import "./styles.css";

function NewRegister() {
    return (
        <div className="container">
            <div className="content">
                <h1>Preencha seus dados</h1>
                <p>e organize seus repositórios favoritos!</p>
                <form className="register-form">
                    <div className="name">
                        <label htmlFor="name" id="name">
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Nome"
                            />
                        </label>
                        <label htmlFor="surname" id="surname">
                            <input
                                type="text"
                                name="surname"
                                id="surname"
                                placeholder="Sobrenome"
                            />
                        </label>
                    </div>
                    <label htmlFor="email" id="email">
                        <input
                            type="email"
                            name="email"
                            id="email"
                            placeholder="E-mail"
                        />
                    </label>
                    <div className="password">
                        <label htmlFor="password" id="password">
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Senha"
                            />
                        </label>
                        <label htmlFor="password" id="password">
                            <input
                                type="text"
                                name="password"
                                id="password"
                                placeholder="Repita sua senha"
                            />
                        </label>
                    </div>
                    <div className="buttons">
                        <button className="cancel" type="submit">
                            Cancelar
                        </button>
                        <button className="confirm" type="submit">
                            Enviar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default NewRegister;
