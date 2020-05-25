import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import './style.scss';
import Axios from 'axios';
import Moment from 'react-moment';
import 'moment/locale/es';
import ImageSlider from '../../../utils/ImageSlider';
import SearchFeature from '../SearchFeature';



function Lastjobs() {
    const [jobs, setjobs] = useState([])

    const [Skip, setSkip] = useState(0)
    const [Limit, setLimit] = useState(8)
    const [PostSize, setPostSize] = useState()
    const [searchTerm, setsearchTerm] = useState("")
    

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getJobs(variables)
        
    }, [])

    const getJobs =  async (variables) => {
        await Axios.post('/api/jobs/getjobs', variables)
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
            loadMore: true,
            searchTerm: searchTerm

        }
        getJobs(variables)
        setSkip(skip)
    }

    const updateSearchTerms = (newSearchTerm) => {

        const variables = {
            skip: 0,
            limit: Limit,
            
            searchTerm: newSearchTerm
        }

        console.log(variables);
        
        setSkip(0)
        setsearchTerm(newSearchTerm)

        getJobs(variables)
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
                          <a href={job.url}  className="button is-primary" style={{color: '#fff'}}>Aplicar</a>  
                        </div>
                    </div>
                    
                </article>
            </div>
            
        )
    })

    return (
        <>
        <div className="searchTerm">
        <SearchFeature
            refreshFunction={updateSearchTerms}
                />
        </div>

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
