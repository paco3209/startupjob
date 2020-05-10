import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';



function Lastjobs() {
    const [jobs, setjobs] = useState([])

    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getJobs(variables)
        
    }, [])

    const getJobs = (variables) => {
        Axios.post('/api/jobs/getjobs', variables)
            .then(response => {
                if(response.data.success){
                    if(variables.loadMore){
                        setjobs([...jobs,...response.data.products]) 
                    }else{
                        setjobs(response.data.products)
                    }
                   setPostSize(response.data.postSize)
                }else{
                    alert("Error de carga.")
                }
            })

    }

    const onLoadMore = () => {
        let skip = Skip + Limit;

        const variables = {
            skip: skip,
            limit: Limit,
            loadMore: true

        }
        getJobs(variables)
        setSkip(skip)
    }

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
            
            
        </section>
        <br/>
        {PostSize >= Limit &&
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="button is-success" onClick={onLoadMore}>Ver mas empleos</button>
                </div>
            }
        </>
    )
}

export default Lastjobs
