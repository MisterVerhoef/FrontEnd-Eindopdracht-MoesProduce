import api from "../../services/api.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./AdvertPage.css"
import AdvertCard from "../../components/AdvertCard/AdvertCard.jsx";

function AdvertPage(){

    const {id} = useParams();
    const [advert, setAdvert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        const fetchAdvert = async () => {
            try {
                const response = await api.get(`/api/adverts/${id}`);
                console.log("Fetched advert:", response.data);
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
            <h1>Advertentie Details</h1>
            <div className="inner-form-container">
                    <AdvertCard advert={advert} />


                    <div className="additional-images-container">
                        <h2>Meer afbeeldingen</h2>

                        <div className="images-container">

                            {advert.imageUrls.map((imageUrl, index) => (
                                <img key={index} src={imageUrl} alt={`Advert image ${index + 1}`}
                                     className="advert-image"/>
                            ))}
                        </div>
                        </div>


                    </div>

                    </div>
                    );

                }

                export default AdvertPage;