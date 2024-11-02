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
        return <p>Advertenties aan het laden...</p>
    }


    return (
        <div className='inner-container'>
            <img src={moesProduceLogo}  id="logo" className="logo" alt="MoesProduce logo"/>
            <h2>De plek voor al uw Moes overproduce.</h2>
            <div className="inner-form-container">
                        {adverts.length > 0 ? (
                            adverts.map((advert) => (
                                <AdvertCard key={advert.id} advert={advert} />
                            ))
                ) : (
                    <p>No adverts available</p>
                )}
            </div>
        </div>
    );
}

export default Homepage;