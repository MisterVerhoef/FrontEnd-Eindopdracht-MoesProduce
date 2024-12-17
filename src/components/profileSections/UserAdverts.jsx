import { useState, useEffect, useContext } from 'react';
import api from '../../services/api.js';
import AdvertCard from '../../components/AdvertCard/AdvertCard.jsx';
import { AuthContext } from '../../context/AuthContext.jsx';

function UserAdverts() {
    const [adverts, setAdverts] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');
    const { isAuth } = useContext(AuthContext);

    useEffect(() => {
        if (isAuth) {
            fetchUserAdverts();
        }
    }, [isAuth]);

    const fetchUserAdverts = async () => {
        try {
            setIsLoading(true);
            const response = await api.get('/api/adverts/user');
            setAdverts(response.data);
            setError('');
        } catch (err) {
            console.error('Fout bij het ophalen van advertenties:', err);
            setError('Er is een fout opgetreden bij het ophalen van de advertenties. Probeer het later opnieuw.');
        } finally {
            setIsLoading(false);
        }
    };

    if (isLoading) {
        return <section className="loading">Advertenties worden geladen...</section>;
    }

    if (error) {
        return <section className="error-message">{error}</section>;
    }

    if (adverts.length === 0) {
        return <section className="no-adverts">Geen advertenties gevonden.</section>;
    }

    const handleDelete = (advertId) => {
        setAdverts(adverts.filter(advert => advert.id !== advertId));
        console.log(`Advertentie met id ${advertId} lokaal uit de state verwijderd`);
    };

    return (
        <section className="user-adverts-container">
            <h1>Mijn Advertenties</h1>
            <div className="adverts-list">
                {adverts.map((advert) => (
                    <AdvertCard
                        key={advert.id}
                        advert={advert}
                        onDelete={handleDelete}
                        showDeleteButton={true}
                    />
                ))}
            </div>
        </section>
    );
}

export default UserAdverts;
