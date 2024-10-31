
import {Link} from 'react-router-dom';
import './NavBar.css';
import homeIcon from '/src/assets/images/home-icon.png';
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext, useState} from "react";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    const [searchQuery, setSearchQuery] = useState('');
    // const { history } = useHistory();
    console.log('NavBar - isAuthenticated:', isAuth);

    const handleSearch = (event) => {
        event.preventDefault();
        history.push(`/search?query=${encodeURIComponent(searchQuery)}`);
    };


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={homeIcon} alt="homeIcon" className="home-icon"/>
                </Link>
                {/*<div className="navSearchBar">*/}
                {/*<form onSubmit={handleSearch}>*/}
                {/*    <input type="text"*/}
                {/*           placeholder="Zoeken..."*/}
                {/*    value={searchQuery}*/}
                {/*           onChange={(e) => setSearchQuery(e.target.value)}*/}
                {/*    />*/}
                {/*    <button type="submit">Zoeken</button>*/}
                {/*</form>*/}
                {/*</div>*/}
            </div>
            <ul className="navbar-links">
                <li>
                    <Link to="/creeradvert">plaats advertentie</Link>
                </li>
                <li>
                    <Link to="/adverts">Advertenties</Link>
                </li>
                {!isAuth ? (
                    <>
                        <li>
                            <Link to="/login">Login</Link>
                        </li>
                        <li>
                            <Link to="/register">Register</Link>
                        </li>
                    </>
                ) : (
                    <>
                        <li>
                            <Link to="/profile">Profile</Link>
                        </li>
                        <li>
                            <button onClick={logout}>Logout
                            </button>
                        </li>
                    </>
                )}
            </ul>
        </nav>
    );
}

export default NavBar;