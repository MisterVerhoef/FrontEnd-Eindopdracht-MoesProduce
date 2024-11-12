import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './SearchResultsPage.css';
import { searchAdverts } from "../../services/api.js";

function SearchResultsPage() {
    const [searchResults, setSearchResults] = useState([]);
    const location = useLocation();


    const query = new URLSearchParams(location.search).get('query');

    useEffect(() => {

        const fetchSearchResults = async () => {
            try {
                if (query) {
                    const response = await searchAdverts(query);
                    if (Array.isArray(response.data)) {
                        setSearchResults(response.data);
                    } else {
                        console.error("Verwachte een array als zoekresultaat, maar kreeg:", response.data);
                    }
                }
            } catch (error) {
                console.error("Fout bij het ophalen van zoekresultaten", error);
            }
        };
        fetchSearchResults();
    }, [query]);

    return (
        <div className="search-results-page">
            <h1>Zoekresultaten voor "{query}"</h1>

            {Array.isArray(searchResults) && searchResults.length > 0 ? (
                <ul className="search-results-list">
                    {searchResults.map((result) => (
                        <li key={result.id} className="search-result-item">
                            <Link to={`/adverts/${result.id}`}>
                                <h3>{result.title}</h3>
                                <p>{result.description}</p>
                            </Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Geen resultaten gevonden voor "{query}".</p>
            )}
        </div>
    );
}

export default SearchResultsPage;
