import { createSlice } from "@reduxjs/toolkit"; 

const cartSlice=createSlice({
    name:'cart',
    initialState:[],
    reducers:{
        addToCart:(state,action)=>{
            const existingItem=state.find(item=>item.id==action.payload.id)
            if(existingItem){
                const newState=state.filter(item=>item.id!=action.payload.id)
                existingItem.quantity++
                state=[...newState,existingItem]
            }else{
                state.push({...action.payload,quantity:1})
            }
        },
        removeCart:(state,action)=>{
            return state.filter(item=>item.id!=action.payload.id)
        },
        emptyCart:(state)=>{
            return state=[]
        },
        incQuantity:(state,action)=>{
            const existingItem=state.find(item=>item.id==action.payload)
            const newState=state.filter(item=>item.id!=action.payload)
            existingItem.quantity++
            state=[...newState,existingItem]
        },
        decQuantity:(state,action)=>{
            const existingItem=state.find(item=>item.id==action.payload)
            const newState=state.filter(item=>item.id!=action.payload)
            existingItem.quantity--
            state=[...newState,existingItem]
        } 
      
    }
})
 
export const {addToCart, removeCart, emptyCart,incQuantity,decQuantity}=cartSlice.actions
export default cartSlice.reducer