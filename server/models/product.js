const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');

const productSchema = new mongoose.Schema({
    title:{
        type:String,
        required:[true,"Please enter the title for the product"],
        minLength:[3,"Title should be 3 or more letters"]
    },
    Description:{
        type:String,
        required:[true,"Please enter the description for the product"],
        min: [10, "description should be within range 10-200"],
        max: [300, "description should be within range 10-200"]
    },
    price:{
        type:Number,
        required:[true,"Please enter the price of the product"],
    },
    stock:{
        type:Boolean,
        required:[true,"Please enter the stock is available or not"],
        enum:{
            values: ['true', 'false'],
            message: 'stock must be either "true" or "false"'
        }
    },
    // rating:{
    //     type:Number,
    //     required:[true,"Please enter the rating of the product"],
    // },
    imageUrl:{  
        type:String,
        required:[true,"Please enter the image of the product"],
    },
    category:{
        type:String,
        required:[true,"Please enter category of product"],
        enum:{
            values: ['clothing', 'accessories','backpacks','stationery'],
            message: 'category must be any of these "clothing","accessories","backpacks","stationery"'
        }
    }

})

 const Product = mongoose.model(CONSTANTS.collectionName.products_collection,productSchema);
 module.exports(Product);