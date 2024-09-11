import {useEffect, useState} from "react";
import api from "../../services/api.js";

function AdvertsPage() {

    const [adverts, setAdverts] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {

        const fetchAdverts = async () => {
            try {
                const response = await api.get('/api/adverts');
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
        return <p>Loading advertenties...</p>
    }

    return (
        <div className="outer-form-container">
            <h1>Adverts</h1>
            <div className="inner-form-container">
            {adverts.length > 0 ? (
                <ul>
                    {adverts.map((advert) => (
                        <li key={advert.id}>
                            <h2>{advert.title}</h2>
                            <p>{advert.description}</p>
                            <p><strong>Created by:</strong> {advert.username}</p>
                            <p><strong>Date:</strong> {advert.createdDate}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No adverts available</p>
            )}
            </div>
        </div>
    );
}

export default AdvertsPage;