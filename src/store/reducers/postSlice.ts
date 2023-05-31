import { createAsyncThunk, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface postState {
    data: string[];
    loading: string,
    error: string // Example type for `computers`
}

const initialState: postState = {
    data: [],
    loading: 'idle', 
    error: ''
}


//thunk waladi dispatch karaddi call karanneth meka     // dispatch karaddi parameter ekak ganna/ parse karanna onenm eka ganne async eke () walata
export const getPosts = createAsyncThunk('getPosts', async ()=>{
    //try catch one na
const res = await fetch('https://jsonplaceholder.typicode.csom/posts')
    const data = await res.json();
    if(Array.isArray(data)){
        return data;
    }else{
        return{err: "some error"}
    }
})


const postSlice = createSlice({
    name: "post-slice",
    initialState,
    reducers:{
        
    },
    //for external reducer & async data when use external action fucntions =>eliyen hadapu functions ganne extra reducers walin, API call karaddi

    //uda hadapu thunk eken automatically toolkit eken action creater functions 3k object ekak widihata return karanawa 
    // builder function eke cases 3k tyenawa=> fulfilled (meka pass unoth), pending , rejected| switch ekak wage add karanawa
    extraReducers:(builder:any)=>{
        //pending welawedi
        builder.addCase(getPosts.pending, (state:any, action:PayloadAction<postState>)=>{
            state.loading = "pending"
        })
        builder.addCase(getPosts.fulfilled, (state:any, action:PayloadAction<postState>)=>{ // itapase normal reducer function eka liyanawa
            //immer library use wena nisa spread karanna one na
            if(action.payload.error){
                state.loading = 'failed'
            }else{
                state.loading = "completed";
                state.data = action.payload
            }
            
        })
        //reject / fail unoth
        builder.addCase(getPosts.rejected, (state: any, action:PayloadAction<postState>)=>{
            state.loading = "rejected";
            state.error="some error"
        })
    }
})

const seltAllPosts = (store:any)=> store.post
export const selectAllPosts = createSelector([seltAllPosts],(post)=> post)

export default postSlice.reducer;