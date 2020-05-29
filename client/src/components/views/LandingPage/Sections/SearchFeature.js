import React, { useState } from 'react'
import { Input } from 'antd';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")

    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)

        

    }

    const searchJob = () => {
        props.refreshFunction(SearchTerms)
    }



    return (
        <div style={{textAlign:'center'}}>
            <input type="text"
                style={{width:'400px',marginRight:'5px'}}
                className="input is-info"
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Buscar por posicion..."
            />
            <button type="button" className="button is-info" onClick={searchJob} >Buscar </button>

        </div>
    )
}

export default SearchFeature
