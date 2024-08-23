
import './LoginPage.css'
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../services/api.js";
import './LoginPage.css'

function LoginPage({ setIsAuthenticated }) {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    // const {setIsAuthenticated } = useAuth();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setIsLoading(true);

        try {
            const response = await api.post('/api/users/login', { usernameOrEmail, password });
            console.log('Login response:', response.data);

            if (response.data.token) {
                localStorage.setItem('token', response.data.token);
                api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;
                setIsAuthenticated(true);
                navigate('/');
            } else {
                setError('No token received from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Foutieve gebruikersnaam/email of wachtwoord');
        } finally {
            setIsLoading(false);
        }
    }

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
                            disabled={isLoading}
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
                            disabled={isLoading}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                    </button>
                </form>
            </div>
        </div>
    );
}
export default LoginPage;