import { useEffect, useState, useContext } from "react";
import { useNavigate, Navigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext.jsx";
import api from "../../services/api.js";

function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [originalProfile, setOriginalProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [isEditing, setIsEditing] = useState(false);
    const navigate = useNavigate();
    const { isAuth } = useContext(AuthContext);
    
    console.log('ProfilePage - isAuth:', isAuth);

    useEffect(() => {
        console.log("ProfilePage useEffect triggered");
    //     if (isAuth) {
    //         fetchProfile();
    //     }
    // }, [isAuth]);
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        console.log("Fetching profile...");
        setIsLoading(true);
        try {
            const token = localStorage.getItem('token');
            console.log("Current token:", token);
            const response = await api.get('/api/users/profile');
            console.log("Profile fetched successfully:", response.data);
            setProfile(response.data);
            setError('');
        } catch (error) {
            console.error('Fetching profile failed:', error);
            console.error('Error response:', error.response);
            if (error.response && error.response.status === 401) {
                setError('Your session has expired. Please log in again.');
                // navigate('/login');
            } else {
                setError('Failed to fetch profile. Please try again later.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProfile({ ...profile, [name]: value });
    };

    const handleEdit = () => {
        setOriginalProfile({...profile});
        setIsEditing(true);
    };

    const handleCancel = () => {
        setProfile(originalProfile);
        setIsEditing(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        try {
            const response = await api.put('/api/users/profile', profile);
            setProfile(response.data);
            setIsEditing(false);
        } catch (error) {
            console.error('Updating profile failed:', error);
            if (error.response && error.response.status === 401) {
                setError('Your session has expired. Please log in again.');
                // navigate('/login');
            } else {
                setError('Er is een fout opgetreden bij het bijwerken van het profiel. Probeer het later opnieuw.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    // if (!isAuth) {
    //     console.log('User not authenticated, redirecting to login');
    //     return <Navigate to="/login" />;
    // }

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>{error}</div>;
    if (!profile) return <div>No profile data available</div>;

    return (
        <div className='profile-container'>
            <h2>Gebruikers Profiel</h2>
            {error && <div className='error-message'>{error}</div>}
            <div>
                <p><strong>Gebruikersnaam:</strong> {profile.username}</p>
                <p><strong>Email:</strong> {profile.email}</p>
            </div>
            {isEditing ? (
                <form onSubmit={handleSubmit}>
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
                            type="date"
                            id="doB"
                            name="doB"
                            value={profile.doB}
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
                    <button type="submit">Opslaan</button>
                    <button type="button" onClick={handleCancel}>Annuleren</button>
                </form>
            ) : (
                <div>
                    <p><strong>Naam:</strong> {profile.name || 'Niet ingesteld'}</p>
                    <p><strong>Geboortedatum:</strong> {profile.doB || 'Niet ingesteld'}</p>
                    <p><strong>Adres:</strong> {profile.address || 'Niet ingesteld'}</p>
                    <button onClick={handleEdit}>Wijzigen</button>
                </div>
            )}
        </div>
    );
}

export default ProfilePage;