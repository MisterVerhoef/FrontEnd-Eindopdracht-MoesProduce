import './FooterBar.css';
import { Link } from 'react-router-dom';

function FooterBar() {
    return (
        <footer className="home-page-footer">
            <p>&copy; {new Date().getFullYear()} MoesProduce. All rights reserved.</p>
            <p>
                <Link to="/algemenevoorwaarden" className="footer-link">Algemene Voorwaarden</Link>
            </p>
        </footer>
    );
}

export default FooterBar;
