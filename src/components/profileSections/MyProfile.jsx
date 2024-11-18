function MyProfile({ profile }) {
    if (!profile) {
        return <p>Profielgegevens worden geladen...</p>;
    }

    return (
        <div>
            <h2>{profile.username}</h2>
            <p><strong>Naam:</strong> {profile.name || 'Niet ingesteld'}</p>
            <p><strong>E-mail:</strong> {profile.email}</p>
            <p><strong>Geboortedatum:</strong> {profile.doB || 'Niet ingesteld'}</p>
            <p><strong>Adres:</strong> {profile.address || 'Niet ingesteld'}</p>
        </div>
    );
}

export default MyProfile;
