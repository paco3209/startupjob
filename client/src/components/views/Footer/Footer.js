import React from 'react'


function Footer() {
    return (
        <footer className="footer" style={{ bottom:'0'}} >
            <div className="container">
                <div className="columns">
                    <div className="column">
                        <img src="./img/logo.png"/>
                        </div>
                        <div className="column">
                            <div className="links">
                                <h5>Nosotros</h5>
                                <ul>
                                    <li><a href="#0">La empresa</a></li>
                                    <li><a href="blog.html">Contacto</a></li>
                                    <li><a href="#0">Preguntas Frecuentes</a></li>
                                    </ul>
                            </div>
                        </div>
                        <div className="column">
                            <div className="links">
                                <h5>Contacto</h5>
                                <ul className="contacts">
                                    <li><a href="tel://61280932400"><i className="icon_mobile"></i>+ 61 23 8093 3400</a></li>
                                    <li><a href="mailto:contacto@hindutimes.com"><i className="icon_mail_alt"></i>help@findoctor.com</a></li>
                                </ul>
                                <br/>
                                <h5 style={{marginBottom:'8px'}}>FOLLOW US</h5>
                                <ul className="socials">
                                    <li><a href="#0"><i className="social_facebook"></i></a></li>
                                    <li><a href="#0"><i className="social_twitter"></i></a></li>
                                    <li><a href="#0"><i className="social_linkedin"></i></a></li>
                                    <li><a href="#0"><i className="social_instagram"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        </div>
                        <div className="bottom">
                            <ul><a href="#0">Terminos y Condiciones</a>|<a href="#0">Privacy</a></ul><div id="copy">© 2020 HinduTimes</div></div></div></footer>
    )
}

export default Footer
