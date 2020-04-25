import React from "react";
import moment from "moment";
import { Formik } from 'formik';
import * as Yup from 'yup';
import { registerUser } from "../../../_actions/user_actions";
import { useDispatch } from "react-redux";
import './style.scss';

import {
  Form,
  Input,
  Button,
} from 'antd';

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};
const tailFormItemLayout = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 16,
      offset: 8,
    },
  },
};

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
            <div className="columns registration">
              <div className="column is-half register-form">
                
                
                <div className="form-container">
                <h2>Completá tus datos</h2>
                <Form className="form" {...formItemLayout} onSubmit={handleSubmit} >

                  <Form.Item required label="Nombre">
                    <Input
                      id="name"
                      placeholder="Nombre"
                      type="text"
                      value={values.name}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.name && touched.name ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.name && touched.name && (
                      <div className="input-feedback">{errors.name}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Apellido">
                    <Input
                      id="lastName"
                      placeholder="Apellido"
                      type="text"
                      value={values.lastName}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.lastName && touched.lastName ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.lastName && touched.lastName && (
                      <div className="input-feedback">{errors.lastName}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Email" hasFeedback validateStatus={errors.email && touched.email ? "error" : 'success'}>
                    <Input
                      id="email"
                      placeholder="Enter your Email"
                      type="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.email && touched.email ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.email && touched.email && (
                      <div className="input-feedback">{errors.email}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Contraseña" hasFeedback validateStatus={errors.password && touched.password ? "error" : 'success'}>
                    <Input
                      id="password"
                      placeholder="Ingresa tu contraseña"
                      type="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.password && touched.password ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.password && touched.password && (
                      <div className="input-feedback">{errors.password}</div>
                    )}
                  </Form.Item>

                  <Form.Item required label="Confirmar" hasFeedback>
                    <Input
                      id="confirmPassword"
                      placeholder="Confirma tu contraseña"
                      type="password"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      className={
                        errors.confirmPassword && touched.confirmPassword ? 'text-input error' : 'text-input'
                      }
                    />
                    {errors.confirmPassword && touched.confirmPassword && (
                      <div className="input-feedback">{errors.confirmPassword}</div>
                    )}
                  </Form.Item>

                  <Form.Item {...tailFormItemLayout}>
                    <button onClick={handleSubmit} type="primary" className="login-form-button" disabled={isSubmitting} >
                      Submit
                    </button>
                  </Form.Item>
                </Form>
                </div>
              </div>

              
              <div className="column register-bg" >
                      
              </div>
          </div>  
        
           </> 

        );
      }}
    </Formik>
  );
};


export default RegisterPage
