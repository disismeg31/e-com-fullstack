const User = require('./../models/user.js');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

function register(req,res){
    const userDataToInsert= req.body;

    User.findOne({email:userDataToInsert.email})
    .then((data)=>{
        if(data){
            res.json({
            message:"User Already Exists",
            status:false
        })
        } 
        else {
            const user = new User(userDataToInsert)
            user.save()
            const token = jwt.sign({id:user._id},process.env.JWT_SECRET,{expiresIn:'7d'})
            //token here or
            .then((result)=>{
                console.log("1 data inserted");
                const {name,email} = userDataToInsert;
                //or here (the token ask chatgpt)
                res.cookie('token',token,{
                    httpOnly:true,
                    secure:process.env.NODE_ENV === 'production',
                    sameSite:process.env.NODE_ENV === 'production' ? 'none' : 'strict',
                    maxAge:7 * 24 * 60 * 60 *1000
                })
                res.json({
                message: "User registered successfully",
                payload: { name, email },
                status: true
                });
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


module.exports={
    register
}