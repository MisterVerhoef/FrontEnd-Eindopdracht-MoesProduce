import {useState} from "react";
import {Link} from 'react-router-dom';

function NavBar() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <nav className="navbar">
            <div className="navbar-logo">
                <Link to="/">MoesProduce Logo</Link>
            </div>
            <ul className="navbar-links">
                <li><Link to="/features">Features</Link></li>
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