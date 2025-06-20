const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter name"],
        minLength:[3,"Name should be 3 or more letters"]
    },
    email:{
        type:String,
        required:[true,"Plaese Enter email"]
    },
    password:{
        type:String
    },
    role:{
        type:String,
        required:[true,"Please enter role"],
        enum:{
            values:['customer','admin','seller'],
            message:'role must be customer,seller,or admin'
        }
    }
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


const User = mongoose.model(CONSTANTS.collectionName.users_collection,userSchema);
module.exports = User;