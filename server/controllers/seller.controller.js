const Product = require("./../models/product.js");
const cloudinary = require("./../config/cloudinary.js");

function getMyProducts(req, res) {
  let { id } = req.params;
  Product.find({ sellerId: id })
    .then((result) => {
      res.status(200).json({
        message: "Successfully fetched your products",
        payload: result,
        status: true,
      });
    })
    .catch((err) => {
      console.log("getMyproducts seller err", err);
      res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    });
}

/*⬇️ here we need to add the images function 
with cloudinary sending it to cloudinary**/
function addNewProducts(req, res) {
  let productToAdd = req.body;
  console.log(req.body, req.file);
  // Boundary check — confirms whether an image truly exists⬇️
  if (!req.file && !productToAdd.imageUrl) {
    console.log("No image uploaded");
  }

  const productToArray = (data) => (Array.isArray(data) ? data : [data]);

  // Remove harmful ghost data⬇️
  delete productToAdd.imageUrl;

  if (req.file) {
    //file upload via multer
    cloudinary.uploader

      .upload(req.file.path, {
        // foldername & presetname
        folder: "ecommerce",
        upload_preset: "ecom-image-store",
      })
      .then((uploadResult) => {
        productToAdd.imageUrl = uploadResult.secure_url;
        return Product.insertMany(productToArray(productToAdd));
      })
      .then((result) => {
        const dataToDisplay = result.map((r) => r.title);
        res.status(200).json({
          message: `Successfully Inserted Product${
            dataToDisplay.length > 1 ? "s" : "."
          }`,
          payload: dataToDisplay,
          status: true,
        });
      })
      .catch((err) => {
        console.error("addProducts seller err", err);
        res.status(500).json({
          message: "Internal server error",
          status: false,
        });
      });
  } else {
    Product.insertMany(productToArray(productToAdd))
      .then((result) => {
        const dataToDisplay = result.map((r) => r.title);
        res.status(200).json({
          message: `Successfully Inserted Product${
            dataToDisplay.length > 1 ? "s" : "."
          }`,
          payload: dataToDisplay,
          status: true,
        });
      })
      .catch((err) => {
        console.log("addProducts seller err", err);
        res.status(500).json({
          message: "Internal server error",
          status: false,
        });
      });
  }
}

function getMySpecificProduct(req, res) {
  const { id } = req.params;
  Product.find({ _id: id }, { __v: 0 })
    .then((result) => {
      if (result.length === 0) {
        res.status(404).json({
          message: "No product Found",
          status: false,
        });
      } else {
        res.status(200).json({
          message: "Succesfully fetched product",
          payload: result,
          status: true,
        });
      }
    })
    .catch((err) => {
      console.log("getMyspecificProduct seller err", err);
      res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    });
}

function updateMyProduct(req, res) {
  const { id } = req.params;
  let dataToUpdate = req.body;

  // 2️⃣ Remove bogus image object from body (multipart issue)
  // delete dataToUpdate.imageUrl;
  if (dataToUpdate?.imageUrl && typeof dataToUpdate.imageUrl === "object") {
    delete dataToUpdate.imageUrl;
  }

  // 1️⃣ Fetch existing product FIRST
  Product.findById(id).then((existingProduct) => {
    if (!existingProduct) {
      throw { status: 404, message: "Product not found" };
    }

    if (req.file) {
      //file upload via multer
      cloudinary.uploader

        .upload(req.file.path, {
          // foldername & presetname
          folder: "ecommerce",
          upload_preset: "ecom-image-store",
        })
        .then((uploadResult) => {
          // 4️⃣ Delete old Cloudinary image
          if (existingProduct.imageUrl) {
            const publicId = existingProduct.imageUrl
              .split("/upload/")[1]
              .replace(/^v\d+\//, "")
              .replace(/\.[^/.]+$/, "");

            return cloudinary.uploader
              .destroy(publicId)
              .then(() => uploadResult);
          }
          return uploadResult;
        })
        .then((uploadResult) => {
          dataToUpdate.imageUrl = uploadResult.secure_url;

          return Product.findByIdAndUpdate(id, dataToUpdate, {
            new: true,
            runValidators: true,
          });
        })

        .then((result) => {
          if (!result) {
            return res.status(404).json({
              message: "Product not found",
              status: false,
            });
          }

          res.status(200).json({
            message: `Successfully Updated Product${
              result.length > 1 ? "s" : "."
            }`,
            payload: result,
            status: true,
          });
        })
        .catch((err) => {
          console.error("updateMyProduct seller err", err);
          res.status(500).json({
            message: "Internal server error",
            status: false,
          });
        });
    } else {
      Product.findByIdAndUpdate(id, dataToUpdate, {
        new: true,
        runValidators: true,
      })
        .then((result) => {
          if (!result) {
            return res.status(404).json({
              message: "Product not found",
              status: false,
            });
          }

          res.status(200).json({
            message: "Succesfully Updated",
            payload: { id: result._id, status: result.status },
            status: true,
          });
        })
        .catch((err) => {
          console.log("updateProduct seller err", err);
          res.status(500).json({
            message: "Internal server error",
            status: false,
          });
        });
    }
  });
}



function deleteMyProduct(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID is required",
      status: false,
    });
  }
  
   let productToDelete;

  // 1️⃣ Find product first
  Product.findById(id)
    .then((product) => {
      if (!product) {
        return res.status(404).json({
          message: "Product not found",
          status: false,
        });
      }

      productToDelete = product;

      // 2️⃣ Delete image from Cloudinary (if exists)
      if (product.imageUrl) {
        const publicId = product.imageUrl
          .split("/upload/")[1]
          .replace(/^v\d+\//, "")
          .replace(/\.[^/.]+$/, "");

        return cloudinary.uploader.destroy(publicId);
      }
    })
    .then(()=>{
      // 3️⃣ Delete product from DB
      return Product.findByIdAndDelete(id);
      })
    .then(() => {
      res.status(200).json({
        message: "Successfully Deleted",
        payload: {
          id: productToDelete._id,
          title: productToDelete.title,
        },
        status: true,
      });
    })
    .catch((err) => {
      console.error("deleteProduct seller err", err);
      res.status(500).json({
        message: "Internal server error",
        status: false,
      });
    });
}

module.exports = {
  getMyProducts,
  addNewProducts,
  getMySpecificProduct,
  updateMyProduct,
  deleteMyProduct,
};
