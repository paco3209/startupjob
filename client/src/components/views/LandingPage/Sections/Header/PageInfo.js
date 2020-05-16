import React,{useEffect, useState} from 'react'
import Axios from 'axios';
import { FaCommentsDollar } from 'react-icons/fa';

function PageInfo() {
    const [totalJobs, settotalJobs] = useState("")

    useEffect(() => {
        Axios.get('api/jobs/totaljobs')
            .then(response => {
                
                settotalJobs(response.data.total)
            })
        
    }, [])


    return (
        <div className="has-text-centered max-w-650 mx-auto" style={{marginBottom:'40px', height:'180px'}}><h1 className="title font-900">Meet April</h1><p>total de empleos Cargados{totalJobs}</p></div>
    )
}

export default PageInfo
