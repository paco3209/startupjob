import React, {useState, useEffect} from 'react';
import './style.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import {FaBuilding, FaBusinessTime} from 'react-icons/fa';
import ImageSlider from '../../utils/ImageSlider';
import JobImage from './JobImage';
import {Col} from 'antd'


function JobInfo(props) {
    const [job, setjob] = useState({})

    useEffect(() => {

        setjob(props.detail)
        
        

    }, [props.detail])

    return (
        <>
        <div className="columns container-info">
            <div className="column is-three-quarters title">
                <h1>{job.title}</h1>
                <ul className="job-listing-meta meta job-details">
                	<li className="location"><i className="icon-location"></i><FaBusinessTime /> {job.typeJob}</li>
                    <li className="location"><i className="icon-location"></i><FaBuilding /> {job.company}</li>
	            </ul>
                <small className="job-post-date"><em>Publicado <Moment  parse="YYYY-MM-DD HH:mm" locale="es" utc fromNow > {job.date}</Moment></em></small>
            </div>
           
            
                
            
                         <JobImage detail={job} />
            
                
            
        </div>
        
        
            <div className="columns job-container">
                <div className="column job-header">
                    <h2>Acerca del empleo</h2>
                </div> 
            </div>
            <div className="columns details" >
                <div className="column details-content" >
                    <h4 className="subtitle">Cual va a ser tu tarea?</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: job.description }} />
                    
                    </div>
                </div>
             </div>
             <div className="columns details">   
                <div className="column details-content">
                    <h4 className="subtitle">Requisitos para la posicion</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: job.requeriments }} />
                    </div>
                </div>
            </div>
            <div className="columns details">
                <div className="column details-content">
                    <h4 className="subtitle">Beneficios</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: job.benefits }} />
                    </div>
                </div>
            </div>    
            
            <div className="columns details">
                <div className="column" style={{display:'flex', justifyContent:'space-between'}} >
                    <div className="detail">
                         <a href={job.url}  style={{display:'table-cell'}} target="_blank" className="button is-info" style={{color: '#fff'}}>Aplicar</a>
                    </div>  
                    <div className="back" >
                    <a href="/"  ><i className="fas fa-long-arrow-alt-left"></i>  Volver</a>
                </div>
                </div>
            </div>
        </>
    )
}

export default JobInfo
