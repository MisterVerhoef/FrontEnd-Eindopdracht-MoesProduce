import './ProfileSectionsStyle.css';

function MyProfile({ profile }) {
    // Functie om ISO-datum naar dd-mm-yyyy te formatteren voor weergave
    const formatDateForDisplay = (dateString) => {
        if (!dateString) return 'Niet ingesteld';
        const [year, month, day] = dateString.split('-');
        return `${day}-${month}-${year}`;
    };

    if (!profile) {
        return <p>Profielgegevens worden geladen...</p>;
    }

    return (
        <section className='inner-form-container'>
            <h2>{profile.username}</h2>
            <p><strong>Naam:</strong> {profile.name || 'Niet ingesteld'}</p>
            <p><strong>E-mail:</strong> {profile.email}</p>
            <p><strong>Geboortedatum:</strong> {formatDateForDisplay(profile.doB)}</p>
            <p><strong>Adres:</strong> {profile.address || 'Niet ingesteld'}</p>
        </section>
    );
}

export default MyProfile;
