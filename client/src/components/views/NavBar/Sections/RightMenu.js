/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react';
import style from './style.scss';
import { Menu } from 'antd';
import axios from 'axios';
import { USER_SERVER } from '../../../Config';
import { withRouter } from 'react-router-dom';
import { useSelector } from "react-redux";


function RightMenu(props) {
  const user = useSelector(state => state.user)

  const logoutHandler = () => {
    axios.get(`${USER_SERVER}/logout`).then(response => {
      if (response.status === 200) {
        props.history.push("/login");
      } else {
        alert('Log Out Failed')
      }
    });
  };

  const errorLogin = () => {
    alert("Debes estar logueado para poder publicar.")
  }

  

  if (user.userData && !user.userData.isAuth) {
    return (

      <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="button is-small" href="/register">
                  <span className="icon">
                    <i className="fa fa-user-plus"></i>
                  </span>
                  <span>
                  Regístrate
                  </span>
                </a>
              </p>
              <p className="control">
                
                <a className="button is-small is-outlined" href="/login">
                  <span className="icon">
                    <i className="fa fa-user"></i>
                  </span>
                  <span>Iniciar sesión</span>
                </a>
              </p>
              <p className="control">
                
                <a className="button is-small is-primary" href="/login" onClick={errorLogin} >
                  
                  <span>Publicar Empleo</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      
    )
  } else {
    return (
      <div className="navbar-end">
          <div className="navbar-item">
            <div className="field is-grouped">
              <p className="control">
                <a className="button is-small" onClick={logoutHandler}>
                  
                  <span>
                  Cerrar sesión
                  </span>
                </a>
              </p>
              <p className="control">
                <a className="button is-small" href="/jobsbyuser">
                
                  
                  <span>
                  Ver Empleos Publicados
                  </span>
                
                  
                </a>
              </p>
              <p className="control">
                
                <a className="button is-small is-primary" href="/post">
                  
                  <span>Publicar Empleo</span>

                </a>
              </p>
            </div>
          </div>
        </div>
      
    )
  }
}

export default withRouter(RightMenu);

