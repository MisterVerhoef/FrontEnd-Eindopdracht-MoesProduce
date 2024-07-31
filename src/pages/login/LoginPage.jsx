
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import './LoginPage.css'

function LoginPage(){

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { email, password });
            login(response.data);
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
        }
    }
return (
    <div className="inner-form-container" id="login-container">
        <h1>Login</h1>
    <form onSubmit={handleSubmit}>
        Voer hier je emailadres in om in te loggen.
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="voer hier je e-mail in"
        />
        Voer hier je wachtwoord in om in te loggen.
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Voer hier je wachtwoord in"
        />
        <button type="submit">Inloggen</button>
    </form>
</div>
)




}

export default LoginPage;