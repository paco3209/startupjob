import React,{useState} from 'react'
import Axios from 'axios';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import {USER_SERVER} from '../../Config';
import { withRouter } from 'react-router-dom';


function UpdatePassword(props) {
    const [password, setpassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [error, seterror] = useState("")


    const handleSubmit = (e) => {
        
        e.preventDefault()


        const {userId, token} = props.match.params;
        
        console.log(password);
        
        if(password == confirmPassword){


        Axios.post(`${USER_SERVER}/receive_new_password/${userId}/${token}`,{password})
            .then(res => console.log("RESPONSE FROM SERVER TO CLIENT:", res))
            .catch(err => console.log("SERVER ERROR TO CLIENT:", err))
        }else{
            console.log("error");
            
        }

    }

    return (
        <>
        <NavBar />
        <section className="hero is-medium" >
	
	
	<div className="hero-body">
		<section className="section">
		<div className="container has-text-centered">
    <div className="columns is-centered">
        <div className="column is-half">
            <h1 className="title is-2 ">Recupera tu cuenta</h1>
            <p>Por favor, ingresa la nueva contraseña.</p>

        </div>
    </div>
</div>
		</section>
        <section className="container">
    <section className="section" style={{paddingTop:'0'}}>
        <div className="columns is-centered">
            <div className="column is-half has-text-centered">
                
                <form onSubmit={handleSubmit} >
                <div className="field">
                    <label for="email">Nueva Contraseña:</label>

                    <input className="input has-text-centered" type="password" name="password" id="password" onChange={(e) => setpassword(e.target.value)}  placeholder="Contraseña" maxlength="191" required="" autofocus="" />
                </div>
                <div className="field">
                    <label for="email">Confirmar Contraseña:</label>

                    <input className="input has-text-centered" type="password" name="confirmPassword" id="confirmPassword" onChange={(e) => setconfirmPassword(e.target.value)}  placeholder="Confirmar Contraseña" maxlength="191" required="" autofocus="" />
                </div>
                
                <div className="field has-text-centered">
                    <button className="button is-primary" type="submit">Modificar contraseña</button>
                </div>
                
                </form>

            </div>
        </div>
    </section>
</section>

	</div>

   
	</section>
        <Footer />
        </>
    )
}

export default withRouter(UpdatePassword)
