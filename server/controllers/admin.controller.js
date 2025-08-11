const User =  require('./../models/user.js');
const Product = require('./../models/product.js');

function getAllProducts(req,res){
    Product.find({})
    .then((result)=>{
        if(result.length < 0){
            res.json({
                message:"No products Found Add New Products",
                status:false
            })
        }
        else{
            res.json({
                message:"Succesfully fetched products",
                payload:result,
                status:true
            })
        }

    })
    .catch((err)=>{
        res.json({
            message:"Error while fetching products",
            payload:err,
            status:false
        })
    })
}

function addProducts(req,res){
    let productToAdd = req.body;
    
    
}

function updateProduct(req,res){

}

function deleteProduct(req,res){

}

function updateProductStatus(req,res){

}

function getAllSellers(req,res){

}

function updateSellerStatus(req,res){

}


module.exports = {
    getAllProducts,
    addProducts,
    updateProduct,
    deleteProduct,
    updateProductStatus,
    getAllSellers,
    updateSellerStatus
}