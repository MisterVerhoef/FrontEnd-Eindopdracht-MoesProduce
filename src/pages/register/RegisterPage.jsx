import {useState} from "react";
import {useNavigate} from "react-router-dom";

function RegisterPage() {

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [dod, setDod] = useState(new Date());
    // const {login} = useContext(AuthContext);
    const navigate = useNavigate();


    function handleSubmit() {

    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)}/>
            <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
            <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
            <button type="submit">Registeer</button>
        </form>
    )

}

export default RegisterPage;