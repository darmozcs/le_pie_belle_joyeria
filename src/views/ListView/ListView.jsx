// Esta es la vista en la cual se muestran los productos por categorias //

import React from "react";
import CategoryCards from "../../components/CategoryCards/CategoryCards";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer";
import "./listview.css"

const ListView =()=>{


    return(
        <div className="listview-container">
            <NavBar/>
            <CategoryCards/>
            <Footer/>
        </div>
    );
}

export default ListView;  