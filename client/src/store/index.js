// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/productReducer';
import { authReducer } from './reducers/authReducer';
const productStore=configureStore({
    reducer:{
        products: productReducer,
        auth:authReducer,
    }
});

export default productStore;