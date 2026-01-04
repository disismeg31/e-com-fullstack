import axios from 'axios';

// const BASE_URL = 

export const getAllProducts = async()=>{
    const url = `http://localhost:3500/api/admin/products`;
    try{
        const res = await axios.get(url)
        return res.data?.payload
    }
    catch(error){
        console.log("Error while getting products",error);
        throw error.response?.data || error; // so you get backend message
    }
}


export const getTheproduct = async(id) =>{
    const url = `http://localhost:3500/api/admin/products/${id}`;
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
    const url = `http://localhost:3500/api/admin/products/${idOfProd}`
    try{
        const res = await axios.patch(url,dataToUpdate,{
            headers: { "Content-Type": "multipart/form-data" },
            // headers: { "Content-Type": "application/json" },
            withCredentials:true
        })
        return res.data
    }
    catch(error){
        console.log("Error while getting products",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const addProduct= async(dataToAdd)=>{
    const url = 'http://localhost:3500/api/admin/products'
    try{
        const res = await axios.post(url,dataToAdd,{
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials:true
        })
        return res.data
    }
    catch(error){
        console.log("Error while adding product",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const deleteProduct = async(idofProduct) =>{
    const url = `http://localhost:3500/api/admin/products/${idofProduct}`
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

export const updateSellerStatus = async(idOfSeller,statusToUpdate)=>{
    const url = `http://localhost:3500/api/admin/users/sellers/${idOfSeller}`
    try{
        const res = await axios.patch(url,statusToUpdate,{
        //    headers: { "Content-Type": "multipart/form-data" },
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

export const updateSellerProductStatus = async(idOfProd,statusToUpdate) =>{
    const url = `http://localhost:3500/api/admin/products/${idOfProd}`
    try{
        const res = await axios.patch(url,statusToUpdate,{
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