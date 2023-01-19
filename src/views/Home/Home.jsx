//===========================================================================//
//  Esta es la vista principal de la aplicacion, en ella se muestran las     //
//  imagenes de la tienda, las categorias, y la localizacion                 //
//===========================================================================//

import React from "react";
import Cards from "../../components/Cards/Cards";
import LandingImage from "../../components/LandingImage/LandingImage";
import "./home.css"
import location_image from "../../statics/images/location.png";
import { FaSearchLocation, FaShoppingCart } from "react-icons/fa";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";







const Home =()=>{


    const openMap = () => {
        window.open("https://goo.gl/maps/9DgmAA45cp1WuZJv7",'_blank','noreferrer')
    } 

    return(
       
        <div className="home-container">
            <NavBar/>
            <LandingImage/>
            <div className="tag">
                <FaShoppingCart/>
                <h3>Categorias</h3>
            </div>
            <Cards/>
            <section className="location-container">
            <div className="tag">
                <FaSearchLocation/>
                <h3>¿Dónde estamos?</h3>
            </div>    
                <img className="location-image" src={location_image} alt="location" />
                <h4 className="tag-location" onClick={openMap}>Av. Ing. Luis Ponce 1378, 11300 Montevideo</h4>
                
                
            </section>
            <Footer/>
        </div>
    );
}

export default Home; 