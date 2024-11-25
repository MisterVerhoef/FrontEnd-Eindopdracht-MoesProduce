import './AdvertCard.css';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../services/api.js';

function AdvertCard({ advert }) {
    const [isSaved, setIsSaved] = useState(false);

    useEffect(() => {
        // Controleer of de advertentie al is opgeslagen
        const fetchSavedStatus = async () => {
            try {
                const response = await api.get(`/api/adverts/saved`);
                const savedAdverts = response.data;
                const saved = savedAdverts.some(savedAdvert => savedAdvert.id === advert.id);
                setIsSaved(saved);
            } catch (error) {
                console.error('Fout bij ophalen van opgeslagen status:', error);
            }
        };

        fetchSavedStatus();
    }, [advert.id]);

    const handleSave = async () => {
        try {
            if (isSaved) {
                // Verwijder advertentie uit opgeslagen lijst
                await api.post(`/api/adverts/${advert.id}/unsave`);
            } else {
                // Sla advertentie op
                await api.post(`/api/adverts/${advert.id}/save`);
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Fout bij het opslaan/verwijderen van de advertentie:', error);
        }
    };

    return (
        <article className="advert-card">
            <Link to={`/adverts/${advert.id}`} className="advert-card-link">
                <header>
                    <h2>{advert.title}</h2>
                </header>
                <section className="advert-details">
                    <p>{advert.description}</p>
                    <p><strong>Aangemaakt door:</strong> {advert.username}</p>
                    <p><strong>Geplaatst op:</strong> {advert.createdDate}</p>
                </section>
                {advert.imageUrls && advert.imageUrls.length > 0 && (
                    <figure>
                        <img src={advert.imageUrls[0]} alt={advert.title} />
                        <figcaption>{advert.title}</figcaption>
                    </figure>
                )}
                <footer className="advert-footer">
                    <span>👁️  {advert.viewCount} x gezien</span>
                    <span> 🖤 1 x bewaard</span>
                    <span>🕒  {advert.createdDate}</span>
                </footer>
            </Link>
            <button onClick={handleSave} className={`save-button ${isSaved ? 'saved' : ''}`}>
                {isSaved ? '♥️ Opgeslagen' : '🤍 Opslaan'}
            </button>
        </article>
    );
}

export default AdvertCard;
