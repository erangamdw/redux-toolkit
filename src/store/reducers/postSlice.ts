import { createAsyncThunk, createEntityAdapter, createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';

interface postState {
    data: string[];
    loading: string,
    error: string // Example type for `computers`
}
 
const postState = createEntityAdapter({
    selectId: (ele:any)=>ele.id
})

//entitiy adaptor eken Ids, entities kiyala state eka order wenawa, eken parse wena initialstate eka pahala assign karanawa,
// amathara data tikath assign karanawa optionl object ekak widihata
const initialState = postState.getInitialState({
    loading: 'idle', 
    error: ''
})


//thunk waladi dispatch karaddi call karanneth meka     // dispatch karaddi parameter ekak ganna/ parse karanna onenm eka ganne async eke () walata
export const getPosts = createAsyncThunk('getPosts', async ()=>{
    //try catch one na
const res = await fetch('https://jsonplaceholder.typicode.com/posts')
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
        // updatePost:(state, action)=>{
        //     postState.updateOne(state,action.payload)
        // }
        //entities use karaddi  reducers action creators simplyfy karanna pluwan
        updatePost: postState.updateOne
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
                // state.data = action.payload
                postState.addMany(state,action.payload)
            }
            
        })
        //reject / fail unoth
        builder.addCase(getPosts.rejected, (state: any, action:PayloadAction<postState>)=>{
            state.loading = "rejected";
            state.error="some error"
        })
    }
})

// const seltAllPosts = (store:any)=> store.post
export const selectPostLoading = createSelector([store=>store.post.loading],(loading)=>loading)
// export const selectAllPosts = createSelector([seltAllPosts],(post)=> post)

export const {
    selectIds,
    selectAll,
    selectById,
    selectEntities,
    selectTotal
} = postState.getSelectors((store:any)=>store.post)


export const {updatePost} = postSlice.actions
export default postSlice.reducer;