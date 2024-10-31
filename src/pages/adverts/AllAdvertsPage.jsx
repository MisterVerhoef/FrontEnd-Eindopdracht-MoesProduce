import {useEffect, useState} from "react";
import api from "../../services/api.js";
import "./AllAdvertsPage.css"
import AdvertCard from "../../components/AdvertCard/AdvertCard.jsx";

function AllAdvertsPage() {

    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchAdverts = async () => {
            try {
                const response = await api.get(`/api/adverts`);
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
        <div className="outer-form-container">
            <h1>Aangeboden Produce</h1>
            <div className="inner-form-container">
                {adverts.length > 0 ? (
                    adverts.map((advert) => (
                        <AdvertCard key={advert.id} advert={advert} />
                    ))
                ) : (
                    <p>Geen advertenties beschikbaar.</p>
                )}
            </div>
        </div>
    );
}

export default AllAdvertsPage;