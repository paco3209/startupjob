import React, { useState } from 'react';

import NavBar from '../NavBar/NavBar';
import { useForm } from 'react-hook-form'
import Footer from '../Footer/Footer';
import { EditorState, convertToRaw } from 'draft-js';
import { Editor } from 'react-draft-wysiwyg';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import Axios from 'axios';
import './style.scss';

function JobPost(props) {
    const { register, errors, handleSubmit, reset } = useForm();
    const [editorState, seteditorState] = useState(EditorState.createEmpty())
    const [requiredState, setrequiredState] = useState(EditorState.createEmpty())
    const [benefitsState, setbenefitsState] = useState(EditorState.createEmpty())
    const [tags, settags] = useState([])

    
    const onSubmit = data => {

       

        if (!editorState || !requiredState || !benefitsState ) {
            return alert('fill all the fields first!')
        }

        const newPost = {
            title: data.title,
            userpost: props.user.userData._id,
            typeJob: data.jobtype,
            
            tags: data.tags.split(','),
            link: data.link,
            requeriments: data.requirements,
            description: data.description,
            benefits: data.benefits,
            company: data.company,
            url: data.url
        }

        
        
        
        Axios.post('/api/jobs/uploadjob', newPost)
            .then(response => {
                if (response.data.success) {
                    alert('Empleo publicado con exito.')
                    props.history.push('/')

                    seteditorState(EditorState.createEmpty())
                    setbenefitsState(EditorState.createEmpty())
                    setrequiredState(EditorState.createEmpty())
                } else {
                    alert('Failed to upload Product')
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

                        <input name="title" className="input is-large" ref={register({ required: true })} placeholder="Puesto / Título del aviso" style={{ width: '500px', marginBottom: '10px' }} />
                        {errors.title && 'El titulo es obligatorio'}

                        <br />


                        <div style={{ marginBotton: '10px' }} className="select" >
                            <select style={{ marginBotton: '20px' }} name="jobtype" ref={register({ required: true })}>
                                <option value="" disabled defaultValue="prueba">Modalidad de Trabajo</option>
                                <option>Full Time</option>
                                <option>Pasantia</option>
                                <option>Part Time</option>
                                <option>Remoto</option>

                            </select>
                        </div>
                        <label htmlFor="link" className="label">Como aplicar?</label>
                        <input ref={register({ required: true })} name="url" style={{ marginBotton: '20px' }} type="text" className="input is-normal" placeholder="Ingresa mail o url del sitio web donde aplicar" />
                        <input ref={register({ required: true })} name="company" style={{ marginBotton: '20px' }} type="text" className="input is-normal" placeholder="Nombre de empresa" />

                        <input ref={register({})}  name="tags" type="text" defaultValue="" className="input is-normal" placeholder="Etiquetas" />
                        <span className="info" style={{ marginTop: '-8px', color: '#999', fontSize: '12px', marginBottom: '10px' }}>Palabras que se relacionen con el puesto.(ej frontend, backend). Separar etiquetas por ","</span>
                        <br />
                        {/* Reemplazar por wyswyg */}
                        <div style={{ marginTop: '20px' }}>
                            <label className="label">Ingresar Descripcion del puesto</label>
                            <Editor
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
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
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
                                value={draftToHtml(convertToRaw(editorState.getCurrentContent()))}
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
