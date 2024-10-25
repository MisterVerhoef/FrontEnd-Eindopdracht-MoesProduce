import {useEffect, useState} from "react";
import api from "../../services/api.js";
import "./AllAdvertsPage.css"
import {Link} from "react-router-dom";

function AllAdvertsPage() {

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
        <div className="outer-form-container">
            <h1>Aangeboden Produce</h1>
            <div className="inner-form-container">
                {adverts.length > 0 ? (
                    <ul className="advert-list-container" style={{listStyleType: 'none'}}>
                        {adverts.map((advert) => (
                            <Link to={`/adverts/${advert.id}`} key={advert.id} className="advert-item-link">
                                <div key={advert.id} className="advert-item">
                                    <li key={advert.id}>
                                        <h2>{advert.title}</h2>
                                        <p>{advert.description}</p>
                                        <p><strong>Created by:</strong> {advert.username}</p>
                                        <p><strong>Date:</strong> {advert.createdDate}</p>
                                        {advert.vegetables && advert.vegetables.length > 0 && (
                                            <div>
                                                <p><strong>Groenten:</strong></p>
                                                <ul style={{listStyleType: 'disc', marginLeft: '20px'}}>
                                                    {advert.vegetables.map((veg, index) => (
                                                        <li key={index}>{veg.name} ({veg.category})</li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}
                                    </li>
                                    <p>Deze advertentie is {advert.viewCount} keer bekeken.</p>
                                </div>

                            </Link>
                        ))}
                    </ul>
                ) : (
                    <p>No adverts available</p>
                )}
            </div>
        </div>
    );
}

export default AllAdvertsPage;