import './LoginPage.css'
import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import { AuthContext } from "../../context/AuthContext.jsx";

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login } = useContext(AuthContext);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await api.post('/api/users/login', { usernameOrEmail, password });
            console.log('Login response:', response.data);

            if (response.data.token) {
                login(response.data.token);
                console.log('Token stored and user authenticated');
                navigate('/');
            } else {
                setError('No token received from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username/email or password');
        }
    };

    return (
        <div className="outer-form-container">
            <div className="inner-form-container" id="login-container">
                <h1>Login</h1>
                <form onSubmit={handleSubmit}>
                    {error && <div className="error-message">{error}</div>}
                    <div>
                        <label htmlFor="usernameOrEmail">Voer hier je gebruikersnaam of emailadres in om in te loggen.</label>
                        <input
                            id="usernameOrEmail"
                            type="text"
                            value={usernameOrEmail}
                            onChange={(e) => setUsernameOrEmail(e.target.value)}
                            placeholder="Voer hier je gebruikersnaam of e-mail in"
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="password">Voer hier je wachtwoord in om in te loggen.</label>
                        <input
                            id="password"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Voer hier je wachtwoord in"
                            required
                        />
                    </div>
                    <button type="submit">Inloggen</button>
                </form>
            </div>
        </div>
    );
}

export default LoginPage;