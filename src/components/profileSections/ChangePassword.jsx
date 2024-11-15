import {useState} from "react";
import api, {loginUser} from '../../services/api.js';
import {changePassword} from "../../services/api.js";

function ChangePassword() {
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handlePasswordInputChange = (e) => {
        const {name, value} = e.target;
        setPasswordData(prev => ({...prev, [name]: value}));
    };

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (passwordData.newPassword !== passwordData.confirmPassword) {
            setError('Nieuwe wachtwoorden komen niet overeen');
            return;
        }

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await changePassword(passwordData);
            setSuccessMessage('Wachtwoord succesvol gewijzigd');
            setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <article className="inner-form-container">
            <header>
                <h3>Wachtwoord Wijzigen</h3>
            </header>
            <form onSubmit={handlePasswordChange}>
                <fieldset>
                    <legend>Wachtwoord Wijzigen</legend>
                    <div>
                        <label htmlFor="currentPassword">Huidig Wachtwoord:</label>
                        <input
                            type="password"
                            id="currentPassword"
                            name="currentPassword"
                            value={passwordData.currentPassword}
                            onChange={handlePasswordInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="newPassword">Nieuw Wachtwoord:</label>
                        <input
                            type="password"
                            id="newPassword"
                            name="newPassword"
                            value={passwordData.newPassword}
                            onChange={handlePasswordInputChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="confirmPassword">Bevestig Nieuw Wachtwoord:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            value={passwordData.confirmPassword}
                            onChange={handlePasswordInputChange}
                            required
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Wachtwoord Wijzigen...' : 'Wachtwoord Wijzigen'}
                    </button>
                </fieldset>
            </form>
            {error && <p className="error">{error}</p>}
            {successMessage && <p className="success">{successMessage}</p>}
        </article>
    );
}

export default ChangePassword;