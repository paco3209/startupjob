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


    const listCategory = () =>{
        
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
                                
                        <a href={`/jobsid/${job._id}`} style={{display:'table-cell'}} target="_blank" className="job-title">{job.title}</a>
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
                        <div className="apply" >
                          <a href={job.url} style={{display:'table-cell'}} target="_blank"  className="button is-primary" style={{color: '#fff',top:'30%',width:'100%', textAlign:'center'}}>Aplicar</a>  
                        </div>
                    </div>
                    
                </article>
            </div>
            
        )
    })

    return (
        <>
        <div className="columns">
            <div className="column is-three-quarters"  >
                <div className="container-job">
                <h1>Ultimos Empleos</h1>
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
                </div>
                
                
            </div>
            <div className="column">
                
               <div className="caterory" style={{marginTop:'30px'}}>
                    <ul className="menu-list" >
                        <li>
                            <h3>Categorias</h3>
                            <ul className="category-list">
                                
                                
        	
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-administracion.html" title="Administración">Administración</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-call-center.html" title="Call center">Call center</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-comercio-exterior.html" title="Comercio exterior">Comercio exterior</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-comunicacion.html" title="Comunicación">Comunicación</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-construccion.html" title="Construcción">Construcción</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-diseno.html" title="Diseño">Diseño</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-educacion.html" title="Educación">Educación</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-finanzas.html" title="Finanzas">Finanzas</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-gastronomia.html" title="Gastronomia">Gastronomia</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-gerencia.html" title="Gerencia">Gerencia</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-ingenieria.html" title="Ingeniería">Ingeniería</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-legales.html" title="Legales">Legales</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-logistica.html" title="Logística">Logística</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-marketing.html" title="Marketing">Marketing</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-mineria.html" title="Minería">Minería</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-oficios.html" title="Oficios">Oficios</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-produccion.html" title="Producción">Producción</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-recursos-humanos.html" title="Recursos humanos">Recursos humanos</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-salud.html" title="Salud">Salud</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-secretaria.html" title="Secretaria">Secretaria</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-seguros.html" title="Seguros">Seguros</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-tecnologia.html" title="Tecnología">Tecnología</a></li>
          
            <li><a class="filter-item" href="/ofertas-de-empleo-categoria-ventas.html" title="Ventas">Ventas</a></li>
          
          


                            </ul>
                        </li>
                    </ul>
                    </div> 
                </div>
            
        </div>


        
        </>
    )
}

export default Lastjobs
