import React,{ useState, useEffect} from 'react';
import Axios from 'axios';

import { useSelector } from "react-redux";
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import { withRouter } from 'react-router-dom';
import Moment from 'react-moment';
import 'moment/locale/es';
import ImageSlider from '../utils/ImageSlider';




function ListJobsByUser(props) {
    const [jobs, setjobs] = useState([])
    
    useEffect(() => {
        
        getJobs()
        
    }, [])
    
    const removeJob = async (id) => {
        await Axios.post(`/api/jobs/removejob?id=${id}&type=single`)
            .then(response => {
                if(response.data.success){
                    alert("Registro Eliminado")
                    getJobs()
                }else{
                    alert("error")
                }
            })
    }
    
    const getJobs = async () => {
        const user = window.localStorage.getItem('userId');
        await Axios.post(`/api/jobs/jobsbycompany?id=${user}&type=single`)
            .then(response => {
                if(response.data.success){
                    setjobs(response.data.products)
                    
                    
                }else{
                    alert("Error.")
                }
            })
    }
        
    const renderJobs = jobs.map((job, index) => {
        return  (
            <div className="box" key={index}>
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-96x96">
                            <ImageSlider images={job.images} />
                        
                        </figure>
                    </div> 
                    <div className="media-content" style={{display:'flex'}}>
                        <div className="content" style={{width:'75%'}}>
                                
                        <a href={`/jobsid/${job._id}`}><strong>{job.title}</strong></a>
                        <br/>
                                    <small>{job.company}</small> 
                                    <div className="tags">
                                        <span className="tag is-link">{job.typeJob}</span>
                                    </div>
                                     
                                    <small><Moment  parse="YYYY-MM-DD HH:mm" locale="es" utc fromNow > {job.date}</Moment> </small>
                                    <br />
                                    
                                     <div className="tags">
                                         {job.tags.map((job, i) => {
                                            return <span className="tag" key={i}>{job.name}</span>
                                         })}
                                         
                                         
                                     </div>
                                
                        </div>
                        <div className="apply">
                          <a onClick={() => {
                              removeJob(job._id)
                          } }className="button is-danger" style={{color: '#fff'}}>Eliminar</a>
                           
                        </div>


                    </div>
                    
                </article>
            </div>
            
        )
    })

    

    return (
        <>
        <NavBar/>
        <h1>Empleos Publicados</h1>
        <div className="listJobs" style={{minHeight:'100vh'}} >
            
            {renderJobs}
        </div>
        <Footer />
        </>
    )
}

export default withRouter(ListJobsByUser)
