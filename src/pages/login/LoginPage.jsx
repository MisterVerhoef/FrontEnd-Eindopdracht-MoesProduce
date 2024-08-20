import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './LoginPage.css'

function LoginPage() {
    const [usernameOrEmail, setUsernameOrEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post('http://localhost:8080/api/users/login',
                { usernameOrEmail, password },
                {
                    withCredentials: true,
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            // Assuming the backend returns a token in the response data
            localStorage.setItem('token', response.data.token);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            setError('Foutieve gebruikersnaam/email of wachtwoord');
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