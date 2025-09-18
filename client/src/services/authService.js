import axios from 'axios';

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

export const userSignUp = async(credentials)=>{
  const url = 'http://localhost:3500/api/users/signup';
  try{
    const res = await axios.post(url,credentials,{
      headers: { "Content-Type": "application/json" },
    })
    const signUpData = res.data
    return signUpData;
  }
  catch(error){
    // console.log("Error while Signing up",error);
    throw error.response?.data || error; // so you get backend message
  }
}