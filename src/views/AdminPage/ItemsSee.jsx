import { data } from "jquery";
import React, { useState, useEffect } from "react";
import {
  deleteItemByID,
  getCategorys,
} from "../../aplication/firebase_conector";
import LoadingStatus from "../../components/LoadingStatus/LoadingStatus";
import AddItem from "./AddItem";
import "./itemssee.css";
import UpdateItemForm from "./UpdateItemForm";

const ItemsSee = (props) => {
  const [itemsList, setItemsList] = useState([]);
  const [onUpdate, setOnUpdate] = useState(false);
  const [addNewItem, setAddNewItem] = useState(false);
  const [categoryToAddItem, setCategoryToAddItem] = useState("");
  const [showUpdateItemForm, setShowUpdateItemForm] = useState(false)
  const [itemToUpdateData, setItemToUpdateData] = useState()
  const [onLoad, setOnLoad] = useState(true)
 
  useEffect(() => {
    getItemsForCategory();
  }, [onUpdate]);

  const handleReload = () =>{
    setOnUpdate(!onUpdate)
  }

  const handleSeeItems =()=>{
    setShowUpdateItemForm(false)
    setAddNewItem(false)
  }
  const getItemsForCategory = async () => {
    setOnLoad(true)
    try{
      const itemsFromDB = await getCategorys(datas.tittle);
      setItemsList(itemsFromDB.docs);
    }catch(error){
      console.log(error.message)
    }
    setOnLoad(false)

  };

  const handleDeleteItem = async (id, tittle) => {
    const optionSelected = window.confirm("Esta seguro de que desea eliminar esta item?")
    if(optionSelected === true){
      try{
        await deleteItemByID(id, tittle);
        setOnUpdate(!onUpdate);
      }catch(error){
        console.log(error.message)
      }

  }};

  const handleAddItem = (tittle) => {
    setCategoryToAddItem(tittle);
    setAddNewItem(!addNewItem);
  };

  const handleShowUpdateItem = () =>{
    setShowUpdateItemForm(false)
  }

  const handleUpdateItem = (item) =>{
    setItemToUpdateData(item)
    setShowUpdateItemForm(!showUpdateItemForm)
  }
  const { datas } = props;
  return (
    <article className="items__see__container">
      <h2>Categoria: {datas.tittle}</h2>
      <div className="buttons__containers">
        <button className="admin__page__button" id="add" onClick={() => {handleAddItem(datas.tittle);}}>Agregar item</button>
        <button className="admin__page__button" id="add" onClick={() => {handleSeeItems();}}>Ver Items</button>
      </div>
      <div>
        <div className="categorys__container">
          {
            onLoad === true ?
            <LoadingStatus/>
            :showUpdateItemForm ?
            <UpdateItemForm item = {itemToUpdateData} category = {datas.tittle} hide={handleShowUpdateItem} reload={handleReload}/>
            :addNewItem ? 
              <AddItem
                categoryToAdd={categoryToAddItem}
                onUpdate={onUpdate}
                setOnUpdate={setOnUpdate}
              />
            :itemsList.length !== 0 ? (
            itemsList.map((item) => {
              return (
                <div className="category__container" key={item.id}>
                  <div className="item__see__image__container">
                    <img src={item.data().image} />
                  </div>
                  <p>{`nombre: ${item.data().tittle}`}</p>
                  <p>{`precio: ${item.data().price}`}</p>
                  <p>{`talla: ${item.data().size}`}</p>
                  <p>{`marca: ${item.data().madeBy}`}</p>
                  <p>{`descripcion: ${item.data().description}`}</p>
                  <div>
                    <button
                      className="admin__page__button" id="delete"
                      onClick={() => {
                        handleDeleteItem(item.id, datas.tittle);
                      }}>
                      Eliminar item
                    </button>
                    <button className="admin__page__button" id="update" onClick={()=>{handleUpdateItem(item)}}>
                      Actualizar item
                    </button>
                  </div>
                </div>
              );
            })
          ) : (
            <h3 className="empty__tag">
              Ups...aun no hay items en esta categoria
            </h3>
          )}
        </div>
      </div>
    </article>
  );
};

export default ItemsSee;
