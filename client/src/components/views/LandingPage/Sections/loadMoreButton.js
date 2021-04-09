import React, { useState } from 'react'

function LoadMoreButton(props) {
    const [isLoading, setisLoading] = useState(false)

    const loading = <div>is loading...</div>

    return (
    
         
        <div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <button className="button is-success" onClick={props.onLoadMore}>Ver mas empleos</button>
                </div>
        </div >
            
            
    )
}

export default LoadMoreButton
