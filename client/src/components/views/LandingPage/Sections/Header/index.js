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
                <p className="description">Encontra tu proximo empleo.</p>
                
                    
                
                    </div>
            </div>
            <svg class="arrows">
                <path class="a1" d="M0 0 L30 32 L60 0"></path>
                <path class="a2" d="M0 20 L30 52 L60 20"></path>
                <path class="a3" d="M0 40 L30 72 L60 40"></path>
              </svg>
        </div>
        
        <PageInfo />
        
       
        <LastJobs />
            
       
    </>
    )
}

export default Header
