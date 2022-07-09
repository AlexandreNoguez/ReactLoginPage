import { useState } from "react";

function Repositories({ handleDeleteRepo, handleAddNewRepo, repositories }) {
    const [newRepo, setNewRepo] = useState("");

    return (
        <div id="repos">
            <h2 className="saved-repo">Repositórios Salvos</h2>
            <ul className="list">
                {repositories.map((repo) => (
                    <li className="item" key={repo._id}>
                        <div className="info">
                            <div className="owner">
                                <span className="owner-repo">De: </span>
                                {repo.name.substring(0, repo.name.indexOf("/"))}
                            </div>
                            <div className="repo-name">
                                <span className="name-repo">Repo: </span>

                                {repo.name.substring(
                                    repo.name.indexOf("/") + 1
                                )}
                            </div>
                        </div>
                        <div className="repo-link">
                            <a href={repo.url} target="_blank" rel="noreferrer">
                                {repo.url}
                            </a>
                        </div>
                        <button
                            onClick={() => handleDeleteRepo(repo)}
                            type="submit"
                        >
                            Apagar
                        </button>
                    </li>
                ))}
            </ul>
            <div className="new">
                <label htmlFor="new-repo">
                    URL do repositório
                    <input
                        type="url"
                        name="new-repo"
                        id="new-repo"
                        value={newRepo}
                        onChange={(e) => setNewRepo(e.target.value)}
                    />
                    <button
                        onClick={() => handleAddNewRepo(newRepo)}
                        type="submit"
                    >
                        Adicionar
                    </button>
                </label>
            </div>
        </div>
    );
}

export default Repositories;
