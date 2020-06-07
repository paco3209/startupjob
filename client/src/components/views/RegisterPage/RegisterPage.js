import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import './style.scss';


function RegisterPage(props) {
  const dispatch = useDispatch();
  return (

    <Formik
      initialValues={{
        email: '',
        lastName: '',
        name: '',
        password: '',
        confirmPassword: ''
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string()
          .required('Por favor, ingresa tu nombre'),
        lastName: Yup.string()
          .required('Por favor, ingresa tu apellido'),
        email: Yup.string()
          .email('Email invalido')
          .required('Por favor, ingresar tu email'),
        password: Yup.string()
          .min(6, 'Tu contraseña debe tener 6 caracteres')
          .required('Por favor, ingresa tu contraseña'),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
          .required('Por favor, confirma tu contraseña')
      })}
      onSubmit={(values, { setSubmitting }) => {
        setTimeout(() => {

          let dataToSubmit = {
            email: values.email,
            password: values.password,
            name: values.name,
            lastname: values.lastname,
            image: `http://gravatar.com/avatar/${moment().unix()}?d=identicon`
          };

          dispatch(registerUser(dataToSubmit)).then(response => {
            if (response.payload.success) {
              props.history.push("/login");
            } else {
              alert(response.payload.err.errmsg)
            }
          })

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
          <>
            <div className="login-wrapper columns is-gapless">
              <div className="column is-5">
                <div className="hero is-fullheight">
                  <div className="hero-heading">
                  <div className="section intro-section has-text-centered is-signup">
                    <a href="https://cssninja.io"><img className="top-logo" src="https://cssninja.io/themes/cssninja-latest/assets/images/logo/cssninja-grayscale.svg" alt="Brand"/></a>
                </div>
                  </div>
                  <div className="hero-body">
                    <div className="container">
                      <div className="signup-form-wrap">
                        <div className="mail-signup">
                          <div className="mail-signup-form">
                            <form onSubmit={handleSubmit} >
                              <div className="mall-form-control">
                                <label htmlFor="signup-email" className="signup-label">E-mail</label>
                                <input
                                  id="email"
                                  placeholder="email@email.com"
                                  type="email"
                                  value={values.email}
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  className={
                                    errors.email && touched.email ? 'input input-email error' : 'input input-email'
                                  }
                                  required
                                />
                                {errors.email && touched.email && (
                                  <div className="input-feedback">{errors.email}</div>
                                )}
                              </div>
                              <div className="mall-two-fields">
                                <div className="mall-form-control">
                                <label htmlFor="signup-name" className="signup-label">Nombre</label>
                                <input
                                    id="name"
                                    
                                    type="text"
                                    value={values.name}
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    className={
                                      errors.name && touched.name ? 'text-input error' : 'input'
                                    }
                                  />
                                  {errors.name && touched.name && (
                                    <div className="input-feedback">{errors.name}</div>
                                  )}
                                </div>
                                <div className="mall-form-control">
                                  <label htmlFor="lastname" className="signup-label">Apellido</label>
                                  <input
                                      id="lastName"
                                      
                                      type="text"
                                      value={values.lastName}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.lastName && touched.lastName ? 'text-input error' : 'input'
                                      }
                                    />
                                    {errors.lastName && touched.lastName && (
                                      <div className="input-feedback">{errors.lastName}</div>
                                    )}
                                </div>
                              </div>
                              <div className="mall-two-fields">
                                <div className="mall-form-control">
                                    <label htmlFor="password" className="signup-label">Contraseña</label>
                                    <input
                                      id="password"
                                      
                                      type="password"
                                      value={values.password}
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      className={
                                        errors.password && touched.password ? 'text-input error' : 'input'
                                      }
                                    />
                                    {errors.password && touched.password && (
                                      <div className="input-feedback">{errors.password}</div>
                                    )}
                                </div>
                                <div className="mall-form-control">
                                      <label htmlFor="confirm-password" className="signup-label">Confirmar Contraseña</label>
                                      <input
                                        id="confirmPassword"
                                        
                                        type="password"
                                        value={values.confirmPassword}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        className={
                                          errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'input'
                                        }
                                      />
                                      {errors.confirmPassword && touched.confirmPassword && (
                                        <div className="input-feedback">{errors.confirmPassword}</div>
                                      )}
                                </div>
                              </div>
                              <div className="mall-signup-terms">
                                
                                <p className="terms">Al hacer clic en "Registrarte", aceptas nuestras <a href="/" className="termsconditions" >Condiciones de Uso y la politica de privacidad</a>.

                                </p>
                              </div>
                              <div className="mall-form-action">
                                <button type="submit" className="button button-cta primary-btn btn-align-lg is-bold is-fullwidth rounded raised no-lh will-load mall-btn-signup">Registrarte</button>
                              </div>
                             </form>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div class="column login-column is-7 is-hidden-mobile hero-banner">
        <div class="hero signup-hero is-fullheight is-theme-primary is-relative">
            <div class="columns has-text-centered">
                <div class="column">
                    <h1 class="title is-2 light-text">
                        Join the community
                    </h1>
                    <h3 class="subtitle is-5 light-text">
                        Join our community of customers and get access to our support forum. We'll be glad to help you
                        and to answer your questions.
                    </h3>
                    
                    <img className="mockup"  src="/images/register_photo2.svg" alt=""/>
                    
                    <div class="already">
                        
                        <a href="/login" className="not-member" >Ya tenes una cuenta?</a>
                    </div>
                </div>
            </div>
        </div>
    </div>                          
            </div>

            
              
           </> 

        );
      }}
    </Formik>
  );
};


export default RegisterPage
