
            import {useState} from "react";

function CreateAdvert() {
    const [advertTitle, setAdvertTitle] = useState('');
    const [advertDescription, setAdvertDescription] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        // Voeg hier uw submit logica toe
    }

    return (
        <div className="outer-form-container">
            <h2>Plaats een advertentie</h2>
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