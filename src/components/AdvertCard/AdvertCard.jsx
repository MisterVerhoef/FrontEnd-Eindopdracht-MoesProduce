import './AdvertCard.css';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api.js';
import {AuthContext} from '../../context/AuthContext.jsx';

function AdvertCard({advert}) {
    const {isAuth} = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);
    const [saveCount, setSaveCount] = useState(advert.saveCount || 0);
    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    useEffect(() => {
        const fetchSavedStatus = async () => {
            try {
                if (isAuth) {
                    const response = await api.get(`/api/adverts/saved`);
                    const savedAdverts = response.data;
                    const saved = savedAdverts.some(savedAdvert => savedAdvert.id === advert.id);
                    setIsSaved(saved);
                }
            } catch (error) {
                console.error('Fout bij ophalen van opgeslagen status:', error);
            }
        };

        fetchSavedStatus();
    }, [advert.id, isAuth]);

    const handleSave = async () => {
        try {
            if (isSaved) {
                await api.post(`/api/adverts/${advert.id}/unsave`);
                setSaveCount(saveCount - 1);
            } else {
                await api.post(`/api/adverts/${advert.id}/save`);
                setSaveCount(saveCount + 1);
            }
            setIsSaved(!isSaved);
        } catch (error) {
            console.error('Fout bij het opslaan/verwijderen van de advertentie:', error);
        }
    };

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    }

    return (
        <article className="advert-card">
            <Link to={`/adverts/${advert.id}`} className="advert-card-link">
                <header>
                    <h2>{advert.title}</h2>
                </header>
                <section className="advert-details">
                    <p>{advert.description}</p>
                    <p><strong>Aangemaakt door:</strong> {advert.username}</p>
                </section>
                {advert.imageUrls && advert.imageUrls.length > 0 && (
                    <figure>
                        <img
                            src={advert.imageUrls[0]}
                            alt={advert.title}
                            loading="lazy"
                            onClick={() => handleImageClick(advert.imageUrls[0])}
                        />
                        <figcaption>{advert.title}</figcaption>
                    </figure>

                )}
                <footer className="advert-footer">
                    <span>👁️ {advert.viewCount} x gezien</span>
                    <span> 🖤 {saveCount} x bewaard</span>
                    <span>🕒 {advert.createdDate}</span>
                </footer>
            </Link>
            {isAuth && (
                <button onClick={handleSave} className={`save-button ${isSaved ? 'saved' : ''}`}>
                    {isSaved ? '♥️ Opgeslagen' : '🤍 Opslaan'}
                </button>
            )}
            {showModal && selectedImage && (
                <div className="overlay"
                     onClick={() => setShowModal(false)}
                >
                    <img
                        src={selectedImage}
                        alt="Vergrote weergave"
                    />
                </div>
            )}
        </article>
    );
}

export default AdvertCard;
