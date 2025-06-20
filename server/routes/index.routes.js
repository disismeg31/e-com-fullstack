const express = require('express');
let router = express.Router();
const CONSTANTS = require('./../shared/constants')

router.get('/',function(req,res){
    res.json('App ready!!');
})

module.exports = router