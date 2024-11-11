import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import AppRoutes from "./components/AppRoutes/AppRoutes.jsx";
import ErrorBoundary from "./components/errorBoundary/ErrorBoundary.jsx";


function App() {


    return (
        <div className="outer-container">
            <ErrorBoundary>
                <NavBar />
            </ErrorBoundary>
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