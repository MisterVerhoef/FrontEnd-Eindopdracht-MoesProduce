import { useEffect, useState } from "react";
import api from "../../services/api.js";

function CreateAdvert() {
    const [advertTitle, setAdvertTitle] = useState('');
    const [advertDescription, setAdvertDescription] = useState('');
    const [message, setMessage] = useState('');
    const [vegetables, setVegetables] = useState([]);
    const [selectedVegetables, setSelectedVegetables] = useState({});

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

        // Maakt een lijst van objecten met zowel name als category
        const vegetableObjects = selectedOptions.map(option => ({
            name: option,
            category: category
        }));

        // Sla de objecten op in de state
        setSelectedVegetables({
            ...selectedVegetables,
            [category]: vegetableObjects
        });
    };

    // Functie voor het indienen van het advertentieformulier
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combineer alle geselecteerde groenten objecten in één array
        const allSelectedVegetables = Object.values(selectedVegetables).flat();

        const advertData = {
            title: advertTitle,
            description: advertDescription,
            vegetables: allSelectedVegetables  // Vegetables als objecten met name en category
        };

        try {
            const response = await api.post('/api/adverts', advertData, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            console.log('Advert created:', response.data);
            setMessage('Advertentie succesvol geplaatst!');
            setAdvertTitle('');
            setAdvertDescription('');
            setSelectedVegetables({});
            setTimeout(() => setMessage(''), 3000);
        } catch (error) {
            console.error('Advertentie aanmaken mislukt:', error);
        }
    };

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

                    {/* Dropdowns per categorie */}
                    <div className="vegetable-categories">
                        {Object.keys(vegetableCategories).map(category => (
                            <div key={category} className="category-section">
                                <label style={{ fontWeight: 'bold', color: 'orange', display: 'block', marginBottom: '10px' }}>
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
            </div>
        </div>
    );
}

export default CreateAdvert;
