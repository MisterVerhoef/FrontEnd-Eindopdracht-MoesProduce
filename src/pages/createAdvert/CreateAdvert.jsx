import {useEffect, useState} from "react";
import api from "../../services/api.js";

function CreateAdvert() {
    const [advertTitle, setAdvertTitle] = useState('');
    const [advertDescription, setAdvertDescription] = useState('');
    const [message, setMessage] = useState('');
    const [vegetables, setVegetables] = useState([]);
    const [selectedVegetables, setSelectedVegetables] = useState({});
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);

    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                const response = await api.get('/api/vegetables', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                console.log('Fetched vegetables:', response.data);
                setVegetables(response.data);
            } catch (error) {
                console.error("Error fetching vegetables:", error);
            }
        };
        fetchVegetables();
    }, []);

    // Categorieën van groenten
    const vegetableCategories = {
        Bladgroenten: ['Andijvie', 'Boerenkool', 'Spinazie', 'Sla', 'Snijbiet', 'Rucola'],
        Koolsoorten: ['Bloemkool', 'Broccoli', 'Savooiekool', 'Spruitjes', 'Witte kool'],
        "Wortel- en knolgewassen": ['Wortel', 'Rode biet', 'Pastinaak', 'Knolselderij', 'Radijs'],
        Uiengewassen: ['Ui', 'Knoflook', 'Prei', 'Sjalot'],
        Peulvruchten: ['Doperwten', 'Tuinbonen', 'Kapucijners', 'Sperziebonen', 'Sugar snaps'],
        Vruchtgroenten: ['Tomaat', 'Komkommer', 'Paprika', 'Courgette', 'Pompoen'],
        Overige: ['Asperge', 'Venkel', 'Zeekraal', 'Artisjok', 'Maïs'],
        Aardappelen: ['Aardappel', 'Zoete aardappel'],
        "Exotische gewassen": ['Aubergine', 'Okra', 'Paksoi'],
    };

    // Functie om de geselecteerde groenten op te slaan als objecten met name en category
    const handleVegetableChange = (category, event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        const vegetableObjects = selectedOptions.map(option => ({
            name: option,
            category: category
        }));
        setSelectedVegetables(prevState => ({
            ...prevState,
            [category]: vegetableObjects
        }));
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const allSelectedVegetables = Object.values(selectedVegetables).flat();

        const formData = new FormData();
        formData.append('title', advertTitle);
        formData.append('description', advertDescription);
        formData.append('vegetables', JSON.stringify(allSelectedVegetables));

        selectedImages.forEach((image, index) => {
            formData.append(`images`, image);
        });

        try {
            const response = await api.post('/api/adverts', formData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                }
            });
            console.log('Advert created:', response.data);
            setMessage('Advertentie succesvol geplaatst!');
            // Reset form
            setAdvertTitle('');
            setAdvertDescription('');
            setSelectedVegetables({});
            setSelectedImages([]);
            setPreviewImages([]);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Advertentie aanmaken mislukt:', error.response?.data || error.message);
            setMessage('Er is een fout opgetreden bij het plaatsen van de advertentie.');
        }
    };

    return (
        <section className="outer-form-container">
            <header>
                <h2>Plaats een advertentie</h2>
            </header>

            {message && <div className="message">{message}</div>}
            <section className="inner-form-container" id="create-advert-container">
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
                    <div className="image-upload-section">
                        <input
                            type="file"
                            multiple
                            accept="image/*"
                            onChange={handleImageChange}
                        />
                        <div className="image-previews">
                            {previewImages.map((preview, index) => (
                                <img
                                    key={index}
                                    src={preview}
                                    alt={`Preview ${index + 1}`}
                                    style={{width: '100px', height: '100px', objectFit: 'cover', margin: '5px'}}
                                />
                            ))}
                        </div>
                    </div>
                    {/* Dropdowns per categorie */}
                    <div className="vegetable-categories">
                        {Object.keys(vegetableCategories).map(category => (
                            <div key={category} className="category-section">
                                <label style={{
                                    fontWeight: 'bold',
                                    color: 'orange',
                                    display: 'block',
                                    marginBottom: '10px'
                                }}>
                                    {category}
                                </label>
                                <select
                                    multiple
                                    onChange={(e) => handleVegetableChange(category, e)}
                                    value={selectedVegetables[category]?.map(v => v.name) || []}
                                    style={{
                                        width: '100%',
                                        height: '100px',
                                        marginBottom: '20px'
                                    }}
                                >
                                    {vegetableCategories[category].map(vegetable => (
                                        <option key={vegetable} value={vegetable}>
                                            {vegetable}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        ))}
                    </div>

                    <button type="submit">Plaats advertentie</button>
                </form>
            </section>
        </section>
    );
}

export default CreateAdvert;
