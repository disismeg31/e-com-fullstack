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
        USERS_PREFIX:'api/users',
        PRODUCTS_PREFIX:'api/products'
    },
    subURLS:{
        sellers:{
            getProducts:'/id:/seller',
            insertProduct:'',
            updateProduct:'/id:/update',
            deleteProduct:'/id:'
        },
        admin:{
            getAllProducts:'',
            insertProducts:'',
            updateProducts:'/id:',
            deleteProducts:'/id:',
            updateProductStatus:'/id:/status'
        },
        customer:{
            get_Products:'',
            getProduct:'/id:'
        }
    }
    /**Q:
     *  so on role based acces admin prefix ,
     * seller prefix ,users prefix 
     * so what do we do with the above*/
}

module.exports = CONSTANTS