import axios from 'axios';
export const getMyproducts = async(id) =>{
    const url = `http://localhost:3500/api/seller/products/${id}/seller`;
    try{
        const res = await axios.get(url,{
            withCredentials:true
        })
        return res.data?.payload;
    }
    catch(error){
         console.log("Error while getting products",error);
        throw error.response?.data || error; // so you get backend message
    }
}
 
export const updatemyProduct = async(idOfProd,dataToUpdate) =>{
    const url = `http://localhost:3500/api/seller/products/${idOfProd}`
    try{
        const res = await axios.patch(url,dataToUpdate,{
            headers: { "Content-Type": "application/json" },
            withCredentials:true
        })
        return res.data
    }
    catch(error){
         console.log("Error while getting products",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const addProduct= ()=>{
    const url = 'http://localhost:3500/api/seller/products'
    try{

    }
    catch(error){
         console.log("Error while adding product",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const deleteProduct= async(idofProduct) =>{
    const url = `http://localhost:3500/api/seller/products/${idofProduct}`
try{
        const res = await axios.delete(url,{
            withCredentials:true
        })
        return res.data
    }
    catch(error){
         console.log("Error while deleting product",error);
        throw error.response?.data || error; // so you get backend message
    }
}