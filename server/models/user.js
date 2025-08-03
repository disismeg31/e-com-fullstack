const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const CONSTANTS = require('./../shared/constants');
const { verify } = require('jsonwebtoken');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
        minLength:[3,"Name should be 3 or more letters"]
    },
    email:{
        type:String,
        required:[true,"Plaese enter email"],
        unique:true
    },
    password:{
        type:String,
        required:[true,"Please enter password"]
    },
    role:{
        type:String,
        required:[true,"Please enter role"],
        enum:{
            values:['customer','admin','seller'],
            message:'role must be customer,seller,or admin'
        }
    },
    verifyOtp:{
        type:Boolean,
        default:''
    },
    verifyOtpExpiredAt:{
        type:Number,
        default:0
    },
    isAccountVerified:{
        type:Boolean,
        default:false
    },
    resetOtp:{
        type:String,
        default:''
    },
    resetOtpExpireAt:{
        type:Number,
        default:0
    },
})


/// so we might have to use presave for password to store the hashed alue
//sample:
/**
 * 
 * //next means before the adding to db it will get into that fn 
userSchema.pre('save',function(next){
    console.log('Before saving user:', this);
    Teacher.find({})
    .then((result)=>{
        console.log("Result",result);
        this.set({createdBy:result[0]._id});
    })
    .catch((err)=>{console.log(err)})
    .finally(()=>{
        next();
    })   
})
 * 
 * 
 */
userSchema.pre('save',function(next){
    const user = this;

    // Only hash the password if it has been modified or is new
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password,10)
    .then((hashedPassword)=>{
        user.password = hashedPassword;
        next();
    })
    .catch((err)=>{
        return next();
    })


})

const User = mongoose.model(CONSTANTS.collectionName.users_collection,userSchema);
module.exports = User;