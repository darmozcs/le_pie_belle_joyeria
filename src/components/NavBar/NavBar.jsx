//=============================================================//
// Este componente es la barra de navegacion la cual va a ser  //
// reenderizada por todos los componentes de la aplicacion a   //
// exepcion de la pagina de administracion desde esta se puede //
// acceder a las diferentes redes sociales de la tienda y se   //
// puede navegar a la pagina principal                         //
//=============================================================// 

import React from "react";
import "./navbar.css";
import brand from "../../statics/images/brand.png";
import { FaFacebookF, FaWhatsapp, FaInstagram, FaAlignRight, FaTimes} from "react-icons/fa";
import { SiGoogle } from "react-icons/si";
import { useState } from "react";
import { Link } from "react-router-dom";

const NavBar =()=>{


    const [navbarDisplay, setNavbarDisplay] = useState("false");

    const handleNavbarButton = () =>{
        if(navbarDisplay==="true"){
            setNavbarDisplay("false");
        }else{
            setNavbarDisplay("true")
        }
        
    }

    const handleChoisedOption =()=>{
        setNavbarDisplay(false);
    }


    return(
        <nav className={`navbar ${navbarDisplay === "true" ? "visible" : "hidden"}`}>
                <section className={`navbar-container ${navbarDisplay === "true" ? "nav-cont-visible" : "nav-cont-hidden"}`} >
                    <Link to="/" onClick={handleChoisedOption} id={`${navbarDisplay === "true" && 'logo_displayed'}`}>
                        <img className="navbar-brand" src={brand} alt="brand"  id={`${navbarDisplay === "true" && 'img_displayed'}`}/>
                    </Link>
                    <ul className="navbar-links">
                        <li className={`navbar-item ${navbarDisplay==="true" ? "item-active":"item-inactive"}`} 
                            onClick={()=>{window.open("https://www.facebook.com/estefania.farina.9421", '_blank')}}>
                            {navbarDisplay==="true" ?  <h5>Facebook</h5>: <FaFacebookF/>}
                        </li>
                        <li className={`navbar-item ${navbarDisplay==="true" ? "item-active":"item-inactive"}`} 
                            onClick={()=>{window.open("https://wa.me/message/K5ON5M3O3XT6I1", '_blank')}}>
                            {navbarDisplay==="true" ?  <h5>Whatsapp</h5>: <FaWhatsapp/>}
                        </li>
                        <li className={`navbar-item ${navbarDisplay==="true" ? "item-active":"item-inactive"}`} 
                            onClick={()=>{window.open("https://instagram.com/ropathi.secondhand?igshid=YmMyMTA2M2Y%3D", '_blank')}}>
                            {navbarDisplay==="true" ?  <h5>Instagram</h5>: <FaInstagram/>}
                        </li>
                        <li className={`navbar-item ${navbarDisplay==="true" ? "item-active":"item-inactive"}`}
                            onClick={()=>{window.open("https://g.co/kgs/65VHps", '_blank')}}>   

                            {navbarDisplay==="true" ?  <h5>Google</h5>: <SiGoogle/>}
                            
                        </li>
                        <li>
                            <button className={`navbar-button ${navbarDisplay==="true" ? "btn-active" : "btn-inactive"}`}
                                onClick={handleNavbarButton}>
                                {navbarDisplay==="true"?   <FaTimes/> : <FaAlignRight/>}
                            </button>
                        </li>
                    </ul>
                </section>



        </nav>


    );
}

export default NavBar; 