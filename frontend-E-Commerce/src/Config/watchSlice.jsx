import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    watchs:[],
    Allwatchs:[],
    FiltredWatchs:[],
    brands:[],
    loading:false
}

export const fetchWatch = createAsyncThunk('watch/fetchWatch', async(limit,{rejectWithValue})=>{

        try {
            const res = await fetch(`/api/watchs?populate=detail_image&populate=brand&pagination[limit]=${limit}`)
            const data = await res.json();
            if(res.ok){
                return data;
            }
        } catch (error) {
            return rejectWithValue(error);
        }
})

export const fetchAllWatchs = createAsyncThunk('watch/fetchAllWatchs', async(_,{rejectWithValue}) => {
        try {
            const res = await fetch('/api/watchs?populate=*&pagination[pageSize]=40');
            const data = await res.json();
            if(res.ok){
                return data;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
})

export const fetchBrands = createAsyncThunk('brands/fetchBrands', async(_,{rejectWithValue}) => {
        try {
            const res = await fetch('/api/brands');
            const data = await res.json();
            if(res.ok){
                return data;
            }
        } catch (error) {
            return rejectWithValue(error)
        }
})

const watchSlice = createSlice({
    name:'watchs',
    initialState:initialState,
    reducers:{
        setFiltred:((state,action)=>{
            state.FiltredWatchs = action.payload;
        })
    },
    extraReducers:(builder) => {
        builder
        .addCase(fetchWatch.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchWatch.fulfilled,(state,action)=>{
            state.loading = false;
            state.watchs = action.payload;
        })
        .addCase(fetchWatch.rejected,(state)=>{
            state.loading = false;
        })
        builder
        .addCase(fetchAllWatchs.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchAllWatchs.fulfilled,(state,action)=>{
            state.loading = false;
            state.Allwatchs = action.payload.data;
            state.FiltredWatchs = action.payload.data
        })
        .addCase(fetchAllWatchs.rejected,(state)=>{
            state.loading = false;
        })
        builder
        .addCase(fetchBrands.pending,(state)=>{
            state.loading = true;
        })
        .addCase(fetchBrands.fulfilled,(state,action)=>{
            state.loading = false;
            state.brands = action.payload.data;
        })
        .addCase(fetchBrands.rejected,(state)=>{
            state.loading = false;
        })

    }
})

export default watchSlice.reducer;
export const {setFiltred} = watchSlice.actions;