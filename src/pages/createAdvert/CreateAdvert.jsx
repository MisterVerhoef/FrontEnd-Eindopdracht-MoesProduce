import { useEffect, useState } from "react";
import api from "../../services/api.js";
import '../../App.css';
import './CreateAdvert.css';

function CreateAdvert() {
    const [advertTitle, setAdvertTitle] = useState('');
    const [advertDescription, setAdvertDescription] = useState('');
    const [message, setMessage] = useState('');
    const [vegetables, setVegetables] = useState([]);
    const [selectedVegetables, setSelectedVegetables] = useState([]);
    const [selectedImages, setSelectedImages] = useState([]);
    const [previewImages, setPreviewImages] = useState([]);
    const [expandedCategory, setExpandedCategory] = useState('');

    useEffect(() => {
        const fetchVegetables = async () => {
            try {
                const response = await api.get('/api/vegetables', {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem('token')}`
                    }
                });
                setVegetables(response.data);
            } catch (error) {
                console.error("Error fetching vegetables:", error);
            }
        };
        fetchVegetables();
    }, []);

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

    const handleCategoryClick = (category) => {
        if (expandedCategory === category) {
            setExpandedCategory(''); // Collapse if already open
        } else {
            setExpandedCategory(category); // Expand the selected category
        }
    };

    const handleVegetableChange = (category, event) => {
        const selectedOptions = Array.from(event.target.selectedOptions, option => option.value);
        setSelectedVegetables(prevState => {
            const otherVegetables = prevState.filter(v => v.category !== category);
            const newVegetables = selectedOptions.map(option => ({ name: option, category }));
            return [...otherVegetables, ...newVegetables];
        });
    };

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setSelectedImages(files);

        const previews = files.map(file => URL.createObjectURL(file));
        setPreviewImages(previews);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('title', advertTitle);
        formData.append('description', advertDescription);
        formData.append('vegetables', JSON.stringify(selectedVegetables));

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
            setMessage('Advertentie succesvol geplaatst!');
            setAdvertTitle('');
            setAdvertDescription('');
            setSelectedVegetables([]);
            setSelectedImages([]);
            setPreviewImages([]);
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Advertentie aanmaken mislukt:', error.response?.data || error.message);
            setMessage('Er is een fout opgetreden bij het plaatsen van de advertentie.');
        }
    };

    return (
        <section className="inner-container">
            <header>
                <h2>Plaats een advertentie</h2>
            </header>

            {message && <div className="message">{message}</div>}
            <section className="inner-form-container" id="create-advert-container">
                <form onSubmit={handleSubmit}>
                    <div className="form-main-content">
                        <section className="card">
                            <header className="card-header">
                                <h3>Advertentiegegevens</h3>
                            </header>
                            <div className="card-content">
                                <label htmlFor="title">Titel</label>
                                <input
                                    type="text"
                                    id="title"
                                    placeholder="Titel"
                                    value={advertTitle}
                                    onChange={(e) => setAdvertTitle(e.target.value)}
                                    required
                                />
                                <label htmlFor="description">Omschrijving</label>
                                <textarea
                                    id="description"
                                    placeholder="Omschrijving"
                                    maxLength="255"
                                    value={advertDescription}
                                    onChange={(e) => setAdvertDescription(e.target.value)}
                                    required
                                    style={{
                                        width: '100%',
                                        height: '150px',
                                        padding: '10px',
                                        resize: 'vertical'
                                    }}
                                />
                            </div>
                        </section>

                        <section className="card">
                            <header className="card-header">
                                <h3>Afbeeldingen</h3>
                            </header>
                            <div className="card-content">
                                <label htmlFor="images">Upload afbeeldingen</label>
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageChange}
                                />
                                <div className="image-previews">
                                    {previewImages.map((preview, index) => (
                                        <figure key={index} className="image-preview">
                                            <img
                                                src={preview}
                                                alt={`Preview ${index + 1}`}
                                                style={{ width: '100px', height: '100px', objectFit: 'cover', margin: '5px' }}
                                            />
                                            <figcaption>Afbeelding {index + 1}</figcaption>
                                        </figure>
                                    ))}
                                </div>
                            </div>
                        </section>
                    </div>

                    <section className="card vegetable-section">
                        <header className="card-header">
                            <h3>Selecteer groenten</h3>
                        </header>
                        <div className="card-content">
                            {Object.keys(vegetableCategories).map(category => (
                                <div key={category} className="category-dropdown">
                                    <button
                                        type="button"
                                        className="category-button"
                                        onClick={() => handleCategoryClick(category)}
                                    >
                                        {category}
                                    </button>
                                    {expandedCategory === category && (
                                        <select
                                            multiple
                                            onChange={(e) => handleVegetableChange(category, e)}
                                            value={selectedVegetables.filter(v => v.category === category).map(v => v.name)}
                                            className="vegetable-select"
                                        >
                                            {vegetableCategories[category].map(vegetable => (
                                                <option key={vegetable} value={vegetable}>
                                                    {vegetable}
                                                </option>
                                            ))}
                                        </select>
                                    )}
                                </div>
                            ))}
                        </div>
                    </section>

                    <button type="submit" className="submit-button">Plaats advertentie</button>
                </form>
            </section>
        </section>
    );
}

export default CreateAdvert;