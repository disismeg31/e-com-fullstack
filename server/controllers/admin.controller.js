const User =  require('./../models/user.js');
const Product = require('./../models/product.js');

function getAllProducts(req,res){
    Product.find({})
    .then((result)=>{
        if(result.length === 0){
            res.status(404).json({
                message:"No products Found Add New Products",
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
        res.status(500).json({
            message:err.message,
            status:false
        })
    })
}

function addProducts(req,res){
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
        res.status(500).json({
            message:err.message,
            status:false
        })
    })
    
}

function updateProduct(req,res){
    let dataToUpdate = req.body;
    Product.findByIdAndUpdate(dataToUpdate.id,dataToUpdate,{ new: true, runValidators: true })
    .then((result)=>{
        if(!result){
            return res.status(404).json({
                message:"Product not found",
                status:false
            })
        }

        console.log(result)
        res.status(200).json({
            message:"Succesfully Updated",
            payload: { id: result._id, status: result.status },
            status:true
        })

    })
    .catch((err)=>{
        res.status(500).json({
            message:err.message,
            status:false
        })
    })
}

function deleteProduct(req,res){
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

        console.log(result)
        res.status(200).json({
            message:"Succesfully Deleted",
            payload:{ id: result._id, title: result.title },
            status:true
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:err.message,
            status:false
        })
    })
}

function updateProductStatus(req,res){
    const allowed = ['rejected','approved','pending']
    const { id } = req.params;      // ID from URL
    const { status } = req.body;    // status from button click
    if(!id || !status){
        return res.status(400).json({
            message:"ID and Status are is required",
            status:false
        })
    }

    if (!allowed.includes(status)) {
        return res.status(400).json({
            message:"Invalid status value",
            status:false
        })
    }

    Product.findByIdAndUpdate(id,{status},{ new: true, runValidators: true })
    .then((result)=>{
        if(!result){
            return res.status(404).json({
                message:"Product not found",
                status:false
            })
        }

        console.log(result)
        res.status(200).json({
            message:"Succesfully Updated",
            payload: { id: result._id, status: result.status },
            status:true
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:err.message,
            status:false
         })
    })
}

function getAllSellers(req,res){
    User.find({role:'seller'},{__v:0,password:0})
    .then((result)=>{
        if(result.length === 0){
            res.status(404).json({
            message:"No sellers found , Add sellers",
            payload:result,
            status:false
        })
        }
        else{
            res.status(200).json({
            message:"Succesfully fetched sellers!!",
            payload:result,
            status:true
        })
        }    
    })
    .catch((err)=>{
         res.status(500).json({
            message:err.message,
            status:false
         })
    })
}

function updateSellerStatus(req,res){
     const allowed = ['rejected','approved','pending']
     const { id } = req.params;      // ID from URL
     const { status } = req.body;    // status from button click
    if(!id || !status){
        return res.status(400).json({
            message:"ID and Status are is required",
            status:false
        })
    }

    if (!allowed.includes(status)) {
        return res.status(400).json({
            message:"Invalid status value",
            status:false
        })
    }

    // get the sellers list an from that list update the specific status - this is too much work so we're not doing that❌
    // or simpley just update the status like below ✅⬇️

    User.findByIdAndUpdate(id,{status},{ new: true, runValidators: true })
    .then((result)=>{
        if(!result){
            return res.status(404).json({
                message:"User not found",
                status:false
            })
        }

        console.log(result)
        res.status(200).json({
            message:"Succesfully Updated Seller status",
            payload: { id: result._id, status: result.status },
            status:true
        })
    })
    .catch((err)=>{
        res.status(500).json({
            message:err.message,
            status:false
         })
    })
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