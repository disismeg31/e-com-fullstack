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
        ADMIN_USERS_PREFIX:'/api/admin/users',
        
        ADMIN_PRODUCTS_PREFIX:'/api/admin/products',

        SELLER_PRODUCTS_PREFIX:'/api/seller/products',// (GET,POST,PUT,DELETE) for seller
        
        USERS_PREFIX:'/api/users',   //used for auth

        PRODUCTS_PREFIX:'/api/products',  //(GET) for customer also for specific products
    },
    subURLS:{
        auth:{
            signUp:'/signup',
            signIn:'/signin',
            checkSession:'/check-session',
            getUsers:'',
            signOut:'signOut',
        },
        sellers:{
            getProducts:'/:id/seller',
            insertProduct:'',
            getProduct:'/:id',
            updateProduct:'/:id',
            deleteProduct:'/:id',
        },
        admin:{
            getAllSellers:'/sellers',
            updateSellerStatus:'/sellers/:id',
            getAllProducts:'',
            insertProducts:'',
            // updateAdminProductStatus:'',
            // updateAdminSellerIDNull:'',
            getProduct:'/:id',
            updateProduct:'/:id',
            deleteProduct:'/:id',
            updateProductStatus:'/:id',
        },
        customer:{
            getProducts:'',
            getProduct:'/:id'
        }
    }
    /**Q:
     *  so on role based acces admin prefix ,
     * seller prefix ,users prefix 
     * so what do we do with the above*/
}

module.exports = CONSTANTS