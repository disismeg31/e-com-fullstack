const Product = require('./../models/product.js');

function getProducts(req,res){
    Product.find({})
    .then((result)=>{
        if(result.length === 0){
            res.status(404).json({
                message:"No products found come back later",
                status:false
            })
        }
        else{
            res.status(200).json({
                message:"Succesfully fetched products",
                payload:result,
                status:true
            })
        }

    })
    .catch((err)=>{
        console.log("getAllProducts customer err",err)
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}

function getThisProduct(req,res){
    const {id} = req.params;
    Product.find({_id:id},{__v:0})
    .then((result)=>{
        if(result.length === 0){
            res.status(404).json({
                message:"No product Found",
                status:false
            })
        }
        else{
            res.status(200).json({
                message:"Succesfully fetched product",
                payload:result,
                status:true
            })
        }

    })
    .catch((err)=>{
        console.log("getThisProduct cutomer err",err)
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}


module.exports ={
    getProducts,
    getThisProduct
}