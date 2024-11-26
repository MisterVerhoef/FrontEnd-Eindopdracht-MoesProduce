import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../../services/api.js";
import '../../App.css';
import './RegisterPage.css';

function RegisterPage() {
    const { register, handleSubmit, formState: { errors }, watch } = useForm();
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setError('');
        setIsLoading(true);

        try {
            const response = await registerUser(data);

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
        <section className='inner-container'>
            <section className='input-form-container'>
            <header>
                <h2>Registreer je hier voor een MoesProduce account</h2>
            </header>
            {error && <div className='error-message'>{error}</div>}
            <form className='registerForm' onSubmit={handleSubmit(onSubmit)}>
                <fieldset>
                    <legend>Registreer Informatie</legend>
                    <div className='form-group'>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input
                            id="username"
                            placeholder="Gebruikersnaam"
                            {...register("username", {
                                required: "Gebruikersnaam is verplicht",
                                minLength: { value: 3, message: "Gebruikersnaam moet minimaal 3 karakters lang zijn" }
                            })}
                        />
                        {errors.username && <span className="error-message">{errors.username.message}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="email">Emailadres:</label>
                        <input
                            id="email"
                            placeholder="Emailadres"
                            {...register("email", {
                                required: "Email is verplicht",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Ongeldig email adres"
                                }
                            })}
                        />
                        {errors.email && <span className="error-message">{errors.email.message}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="password">Wachtwoord:</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Wachtwoord"
                            {...register("password", {
                                required: "Wachtwoord is verplicht",
                                minLength: { value: 6, message: "Wachtwoord moet minimaal 6 karakters lang zijn" }
                            })}
                        />
                        {errors.password && <span className="error-message">{errors.password.message}</span>}
                    </div>
                    <div className='form-group'>
                        <label htmlFor="confirmPassword">Bevestig wachtwoord:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            placeholder="Bevestig wachtwoord"
                            {...register("confirmPassword", {
                                required: "Bevestig je wachtwoord",
                                validate: (val) => {
                                    if (watch('password') !== val) {
                                        return "Wachtwoorden komen niet overeen";
                                    }
                                }
                            })}
                        />
                        {errors.confirmPassword && <span className="error-message">{errors.confirmPassword.message}</span>}
                    </div>
                    <div className='form-group checkbox-group'>
                        <label htmlFor="termsAccepted">
                            Ik ga akkoord met de voorwaarden
                        </label>
                        <input
                            type="checkbox"
                            id="termsAccepted"
                            {...register("termsAccepted", {
                                required: "Je moet akkoord gaan met de voorwaarden"
                            })}
                        />

                        {errors.termsAccepted && <span className="error-message">{errors.termsAccepted.message}</span>}
                    </div>
                    <button type="submit" className="submit-button" disabled={isLoading}>
                        {isLoading ? 'Bezig met registreren...' : 'Registreer'}
                    </button>
                </fieldset>
            </form>
            </section>
        </section>
    );
}

export default RegisterPage;