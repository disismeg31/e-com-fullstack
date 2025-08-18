const Product = require('./../models/product.js');

function getMyProducts(req,res){
    let {id} = req.params;
    Product.findById({sellerId:id})
    .then((result)=>{
        res.status(200).json({
            message:"Successfully fetched your products",
            payload:result,
            status:true
        })
    })
    .catch((err)=>{
        console.log("get My products seller",err);
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })

}

function addNewProducts(req,res){

}

function updateMyProduct(req,res){

}

function deleteMyProduct(req,res){
    
}




module.exports = {
    getMyProducts,
    addNewProducts,
    updateMyProduct,
    deleteMyProduct,
}