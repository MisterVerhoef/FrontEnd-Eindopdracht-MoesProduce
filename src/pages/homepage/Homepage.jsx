import moesProduceLogo from '/src/assets/images/moesProduceLogo.png';

function Homepage() {
    return (
        <>
            <img src={moesProduceLogo} alt="MoesProduce logo" />
            <h2>De plek voor al uw Moes overproduce.</h2>
        </>
    );
}

export default Homepage;