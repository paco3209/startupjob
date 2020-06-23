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
    const [category, setcategory] = useState("")
    

    

    useEffect(() => {

        const variables = {
            skip: Skip,
            limit: Limit,
        }
        getJobs(variables)
        
    }, [])

    const getJobsByCategory =  async (variables) => {
        await Axios.post('/api/jobs/getjobsbycategory', variables)
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

        
        
        setSkip(0)
        setsearchTerm(newSearchTerm)

        getJobs(variables)
    }

    const updateCategory = (newSearchTerm, Description) => {

        const variables = {
            skip: 0,
            limit: Limit,
            
            searchTerm: newSearchTerm
        }
        setcategory(Description)
        
        
        setSkip(0)
        

        getJobs(variables)
    }


    const resetSearch = () => {
        updateCategory("")
        setcategory("")
        
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
                            {category && (<div  className="tags has-addons">
            <span className="tag is-info">
            {category}
            <button className="delete is-small" onClick={resetSearch}></button>
            </span>
                            </div>)}
                            <ul className="category-list">
                                
                                
        	
            <li><a class="filter-item" onClick={()=>{
                updateCategory("administracion","Administración")
            }} title="Administración">Administración</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("callcenter","Call Center")}} title="Call center">Call center</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("comercioexterior","Comercio Exterior")}} title="Comercio exterior">Comercio exterior</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("comunicacion","Comunicación")}} title="Comunicación">Comunicación</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("contruccion","Construcción")}} title="Construcción">Construcción</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("diseno","Diseño")}} title="Diseño">Diseño</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("educacion","Educación")}} title="Educación">Educación</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("finanzas","Finanzas")}} title="Finanzas">Finanzas</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("gastronomia","Gastronomia")}} title="Gastronomia">Gastronomia</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("gerencia","Gerencia")}} title="Gerencia">Gerencia</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("ingenieria","Ingeniería")}} title="Ingeniería">Ingeniería</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("legales","Legales")}} title="Legales">Legales</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("logistica","Logística")}} title="Logística">Logística</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("marketing","Marketing")}} title="Marketing">Marketing</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("mineria","Minería")}} title="Minería">Minería</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("oficios","Oficios")}} title="Oficios">Oficios</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("produccion","Producción")}} title="Producción">Producción</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("recursoshumanos","Recursos Humanos")}} title="Recursos humanos">Recursos Humanos</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("salud","Salud")}} title="Salud">Salud</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("secretaria","Secretaria")}} title="Secretaria">Secretaria</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("seguros","Seguros")}} title="Seguros">Seguros</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("tecnologia","Tecnología")}} title="Tecnología">Tecnología</a></li>
          
            <li><a class="filter-item" onClick={()=>{
                updateCategory("ventas","Ventas")}} title="Ventas">Ventas</a></li>
          
          


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
