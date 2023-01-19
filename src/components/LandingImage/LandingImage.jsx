//=========================================================================//
// Este componente se encarga de agrupar el header de la vista Home, en el //
// cual se muestran dos imagenes de la tienda                              //
//=========================================================================//

import React from "react";
import "./landingimage.css"
import img from "../../statics/images/logo.png";

const LandingImage =()=>{  
    return(
        <header className="landing-container">
            <img className="landing-image" src={img} alt="bg image"/>
        </header>
    );
}

export default LandingImage; 