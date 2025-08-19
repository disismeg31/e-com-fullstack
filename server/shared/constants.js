const CONSTANTS = {
    PORT:3500,
    MongoDBUrl:'mongodb://localhost:',
    mongoDBPort:27017,
    mongoDBName:'ecommerce-app',
    collectionName:{
        users_collection:'users',
        products_collection:'products'
    },
    URLS:{
        USERS_PREFIX:'/api/users',
        PRODUCTS_PREFIX:'/api/products'
    },
    subURLS:{
        auth:{
            signUp:'/signup',
            signIn:'/signin',
            getUsers:''
            // signOut:'signOut',
        },
        sellers:{
            getProducts:'/id:/seller',
            insertProduct:'',
            getProduct:'/id:',
            updateProduct:'/id:',
            deleteProduct:'/id:',
        },
        admin:{
            getAllSellers:'/sellers',
            updateSellerStatus:'/sellers/id:',
            getAllProducts:'',
            insertProducts:'',
            getProduct:'/id:',
            updateProduct:'/id:',
            deleteProduct:'/id:',
            updateProductStatus:'/id:',
        },
        customer:{
            getProducts:'',
            getProduct:'/id:'
        }
    }
    /**Q:
     *  so on role based acces admin prefix ,
     * seller prefix ,users prefix 
     * so what do we do with the above*/
}

module.exports = CONSTANTS