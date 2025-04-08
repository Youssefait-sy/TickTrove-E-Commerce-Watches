import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

export const fetchCart = createAsyncThunk('Cart/fetchCart', async({token,userId},{dispatch,rejectWithValue}) => {
        try {
            const res = await fetch(`/api/carts?filters[users_permissions_user][id]=${userId}&populate=watches.detail_image&populate=users_permissions_user`,{
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const addToCart = createAsyncThunk('Cart/AddToCart', async({productId,userId,token},{dispatch,rejectWithValue}) => {
        try {
            const res = await fetch('/api/carts',{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`
                },
                body:JSON.stringify({
                    data:{
                        quantite : 1,
                        users_permissions_user:userId,
                        watches:productId
                    }
                })
            })
            dispatch(fetchCart({userId,token}))
            const data = await res.json();
            return data;
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const RemoveCarts = createAsyncThunk('Cart/deleteCart', async({cartId,token},{rejectWithValue}) => {
    try {
        const res = await fetch(`/api/carts/${cartId}`,{
            method:'DELETE',
            headers:{
                Authorization: `Bearer ${token}`,
            }
        });
        if (!res.ok) {
            const errorText = await res.text();
            throw new Error(`Failed to delete: ${errorText}`);
        }else{
            console.log('Deleted')
        }
        return cartId;
        
    } catch (error) {
        return rejectWithValue(error)
    }
})

export const UpdateQuantity = createAsyncThunk('Quantite/UpdateQuantity', async({newQuantity,cartId,token,TotalPrice},{rejectWithValue}) => {
        try {
            const res = await fetch(`/api/carts/${cartId}`,{
                method:'PUT',
                headers:{
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({
                    data:{
                        quantite:newQuantity,
                        totalPrice:TotalPrice
                    }
                })
            });
            if(res.ok){
                return {newQuantity , totalPrice:TotalPrice};
            }
        } catch (error) {
            return rejectWithValue(error);
        }
})

const initialState = {
    cartItems:[],
    cartCount:0,
    quantite:1,
    totalPrice:0
}

const cartSlice = createSlice({
    name:'items',
    initialState:initialState,
    reducers:{
        addQuantity:((state,action)=>{
            const item = state.cartItems.find(item => item.id === action.payload);
            if(item ){
                item.quantite += 1;
            }
        }),
        minusQuantity:((state,action)=>{
            const item = state.cartItems.find(item => item.id === action.payload);
            if(item && item.quantite > 1){
                item.quantite -= 1;
            }
        }),
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchCart.fulfilled,(state,action)=>{
            state.cartItems = action.payload.data;
            state.cartCount = action.payload.data.length;
        })
        .addCase(addToCart.fulfilled,(state,action)=> {
            console.log('Payload:', action.payload); 
            const { cartItems, cartCount } = state;
    
            const updatedwatches = [...cartItems, action.payload.data];
            state.cartItems = updatedwatches;
            state.cartCount = cartCount +  1;
        })
        .addCase(RemoveCarts.fulfilled,((state,action)=>{
            state.cartItems = state.cartItems.filter(item => item.documentId !== action.payload);
            state.cartCount -= 1
        }))
        .addCase(UpdateQuantity.fulfilled,((state,action) => {
              const {newQuantity , totalPrice} = action.payload;
              const item = state.cartItems.find(product => product.documentId === action.meta.arg.cartId)
              if (item) {
                item.totalPrice = totalPrice;
                item.quantite = newQuantity
              }
        }))
    }
})

export default cartSlice.reducer;
export const {addQuantity , minusQuantity , calculTotalPrice} = cartSlice.actions;