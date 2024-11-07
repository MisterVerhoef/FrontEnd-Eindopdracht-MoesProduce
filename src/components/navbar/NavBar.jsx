import { Link } from 'react-router-dom';
import './NavBar.css';
import homeIcon from '/src/assets/images/home-icon.png';
import { AuthContext } from "../../context/AuthContext.jsx";
import { useContext, useState } from "react";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (event) => {
        event.preventDefault();
        console.log(`Search query: ${searchQuery}`);
    };

    return (
        <header className="navbar">
            <section className="navbar-section navbar-logo">
                <Link to="/">
                    <img src={homeIcon} alt="Home" className="home-icon" />
                </Link>
            </section>

            <section className="navbar-section navbar-search">
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
            </section>

            <nav className="navbar-section navbar-links">
                <ul>
                    <li><Link to="/creeradvert">Plaats Advertentie</Link></li>
                    <li><Link to="/adverts">Advertenties</Link></li>
                    {!isAuth ? (
                        <>
                            <li><Link to="/login">Login</Link></li>
                            <li><Link to="/register">Register</Link></li>
                        </>
                    ) : (
                        <>
                            <li><Link to="/profile">Profile</Link></li>
                            <li><button onClick={logout} className="logout-button">Logout</button></li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
