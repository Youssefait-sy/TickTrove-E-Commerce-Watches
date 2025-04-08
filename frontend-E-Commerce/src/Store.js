import { configureStore } from '@reduxjs/toolkit';
import userReducer from './Config/userSlice';
import watchReducer from './Config/watchSlice';
import favReducer from './Config/favouriteSlice';
import cartReducer from './Config/cartSlice';

const Store = configureStore({
    reducer:{
        userData:userReducer,
        watchData:watchReducer,
        favData:favReducer,
        cartData:cartReducer
    }
})

export default Store;