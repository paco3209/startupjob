import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { loginUser } from "../../../_actions/user_actions";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { Form, Icon, Input, Button, Checkbox, Typography } from 'antd';
import { useDispatch } from "react-redux";
import Header from '../LandingPage/Sections/Header';
import './style.scss';
import FeatherIcon from 'feather-icons-react';

const { Title } = Typography;

function LoginPage(props) {
  const dispatch = useDispatch();
  const rememberMeChecked = localStorage.getItem("rememberMe") ? true : false;

  const [formErrorMessage, setFormErrorMessage] = useState('')
  const [rememberMe, setRememberMe] = useState(rememberMeChecked)

  const handleRememberMe = () => {
    setRememberMe(!rememberMe)
  };

  const initialEmail = localStorage.getItem("rememberMe") ? localStorage.getItem("rememberMe") : '';

  return (
    
    
    <Formik
      initialValues={{
        email: initialEmail,
        password: '',
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string()
          .email('Email invalido')
          .required('Ingresa tu email.'),
        password: Yup.string()
          .min(6, 'La contraseña tiene que tener al menos 6 caracteres.')
          .required('Ingresa tu contraseña.'),
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {
          let dataToSubmit = {
            email: values.email,
            password: values.password
          };

          dispatch(loginUser(dataToSubmit))
            .then(response => {
              if (response.payload.loginSuccess) {
                window.localStorage.setItem('userId', response.payload.userId);
                if (rememberMe === true) {
                  window.localStorage.setItem('rememberMe', values.id);
                } else {
                  localStorage.removeItem('rememberMe');
                }
                props.history.push("/")
              } else {
                setFormErrorMessage('Usuario o contraseña invalida. Por favor, volve a intentarlo.')
              }
            })
            .catch(err => {
              setFormErrorMessage('Usuario o contraseña invalida. Por favor, volve a intentarlo.')
              setTimeout(() => {
                setFormErrorMessage("")
              }, 3000);
            });
          setSubmitting(false);
        }, 500);
      }}
    >
      {props => {
        const {
          values,
          touched,
          errors,
          dirty,
          isSubmitting,
          handleChange,
          handleBlur,
          handleSubmit,
          handleReset,
        } = props;
        return (
          
          <div className="columns main-authentication is-gapless">
            
              
              <div className="column  content">
              <div className="hero is-fullheight">
                  <div className="hero-heading">
                    <div className="section has-text-centered">
                    <p className="not-member">
                     LOGO
                      
                    </p>
                    </div>
                    <div className="no-account-link has-text-centered">
                      <a href="/register" className="not-member">No sos Miembro?</a>
                    </div>
                  </div>
                  
                
                
                <div className="hero-body">
                  <div className="container">
                  <div className="login-form-wrap">
                  <form onSubmit={handleSubmit}>
    <div id="signin-form" class="login-form animated preFadeInLeft fadeInLeft">
        
        <div class="field pb-10">
            <div class="control">
            <input
                      id="email"
                      prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                      placeholder="E-Mail"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'input error' : 'input'
                      }
                      
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                
                
                <div class="form-icon">
                    
                </div>
            </div>
        </div>
        
        <div class="field pb-10">
            <div class="control">
            <input
                          id="password"
                          prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                          placeholder="Contraseña"
                          type="password"
                          value={values.password}
                          onChange={handleChange}
                          onBlur={handleBlur}
                          className={
                            errors.password && touched.password ? 'input error' : 'input'
                          }
                        />
                        {errors.password && touched.password && (
                          <div className="input-feedback">{errors.password}</div>
                        )}
                
                <div class="form-icon">
                    <i class="sl sl-icon-lock"></i>
                </div>
            </div>
        </div>
        
        <p class="control login">
        <button type="submit" className="button button-cta primary-btn btn-align-lg is-bold is-fullwidth rounded raised no-lh  will-load">
                Ingresar
            </button>
        </p>
    </div>
</form>
<div id="recover" class="forgot-password animated preFadeInLeft fadeInLeft pb-20 pt-20">
                            <p class="has-text-centered">
                                <a href="/reset_password">Olvidaste tu contraseña ?</a>
                            </p>
                        </div>
                  
                  
                  
                  
                  
                </div>
                </div>
              </div>
              </div>
              </div>
              <div className="column auth-sidebar is-5 ">
              <div class="hero is-fullheight is-theme-primary is-relative">
            <div class="columns has-text-centered">
                <div class="column">
                    <h2 class="title is-3 light-text">
                        Publica de forma gratuita

                    </h2>
                    <h3 class="subtitle is-5 light-text">
                        El portal de trabajo para encontrar los mejores candidatos
                    </h3>
                    <div class="mt-30 has-text-centered">
                        <a href="/register" class="button button-cta btn-outlined is-bold light-btn rounded">Registrate</a>
                    </div>
                </div>
            </div>
            <img class="login-city" src="/images/login_photo.svg" alt="" />
        </div>
                  
                  
              </div>
                    
          </div>
        );
      }}
    </Formik>
    
    
  );
};

export default withRouter(LoginPage);


