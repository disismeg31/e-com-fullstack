import axios from 'axios';

export const userSignIn = async(credentials)=>{
  const url = 'http://localhost:3500/api/users/signin';
  try{
    const res = await axios.post(url,credentials,{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
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
      withCredentials: true,
    })
    const signUpData = res.data
    return signUpData;
  }
  catch(error){
    // console.log("Error while Signing up",error);
    throw error.response?.data || error; // so you get backend message
  }
}

export const userSignOut = async()=>{
  const url = 'http://localhost:3500/api/users/signout';
  try{
    const res = await axios.post(url,{},{
      headers: { "Content-Type": "application/json" },
      withCredentials: true,
    })
    const signOutData = res.data;
    return signOutData;
  }
  catch(err){
    console.log("Error while signOut", err?.message || err?.msg || err);
  }
}

export const checkSession = async()=> {
  const url = 'http://localhost:3500/api/users/check-session'
    try {
    const res = await axios.get(url, {
      withCredentials: true, // send cookies
    });
    return res.data;
  } catch (err) {
    console.error("checkSession error:", err);
    throw err;
  }
}