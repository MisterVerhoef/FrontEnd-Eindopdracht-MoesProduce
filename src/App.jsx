import React, { useState } from 'react'
import './App.css'
import FooterBar from "./components/footer/FooterBar.jsx";
import NavBar from "./components/navbar/NavBar.jsx";
import {Route, Routes} from "react-router-dom";
import Homepage from "./pages/homepage/Homepage.jsx";

function App() {

  return (
    <>
        <NavBar />

        <Routes>
            {/* Add routes here */}
            <Route exact path="/" element={<Homepage/>} />
        </Routes>
        <FooterBar/>

    </>
  )
}

export default App
