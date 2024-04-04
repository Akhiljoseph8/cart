import { createSlice } from "@reduxjs/toolkit";

const wishSlice=createSlice({
    name:'wishlist',
    initialState:{
        wishlist:[]
    },
    reducers:{
        addToWishList:(state,action)=>{
            state.wishlist.push(action.payload)
            // localStorage.setItem("wishlist",JSON.stringify(state.wishlist))
        },
        removeWishList:(state,action)=>{
         state.wishlist=state.wishlist.filter(item=>item.id!=action.payload)
        //  localStorage.setItem('wishlist',JSON.stringify(state.wishlist))
        }
    }
})

export const {addToWishList,removeWishList}=wishSlice.actions
export default wishSlice.reducer