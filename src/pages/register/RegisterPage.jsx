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


        <div className='inner-form-container'>
            <h2>Registreer je hier voor een MoesProduce account</h2>
            <form className='registerForm' onSubmit={handleSubmit}>
                Voer hier je gewenste gebruikersnaam in:
                <input type="text"
                       placeholder="Gebruikersnaam"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
                Voer hier je emailadres in:
                <input type="email"
                       placeholder="Emailadres"
                       value={email}
                       onChange={(e) => setEmail(e.target.value)}/>
                Voer hier je wachtwoord in:
                <input type="password"
                       placeholder="Wachtwoord"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
                <button type="submit">Registeer</button>
            </form>
        </div>
)

}

export default RegisterPage;