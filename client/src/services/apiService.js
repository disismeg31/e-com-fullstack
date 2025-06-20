import axios from 'axios';

export const fetchProducts = async()=>{
  // const url = 'https://fake-store-api.mock.beeceptor.com/api/products';
    const url = 'https://dummyjson.com/products';
  try{
  const res = await axios.get(url)
    // return res.data
    const updatedProdList =  res.data.products.map((product)=>({
      ...product,
      cart:false,
      placeorder:false,
    }))

    return updatedProdList;
  }
  catch(error){
    console.log("Error fetching products:",error);
    throw error;
  }
};