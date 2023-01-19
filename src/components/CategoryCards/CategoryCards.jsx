//==============================================================//
// Este componente es reenderizado por ListView y se encarga de //
// llamar a un componente CategoryCard por cada elemento que le //
// entregue ListView como props, aqui se genera el listado de   //
// productos por categorias los cuales podra ver el usuario     //
//==============================================================//                                 
 
import React, {useEffect, useState} from "react";
import "./categorycards.css";                            
import { useParams } from "react-router-dom";
import { collection, query, onSnapshot } from "firebase/firestore";
import LoadingStatus from "../LoadingStatus/LoadingStatus";
import ItemCard from "../ItemCard/ItemCard";
import { db } from "../../aplication/firebase";


const CategoryCards =()=>{
    const category_params = useParams();


    const [itemData, setItemData] = useState([]);
    const [onLoad, setOnLoad] = useState(true)
    
    const getCategorysData = async ()=>{       
        const q = query(collection(db, category_params.category));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setItemData(querySnapshot.docs)
            setOnLoad(false)
         });
        
    }

    useEffect(() => {
        getCategorysData();
    },[]);




    return(
            <div className="cards-container">

                {
                    onLoad === true ?
                    <LoadingStatus/>
                    : itemData.length !== 0 ?   
                    itemData.map(data =>{   
                        return(        
                            <ItemCard data={data} link={`/categorys/${category_params.category}/${data.id}`}/>
                        );
                    })
                    :<div className="error_message" id="empty">No  hay items que mostrar</div>
                }
            </div>

    );

 

}
export default CategoryCards;