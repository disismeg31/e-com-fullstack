const CONSTANTS = {
    PORT:3500,
    MongoDBUrl:'mongodb://localhost:',
    mongoDBPort:27017,
    mongoDBName:'/ecommerce-app',
    collectionName:{
        users_collection:'users',
        products_collection:'products'
    },
    URLS:{
        USERS_PREFIX:'/users',
        PRODUCTS_PREFIX:'/products'
    }
    /**Q:
     *  so on role based acces admin prefix ,
     * seller prefix ,users prefix 
     * so what do we do with the above*/
}

module.exports = CONSTANTS