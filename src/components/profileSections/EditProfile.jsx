import { useState, useEffect } from 'react';
import api from '../../services/api.js';

function EditProfile({ profile, setProfile, setSuccessMessage, setError }) {
    // Functie om ISO-datum naar dd-mm-yyyy te formatteren voor weergave
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return '';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    // Functie om dd-mm-yyyy naar ISO-formaat (yyyy-mm-dd) te formatteren voor backend
    const formatDateForBackend = (dateString) => {
        if (!dateString) return '';
        const [day, month, year] = dateString.split('-');
        return `${year}-${month}-${day}`;
    };

    const [formData, setFormData] = useState({
        username: profile?.username || '',
        email: profile?.email || '',
        name: profile?.name || '',
        doB: profile?.doB ? formatDateForDisplay(profile.doB) : '',
        address: profile?.address || '',
    });
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if (profile) {
            setFormData({
                username: profile.username,
                email: profile.email,
                name: profile.name,
                doB: profile.doB ? formatDateForDisplay(profile.doB) : '',
                address: profile.address,
            });
        }
    }, [profile]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');
        setSuccessMessage('');

        const formattedFormData = {
            ...formData,
            doB: formatDateForBackend(formData.doB), // Datum omzetten naar backend-formaat
        };

        try {
            const response = await api.put('/api/users/profile', formattedFormData);
            setProfile(response.data);
            setSuccessMessage('Profiel succesvol bijgewerkt');
        } catch (err) {
            if (err.response && err.response.data) {
                setError(err.response.data);
            } else {
                setError('Er is een fout opgetreden. Probeer het later opnieuw.');
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <section className='inner-form-container'>
            <form onSubmit={handleSubmit} className="edit-profile-form">
                <fieldset>
                    <legend>Profiel Bewerken</legend>
                    <div>
                        <label htmlFor="username">Gebruikersnaam:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            value={formData.username}
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
                            value={formData.email}
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
                            value={formData.name}
                            onChange={handleInputChange}
                        />
                    </div>
                    <div>
                        <label htmlFor="doB">Geboortedatum:</label>
                        <input
                            type="text"
                            id="doB"
                            name="doB"
                            value={formData.doB}
                            onChange={handleInputChange}
                            placeholder="dd-mm-yyyy"
                        />
                    </div>
                    <div>
                        <label htmlFor="address">Adres:</label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            value={formData.address}
                            onChange={handleInputChange}
                        />
                    </div>
                    <button type="submit" disabled={isLoading}>
                        {isLoading ? 'Bijwerken...' : 'Profiel Bijwerken'}
                    </button>
                </fieldset>
            </form>
        </section>
    );
}

export default EditProfile;
