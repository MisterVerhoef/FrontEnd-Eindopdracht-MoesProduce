import { Link } from 'react-router-dom';
import './NavBar.css';
import homeIcon from '/src/assets/images/home-icon.png';
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";
import SearchBar from "../searchBar/SearchBar.jsx";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const [menuOpen, setMenuOpen] = useState(false);


    return (
        <header className="navbar">
            <section className="navbar-section navbar-logo">
                <Link to="/">
                    <img src={homeIcon} alt="Home" className="home-icon" />
                </Link>
            </section>

            <section className="navbar-section navbar-search">
              <SearchBar/>
            </section>

            <button className="menu-toggle"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle navigation">
                ☰
                 </button>

            <nav className={`navbar-links ${menuOpen ? 'active' : 'hidden'}`}>
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
                            <li>
                                <button onClick={logout} className="logout-button">Logout</button>
                            </li>
                        </>
                    )}
                </ul>
            </nav>
        </header>
    );
}

export default NavBar;
