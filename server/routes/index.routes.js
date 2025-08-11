const express = require('express');
let router = express.Router();
const CONSTANTS = require('./../shared/constants');
let authRouter = require('./auth.routes.js');
let adminRouter = require('./admin.routes.js');
let sellerRouter = require('./seller.routes.js')

router.get('/',function(req,res){
    res.json('App ready!!');
})

router.use(CONSTANTS.URLS.USERS_PREFIX,authRouter);

// ⬇️we do add the middleware to check for the role in jwt req 
router.use(CONSTANTS.URLS.USERS_PREFIX,adminRouter);
router.use(CONSTANTS.URLS.USERS_PREFIX,sellerRouter);


module.exports = router