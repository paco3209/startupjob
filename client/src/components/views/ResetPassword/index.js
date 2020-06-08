import React, { useState } from 'react';
import NavBar from '../NavBar/NavBar';
import Footer from '../Footer/Footer';
import './style.scss';
import Axios from 'axios';

import swal from 'sweetalert';

function Resetpassword(props) {
    const [email, setEmail] = useState("")

    const handleSubmit = (event) => {
        event.preventDefault()
        Axios.post(`/api/users/reset_pw/user/${email}`)
        setEmail("")

            
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
            <p>Ingresa tu correo electrónico para buscar tu cuenta.</p>

        </div>
    </div>
</div>
		</section>
        <section class="container">
    <section class="section">
        <div class="columns is-centered">
            <div class="column is-half has-text-centered">
                
                <form method="POST" onSubmit={handleSubmit}><input type="hidden" name="_token" value="Iq4JI9SjN0EU28ScGK2Jn0J11BfjuSqdg4fNFWmt" />
                <div class="field">
                    <label for="email">E-Mail</label>

                    <input class="input has-text-centered" type="email" name="email" id="email" onChange={(e) => setEmail(e.target.value)}  placeholder="email@email.com" maxlength="191" required="" autofocus="" />
                </div>
                
                <div class="field has-text-centered">
                    <button class="button is-primary" type="submit">Buscar</button>
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

export default Resetpassword
