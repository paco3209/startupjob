import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col, Input, Layout} from 'antd';
import './style.scss';
import LastJobs from '../Lastjobs';

const { Search  } = Input;
const {Content } = Layout;

function Header(props) {
    return (
    <>

        <div className="columns header" >
            <div className="column">
                <div className="leftside" >
                <img src="/images/startup.svg" alt="startup Logo" className="startup"
                    />
                </div>
            </div>
            <div className="column">
                <div className="rightside ">
                    <h1 className="header-text">
                    Conectando startups con personas.
                </h1>
                <br />
                
                    <Search size="large" className="input-search" placeholder="Puesto o palabra clave" onSearch={value => console.log(value)} enterButton />
                
                    </div>
            </div>
        </div>
        
        <div className="has-text-centered max-w-650 mx-auto" style={{marginBottom:'40px', height:'180px'}}><h1 className="title font-900">Meet April</h1><p>Lorem ipsum is common placeholder text used to demonstrate the graphic elements of a document or visual presentation.</p></div>
        
        <div className="columns">
            <div className="column">

                <h1>Ultimos Empleos</h1>
            </div>
        </div>

        <div className="columns">
            <div className="column is-three-quarters">
                <div className="container-job">
                 <LastJobs />
                </div>
                
                
            </div>
            <div className="column">
                ads
            </div>
        </div>
            
       
    </>
    )
}

export default Header
