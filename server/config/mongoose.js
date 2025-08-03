const mongoose = require('mongoose');
const CONSTANTS = require('./../shared/constants');

const connectDB = async ()=>{
    mongoose.connection.on('connected',()=>console.log('.......Connection Created.......'))
    await mongoose.connect(`${process.env.MONGODB_URL}/${CONSTANTS.mongoDBName}`)
}

// mongoose.connect(CONSTANTS.MongoDBUrl+CONSTANTS.mongoDBPort+CONSTANTS.mongoDBName)
// .then(()=>{
//     console.log('.......Connection Created.......');
// })
// .catch(()=>{
//     console.log('.......Connection not created.......',err)
// })

//ask y we expor the new async way and before that we just required it in the server.js file

module.exports = connectDB;

// look up project resources bookmark  - mongodb atlas