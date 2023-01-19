import React from "react";
import { useLocation } from "react-router-dom";
import "./detailview.css";
import NavBar from "../../components/NavBar/NavBar";
import Footer from "../../components/Footer/Footer"

const DetailView =()=>{

    const object = useLocation().state.data;



 
   

    return(
        <>
            <NavBar/>
            <section className="detail-view-container">
                <div className="detail-view">
                    <img className="detail-view-image" src={object.image}/>
                </div>
                <ul className="details">
                    <li className="detail-item"><h3>Nombre: {object.tittle}</h3></li>
                    <li className="detail-item"><h3>Talla: {object.size}</h3> </li>
                    <li className="detail-item"><h3>Descripción: {object.description}</h3></li>
                    <li className="detail-item"><h3>Marca: {object.madeBy}</h3></li>
                    <li className="detail-item"><h3>Precio: {`$${object.price}`}</h3></li>
                </ul>
            </section>
            <Footer/>
        </>

    );
}

export default DetailView;