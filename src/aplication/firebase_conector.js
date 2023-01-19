import { collection, getDocs, query, addDoc, doc, deleteDoc, where, getDoc, updateDoc} from "firebase/firestore";
import { db } from './firebase';
import { storage } from "./firebase";
import { ref, uploadBytes, getDownloadURL, deleteObject, list } from "firebase/storage";


//GET ALL ITEMS OF ONE CATEGORY

export const getCategorys= async (collectionToGet)  => {
    const colRef = collection(db, collectionToGet);
        const result = await getDocs(query(colRef));
        return result;
        
}

//GET THE INFO OF A DOCUMENT INSIDE A COLLECTION

export const getDocument = async (collectionName, documentID) =>{
    const docRef = doc(db, collectionName, documentID)
    const data = await getDoc(docRef)
    console.log(data)
}

//POST CATEGORY IMAGE && GET URL --> STORAGE
export const upLoadImage =  async (folder,file, fileName)=>{
    const storageRef = ref(storage, `${folder}/${fileName}`);
    await uploadBytes(storageRef, file)
    URL = await getDownloadURL(storageRef)
    
    return URL;
}

//POST NEW CATEGORY

export const postNewCategory = async (tittle, image)=>{
    await addDoc(collection(db, 'categorys' ), {tittle, image})
}

//POST NEW ITEM
export const postNewItem = async (category, tittle, image, price, size, madeBy, description)=>{
    await addDoc(collection(db, category ), {
                                                tittle:tittle,
                                                image: image,
                                                price: price,
                                                size: size,
                                                madeBy: madeBy,
                                                description: description
                                            })
}


//POST NEW CATEGORY COLLECTION
export const postNewCategoryCollection = async (tittle)=>{
    await addDoc(collection(db, tittle ),{tittle: tittle})
}


//DELETE CATEGORY BY ID AND ALL ITEMS OF THIS CATEGORY

export const deleteCategoryByID = async (id, tittle)=>{
 
    const snap = await getCategorys(tittle);
    snap.forEach((snapChild)=>{deleteDoc(doc(db, tittle, snapChild.id))})
    await deleteDoc(doc(db, 'categorys', id));
    // console.log(storageFolder)

}
// DELETE ITEM
export const deleteItemByID = async (id, tittle)=>{
    deleteDoc(doc(db, tittle, id))
    // console.log(storageFolder)

}

export const updateItem = async (category, id, data) =>{
    const docRef = doc(db, category, id )
    await updateDoc(docRef, data)
    console.log('actualizado')
}






