import React,{useState, useEffect} from 'react'
import Axios from 'axios';
import JobInfo from './Sections/JobInfo';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './Sections/carousel.scss';

function DetailJobPage(props) {
    const jobId = props.match.params.jobId
    const [job, setjob] = useState([])

    useEffect( async() => {
        await Axios.post(`/api/jobs/jobsbyid?id=${jobId}&type=single`)
            .then(response => {
                
                setjob(response.data[0])
            })
            
            

    }, [])


    return (
        <>
        <NavBar />
        <div>
            <JobInfo detail={job} />
        </div>
        <Footer />
        </>


        
    )
}

export default DetailJobPage
