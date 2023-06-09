import {createSlice, PayloadAction} from "@reduxjs/toolkit";


interface NumberState {
    number: number;
    computers: string[]; // Example type for `computers`
}

const initialState: NumberState = {
    number: 0,
    computers: []
}

//if want can separate reducer by common function which returns a fuction from a fucntion
const reducerGen = (key = "number", operator = "+") =>{
    if(operator === "+"){
        return (state: any, action: any) =>{
            state[key] += action.payload;
        }
    } else if(operator === "-"){
        return (state: any, action: any) =>{
            state[key] -= action.payload;
        }
    }
}
const numberSlice = createSlice({
    name: "number",
    initialState,
    reducers: {
        increment: (state, action: PayloadAction<number>) => ({ //reducer action names should be unique in the entire app
            ...state,
            number: state.number + action.payload
        }),
        // increment: reducerGen();
        decrement: (state, action : PayloadAction<number>)=>{ //if i remove the '()' dont need to spread the other values to the state.
            state.number -= action.payload
        }
        // decrement: reducerGen("number", "-")
    }
})

export const numberSliceSelector = (store:any) => store.numberSlice // this can be accessable whenewer in the app 

//destructure actions from the above slice
export const {increment, decrement} = numberSlice.actions

//export default the main reducer, this will be parse to the store, this contain all the reducers above (this will generated by the redux toolkit)
export default numberSlice.reducer;