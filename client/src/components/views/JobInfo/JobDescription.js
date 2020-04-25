import React from 'react';
import './style.scss';

function JobDescription() {
    return (
        <>
        <div className="columns container-info">
            <div className="column title">
                <h1>Desarrollador Android Ssr</h1>
                <ul className="job-listing-meta meta job-details">
	        		<li className="job-type full-time"><i className="icon-briefcase"></i> Full-time</li>
                	<li className="location"><i className="icon-location"></i> Remote</li>
	            </ul>
                <small className="job-post-date"><em><time datetime="2020-04-18">Publicado hace 3 horas</time></em></small>
            </div>
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
                    1. Based in Redwood City, we are developing a platform through augmented reality.
                    <br/>
                    2. Our company is in the start up phase with solid funding.
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
                    - 4+ years Android development 
                    <br/>
                    - Experience with Java or Kotlin (Kotlin preferred) 
                    <br/>
                    - Experience with entire app life cycle- ideally in a startup environment
                    </div>
                </div>
                <div className="column">
                    <h4 className="subtitle">Beneficios</h4>
                    <div className="detail">
                    - Competitive salary
                    <br/>
                    - Stock Options
                    <br/>
                    - Full Benefits
                    </div>
                </div>
                <div className="column">
                    <div className="detail">
                         <a href="/" className="button is-info" style={{color: '#fff'}}>Aplicar</a>
                    </div>  
                </div>
            </div>
            
                
            
            

        </>
    )
};


export default JobDescription
