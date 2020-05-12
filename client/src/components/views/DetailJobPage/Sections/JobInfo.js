import React from 'react';
import './style.scss';
import Moment from 'react-moment';
import 'moment/locale/es';
import {FaBuilding, FaBusinessTime} from 'react-icons/fa';
import ImageSlider from '../../utils/ImageSlider';


function JobInfo(props) {
    return (
        <>
        <div className="columns container-info">
            <div className="column is-three-quarters title">
                <h1>{props.detail.title}</h1>
                <ul className="job-listing-meta meta job-details">
                	<li className="location"><i className="icon-location"></i><FaBusinessTime /> {props.detail.typeJob}</li>
                    <li className="location"><i className="icon-location"></i><FaBuilding /> {props.detail.company}</li>
	            </ul>
                <small className="job-post-date"><em>Publicado <Moment  parse="YYYY-MM-DD HH:mm" locale="es" utc fromNow > {props.detail.date}</Moment></em></small>
            </div>
            <column className="photos">
                IMagen
                
            </column>
        </div>
        
        
            <div className="columns job-container">
                <div className="column job-header">
                    <h2>Acerca del empleo</h2>
                </div> 
            </div>
            <div className="columns details" style={{display:'flex',flexDirection:'column'}}>
                <div className="column details-content" >
                    <h4 className="subtitle">Cuales son las razones para trabajar con nosotros??</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: props.detail.description }} />
                    
                    </div>
                </div>
                <div className="column">
                    <h4 className="subtitle">Cual va a ser tu tarea?</h4>
                    <div className="detail">
                    - You will be responsible for the design, architecture, and coding for Android mobile applications
                    <br />
                    - You will be responsible for the design, architecture, and coding for Android mobile applications
                    </div>
                </div>
                <div className="column">
                    <h4 className="subtitle">Requisitos para la posicion</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: props.detail.requeriments }} />
                    </div>
                </div>
                <div className="column">
                    <h4 className="subtitle">Beneficios</h4>
                    <div className="detail">
                    <div dangerouslySetInnerHTML={{ __html: props.detail.benefits }} />
                    </div>
                </div>
                <div className="column">
                    <div className="detail">
                         <a href={props.detail.url} className="button is-info" style={{color: '#fff'}}>Aplicar</a>
                    </div>  
                </div>
            </div>
        </>
    )
}

export default JobInfo
