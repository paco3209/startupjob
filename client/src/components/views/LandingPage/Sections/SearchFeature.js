import React, { useState } from 'react'
import { Input, } from 'antd';
import './styleSearch.scss';

const { Search } = Input;

function SearchFeature(props) {

    const [SearchTerms, setSearchTerms] = useState("")
    const [Term, setTerm] = useState("")
    const [Searching, setSearching] = useState(false)


    const onChangeSearch = (event) => {
        setSearchTerms(event.currentTarget.value)
        
        
        
        

    }

    const resetSearch = () => {
        props.refreshFunction("")
        setTerm("")
        setSearchTerms("")
        setSearching(false)
    }

    const searchJob = (e) => {
        e.preventDefault()
        props.refreshFunction(SearchTerms)
        setTerm(SearchTerms)
        setSearching(true)
        
    }



    return (
        <div style={{textAlign:'center'}}>
            <div className="Search">
            <form onSubmit={searchJob}>
            <input type="text"
                style={{width:'400px',marginRight:'5px'}}
                className="input is-hover has-text-centered"
                value={SearchTerms}
                onChange={onChangeSearch}
                placeholder="Buscar por posicion"
            />
            
            
            
            <button type="button" type="submit" className="button is-info" onClick={searchJob} >Buscar </button>
            </form>    
            </div>
            <div className="tag-search">
            {Searching && (<div  className="tags has-addons">
            <span className="tag is-link">
            {Term}
            <button className="delete is-small" onClick={resetSearch}></button>
            </span>
                            </div>)}
        </div>
        </div>
        
    )
}

export default SearchFeature
