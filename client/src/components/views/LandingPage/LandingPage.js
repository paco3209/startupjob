import React,{useEffect} from 'react'
import { FaCode } from "react-icons/fa";

import Header from './Sections/Header';
import './style.scss';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import Axios from 'axios';
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
