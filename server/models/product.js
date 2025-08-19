const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title for the product"],
        minLength:[3,"Title should be 3 or more letters"]
    },
    companyName:{
        type:String,
        required:[true,"Please enter the title for the product"],
        minLength:[3,"Title should be 3 or more letters"]
    },
    description:{
        type:String,
        required:[true,"Please enter the description for the product"],
        min: [10, "description should be within range 10-2000"],
        max: [2000, "description should be within range 10-2000"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the price of the product"],
    },
    stock:{
        type:String,
        required: [true, "Please enter the stock status"],
        enum: {
          values: ['inStock', 'limited', 'outOfStock'],
          message: 'Stock must be one of "inStock", "limited", or "outOfStock"'
        }
    },
    category:{
        type:String,
        required:[true,"Please enter category of product"],
        enum:{
            values: ['clothing', 'perfume','accessories'],
            message: 'category must be any of these "clothing","accessories","perfume"'
        }
    },
    imageUrl:{  
        type:String,
        default:'https://placehold.co/300x300'
        // required:[true,"Please enter the image of the product"],
        // for implimenting image uplade frontend is necessary so for now we're not uploading ,
        // on updating a product we can do the image upload i guess
    },

    sellerId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // this is the key part
    required: false, // admin products may not have sellerId
    },

    createdBy: {
    type: String,
    enum: ['admin', 'seller'],
    default:'admin',
    },

    status: {
    type: String,
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending'
    },
    
},{timestamps:true})

productSchema.pre('save', function(next){
  const product = this;

  if(this.createdBy === 'admin'){
    this.status = 'approved';
    this.sellerId = null;
  }
  else if(this.createdBy === 'seller'){
    this.status = 'pending'
  }

  next();
})

/**
 * For development phase we're 
 * manually adding createdBy field 
 * but after adding jwt middlewear we can fetch the user role and according to role 
 * if the role is seller we can add seller to createdBy field as a presave and by default the createdBy
 * would be admin 
 * 
 * also note that only admin and seller can add products
 * 
 * also in that we can set sellerId and also the approved status for createdBy admin products and pending for createdBy seller products
 * 
 */
 const Product = mongoose.model(CONSTANTS.collectionName.products_collection,productSchema);
 module.exports= Product;


 /**admin role is made by devs and given to admint for control and 
  * the seller and customer roles are given to the frontend registration**/