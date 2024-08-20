import {useState} from "react";
import {Link} from 'react-router-dom';
import './NavBar.css';
import homeIcon from '/src/assets/images/home-icon.png';

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/"><img src={homeIcon} alt="homeIcon" className="home-icon"/></Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/adverts">Advertenties</Link></li>
                {!isLoggedIn ? (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><button onClick={() => setIsLoggedIn(false)}>Logout</button></li>
                    </>
                )}
            </ul>
        </nav>
    );


}
export default NavBar;