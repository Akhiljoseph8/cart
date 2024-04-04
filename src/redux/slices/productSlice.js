import { createSlice ,createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProductsThunk = createAsyncThunk('product/fetchProductsThunk',()=>{
    return axios.get('https://dummyjson.com/products').then(res=>res.data.products)
})

const productSlice = createSlice({
    name:'product',
    initialState:{
        product:[],
        productContainer:[],
        loading:false,
        error:'',
        productsPerPage:8,
        currentPage:1
    },
    reducers:{
        searchProduct:(state,action)=>{
            state.product=state.productContainer.filter(item=>item.title.toLowerCase().includes(action.payload))
        },
        onNavigatePrev:(state)=>{
            state.currentPage--
        },
        onNavigateNext:(state)=>{
            state.currentPage++
        },

    },
    extraReducers:(builder)=>{
        builder.addCase(fetchProductsThunk.pending,(state,action)=>{
            state.loading=true
        }),
        builder.addCase(fetchProductsThunk.fulfilled,(state,action)=>{
            state.loading=false
            state.product=action.payload
            state.productContainer=action.payload
        }),
        builder.addCase(fetchProductsThunk.rejected,(state,action)=>{
            state.loading=false
            state.product=[]
            state.error="cannot fetch products"

        })
    }
})
export const {searchProduct,onNavigateNext,onNavigatePrev}=productSlice.actions
export default productSlice.reducer