
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";

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
    <form onSubmit={handleSubmit}>
        <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
        />
        <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
        />
        <button type="submit">Login</button>
    </form>
)




}

export default LoginPage;