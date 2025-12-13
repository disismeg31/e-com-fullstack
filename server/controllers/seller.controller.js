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

  // delete dataToUpdate.imageUrl;
  if (dataToUpdate?.imageUrl && typeof dataToUpdate.imageUrl === "object") {
    delete dataToUpdate.imageUrl;
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
}

function deleteMyProduct(req, res) {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      message: "ID is required",
      status: false,
    });
  }
  Product.findByIdAndDelete(id)
    .then((result) => {
      if (!result) {
        return res.status(404).json({
          message: "Product not found",
          status: false,
        });
      }

      res.status(200).json({
        message: "Succesfully Deleted",
        payload: { id: result._id, title: result.title },
        status: true,
      });
    })
    .catch((err) => {
      console.log("deleteProduct seller err", err);
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
