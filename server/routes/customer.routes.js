const CONSTANTS = require('./../shared/constants.js');
const express = require('express');
const router = express.Router();
const customerController = require('./../controllers/customer.controller.js');

router.route(CONSTANTS.subURLS.customer.getProducts).get(customerController.getProducts);

router.route(CONSTANTS.subURLS.customer.getProduct).get(customerController.getThisProduct);

module.exports = router;