import {useForm} from "react-hook-form";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {loginUser} from "../../services/api.js";
import './Login.css';


function Login() {
    const {register, handleSubmit, formState: {errors}} = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const {login} = useContext(AuthContext);

    const onSubmit = async (data) => {
        setError('');
        setIsLoading(true);

        try {
            const response = await loginUser(data);

            console.log('Login response:', response.data);

            if (response.data.token) {
                login(response.data.token);
                console.log('Token stored and user authenticated');
            } else {
                setError('No token received from server');
            }
        } catch (error) {
            console.error('Login failed:', error);
            setError('Invalid username/email or password');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <article className="input-form-container" id="login-container">
            <header>
                <h1>Login</h1>
            </header>
            <form onSubmit={handleSubmit(onSubmit)}>
                {error && <div className="error-message">{error}</div>}
                <fieldset>
                    <legend>Inloggegevens</legend>
                    <div>
                        <label htmlFor="usernameOrEmail">Gebruikersnaam of email:</label>
                        <input
                            id="usernameOrEmail"
                            type="text"
                            placeholder="Voer hier je gebruikersnaam of E-mail in"
                            {...register("usernameOrEmail", {
                                required: "Gebruikersnaam of email is verplicht"
                            })}
                        />
                        {errors.usernameOrEmail &&
                            <span className="error-message">{errors.usernameOrEmail.message}</span>}
                    </div>
                    <div>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Voer hier je wachtwoord in"
                            {...register("password", {
                                required: "Wachtwoord is verplicht"
                            })}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>
                </fieldset>
                <button type="submit" disabled={isLoading}>
                    {isLoading ? 'Bezig met inloggen...' : 'Inloggen'}
                </button>
            </form>
        </article>
    );
}

export default Login;