
import './AdvertCard.css'
import {Link} from "react-router-dom";

function AdvertCard({advert}) {
    console.log('Advert in AdvertCard:', advert);
    console.log('Advert ID:', advert.id);



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
                <footer>
                    <p>Deze advertentie is {advert.viewCount} keer bekeken.</p>
                </footer>
            </Link>
        </article>
    );
}

export default AdvertCard;