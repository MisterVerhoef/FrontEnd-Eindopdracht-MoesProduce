import moesProduceLogo from '/src/assets/images/moesProduceLogo.png';

function Homepage() {
    return (
        <div className='outer-container'>
            <img src={moesProduceLogo} alt="MoesProduce logo" />
            <h2>De plek voor al uw Moes overproduce.</h2>
        </div>
    );
}

export default Homepage;