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
                    <h1 className="header-text animate__animated animate__backInRight ">
                    


                    Conectando empresas con personas con <span className="company_name">endlyJob</span>
                </h1>
                <p className="description">Encontra tu primer empleo.</p>
                
                    
                
                    </div>
            </div>
        </div>
        
        <PageInfo />
        
       
        <LastJobs />
            
       
    </>
    )
}

export default Header
