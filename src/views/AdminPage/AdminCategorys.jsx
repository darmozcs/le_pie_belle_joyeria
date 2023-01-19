import React, { useEffect, useState }  from "react";
import "./admincategorys.css";
import { Link } from "react-router-dom";
import { getCategorys,
         upLoadImage,
         postNewCategory,
         deleteCategoryByID,
         postNewCategoryCollection
        } from "../../aplication/firebase_conector";
import { FaHome, FaPlus } from "react-icons/fa";
import AddItem from "./AddItem";
import ItemsSee from "./ItemsSee";
import EditCategoryForm from "./EditCategoryForm";
import LoadingStatus from "../../components/LoadingStatus/LoadingStatus"



const AdminCategorys = () =>{


    const [categorysData, setCategorysData] = useState([]);
    const [onAddCategory, setOnAddCategory] = useState(false);
    const [newCategoryName, setNewCategoryName] = useState("");
    const [newCategoryImage, setNewCategoryImage] = useState();
    const [reloadCategorysOnChange, setReloadCatgorysOnChange] = useState(true);
    const [onPreViewCategory, setOnPreViewCategory] = useState(false);
    const [itemsSee, setItemsSee] = useState(false);
    const [itemsData, setItemsData] = useState([]);
    const [updateCategory, setUpdateCategory] = useState(false)
    const [categoryToUpdateData, setCategoryToUpdateData] = useState({})
    const [onLoad, setOnLoad] = useState(true)
    const [onPreview, setOnPreview] = useState(false)
    const [onSave, setOnSave] = useState(false)


    useEffect(() => {
        getCategorysData();
    },[reloadCategorysOnChange]);

    const handleReload = () =>{
        setReloadCatgorysOnChange(!reloadCategorysOnChange)
    }

    const handleShowUpdateForm = () =>{
        setUpdateCategory(false)
    }

    const getCategorysData = async ()=>{
        setOnLoad(true)
        try{
            const categoryData = await getCategorys('categorys');
            setCategorysData(categoryData.docs);
        }catch(error){
            console.log(error.message)
        }
        setOnLoad(false)

    }

    const handleAddCategory=()=>{
        setOnAddCategory(!onAddCategory)
        if(onAddCategory === false){
            setNewCategoryImage();
            setNewCategoryName("");
            setOnPreViewCategory(false)
        }
    }
    const handleNewCategory = async (e)=>{

        e.preventDefault();
        setOnPreview(true)
        try{
            const URL = await upLoadImage( newCategoryName,e.target[0].files[0], e.target[0].files[0].name)
            await setNewCategoryImage(URL);
            setOnPreViewCategory(!onPreViewCategory);

        }catch(error){
            console.log(error.message)
            setOnPreview(false)
        }
        setOnPreview(false)
    }

    const handlePostCategory = async () =>{
        setOnSave(true)
        try{
            await postNewCategory(newCategoryName, newCategoryImage);
            await postNewCategoryCollection(newCategoryName)
            setReloadCatgorysOnChange(!reloadCategorysOnChange);
            handleAddCategory();
        }catch(error){
            console.log(error.message)
        }
        setOnSave(false)

    }

    const handleDeleteCategory= async (id, tittle)=>{
        const optionSelected = window.confirm("Esta seguro de que desea eliminar esta categoria?")
        if(optionSelected === true){
            await deleteCategoryByID(id, tittle);
            setReloadCatgorysOnChange(!reloadCategorysOnChange);
            setItemsSee(false)
        }


    }

    const handleItemsSee = (datas)=>{
        setItemsData(datas);
        setItemsSee(!itemsSee);

    }
    const handleUpdateCategory = (id, tittle, image) =>{
        const data = {
            id : id,
            tittle : tittle,
            image : image
        }
        setCategoryToUpdateData(data)
        setUpdateCategory(!updateCategory)
    }
    const handleSeeCategory =()=>{
        setItemsSee(false);
        setUpdateCategory(false);
        setOnAddCategory(false)
    }    

    return(
        <article className="admin__categorys__container">
            <div className="buttons__containers">
                <button className="admin__page__button" id="add" onClick={()=>{handleAddCategory()}}>Agregar categoria<FaPlus/></button> 
                <button className="admin__page__button" id="add" onClick={()=>{handleSeeCategory()}}>Categorias</button> 
            </div>
            <div className="categorys__container">
                {
                    onLoad === true ?
                    <LoadingStatus/>
                    :onAddCategory ? 
                    <div className="form__container">
                        <form className="add__new__category" onSubmit={handleNewCategory}>
                            <input type="file" accept="image/*" required></input>
                            <input type="text" placeholder="Nombre" onChange={(e)=>{setNewCategoryName(e.target.value)}} required></input>
                            {
                                onPreview === false ?
                                <button className="admin__page__button" id="preview" type="submit"> Previsualizar categoria</button>
                                :<LoadingStatus size={"small"}/>
                            }
                        </form>
                        {onPreViewCategory &&
                            <div className="preview__container">
                                <div className="category__image">
                                    <img src={newCategoryImage}/>
                                </div>
                                    <p>{newCategoryName}</p>
                                <div>
                                    {
                                        onSave === false ?
                                        <button className="admin__page__button" id="save" onClick={()=>{handlePostCategory()}}>Guardar categoria</button>
                                        :<LoadingStatus size={"small"}/>
                                    }
                                </div>    
                            </div>

                        }
                    </div>
                    :itemsSee ?
                    <ItemsSee datas={itemsData} />
                    :updateCategory ?
                    <EditCategoryForm data={categoryToUpdateData} reload={handleReload} hide={handleShowUpdateForm}/>
                    :<>
                       { categorysData.map(d =>{
                            return(
                                
                                    <div className="category__container"  id="adminCategorys" key={d.id}>
                                        <div className="category__image">
                                            <img src={d.data().image}/>
                                        </div>
                                        <div className="category__tittle">
                                            <p>{d.data().tittle}</p>
                                        </div>
                                        <div className="category__buttons">
                                            <button className="admin__page__button" id="delete" onClick={()=>{handleDeleteCategory(d.id, d.data().tittle)}}>Eliminar categoria</button>
                                            <button className="admin__page__button" id="modify" onClick={()=>{handleUpdateCategory(d.id, d.data().tittle, d.data().image)}}>Modificar Categoria</button>
                                            <button className="admin__page__button" id="seeitems" onClick={()=>{handleItemsSee(d.data())}}>Ver elementos</button>
                                        </div>
                                    </div> 
                                        
        
                            );})}
                    
                    </>
                }
                </div>
        </article>
    );
}

export default AdminCategorys;