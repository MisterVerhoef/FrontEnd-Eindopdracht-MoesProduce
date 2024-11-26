import "./SearchBar.css";
import {useEffect, useState} from "react";
import {Link, useNavigate} from "react-router-dom";



function SearchBar() {
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


    const handleSearch = async (event) => {
        event.preventDefault();
        console.log(`Search query: ${searchQuery}`);

        if (searchQuery.trim() !== '') {

            navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
        }
    };


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

    </div>
);

}

export default SearchBar;