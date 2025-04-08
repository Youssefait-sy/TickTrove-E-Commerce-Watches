import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { connect } from "react-redux";

export const fetchFavourites = createAsyncThunk('favourite/fetchFavourites', async({token,userId},{rejectWithValue}) => {
        try {
            const res = await fetch(`/api/favourites?filters[users_permissions_user][id]=${userId}&populate=watch.detail_image&populate=users_permissions_user`,{
                headers: {
                    Authorization: `Bearer ${token}`
                },
            });
            const data = await res.json();
            return data;
            
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const AddToFavourite = createAsyncThunk('favourite/createFavourite', async({productId,token,userId},{dispatch,rejectWithValue}) => {
        try {

            const res = await fetch('/api/favourites',{
                method:'POST',
                headers:{
                    Authorization: `Bearer ${token}`,
                },
                body:JSON.stringify({
                    data:{
                        users_permissions_user:{ connect: [userId] },
                        watch:{ connect: [productId] } ,
                    }
                })
            });

            dispatch(fetchFavourites({ token, userId }));
            
            const data = await res.json();
            return data;
            
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const RemoveFavourite = createAsyncThunk('favourite/deleteFavourite', async({FavId,token},{rejectWithValue}) => {
        try {
            const res = await fetch(`/api/favourites/${FavId}`,{
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
            return FavId;
            
        } catch (error) {
            return rejectWithValue(error)
        }
})

const favouriteSlice = createSlice({
    name:'favourites',
    initialState:{
        isFavourite:{},
        favCount:0,
        items:[],
    },
    reducers:{
        touggleFavourite:((state,action)=>{
            const watchId = action.payload
            state.isFavourite[watchId] = !state.isFavourite[watchId]
        })
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchFavourites.fulfilled,((state,action) => {
                state.items = action.payload.data;
                state.favCount = action.payload.data.length
        }))
        .addCase(AddToFavourite.fulfilled,((state,action)=>{
            state.items.push(action.payload.data);
            state.favCount += 1
        }))
        .addCase(RemoveFavourite.fulfilled,((state,action)=>{
            state.items = state.items.filter(item => item.documentId !== action.payload);
            state.favCount -= 1
        }))
    }
})

export default favouriteSlice.reducer;
export const {touggleFavourite} = favouriteSlice.actions;