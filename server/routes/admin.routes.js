const CONSTANTS = require('./../shared/constants.js');
const express = require('express');
const router = express.Router();
const adminController = require('./../controllers/admin.controller.js');

router.route(CONSTANTS.subURLS.admin.getAllProducts).get(adminController.getAllProducts);

router.route(CONSTANTS.subURLS.admin.getAllSellers).get(adminController.getAllSellers);

router.route(CONSTANTS.subURLS.admin.insertProducts).post(adminController.addProducts);

router.route(CONSTANTS.subURLS.admin.updateProduct).patch(adminController.updateProduct);

router.route(CONSTANTS.subURLS.admin.deleteProduct).delete(adminController.deleteProduct);

router.route(CONSTANTS.subURLS.admin.updateProductStatus).patch(adminController.updateProductStatus);

router.route(CONSTANTS.subURLS.admin.updateSellerStatus).patch(adminController.updateSellerStatus);

router.route(CONSTANTS.subURLS.admin.getProduct).get(adminController.getProduct);

// router.route(CONSTANTS.subURLS.admin.updateAdminProductStatus).patch(adminController.updateAdminProductStatus)

// router.route(CONSTANTS.subURLS.admin.updateAdminSellerIDNull).patch(adminController.updateAdminSellerIDNull);

module.exports = router;