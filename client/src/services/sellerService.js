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
// http://localhost:3500/api/seller/products/68a854b68f464839ed7f9489/seller

export const updatemyProduct = async(idOfProd,dataToUpdate) =>{
    // http://localhost:3500/api/seller/products/68a855718f464839ed7f948c
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

export const addProduct=()=>{
    const url = 'http://localhost:3500/api/seller/products'
    try{

    }
    catch(error){
         console.log("Error while adding product",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const deleteProduct=() =>{
    // http://localhost:3500/api/seller/products/68a855718f464839ed7f948e
    const url = `http://localhost:3500/api/seller/products/idofProduct`
try{

    }
    catch(error){
         console.log("Error while deleting product",error);
        throw error.response?.data || error; // so you get backend message
    }
}