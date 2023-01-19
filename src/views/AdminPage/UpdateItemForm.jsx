import { useState } from "react"
import { updateItem, upLoadImage } from "../../aplication/firebase_conector"
import LoadingStatus from "../../components/LoadingStatus/LoadingStatus"
import "./updateItemForm.css"

const UpdateItemForm = ({item, category, hide, reload}) =>{

    const [showImage, setShowImage] = useState(false)
    const [image, setImage] = useState(item.data().image)
    const [onSave, setOnSave] = useState(false)

    const handleSubmit = async (e) =>{
        e.preventDefault()
        setOnSave(true)
        try{
            const newImage = e.target[0].files[0] === undefined ? item.data().image : image
            const newTittle = e.target[1].value === '' ? item.data().tittle : e.target[1].value
            const newPrice = e.target[2].value === '' ? item.data().price : e.target[2].value
            const newSize = e.target[3].value === '' ? item.data().size : e.target[3].value
            const newMadeBy= e.target[4].value === '' ? item.data().madeBy : e.target[4].value
            const newDescription = e.target[5].value === '' ? item.data().description : e.target[5].value
    
            
            const data = {
                            tittle      : newTittle,
                            image       : newImage,
                            price       : newPrice,
                            size        : newSize,
                            madeBy      : newMadeBy,
                            description : newDescription
                        }       
                        
            await updateItem(category, item.id, data)
            reload()
            hide()

        }catch(error){
            console.log(error.message)
            setOnSave(false)
        }
        setOnSave(false)

    }

    const handleShowImage = async (e) =>{
        const imag = await upLoadImage(category,e.target.files[0], e.target.files[0].name)
        setImage(imag)
    }

    return(
        <div>
            <form onSubmit={(e) =>{handleSubmit(e)}}>
                <div>
                    <img src={image} id='img'></img>
                    <input type="file" accept="image/*" onChange={(e)=>handleShowImage(e)}></input>
                </div>
                <div>
                    <p>{`nombre: ${item.data().tittle}`}</p>
                    <input type='text' placeholder={item.data().tittle}></input>
                </div>
                <div>
                    <p>{`precio: ${item.data().price}`}</p>
                    <input type='number' min='0' placeholder={item.data().price}></input>
                </div>
                <div>
                    <p>{`talla: ${item.data().size}`}</p>
                    <input type='text' placeholder={item.data().size}></input>
                </div>
                <div>
                    <p>{`marca: ${item.data().madeBy}`}</p>
                    <input type='text' placeholder={item.data().madeBy}></input>
                </div>
                <div>
                    <p>{`descripcion: ${item.data().description}`}</p>
                    <textarea type='text' placeholder={item.data().description}></textarea>
                </div>
                {
                    onSave === false ?
                    <button type="submit">Guardar</button>
                    :<LoadingStatus size={"small"}/>
                }
            </form>
        </div>
    )
}

export default UpdateItemForm;