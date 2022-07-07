import { useState } from "react";

function SearchBar({ handleSearch }) {
    const [query, setQuery] = useState("");
    const handleClear = () => {
        setQuery("");
        handleSearch("");
    };
    return (
        <div className="search">
            <label id="searchLabel" htmlFor="query">
                Procurar
                <input
                    type="search"
                    name="query"
                    id="query"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Ex.: React"
                />
            </label>
            <button onClick={handleClear} type="submit">
                Limpar
            </button>
            <button onClick={() => handleSearch(query)} type="submit">
                Procurar
            </button>
        </div>
    );
}

export default SearchBar;
