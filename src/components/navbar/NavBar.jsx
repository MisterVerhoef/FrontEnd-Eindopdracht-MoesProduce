
import {Link} from 'react-router-dom';
import './NavBar.css';
import homeIcon from '/src/assets/images/home-icon.png';
import { AuthContext } from "../../context/AuthContext.jsx";
import {useContext} from "react";

function NavBar() {
    const { isAuth, logout } = useContext(AuthContext);
    console.log('NavBar - isAuthenticated:', isAuth);
    // const navigate = useNavigate();


    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">
                    <img src={homeIcon} alt="homeIcon" className="home-icon"/>
                </Link>
            </div>
            <ul className="navbar-links">
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