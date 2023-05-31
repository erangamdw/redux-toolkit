import { PayloadAction, createAction, createAsyncThunk, createReducer, createSelector } from "@reduxjs/toolkit"

interface Number2State {
    number: number;
    users: string[] | { err: string }; // Example type for `computers`
}

const initialState: Number2State = {
    number: 0,
    users: []
}


//create slice eka wenuwata actions reducers wena wenama hadanawanm witharak mehema 


//actions

//action name should be unique in the application // string eka action.value eka wenawa =>
export const increment2 = createAction<{ name: string; value: number }>(//payload prepare function eka onenm denna methana
    'number2/increment'
);
  
  
   
export const decrement2 = createAction<number>('number2/decrement')

export const getUsers = createAsyncThunk('number2/getUsers', async()=>{
    const res = await fetch('https://jsonplaceholder.typicode.csom/users')
    const data = await res.json();
    if(Array.isArray(data)){
        return data
    }else{
        return {err: 'some rror'}
    }
})


//reducer

const number2Reducer = createReducer(initialState, (builder) => {
    builder.addCase(increment2, (state, action: PayloadAction<{ name: string; value: number }>) => {
      state.number += action.payload.value;
    });
    builder.addCase(decrement2, (state, action: PayloadAction<number>) => {
      state.number -= action.payload;
    });
    builder.addCase(getUsers.fulfilled, (state, action)=>{
        state.users = action.payload
    })
  });

//selectors

const number2Sel = (store:any) => { 
    // normal widihata eka useselector ekak call kraddi (dispatch karaddi) app eke tyena serama selectors run wenawa
    return store.number2.number
}

// const number2Sel = (store: { number2: Number2State }) => store.number2.number;

//createselectpr eken hadana ewa call karaddi adaala selector eka witharai trigger wenne
export const number2Selector = createSelector([number2Sel], (number2)=>{
 return number2
})




export default number2Reducer