import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';

const ProfilePage = () => {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const { isAuth, logout } = useContext(AuthContext);
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
        console.error('API Error:', err);
        if (err.response) {
            switch (err.response.status) {
                case 401:
                    setError('Your session has expired. Please log in again.');
                    logout();
                    navigate('/login');
                    break;
                case 400:
                    setError(err.response.data.message || 'Invalid data. Please check your inputs and try again.');
                    break;
                default:
                    setError('Er ging iets fout. Probeer het later nog eens.');
            }
        } else if (err.request) {
            setError('No response received from server. Please check your internet connection.');
        } else {
            setError('Er ging iets fout. Probeer het later nog eens.');
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile(prev => ({ ...prev, [name]: value }));
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
            setSuccessMessage('Profiel is succesvol gewijzigd.');
            setIsEditing(false);
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

    if (isLoading) return <div>Loading...</div>;
    if (!profile) return <div>No profile data available</div>;

    return (
        <div className="outer-form-container">
            <h2>User Profile</h2>
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
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
                            <label htmlFor="email">Email:</label>
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
                            <label htmlFor="doB">Geboorte Datum:</label>
                            <input
                                type="date"
                                id="doB"
                                name="doB"
                                value={profile.doB || ''}
                                onChange={handleInputChange}
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
                            {isLoading ? 'Updating...' : 'Update Profile'}
                        </button>
                        <button type="button" onClick={handleCancel} disabled={isLoading}>
                            Cancel
                        </button>
                    </form>
                ) : (
                    <div>
                        <p><strong>Gebruikersnaam:</strong> {profile.username}</p>
                        <p><strong>Email:</strong> {profile.email}</p>
                        <p><strong>Naam:</strong> {profile.name || 'Not set'}</p>
                        <p><strong>Geboorte datum:</strong> {profile.doB || 'Not set'}</p>
                        <p><strong>Adres:</strong> {profile.address || 'Not set'}</p>
                        <button onClick={handleEdit}>Profiel bewerken</button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProfilePage;