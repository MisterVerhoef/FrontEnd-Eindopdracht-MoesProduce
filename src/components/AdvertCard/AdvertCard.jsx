import './AdvertCard.css';
import {useState, useEffect, useContext} from 'react';
import {Link} from 'react-router-dom';
import api from '../../services/api.js';
import {AuthContext} from '../../context/AuthContext.jsx';

function AdvertCard({advert, onDelete, showDeleteButton = false}) {
    const {isAuth, user} = useContext(AuthContext);
    const [isSaved, setIsSaved] = useState(false);
    const [saveCount, setSaveCount] = useState(advert.saveCount || 0);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const isUserOwner = isAuth && user && user.sub && advert.username &&
        user.sub.toLowerCase() === advert.username.toLowerCase();

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

    const handleDeleteClick = async () => {
        if (window.confirm(`Weet je zeker dat je advertentie "${advert.title}" wilt verwijderen?`)) {
            try {

                await api.delete(`/api/adverts/${advert.id}`);
                alert(`Advertentie "${advert.title}" is succesvol verwijderd.`);


                if (onDelete) {
                    onDelete(advert.id);
                }
            } catch (error) {
                console.error('Fout bij het verwijderen van de advertentie:', error);
                alert('Er is een fout opgetreden bij het verwijderen van de advertentie. Probeer het opnieuw.');
            }
        }
    };

    return (
        <article className={`advert-card ${showModal ? "modal-open" : ""}`}>
            <Link to={`/adverts/${advert.id}`} className="advert-card-link">
                <header>
                    <h2>{advert.title}</h2>
                </header>
                <section className="advert-details">
                    <p>{advert.description}</p>
                    <p><strong>Geplaatst door:</strong> {advert.username}</p>
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
                    <span>🕒 {advert.formattedCreatedDate}</span>
                </footer>
            </Link>
            {isAuth && (
                <button onClick={handleSave} className={`save-button ${isSaved ? 'saved' : ''}`}>
                    {isSaved ? '♥️ Opgeslagen' : '🤍 Opslaan'}
                </button>
            )}
            {isUserOwner && showDeleteButton && (
                <button onClick={handleDeleteClick} className="delete-button">
            Verwijderen
        </button>
            )}
            {showModal && selectedImage && (
                <>
                    <style>{"body { overflow: hidden; }"}</style>
                    <div className="overlay"
                         onClick={() => setShowModal(false)}
                    >
                        <img
                            src={selectedImage}
                            alt="Vergrote weergave"
                        />
                    </div>
                </>
            )}
        </article>
    );
}

export default AdvertCard;
