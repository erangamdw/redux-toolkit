import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface laptopState {
    count: number;
    brand: string[]; // Example type for `computers`
}

const initialState: laptopState = {
    count: 10,
    brand: ['Dell', 'Hp']
}

const laptopSlice = createSlice({
    name: "laptop",
    initialState,
    reducers:{
        addLaptop:(state, action: any)=>{ //if i remove the '()' dont need to spread the other values to the state.
            state.count += action.payload
        },
        removeLaptop:(state, action: any)=>({
            ...state,
            count: state.count - action.payload,
        })
    }
}
)

export const {addLaptop, removeLaptop} = laptopSlice.actions;
export default laptopSlice.reducer