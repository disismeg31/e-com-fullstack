const User = require('./../models/user.js');
const bcrypt = require('bcryptjs');

function signUp(req,res){
 const userDataToInsert = req.body;
 User.findOne({email:userDataToInsert.email})
 .then((data)=>{
    if(data){
    res.json({
        message:'This email already exists try another one',
        status:false,
    })
    }
    else{
        const user = new User(userDataToInsert);
        user.save()
        .then((result)=>{
            res.json({
                message:`Succesfully registered ${result.name}`,
                status:true
            })
        })
        .catch((err)=>{
            res.json({
                message:err.message,
                payload:err,
                status:false
            })
        })
    }
 })
 .catch((err)=>{
        res.json({
            message:err.message,
            payload:err,
            status:false
        })
 })
}


function signIn(req,res){
    const loginData = req.body;
    const {email,password} = loginData;

    if(!email || !password){
       return res.json({
            message:"Email and password field are required",
            status:false,
        })
    }

    User.findOne({email:loginData.email})
    .then((result)=>{
        if(result){
            bcrypt.compare(loginData.password,result.password)
            .then((isMatch)=>{
                if(isMatch){
                    const {name,email,role} = result;
                    const userPayload = {name,email,role}
                    res.json({
                        message:'Login successfull',
                        payload:userPayload,
                        status:true,
                    })
                }
                else{
                    res.json({
                        message:'Incorrect password',
                        status:false
                    })
                }
            })
            .catch((err)=>{
                console.error('Error during password comparison:', err);
                res.json({
                    message:'Error while loggin in',
                    status:false
                })
            })
        }
        else{
            res.json({
                message:"User not found",
                status:false
            })
        }
    })
    .catch((err)=>{
        console.error('Error during user lookup:', err);
        res.json({
            message:err.message,
            payload:err,
            status:false
        })
    })
}


 

module.exports = {
    signUp,
    signIn,
}