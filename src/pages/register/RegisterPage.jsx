import {useState} from "react";
import {useNavigate} from "react-router-dom";
import api from "../../services/api.js";

function RegisterPage() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const validateForm = () => {
        if (!username || !email || !password) {
            setError('Alle velden zijn verplicht');
            return false;
        }
        if (password.length < 6) {
            setError('Wachtwoord moet minstens 6 karakters lang zijn');
            return false;
        }
        return true;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const response = await api.post('/api/users/register', {
                username,
                email,
                password
            });
            console.log('Registration successful:', response.data);
            navigate('/login');
        } catch (error) {
            console.error('Registration failed:', error);
            if (error.response) {
                setError(error.response.data.message || 'Registratie mislukt. Probeer het opnieuw.');
            } else {
                setError('Er is een fout opgetreden. Controleer je internetverbinding en probeer het opnieuw.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className='inner-form-container'>
            <h2>Registreer je hier voor een MoesProduce account</h2>
            {error && <div className='error-message'>{error}</div>}
            <form className='registerForm' onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Voer hier je gewenste gebruikersnaam in:</label>
                    <input
                        type="text"
                        id="username"
                        placeholder="Gebruikersnaam"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="email">Voer hier je emailadres in:</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Emailadres"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="password">Voer hier je wachtwoord in:</label>
                    <input
                        type="password"
                        id="password"
                        placeholder="Wachtwoord"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Bezig met registreren...' : 'Registreer'}
                </button>
            </form>
        </div>
    );
}

export default RegisterPage;