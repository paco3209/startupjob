import React, { useState } from 'react'
import Dropzone from 'react-dropzone';
import { Icon } from 'antd';
import Axios from 'axios';
function FileUpload(props) {

    const [Images, setImages] = useState([])

    const onDrop = (files) => {

        let formData = new FormData();
        const config = {
            header: { 'content-type': 'multipart/form-data' }
        }
        formData.append("file", files[0])
        //save the Image we chose inside the Node Server 
        Axios.post('/api/jobs/uploadImage', formData, config)
            .then(response => {
                if (response.data.success) {

                    setImages([...Images, response.data.image])
                    props.refreshFunction([...Images, response.data.image])

                } else {
                    alert('Fallo el Servidor. No se puede guardar la imagen')
                }
            })
    }


    const onDelete = (image) => {
        const currentIndex = Images.indexOf(image);

        let newImages = [...Images]
        newImages.splice(currentIndex, 1)

        setImages(newImages)
        props.refreshFunction(newImages)
    }

    return (
              
        <div style={{ display: 'flex' }}>
            <Dropzone
                onDrop={onDrop}
                multiple={false}
                maxSize={800000000}
            >
                {({ getRootProps, getInputProps }) => (
                    <div style={{
                        width: '180px', height: '120px', border: '1px solid lightgray',
                         alignItems: 'center', justifyContent: 'center', marginRight:'5px', marginBottom:'5px'
                    }}
                        {...getRootProps()}
                    >
                        <input {...getInputProps()} />
                        
                        <p><Icon type="camera" style={{ fontSize: '1rem', marginTop:'25px' }} /> </p>
                        <p style={{fontSize:'0.55em', textAlign:'center' , color:'#a5a2a2'}}>Agregar Fotos. También podés arrastrarlas</p>
                        
                        
                        
                    </div>
                )}
            </Dropzone>

            <div style={{ display: 'flex', width: '800px', height: '120px', overflowX: 'scroll' }}>

                {Images.map((image, index) => (
                    <div onClick={() => onDelete(image)}>
                        <img style={{ minWidth: '180px', width: '180px', height: '120px' }} src={`http://localhost:5000/${image}`} alt={`productImg-${index}`} />
                    </div>
                ))}


            </div>

        </div>
    )
}

export default FileUpload
