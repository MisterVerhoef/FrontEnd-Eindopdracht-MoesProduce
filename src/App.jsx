import {useContext} from 'react'
import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import AppRoutes from "./components/AppRoutes/AppRoutes.jsx";


function App() {


    return (
        <div className="App-container">
            <NavBar/>
            <main>
                <AppRoutes />
            </main>
            <FooterBar/>
        </div>
    )
}


export default App;