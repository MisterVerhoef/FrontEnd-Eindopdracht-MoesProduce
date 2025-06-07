import { useState, useEffect, useContext } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext.jsx';
import api from '../../services/api.js';
import './ProfilePage.css';
import MyProfile from '../../components/profileSections/MyProfile.jsx';
import ChangePassword from "../../components/profileSections/ChangePassword.jsx";
import EditProfile from "../../components/profileSections/EditProfile.jsx";
import UserAdverts from "../../components/profileSections/UserAdverts.jsx";
import SavedAds from "../../components/profileSections/SavedAds.jsx";


function ProfilePage() {
    const [profile, setProfile] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const { isAuth, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuth) {
            fetchProfile();
        } else {
            navigate('/login');
        }
    }, [isAuth, navigate]);

    useEffect(() => {

        let timer;

        if (successMessage)
            timer = setTimeout(() => {
                setSuccessMessage('');
            }, 5000);


        return () => clearTimeout(timer);
    }, [successMessage]);

    useEffect(() => {
        if (error) {
            setSuccessMessage('');
        }
    }, [error]);

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
                default:
                    setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        } else {
            setError('Er is een onverwachte fout opgetreden. Probeer het opnieuw.');
        }
    };

    if (isLoading) return <section className="loading">Laden...</section>;
    if (!profile) return <section>Geen profielgegevens beschikbaar</section>;

    return (
        <section className="inner-container">
        <section className="outer-profile-container">
            <header>
                <h2>Gebruikersprofiel van {profile ? profile.name : ''}</h2>
            </header>
            <section className="sidebar-container">
                <aside className="sidebar">
                    <nav>
                        <ul>
                            <li><Link to="/profile">Mijn Profiel</Link></li>
                            <li><Link to="/profile/edit-profile">Profiel Aanpassen</Link></li>
                            <li><Link to="/profile/saved-ads">Opgeslagen Advertenties</Link></li>
                            <li><Link to="/profile/user-adverts">Mijn Advertenties</Link></li>
                            <li><Link to="/profile/account-details">Inloggegevens</Link></li>
                            <li><Link to={logout} onClick={logout}>Uitloggen</Link>
                            </li>
                        </ul>
                    </nav>
                </aside>

                <article className="inner-profile-container">
                    {error && <div className="error-message">{error}</div>}
                    {successMessage && <div className="success-message">{successMessage}</div>}


                    <Routes>
                        <Route path="/" element={<MyProfile profile={profile} />} />
                        <Route path="/edit-profile" element={
                            <EditProfile
                                profile={profile}
                                setProfile={setProfile}
                                setSuccessMessage={setSuccessMessage}
                                setError={setError}
                            />} />
                        <Route path="/user-adverts" element={<UserAdverts />} />
                        <Route path="/saved-ads" element={<SavedAds />} />
                        <Route path="/account-details" element={<ChangePassword />} />
                    </Routes>
                </article>
            </section>
        </section>
            </section>
    );
}

export default ProfilePage;