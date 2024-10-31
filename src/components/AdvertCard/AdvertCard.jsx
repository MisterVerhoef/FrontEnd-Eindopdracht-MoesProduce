
import './AdvertCard.css'
import {Link} from "react-router-dom";

function AdvertCard({advert}) {
    console.log('Advert in AdvertCard:', advert);
    console.log('Advert ID:', advert.id);



    return (
        <div className="advert-card">
            <Link to={`/adverts/${advert.id}`} className="advert-card-link">
    <h2>{advert.title}</h2>
    <p>{advert.description}</p>
    <p><strong>Aangemaakt door:</strong> {advert.username}</p>
    <p><strong>Geplaatst op:</strong> {advert.createdDate}</p>
                {advert.imageUrls && advert.imageUrls.length > 0 && (
                    <img src={advert.imageUrls[0]} alt={advert.title} />
                )}
                <p>Deze advertentie is {advert.viewCount} keer bekeken.</p>
            </Link>
    </div>
    );
}

export default AdvertCard;