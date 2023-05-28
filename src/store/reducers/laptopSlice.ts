import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface LaptopState {
    id: any;
    price: number;
    specs: {
      cpu: string;
      gen: number;
      ram: string;
      hdd: string;
    };
  }

const initialState: LaptopState[] = [
    {
        id: 1,
        price: 250000,
        specs:{
            cpu: 'i3',
            gen: 13,
            ram:'8GB DDR4',
            hdd:'1TB',
        }
    },
]



const laptopSlice = createSlice({
    name: "laptop",
    initialState,
    reducers:{
        addLaptop: (state, action: PayloadAction<LaptopState>) => {
            state.push(action.payload);
        },
        // removeLaptop:(state, action: any)=>({
        //     ...state,
        //     count: state.count - action.payload,
        // })
    }
}
)

//selectors
export const laptopSliceSelector = (store: any)=>store.laptopSlice

export const {addLaptop, } = laptopSlice.actions;
export default laptopSlice.reducer