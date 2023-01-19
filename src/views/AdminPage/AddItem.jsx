
import React, {useState} from "react";
import { postNewItem, upLoadImage } from "../../aplication/firebase_conector";
import LoadingStatus from "../../components/LoadingStatus/LoadingStatus";
import "./additem.css"

const AddItem =(props)=>{

    const {categoryToAdd, onUpdate, setOnUpdate} = props;

    const [newItemTittle, setNewItemTittle] = useState("");
    const [newItemImage, setNewItemImage] = useState("");
    const [newItemPrice, setNewItemPrice] = useState();
    const [newItemMadeBy, setNewItemMadeBy] = useState("");
    const [newItemSize, setNewItemSize] = useState("");
    const [newItemDescription, setNewItemDescription] = useState("");
    const [onLoadItemPreview, setOnLoadItemPreview] =  useState(false)
    const [onLoadItemAdd, setOnLoadItemAdd] =  useState(false)
    const [showItemData, setShowItemData] = useState(false)


    const handleNewItemSubmit = async (e)=>{
        e.preventDefault();
        setOnLoadItemPreview(true)
        try{
            const newItemImageURL = await upLoadImage(categoryToAdd, e.target[1].files[0],e.target[1].files[0].name);
            setNewItemImage(newItemImageURL);
            setShowItemData(true)
        }catch(error){
            console.log(error.message)
            setShowItemData(false)
        }
        setOnLoadItemPreview(false)
    }
    const handleAddNewItem = async () =>{
        setOnLoadItemAdd(true)
        try{
            await postNewItem(
                categoryToAdd,
                newItemTittle,
                newItemImage,
                newItemPrice,
                newItemSize,
                newItemMadeBy,
                newItemDescription
            )
            
        }catch(error){
            console.log(error.message)
        }
        setOnUpdate(!onUpdate)
        setOnLoadItemAdd(false)
    }

    return(
        <article className="add__item__container" onSubmit={handleNewItemSubmit}>
            <form className="add__item__form">
                <label className="item__tag">Titulo</label>
                <input className="item__input"
                       type="text" 
                       placeholder="Titulo del item" 
                       required
                       onChange={(e)=>{setNewItemTittle(e.target.value)}}></input>
                <label className="item__tag">Imagen</label>
                <input className="item__input" 
                       type="file" 
                       accept="image/*" 
                       required
                       ></input>
                <label className="item__tag">Precio</label>
                <input className="item__input" 
                       type="number" 
                       required placeholder="Precio" 
                       min="0"
                       onChange={(e)=>{setNewItemPrice(e.target.value)}}></input>
                <label className="item__tag">Talla</label>
                <input className="item__input" 
                       type="text" 
                       placeholder="Talla" 
                       required
                       onChange={(e)=>{setNewItemSize(e.target.value)}}></input>
                <label className="item__tag">Marca</label>
                <input className="item__input" 
                       type="text" 
                       placeholder="Marca del item" 
                       required
                       onChange={(e)=>{setNewItemMadeBy(e.target.value)}}></input>
                <label className="item__tag">Descripcion</label>
                <textarea className="item__input" 
                          cols="50" 
                          required 
                          placeholder="Descripcion del producto"
                          onChange={(e)=>{setNewItemDescription(e.target.value)}}
                          ></textarea>
                {
                    onLoadItemPreview === false ?
                    <button className="admin__page__button" id="add" type="submit">Previsualizar Item</button>
                    :<LoadingStatus size={"small"}/>
                }
            </form>
            {
                showItemData &&
                    <div className="new__item__details__container --details">
                        <div className="item__see__image__container">
                            <img src={newItemImage}/>
                        </div>
                        <h4>Detalles</h4>
                        <p className="item_tag">Titulo: {newItemTittle}</p>
                        <p className="item_tag">Precio: {newItemPrice}</p>
                        <p className="item_tag">Talla: {newItemSize}</p>
                        <p className="item_tag">Marca: {newItemMadeBy}</p>
                        <p className="item_tag">Descripcion: {newItemDescription}</p>
                        {
                            onLoadItemAdd === false ?
                            <button className="admin__page__button --agregar" id="add" onClick={()=>{handleAddNewItem()}}>Agregar item</button>
                            :<LoadingStatus size={'small'}/>
                        }
                    </div>   
                
            }
            



        </article>
    );
}

export default AddItem;