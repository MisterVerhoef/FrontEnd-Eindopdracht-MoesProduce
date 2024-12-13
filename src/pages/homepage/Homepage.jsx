import moesProduceLogo from '/src/assets/images/moesProduceLogo.png';
import {useEffect, useState} from "react";
import api from "../../services/api.js";
import AdvertCard from "../../components/AdvertCard/AdvertCard.jsx";
import "./Homepage.css";

function Homepage() {
    const [adverts, setAdverts] = useState([]);
    const [loading, setLoading] = useState(true);

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
        <section className="inner-container">
            <header className="homepage-header">
                <div className="hero-text">
                    <h2>De plek voor al uw Moes overproduce.</h2>
                    <p>Heb jij groenten of producten uit je moestuin die je graag zou willen verkopen of ruilen?
                        Registreer je dan nu geheel gratis op onze website.</p>

                        <p>Op moesProduce kun je verse of zelfgekweekte groenten te koop of te ruil aanbieden! Ben je op zoek naar een bepaald soort
                        groente of product? Kijk dan op onze website voor het laatste aanbod. Zorg er altijd voor dat je
                        goede afspraken maakt met de verkoper.</p>
                </div>
                <div className="hero-image">
                    <img src={moesProduceLogo} id="logo" className="logo" alt="MoesProduce logo"/>
                </div>


            </header>

            <div className="homepage-content">

                <section className="inner-form-container">
                    {adverts.length > 0 ? (
                        <section className="advert-list">
                            {adverts.map((advert) => (
                                <AdvertCard key={advert.id} advert={advert}/>
                            ))}
                        </section>
                    ) : (
                        <p>Geen advertenties beschikbaar.</p>
                    )}
                    </section>

            </div>
        </section>
    );
}

export default Homepage;
