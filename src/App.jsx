import {useEffect, useState} from 'react'
import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import AdvertsPage from "./pages/adverts/AdvertsPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";


function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {

        const token = localStorage.getItem('token');
        setIsAuthenticated(!!token);
    }, []);


    // eslint-disable-next-line react/prop-types
    const PrivateRoute = ({ children }) => {
        return isAuthenticated ? children : <Navigate to="/login" />;
    };

    return (
        <>
            <NavBar isAuthenticated={isAuthenticated} />
            <main>
                <Routes>
                    <Route path="/" element={<Homepage />} />
                    <Route path="/login" element={<LoginPage setIsAuthenticated={setIsAuthenticated} />} />
                    <Route path="/register" element={<RegisterPage />} />
                    <Route path="/adverts" element={<AdvertsPage />} />
                    <Route
                        path="/profile"
                        element={
                            <PrivateRoute>
                                <ProfilePage />
                            </PrivateRoute>
                        }
                    />
                    <Route path="*" element={<Navigate to="/" />} />
                </Routes>
            </main>
            <FooterBar />
        </>
    )
}

export default App;