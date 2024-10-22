import {useState, useEffect, useContext} from 'react';
import {useNavigate} from 'react-router-dom';
import {AuthContext} from '../../context/AuthContext.jsx';
import api from '../../services/api.js';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const [passwordData, setPasswordData] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: ''
    });
    const [selectedFile, setSelectedFile] = useState(null);
    const {isAuth, logout} = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            fetchProfile();
        } else {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    const fetchProfile = async () => {
        setIsLoading(true);
        try {
            const response = await api.get('/api/users/profile');
            setProfile(response.data);
            setError('');
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleApiError = (err) => {
        console.error('API Fout:', err);
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    setError('Uw sessie is verlopen. Log alstublieft opnieuw in.');
                    logout();
                    navigate('/login');
                    break;
                case 409:
                    setError(err.response.data || 'Gebruikersnaam of e-mail is al in gebruik.');
                    break;
                case 400:
                    setError(err.response.data || 'Ongeldige gegevens. Controleer uw invoer en probeer het opnieuw.');
                    break;
                default:
                    setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        } else if (err.request) {
            setError('Geen reactie ontvangen van de server. Controleer uw internetverbinding.');
        } else {
            setError('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
        }
    };

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setProfile(prev => ({...prev, [name]: value}));
    };

    const handleDateChange = (e) => {
        const {value} = e.target;
        // Convert dd-mm-yyyy to yyyy-mm-dd for backend
        const [day, month, year] = value.split('-');
        const formattedDate = `${year}-${month}-${day}`;
        setProfile(prev => ({...prev, doB: formattedDate}));
    };

    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    const handlePasswordInputChange = (e) => {
        const {name, value} = e.target;
        setPasswordData(prev => ({...prev, [name]: value}));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            const response = await api.put('/api/users/profile', {
                username: profile.username,
                email: profile.email,
                name: profile.name,
                doB: profile.doB,
                address: profile.address
            });

            setProfile(response.data);
            setSuccessMessage('Profiel succesvol bijgewerkt');
            setIsEditing(false);
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
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
            await api.put('/api/users/change-password', {
                currentPassword: passwordData.currentPassword,
                newPassword: passwordData.newPassword
            });

            setSuccessMessage('Wachtwoord succesvol gewijzigd');
            setPasswordData({currentPassword: '', newPassword: '', confirmPassword: ''});
        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = () => setIsEditing(true);
    const handleCancel = () => {
        fetchProfile();
        setIsEditing(false);
    };

    const handleFileSelect = (event) => {

        setSelectedFile(event.target.files[0]);

    };

    const handleFileUpload = async () => {
        if (!selectedFile) {
            setError('Selecteer een bestand om te uploaden');
            return;

        }

        const formData = new FormData();
        formData.append('file', selectedFile);

        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        try {
            await api.post('/api/uploads/profile', formData, {
                headers: {'Content-Type': 'multipart/form-data'}
            });
            setSuccessMessage('Profielfoto succesvol geupload!');
            setSelectedFile(null);

            await fetchProfile(); // Refresh the profile data after successful upload

        } catch (err) {
            handleApiError(err);
        } finally {
            setIsLoading(false);
        }
    };


    if (isLoading) return <div>Laden...</div>;
    if (!profile) return <div>Geen profielgegevens beschikbaar</div>;

    return (
        <div className="outer-form-container">
            <h2>Gebruikersprofiel</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            <div className="inner-form-container">
                <h2>{profile.username}</h2>
                {profile.profileImageUrl ? (
                    <img
                        src={`${profile.profileImageUrl}?t=${new Date().getTime()}`}
                        alt="Profielfoto"
                        style={{width: '200px', height: '200px', objectFit: 'cover'}}
                    />
                ) : (
                    <div>Geen profielfoto beschikbaar.</div>
                )}
                <input
                    type="file"
                    onChange={handleFileSelect}
                    accept="image/*"
                />
                <button onClick={handleFileUpload} disabled={!selectedFile || isLoading}>
                    {isLoading ? 'Uploading...' : 'Upload Profielfoto'}
                </button>
            </div>
            <div className="inner-form-container">
                {isEditing ? (
                    <form onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="username">Gebruikersnaam:</label>
                            <input
                                type="text"
                                id="username"
                                name="username"
                                value={profile.username}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="email">E-mail:</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={profile.email}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div>
                            <label htmlFor="name">Naam:</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                value={profile.name}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div>
                            <label htmlFor="doB">Geboortedatum:</label>
                            <input
                                type="text"
                                id="doB"
                                name="doB"
                                value={formatDateForDisplay(profile.doB)}
                                onChange={handleDateChange}
                                placeholder="dd-mm-yyyy"
                            />
                        </div>
                        <div>
                            <label htmlFor="address">Adres:</label>
                            <input
                                type="text"
                                id="address"
                                name="address"
                                value={profile.address}
                                onChange={handleInputChange}
                            />
                        </div>
                        <button type="submit" disabled={isLoading}>
                            {isLoading ? 'Bijwerken...' : 'Profiel Bijwerken'}
                        </button>
                        <button type="button" onClick={handleCancel} disabled={isLoading}>
                            Annuleren
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Gebruikersnaam:</strong> {profile.username}</p>
                        <p><strong>E-mail:</strong> {profile.email}</p>
                        <p><strong>Naam:</strong> {profile.name || 'Niet ingesteld'}</p>
                        <p><strong>Geboortedatum:</strong> {formatDateForDisplay(profile.doB) || 'Niet ingesteld'}</p>
                        <p><strong>Adres:</strong> {profile.address || 'Niet ingesteld'}</p>
                        <button onClick={handleEdit}>Profiel Bewerken</button>
                    </div>
                )}
            </div>

            <div className="inner-form-container">
                <h3>Wachtwoord Wijzigen</h3>
                <form onSubmit={handlePasswordChange}>
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
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;