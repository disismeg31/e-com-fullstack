// import {createStore} from 'redux';
import { configureStore } from '@reduxjs/toolkit';
import { productReducer } from './reducers/productReducer';

const productStore=configureStore({
    reducer:{
        products: productReducer,
    }
});

export default productStore;