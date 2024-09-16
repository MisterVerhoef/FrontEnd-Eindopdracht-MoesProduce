import {useContext} from 'react'
import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import {Navigate, Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import AllAdvertsPage from "./pages/adverts/AllAdvertsPage.jsx";
import RegisterPage from "./pages/register/RegisterPage.jsx";
import {AuthContext} from "./context/AuthContext.jsx";
import CreateAdvert from "./pages/createAdvert/CreateAdvert.jsx";
import AdminPage from "./pages/admin/AdminPage.jsx";
import AdvertPage from "./pages/advert/AdvertPage.jsx";


function App() {

    const {isAuth, user, status} = useContext(AuthContext);
    console.log('PrivateRoute - isAuthenticated:', isAuth);


    return (
        <>
            <NavBar/>
            <main>
                <Routes>
                    <Route path="/" element={<Homepage/>}/>

                    <Route path="/login" element={<LoginPage/>}/>
                    <Route path="/adverts/:id" element={<AdvertPage/>}/>
                    <Route path="/register" element={<RegisterPage/>}/>
                    <Route path="/adverts" element={<AllAdvertsPage/>}/>
                    <Route path="/creeradvert" element={isAuth ? <CreateAdvert/> : <Navigate to="/login"/>}/>
                    <Route path="/profile" element={isAuth ? <ProfilePage/> : <Navigate to="/login"/>}/>
                    <Route path="/admin" element={isAuth ? <AdminPage/> : <Navigate to="/"/>}/>
                    <Route path="*" element={<Navigate to="/"/>}/>
                </Routes>
            </main>

            <FooterBar/>
        </>
    )
}


export default App;