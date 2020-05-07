import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';



function Lastjobs() {
    const [jobs, setjobs] = useState([])

    useEffect(() => {

        Axios.post('/api/jobs/getjobs')
            .then(response => {
                if(response.data.success){
                   setjobs(response.data.products) 
                }else{
                    alert("Error de carga.")
                }
            })

    }, [])

    const renderJobs = jobs.map((job, index) => {
        return  (
            <div className="box" key={index}>
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div> 
                    <div className="media-content" style={{display:'flex'}}>
                        <div className="content" style={{width:'75%'}}>
                                
                        <a href="/jobInfo"><strong>{job.title}</strong></a>
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
                          <a href={job.url}  className="button is-primary" style={{color: '#fff'}}>Aplicar</a>  
                        </div>
                    </div>
                    
                </article>
            </div>
            
        )
    })

    return (
        <>
        <section className="section" >

            {renderJobs}
            <div className="box" >
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div> 
                    <div className="media-content" style={{display:'flex'}}>
                        <div className="content" style={{width:'75%'}}>
                                
                                    <a href="/jobInfo"><strong>Desarrollador Android Ssr</strong></a>
                                    <small>Mulesoft</small> 
                                    <div className="tags">
                                        <span className="tag is-link">Part Time</span>
                                    </div>
                                     
                                     <small>Hace 30 minutos</small>
                                    <br />
                                     <div className="tags">
                                         <span className="tag">Hmtl</span>
                                         <span className="tag">React</span>
                                         <span className="tag">FrontEnd</span>
                                         
                                     </div>
                                
                        </div>
                        <div className="apply">
                            <a href="/" className="button is-primary" style={{color: '#fff'}}>Aplicar</a>
                        </div>
                    </div>
                    
                </article>
            </div>
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div> 
                    <div className="media-content" style={{display:'flex'}}>
                        <div className="content" style={{width:'75%'}}>
                                
                                    <strong>Desarrollador Android Ssr</strong>
                                    <small>Mulesoft</small> 

                                    <div className="tags">
                                        <span className="tag is-info">Fulltime</span>
                                    </div>
                                     
                                     <small>Hace 30 minutos</small>
                                    <br />
                                     <div className="tags">
                                         <span className="tag">Hmtl</span>
                                         <span className="tag">React</span>
                                         <span className="tag">FrontEnd</span>
                                     </div>
                                
                        </div>
                        <div className="apply">
                            <a href="mailto:francisco_talenti@hotmail.com" className="button is-primary" style={{color: '#fff'}}>Aplicar</a>
                            
                        </div>

                    </div>
                    
                </article>
            </div>
            <div className="box">
                <article className="media">
                    <div className="media-left">
                        <figure className="image is-64x64">
                            <img src="https://bulma.io/images/placeholders/128x128.png" alt="Image" />
                        </figure>
                    </div> 
                    <div className="media-content" style={{display:'flex'}}>
                        <div className="content" style={{width:'75%'}}>
                                <p>
                                    <strong>Desarrollador Android Ssr</strong>
                                     <small>Mulesoft</small>
                                     <div className="tags">
                                        <span className="tag is-warning">Remoto</span>
                                    </div>
                                    
                                     <small>Hace 30 minutos</small>
                                    <br />
                                     <div className="tags">
                                         <span className="tag">Hmtl</span>
                                         <span className="tag">React</span>
                                         <span className="tag">FrontEnd</span>
                                     </div>
                                </p>
                        </div>
                        <div className="apply" >
                            <a href="/" className="button is-primary" style={{color: '#fff'}}>Aplicar</a>
                        </div>
                    </div>
                    
                </article>
            </div>
            
        </section>
        </>
    )
}

export default Lastjobs
