//======================================================================//
// Este componente es reenderizado desde la vista home y se ecarga de   //
// obtener los datos de las categorias disponibles para luego poder     //
// reenderizar cards con la informacion obtenida y que el usuario pueda //
// acceder a ver las ofertas de las diferentes categorias               //
//======================================================================//

import React, {useState, useEffect} from "react"; 
import "./cards.css";
import { getCategorys } from "../../aplication/firebase_conector";
import { Link } from "react-router-dom";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../aplication/firebase";

const Cards =()=>{

    const [categorysData, setCategorysData] = useState([]);
    const [onLoad, setOnLoad] = useState(true)

    useEffect(() => {

        getCategorysData()

    },[]);


    const getCategorysData = async ()=>{
        const q = query(collection(db, 'categorys'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setCategorysData(querySnapshot.docs)
            setOnLoad(false)
         });

    }




            




    
    
    return(
        <div className="category-cards-container">
            
            {
                onLoad === true ?
                <LoadingStatus/>
                :categorysData.length !== 0 ?
                categorysData.map(d =>{
                    return(        
                        <Link to={`/categorys/${d.data().tittle}`} key={d.id} className="link"> 
                            <div className="card-container">
                                <img className="card-image" src={d.data().image} alt={d.data().tittle}/>
                                <h4 className="card-tittle">{d.data().tittle}</h4>
                            </div> 
                        </Link>);})
                :<div className="error_message">No hay categorias disponibles</div>
            } 
        </div>);
            
}
        
export default Cards;
                            

             


