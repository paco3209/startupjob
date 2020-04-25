import React from 'react'
import { FaCode } from "react-icons/fa";

import Header from './Sections/Header';
import './style.scss';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';

function LandingPage() {
    return (
        <>
        <NavBar />
        <div className="app" >
            
            <Header  />
            <Footer />
        </div>
       
        </>
    )
}

export default LandingPage
