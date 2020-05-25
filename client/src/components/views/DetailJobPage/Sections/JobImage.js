import React, { useEffect, useState } from 'react'
import ImageGallery from 'react-image-gallery';


function JobImage(props) {
    const [Images, setImages] = useState([])

    useEffect(() => {
        if (props.detail.images && props.detail.images.length > 0) {
            let images = [];

            props.detail.images && props.detail.images.map(item => {
                images.push({
                    original: `http://192.168.0.162:5000/${item}`,
                    thumbnail: `http://192.168.0.162:5000/${item}`
                })
            })
            setImages(images)
        }
    }, [props.detail])
    
    return (
        <div>
            <ImageGallery items={Images} />
        </div>
    )
}

export default JobImage
