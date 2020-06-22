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
        
        <>
        <div className="container" style={{marginBottom:'30px'}}>
        
                <div className="title-wrapper has-text-centered" style={{marginBottom:'20px'}}>
                    <div className="title is-3 is-spaced">
                        {totalJobs} empleos publicados
                    </div>
                    <div className="subtitle is-5 is-muted">Encontra tu próximo trabajo</div>
                    
                </div>
        
                <div className="content-wrapper">
                    <div className="columns is-multiline has-text-centered">
        
                        <div className="column is-hidden-mobile"></div>
        
                        <div className="column">
                            <div className="icon-box">
                                <div className="icon-wrapper is-feature-reveal" data-sr-id="5" >
                                    <img src="/images/iconfinder_jee01-08_2180876.svg" style={{width:'48px',height:'48px'}}/>
                                </div>
                                <div className="box-content">
                                    <div className="box-title">
                                        Gratis
                                    </div>
                                    <div className="box-text">
                                        Publica tus anuncios sin costo.
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        
                        <div className="column">
                            <div className="icon-box">
                                <div className="icon-wrapper is-feature-reveal" data-sr-id="7"  >
                                    <img src="/images/iconfinder_jee01-05_2180879.svg" style={{width:'48px',height:'48px'}} />
                                </div>
                                <div className="box-content">
                                    <div className="box-title">
                                        Divertido
                                    </div>
                                    <div className="box-text">
                                        Publica con Emojis.
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div className="column">
                            <div className="icon-box">
                                <div className="icon-wrapper is-feature-reveal" data-sr-id="8" >
                                    <img src="/images/iconfinder_jee01-09_2180868.svg" style={{width:'48px',height:'48px'}} />
                                </div>
                                <div className="box-content">
                                    <div className="box-title">
                                        Amigable
                                    </div>
                                    <div className="box-text">
                                        Mostra fotos de tu oficina.
                                    </div>
                                </div>
                            </div>
                        </div>
        
                        <div className="column is-hidden-mobile"></div>
                    </div>
        
                    
                </div>
            </div>
            </>
    )
}

export default PageInfo
