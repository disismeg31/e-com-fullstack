const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');

mongoose.connect(CONSTANTS.MongoDBUrl+CONSTANTS.mongoDBPort+CONSTANTS.mongoDBName)
.then(()=>{
    console.log('.......Connection Created.......');
})
.catch(()=>{
    console.log('.......Connection not created.......',err)
})