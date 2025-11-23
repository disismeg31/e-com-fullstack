const CONSTANTS = require('./../shared/constants.js');
const express = require('express');
const router = express.Router();
const sellerController = require('./../controllers/seller.controller.js');
const multer = require("multer");
const upload = multer({ dest: "uploads/" });

router.route(CONSTANTS.subURLS.sellers.getProducts).get(sellerController.getMyProducts);

router.route(CONSTANTS.subURLS.sellers.getProduct).get(sellerController.getMySpecificProduct);

router.route(CONSTANTS.subURLS.sellers.insertProduct).post(upload.single("imageUrl"),sellerController.addNewProducts);

router.route(CONSTANTS.subURLS.sellers.updateProduct).patch(sellerController.updateMyProduct);

router.route(CONSTANTS.subURLS.sellers.deleteProduct).delete(sellerController.deleteMyProduct);



module.exports = router;