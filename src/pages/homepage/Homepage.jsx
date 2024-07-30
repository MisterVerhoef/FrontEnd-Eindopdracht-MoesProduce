import moesProduceLogo from '/src/assets/images/moesProduceLogo.png';

function Homepage() {
    return (
        <>
            <h1>Homepage</h1>
            <img src={moesProduceLogo} alt="MoesProduce logo" />
            <p>Welcome to MoesProduce!</p>
            <p>Dit is de plek voor al uw Moes overproduce.</p>
        </>
    );
}

export default Homepage;