import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import AppRoutes from "./components/AppRoutes/AppRoutes.jsx";


function App() {


    return (
        <div className="outer-container">
            <header>
                <NavBar/>
            </header>
            <main>
                <AppRoutes/>
            </main>
            <footer>
                <FooterBar/>
            </footer>
        </div>
    )

}


export default App;