import { configureStore } from "@reduxjs/toolkit";
import productReducer from "./slices/productSlice";
import wishlistSlice from "./slices/wishlistSlice";
import cartReducer from "./slices/cartSlice"
const productStore=configureStore({
    reducer:{
        productReducer,
        wishlistSlice,
        cartReducer
        
    }
})

export default productStore