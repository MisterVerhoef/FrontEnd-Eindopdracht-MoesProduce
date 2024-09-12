import {useState} from "react";
import api from "../../services/api.js";

function CreateAdvert() {
    const [advertTitle, setAdvertTitle] = useState('');
    const [advertDescription, setAdvertDescription] = useState('');
    const [message, setMessage] = useState('');

    // const [photos, setPhotos] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const advertData = {
            title: advertTitle,
            description: advertDescription,
        };

        try {
            const response = await api.post('/api/adverts', advertData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Advert created:', response.data);
            setMessage('Advert created successfully!');
            setAdvertTitle('');
            setAdvertDescription('');
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Creating advert failed:', error);
        }

    }

    return (
        <div className="outer-form-container">
            <h2>Plaats een advertentie</h2>
            {message && <div className="message">{message}</div>}
            <div className="inner-form-container" id="create-advert-container">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        placeholder="Titel"
                        value={advertTitle}
                        onChange={(e) => setAdvertTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Omschrijving"
                        maxLength="255"
                        value={advertDescription}
                        onChange={(e) => setAdvertDescription(e.target.value)}
                        style={{
                            width: '100%',
                            height: '150px',
                            padding: '10px',
                            resize: 'vertical'
                        }}
                    />
                    <button type="submit">Plaats advertentie</button>
                </form>
            </div>
        </div>
    )
}

export default CreateAdvert;