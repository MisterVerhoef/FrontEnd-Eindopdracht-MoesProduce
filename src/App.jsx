import { useState } from 'react'
import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";
import LoginPage from "./pages/login/LoginPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";
import AdvertsPage from "./pages/adverts/AdvertsPage.jsx";

function App() {

  return (
    <>
        <NavBar />
<main>

        <Routes>

            <Route exact path="/" element={<Homepage/>} />
            <Route exact path="/login" element={<LoginPage/>} />
            {/*<Route exact path="/logout" element={<LogoutPage/>} />*/}
            <Route exact path="/adverts" element={<AdvertsPage/>} />
            <Route exact path="/profile" element={<ProfilePage/>} />
        </Routes>
</main>

        <FooterBar/>

    </>
  )
}

export default App
