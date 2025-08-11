const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
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
    status: {
        type: String,
        enum: ['rejected', 'approved', 'pending'],
        default: undefined // Optional — allows it to be unset for non-sellers
    }
    // verifyOtp:{
    //     type:Boolean,
    //     default:''
    // },
    // verifyOtpExpiredAt:{
    //     type:Number,
    //     default:0
    // },
    // isAccountVerified:{
    //     type:Boolean,
    //     default:false
    // },
    // resetOtp:{
    //     type:String,
    //     default:''
    // },
    // resetOtpExpireAt:{
    //     type:Number,
    //     default:0
    // },
},{
    timestamps: true //for adding createdAt and updatedAt
})


userSchema.pre('save',function(next){
    const user = this;

    if(this.role === 'seller'){
        if(!this.status){
            this.status = 'pending';
        }
    }
    else{
            this.status = undefined;
    }

    // Only hash the password if it has been modified or is new
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password,10)
    .then((hashedPassword)=>{
        user.password = hashedPassword;
        next();
    })
    .catch((err)=> next(err))
})

const User = mongoose.model(CONSTANTS.collectionName.users_collection,userSchema);
module.exports = User;