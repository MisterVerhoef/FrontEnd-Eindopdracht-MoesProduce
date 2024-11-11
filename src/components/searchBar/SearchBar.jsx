import "./SearchBar.css";
import {searchAdverts} from "../../services/api"
import {useEffect, useState} from "react";
import {Link} from "react-router-dom";


function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const handleSearch = async (event) => {
        event.preventDefault();
        console.log(`Search query: ${searchQuery}`);

        try {
            const response = await searchAdverts(searchQuery);
            console.log("Zoekresultaten", response.data);

            if (Array.isArray(response.data)) {
                setSearchResults(response.data);
            } else {
                console.error("Verwachte een array als zoekresultaat, maar kreeg:", response.data);
                setSearchResults([]);
            }
        } catch (error) {
            console.error("Fout bij het ophalen van de zoekresultaten", error);
            setSearchResults([]); // Stel een lege lijst in als er een fout optreedt
        }
    };


useEffect(() => {
    console.log("Search results updated:", searchResults);
}, [searchResults]);

return (
    <div className="search-bar">
        <form onSubmit={handleSearch} className="search-form">
            <input
                type="text"
                placeholder="Zoeken..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="search-input"
            />
            <button type="submit" className="search-button">Zoeken</button>
        </form>

        {/* Zoekresultaten weergeven, alleen als de resultaten een geldige array zijn */}
        {Array.isArray(searchResults) && searchResults.length > 0 ? (
            <section className="search-results">
                <h2>Zoekresultaten:</h2>
                <ul>
                    {searchResults.map((result) => (
                        result && (
                            <li key={result.id}>
                                <Link to={`/adverts/${result.id}`}>
                                    <h3>{result.title}</h3>
                                    <p>{result.description}</p>
                                </Link>
                            </li>
                        )
                    ))}
                </ul>
            </section>
        ) : (

            searchQuery && <p>Geen resultaten gevonden voor "{searchQuery}".</p>
        )}
    </div>
);

}

export default SearchBar;