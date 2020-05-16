import React from 'react';
import 'antd/dist/antd.css';
import {Row, Col, Input, Layout} from 'antd';
import './style.scss';
import LastJobs from '../Lastjobs';
import PageInfo from './PageInfo';

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
                
                
                    
                
                    </div>
            </div>
        </div>
        
        <PageInfo />
        
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
