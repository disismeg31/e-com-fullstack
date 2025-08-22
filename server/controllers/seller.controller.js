const Product = require('./../models/product.js');

function getMyProducts(req,res){
    let {id} = req.params;
    Product.find({sellerId:id})
    .then((result)=>{
        res.status(200).json({
            message:"Successfully fetched your products",
            payload:result,
            status:true
        })
    })
    .catch((err)=>{
        console.log("getMyproducts seller err",err);
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })

}

function addNewProducts(req,res){
    let productToAdd = Array.isArray(req.body)? req.body : [req.body];
    Product.insertMany(productToAdd)
    .then((result)=>{
        const dataTodisplay = result.map((r)=>r.title)
        res.status(200).json({
            message:`Successfully Inserted Product${dataTodisplay.length>1 ? 's':'.'}`,
            payload:dataTodisplay,
            status:true
        })
    })
    .catch((err)=>{
        console.log("addProducts seller err",err)
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })

}

function getMySpecificProduct(req,res){
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
        console.log("getMyspecificProduct seller err",err)
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}

function updateMyProduct(req,res){
    const {id} = req.params;
    let dataToUpdate = req.body;
        Product.findByIdAndUpdate(id,dataToUpdate,{ new: true, runValidators: true })
        .then((result)=>{
            if(!result){
                return res.status(404).json({
                    message:"Product not found",
                    status:false
                })
            }
    
            res.status(200).json({
                message:"Succesfully Updated",
                payload: { id: result._id, status: result.status },
                status:true
            })
    
        })
        .catch((err)=>{
            console.log("updateProduct seller err",err);
            res.status(500).json({
                message:"Internal server error",
                status:false
            })
        })
}

function deleteMyProduct(req,res){
    const {id} = req.params;
    
    if(!id){
        return res.status(400).json({
            message:"ID is required",
            status:false
        })
    }
    Product.findByIdAndDelete(id)
    .then((result)=>{
        if(!result){
            return res.status(404).json({
                message:"Product not found",
                status:false
            })  
        }

        res.status(200).json({
            message:"Succesfully Deleted",
            payload:{ id: result._id, title: result.title },
            status:true
        })
    })
    .catch((err)=>{
        console.log("deleteProduct seller err",err)
        res.status(500).json({
            message:"Internal server error",
            status:false
        })
    })
}




module.exports = {
    getMyProducts,
    addNewProducts,
    getMySpecificProduct,
    updateMyProduct,
    deleteMyProduct,
}