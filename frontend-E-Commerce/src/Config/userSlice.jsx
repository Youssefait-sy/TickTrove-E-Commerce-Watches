import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

export const fetchUser = createAsyncThunk('user/fechUser', async(token,{rejectWithValue}) => {
    try {
        const res = await fetch('/api/users/me',{
            headers:{
                Authorization: `Bearer ${token}`
            }
        });
        const data = await res.json();
        return data;
    } catch (error) {
        return rejectWithValue(error);
    }
})

const initialState = {
    user:null,
    loading:false,
    token:localStorage.getItem('jwt')
}

const userSlice = createSlice({
    name:'users',
    initialState:initialState,
    reducers:{
        setToken:((state,action)=>{
            state.token = action.payload
        }),
        logout:(state=>{
            state.token = null,
            state.user = null,
            localStorage.removeItem('jwt')
        })
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchUser.pending,(state)=>{
            state.loading = false;
        })
        .addCase(fetchUser.fulfilled,(state,action)=>{
            state.loading = true;
            state.user = action.payload;
        })
        .addCase(fetchUser.rejected,(state)=>{
            state.loading = false;
        })
    }
})

export default userSlice.reducer;
export const {setToken , logout} = userSlice.actions;