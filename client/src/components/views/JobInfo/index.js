import React from 'react';
import './style.scss';
import JobDescription from './JobDescription';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer.js';

function JobInfo() {
    return (
        <>
        <NavBar />
        <div>
            <JobDescription />
        </div>
        <Footer />
        </>
    )
}

export default JobInfo
