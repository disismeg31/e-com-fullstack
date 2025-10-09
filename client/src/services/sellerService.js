import axios from 'axios';
// http://localhost:3500/api/seller/products/68a854b68f464839ed7f9489/seller
export const getMyproducts = () =>{
    const url = `http://localhost:3500/api/seller/products/${id}/seller`;
    try{

    }
    catch(error){
         console.log("Error while getting products",error);
        throw error.response?.data || error; // so you get backend message
    }
}

export const updatemyProduct =() =>{
    // http://localhost:3500/api/seller/products/68a855718f464839ed7f948c
    const url = `http://localhost:3500/api/seller/products/idOfProduct`
    try{

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