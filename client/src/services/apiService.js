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

export const userSignIn = async(credentials)=>{
  const url = 'http://localhost:3500/api/users/signin';
  try{
    const res = await axios.post(url,credentials,{
      headers: { "Content-Type": "application/json" },
    })
    const signInData = res.data
    return signInData;
  }
  catch(error){
    console.log("Error while Signing in",error);
    throw error.response?.data || error; // so you get backend message
  }
}

export const usersignUp = async(credentials)=>{
  const url = 'http://localhost:3500/api/users/signup';
  try{
    const res = await axios.post(url,credentials,{
      headers: { "Content-Type": "application/json" },
    })
    const signUpData = res.payload
    return signUpData;
  }
  catch(error){
    console.log("Error while Signing up",error);
    throw error.response?.data || error; // so you get backend message
  }
}