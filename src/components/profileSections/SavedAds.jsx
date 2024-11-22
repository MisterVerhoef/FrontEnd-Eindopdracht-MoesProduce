import AdvertCard from "../AdvertCard/AdvertCard.jsx";
import api from '../../services/api.js'
import {useEffect, useState} from "react";

function SavedAds() {
    const [savedAds, setSavedAds] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchSavedAds = async () => {
            try {
                const response = await api.get('/api/adverts/saved');
                setSavedAds(response.data);
            } catch (err) {
                console.error('Fout bij ophalen opgeslagen advertenties:', err);
                setError('Er is een fout opgetreden bij het ophalen van de opgeslagen advertenties. Probeer het later opnieuw.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchSavedAds();
    }, []);

    if (isLoading) {
        return <section className="loading">Advertenties worden geladen...</section>;
    }

    if (error) {
        return <section className="error-message">{error}</section>;
    }

    return (
        <section className="saved-ads-container">
            <h2>Opgeslagen Advertenties</h2>
            {savedAds.length > 0 ? (
                savedAds.map(advert => (
                    <AdvertCard key={advert.id} advert={advert} />
                ))
            ) : (
                <p>Geen opgeslagen advertenties gevonden.</p>
            )}
        </section>
    );
}

export default SavedAds;