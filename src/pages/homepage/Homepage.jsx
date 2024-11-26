import moesProduceLogo from '/src/assets/images/moesProduceLogo.png';
import {useEffect, useState} from "react";
import api from "../../services/api.js";
// import {Link} from "react-router-dom";
import AdvertCard from "../../components/AdvertCard/AdvertCard.jsx";
import "./Homepage.css"

function Homepage() {

    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchAdverts = async () => {
            try {
                const response = await api.get('/api/adverts');
                console.log("Response data:", response.data);
                setAdverts(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching adverts:", error);
                setLoading(false);
            }
        };

        fetchAdverts();

    }, []);

    if (loading) {
        return <section className="loading-section"><p>Advertenties aan het laden...</p></section>;
    }


    return (
        <section className='inner-container'>
            <header className="homepage-header">
                <img src={moesProduceLogo} id="logo" className="logo" alt="MoesProduce logo"/>
                <h2>De plek voor al uw Moes overproduce.</h2>
            </header>

            <section className="inner-form-container">
                {adverts.length > 0 ? (
                    adverts.map((advert) => (
                        <article key={advert.id} className="advert-card">
                            <AdvertCard advert={advert}/>
                        </article>
                    ))
                ) : (
                    <p>Geen advertenties beschikbaar</p>
                )}
            </section>
        </section>
    );
}

export default Homepage;