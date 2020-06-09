import React, { useState } from 'react';

import NavBar from '../NavBar/NavBar';
import { useForm, useFieldArray} from 'react-hook-form'
import Footer from '../Footer/Footer';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from 'axios';
import './style.scss';
import FileUpload from '../utils/FileUpload';
import swal from 'sweetalert';


function JobPost(props) {

    
    
    const { register, errors, handleSubmit, reset, control } = useForm();
    const { fields, append, prepend, remove } = useFieldArray({
        control,
        name: "test"
      });
    
    const [editorState, seteditorState] = useState(EditorState.createEmpty())
    const [requiredState, setrequiredState] = useState(EditorState.createEmpty())
    const [benefitsState, setbenefitsState] = useState(EditorState.createEmpty())
    const [Images, setImages] = useState([])
    
    const [applyUrl, setapplyUrl] = useState('')

    const updateImages = (newImages) => {
        setImages(newImages)
    }

    const handleUrl = (event) => {
        setapplyUrl(event.target.value)
    }

    
    const onSubmit = data => {

        let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        
        let contacto = data.url

        if(re.test(contacto)){
            contacto = "mailto:" + contacto + "?subject=endlyJob - " + data.title
        }
 
        

        
        if (!editorState || !requiredState || !benefitsState ) {
            return swal("Por favor, completa todos los campos.")
        }

        const newPost = {
            title: data.title,
            userpost: props.user.userData._id,
            typeJob: data.jobtype,
            images: Images,
            tags: data.test,
            link: data.link,
            requeriments: data.requirements,
            description: data.description,
            benefits: data.benefits,
            company: data.company,
            url: contacto
        }

        
        
        
        
        Axios.post('/api/jobs/uploadjob', newPost)
            .then(response => {
                if (response.data.success) {
                    swal("Bien!", "Empleo Publicado con exito.", "success");
                    props.history.push('/')

                    seteditorState(EditorState.createEmpty())
                    setbenefitsState(EditorState.createEmpty())
                    setrequiredState(EditorState.createEmpty())
                } else {
                    swal('Error',"Por favor, vuelva a intentarlo","error")
                }
            })

        
            

        
        


    }


    return (
        <>
            <NavBar />
            <div className="columns">

                <div className="column formulario">
                    <h1 style={{ textAlign: 'left' }}>Publicar Empleo</h1>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        
                        
                    
                            <div className="titulo" style={{display:'flex', flexDirection:'column', marginBottom:'5px'}}>
                            <input name="title" className="input is-large" ref={register({ required: true })} placeholder="Puesto / Título del aviso" style={{ width: '500px', bottom:'0',paddingBottom:'0', marginRight:'20px' }} />
                            {errors.title && 'El titulo es obligatorio'}
                            </div>
                        
                        
                        <FileUpload refreshFunction={updateImages} />
                        <span className="info" style={{ marginTop: '-8px', color: '#999', fontSize: '12px', marginBottom: '10px' }}>Para eliminar la foto clickea sobre la foto</span>
                        <br />
                        <div style={{ marginBotton: '10px' }} className="select" >
                            <select style={{ marginBotton: '20px' }} name="jobtype" ref={register({ required: true })}>
                                <option value="" disabled defaultValue="prueba">Modalidad de Trabajo</option>
                                <option value="fulltime">Full Time</option>
                                <option value="pasantia">Pasantia</option>
                                <option value="parttime">Part Time</option>
                                <option value="remoto">Remoto</option>

                            </select>
                        </div>
                        <label htmlFor="link" className="label">Como aplicar?</label>
                        <input ref={register({ required: true })} onChange={handleUrl} name="url" style={{ marginBotton: '20px' }} type="text" className="input is-normal" placeholder="Ingresa mail o url del sitio web donde aplicar" />
                        <input ref={register({ required: true })} name="company" style={{ marginBotton: '20px' }} type="text" className="input is-normal" placeholder="Nombre de empresa" />
                        <label htmlFor="link" className="label">Etiquetas</label>
                        <span className="info" style={{ marginTop: '-8px', color: '#999', fontSize: '12px', marginBottom: '10px' }}>Palabras clave que se relacionen con el puesto.(ej frontend, backend).</span>
                        <ul>
                            {fields.map((item, index) => (
                            <li key={item.id}>
                                <input name={`test[${index}].name`} className="input is-small" placeholder="tag"  style={{width:'173px'}} defaultValue={item.name} ref={register()} />
                                <button className="button is-warning is-small" onClick={() => remove(index)}>Eliminar</button>
                            </li>
                            ))}
                        </ul>
                        <section>
                            <button className="button is-success is-small" type="button" onClick={() => append({ name: "" })} >
                            Agregar Etiqueta
                            </button>
                            
                        </section>

                        
                        
                        <br />
                        {/* Reemplazar por wyswyg */}
                        <div style={{ marginTop: '20px' }}>
                            <label className="label">Ingresar Descripcion del puesto</label>
                            <Editor
                            toolbar={{options: ['inline', 'blockType', 'fontSize', 'fontFamily', 'list', 'textAlign',  'link', 'embedded', 'emoji', 'image']}}
                                editorState={editorState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={seteditorState}
                                placeholder="Ingresar descripion del puesto"



                            />


                            <textarea
                                style={{ display: 'none' }}
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
                                ref={register({ required: true })}
                                name="description"
                            />

                        </div>
                        <div style={{ marginTop: '20px' }}>
                            <label className="label">Ingresar requisitos para aplicar al puesto</label>
                            <Editor
                                editorState={requiredState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={setrequiredState}
                                placeholder="Ingresar requisitos para aplicar al puesto"



                            />


                            <textarea
                                style={{ display: 'none' }}
                                value={draftToHtml(convertToRaw(requiredState.getCurrentContent()))}
                                ref={register({ required: true })}
                                name="requirements"
                            />

                        </div>


                        <div style={{ marginTop: '20px' }}>
                            <label className="label">Beneficios de trabajar en la empresa</label>
                            <Editor
                                editorState={benefitsState}
                                toolbarClassName="toolbarClassName"
                                wrapperClassName="wrapperClassName"
                                editorClassName="editorClassName"
                                onEditorStateChange={setbenefitsState}
                                placeholder="Ingresar beneficios de trabajar en la empresa"



                            />


                            <textarea
                                style={{ display: 'none' }}
                                value={draftToHtml(convertToRaw(benefitsState.getCurrentContent()))}
                                ref={register({ required: true })}
                                name="benefits"
                            />

                        </div>
                        <button className="button is-success" type="submit" onClick={onSubmit}
                >
                        Publicar Empleo</button>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default JobPost;
