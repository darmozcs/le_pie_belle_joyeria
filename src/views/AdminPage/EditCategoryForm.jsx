import React, {useEffect, useState} from "react";
import { FaPen } from "react-icons/fa";
import { deleteCategoryByID, getCategorys, getDocument, postNewCategory, postNewCategoryCollection, postNewItem, upLoadImage } from "../../aplication/firebase_conector";
import LoadingStatus from "../../components/LoadingStatus/LoadingStatus";
import "./editcategoryform.css";


const EditCategoryForm =({data, reload, hide})=>{
    
    useEffect(() => {
        getCategoryData()

    }, []);


    const [categoryItemsData, setCategoryItemsData] = useState([])
    const [changeTittle, setChangeTittle] = useState(false);
    const [displayChangeImage, setDisplayChangeImage] = useState(false)
    const [newTittle, setNewTittle] = useState(""); // newTittle registra el nuevo nombre de la categoria que se esta modificando
    const [newImage, setNewImage] = useState();

    const [onModify, setOnModify] = useState(false)
 

    const getCategoryData = async () =>{
        const categoryData = await getCategorys(data.tittle)
        setCategoryItemsData(categoryData.docs)
    }

     const handleChangeTittle =()=>{
        setChangeTittle(!changeTittle);
     }

     const handleChangeImage = () =>{
        setDisplayChangeImage(!displayChangeImage)
     }
     const handlePreview = async () =>{
        const URL = await upLoadImage(data.tittle, newImage, newImage.name)
        setNewImage(URL)
     }
     const handleUpdateCategory = async () =>{
        setOnModify(true)
        if(newTittle !== "" || newImage !== undefined){
            try{
               let tittleToCreate = ""
               await deleteCategoryByID(data.id, data.tittle)
               console.log('borrada categoria por id')

               if(newTittle !== ""){
                   tittleToCreate = newTittle
                   await postNewCategoryCollection(newTittle)
                console.log('creada carpeta')
               }else{
                tittleToCreate = data.tittle
                await postNewCategoryCollection(data.tittle)
                console.log('creada carpeta')
               }
    
               if(newTittle !== "" && newImage !== undefined){
                await postNewCategory(newTittle, newImage)
                console.log('creada con nuevo titulo y nueva imagen')
               }else if(newTittle !== "" && newImage === undefined ){
                await postNewCategory(newTittle, data.image)
                console.log('creada con nuevo titulo')
               }else if(newTittle === "" && newImage !== undefined){
                await postNewCategory(data.tittle, newImage)
                console.log('creada con nueva imagen')
            }

            categoryItemsData.map(async (d) => {
                
                await postNewItem(tittleToCreate, 
                d.data().tittle,
                d.data().image,
                d.data().price,
                d.data().size,
                d.data().madeBy,
                d.data().description)
                console.log('item')
            })
                
                reload()
    
                hide()
                setOnModify(false)
    
            }catch(error){
                console.log(error.message)
                setOnModify(false)
            }

        }
        setOnModify(false)
     }

    return(
        <section className="category-form-container">
            <div className="category-form-header">
                <h3 className="category-form-tag">Modificar categoría</h3>
            </div>  

            <div className="category-form-tittle-container">
                <h4 className="category-form-item">{`Nombre de la categoría: ${data.tittle}`}</h4>
                <button className="category-form-btn-m"  onClick={()=>handleChangeTittle()}>Modificar</button>
            </div>
            {
                changeTittle && 
                <form className="category-tittle-change-form">
                    <input type="text" placeholder="Ingrese el nuevo nombre"  className="category-tittle-input" onChange={(e)=>{setNewTittle(e.target.value)}}></input>
                    <button name="new_tittle" type="submit" className="category-tittle-btn">Cambiar</button>
                </form>
            }
            <div className="category-form-image-container">
                <div className="category-form-img-container">
                    <button className="category-form-btn-m" onClick={()=>{handleChangeImage()}}>Cambiar imágen</button>
                    {
                        displayChangeImage &&
                        <input type="file" accept="image/*"  onChange={(e)=>(setNewImage(e.target.files[0]))}></input>
                    }
                </div>
                {
                    newImage &&
                    <>
                    <button className="category-form-btn-m" onClick={()=>handlePreview()}>Previsualizar imagen</button>
                    <div className="category-form-img-container">
                    <img src={newImage}></img>

                    </div>
                    </> 
                }
            </div>


            <form className="category-form">
            </form>
            {
                onModify === false ?
                <button onClick={()=>{handleUpdateCategory()}} className="admin__page__button" id="add">Guardar</button>
                :<LoadingStatus size={"small"}/>

            }
        </section>

    );
}

export default EditCategoryForm;
