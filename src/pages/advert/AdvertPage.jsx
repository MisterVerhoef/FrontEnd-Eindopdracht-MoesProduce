import api from "../../services/api.js";
import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import "./AdvertPage.css"
import AdvertCard from "../../components/AdvertCard/AdvertCard.jsx";

function AdvertPage(){

    const {id} = useParams();
    const [advert, setAdvert] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    const [showModal, setShowModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);

    const handleImageClick = (imageUrl) => {
        setSelectedImage(imageUrl);
        setShowModal(true);
    }

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
        return <section>advertentie aan het laden...</section>;
    }
    if(!advert) {
        return <section>Advertentie bestaat niet meer.</section>;
    }

    return (


        <article className="inner-form-container">
            <header>
                <h1>Advertentie Details</h1>
            </header>

            <AdvertCard advert={advert}/>

            {advert.imageUrls && advert.imageUrls.length > 1 && (
                <section className="additional-images-container">
                    <header>
                        <h2>Meer afbeeldingen</h2>
                    </header>
                    <div className="images-container">
                        {advert.imageUrls.map((imageUrl, index) => (
                            <img
                                key={index}
                                src={imageUrl}
                                alt={`Advert image ${index + 1}`}
                                className="advert-image"
                                onClick={() => handleImageClick(imageUrl)} // Klikbaar maken
                                style={{ cursor: 'pointer' }}
                            />
                        ))}
                    </div>
                </section>
            )}


            {showModal && selectedImage && (
                <>
                    <style>{"body { overflow: hidden; }"}</style>
                    <div className="overlay" onClick={() => setShowModal(false)}>
                        <img src={selectedImage} alt="Vergrote weergave" />
                    </div>
                </>
            )}
        </article>
                    );

                }

                export default AdvertPage;