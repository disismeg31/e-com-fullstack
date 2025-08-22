const express = require('express');
let router = express.Router();
const CONSTANTS = require('./../shared/constants');
let authRouter = require('./auth.routes.js');
let adminRouter = require('./admin.routes.js');
let sellerRouter = require('./seller.routes.js')
let customerRouter = require('./customer.routes.js')

router.get('/',function(req,res){
    res.json('App ready!!');
})

router.use(CONSTANTS.URLS.USERS_PREFIX,authRouter);

// ⬇️we do add the middleware to check for the role in jwt req 
// role based routes
router.use(CONSTANTS.URLS.ADMIN_PRODUCTS_PREFIX,adminRouter);
router.use(CONSTANTS.URLS.ADMIN_USERS_PREFIX,adminRouter);

router.use(CONSTANTS.URLS.SELLER_PRODUCTS_PREFIX,sellerRouter);

router.use(CONSTANTS.URLS.PRODUCTS_PREFIX,customerRouter);

// ⬇️we do add the middleware to check for the role in jwt req 

// later for middleware role based acccess
// router.use(CONSTANTS.URLS.USERS_PREFIX,sellerRouter);
// router.use(CONSTANTS.URLS.PRODUCTS_PREFIX,adminRouter);
// router.use(CONSTANTS.URLS.USERS_PREFIX,adminRouter);


module.exports = router