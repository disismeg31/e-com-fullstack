const User = require('./../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function signUp(req,res){
 const userDataToInsert = req.body;
 User.findOne({email:userDataToInsert.email})
 .then((data)=>{
    if(data){
    res.status(409).json({
        message:'This email already exists try another one',
        status:false,
    })
    }
    else{
        const user = new User(userDataToInsert);
        user.save()
        .then((result)=>{
            const token = jwt.sign({id: result._id,name:result.name,role:result.role},process.env.JWT_SECRET,{expiresIn:'7d'})
            const {name,email,role} = result;
            const userPayload = {name,email,role}
            res.cookie('token',token,{
                httpOnly:true,
                secure:process.env.NODE_ENV === 'production',
                sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
                maxAge: 7 * 24 * 60 * 60 * 1000
            })
            res.status(201).json({
                message:`Succesfully registered ${result.name}`,
                payload:userPayload,
                status:true
            })
        })
        .catch((err)=>{
            console.log("error during registeration",err);
            res.status(500).json({
                message:"Internal server error",
                status:false
            })
        })
    }
 })
 .catch((err)=>{
        console.log("Error during data fetching while registeration",err);
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
 })
}


function signIn(req,res){
    const loginData = req.body;
    const {email,password} = loginData;

    if(!email || !password){
       return res.status(400).json({
            message:"Email and password field are required",
            status:false,
        })
    }

    User.findOne({email:loginData.email})
    .then((result)=>{
        if(result){
            if (!result.password) {
                return res.status(500).json({
                    message: "Internal server error",
                    status: false
                })
            }
            bcrypt.compare(loginData.password,result.password)
            .then((isMatch)=>{
                if(isMatch){
                    const {name,email,role,status} = result;
                    const userPayload = {name,email,role,status}
                    const token = jwt.sign({id: result._id,name:result.name,role:result.role},process.env.JWT_SECRET,{expiresIn:'7d'})
                    res.cookie('token',token,{
                        httpOnly:true,
                        secure:process.env.NODE_ENV === 'production',
                        sameSite:process.env.NODE_ENV === 'production'? 'none' : 'strict',
                        maxAge: 7 * 24 * 60 * 60 * 1000
                    })
                    res.status(200).json({
                        message:'Login successfull',
                        payload:userPayload,
                        status:true,
                    })

                }
                else{
                    res.status(401).json({
                        message:'Incorrect password',
                        status:false
                    })
                }
            })
            .catch((err)=>{
                console.error('Error during password comparison:', err);
                res.status(500).json({
                    message:'Internal server error',
                    status:false
                })
            })
        }
        else{
            res.status(404).json({
                message:"User not found",
                status:false
            })
        }
    })
    .catch((err)=>{
        console.error('Error during user lookup:', err);
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}

function checkSession(req, res) {
  const token = req.cookies?.token;
  if (!token) {
    // No cookie -> not authenticated
    return res.status(401).json({ authenticated: false });
  }

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({ authenticated: false });
  }

  // Use Promise chaining instead of async/await
  User.findById(decoded.id)
    .select("name email role status")
    .then(user => {
      if (!user) {
        return res.status(401).json({ authenticated: false });
      }

      return res.json({
        authenticated: true,
        user: {
          name: user.name,
          email: user.email,
          role: user.role,
          status: user.status,
        },
      });
    })
    .catch(err => {
      console.error("Error checking session:", err);
      return res.status(401).json({ authenticated: false });
    });
}

function signOut(req,res){
    res.clearCookie('token', {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'strict'
  });
  res.status(200).json({
    message: 'Logged Out',
    status: true
  });
}

function getAllUsers(req,res){
    User.find({},{__v:0,password:0})
    .then((result)=>{
        if(result.length>0){
            res.status(200).json({
            message:"Fetched Users",
            payload:result,
            status:true
            })
        }
        else{
            res.status(200).json({
            message:"No users found, enter new users",
            payload:[],
            status:false
            })
        }
    })
    .catch((err)=>{
        console.log(err);
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}


 

module.exports = {
    signUp,
    signIn,
    checkSession,
    signOut,
    getAllUsers
}