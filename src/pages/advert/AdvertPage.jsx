import api from "../../services/api.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";

function AdvertPage(){

    const {id} = useParams();
    const [advert, setAdvert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchAdvert = async () => {
            try {
                const response = await api.get(`/api/adverts/${id}`);
                setAdvert(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error("Error fetching advert:", error);
                setIsLoading(false);
            }
        };

        fetchAdvert();

    }, [id]);

    if(isLoading){
        return <div>advertentie aan het laden...</div>;
    }
    if(!advert) {
        return <div>Advertentie bestaat niet meer.</div>;
    }

    return (
        <div className="outer-form-container">
            <div className="inner-form-container">
                <h1>{advert.title}</h1>
                <p>{advert.description}</p>
                <p><strong>Created by:</strong> {advert.username}</p>
                <p><strong>Date:</strong> {advert.createdDate}</p>
            </div>
        </div>
    );

}
export default AdvertPage;