import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import { nanoid } from '@reduxjs/toolkit'
//nanoid use to generate a id

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
        //if we want to structure the object when we parsing the values, we can destrucure the reducer to two partsand make prepare 
        // the reducer action using the prepare and return that object to the payload
        addLaptop: {
            reducer: (state, action: PayloadAction<LaptopState>) => {
                state.push(action.payload);
            },
            prepare:(price, cpu, gen, ram, hdd)=>{
                return{
                    payload:{
                        id: nanoid(),
                        price: parseInt(price || "0"),
                        specs: {
                        cpu: cpu ?? "",
                        gen: parseInt(gen || "0"), // Parse gen as an integer
                        ram: ram ?? "",
                        hdd: hdd ?? "",
                    }
                }
            }
        }
        // removeLaptop:(state, action: any)=>({
        //     ...state,
        //     count: state.count - action.payload,
        // })
    }
}}
)

//selectors
export const laptopSliceSelector = (store: any)=>store.laptopSlice

export const {addLaptop, } = laptopSlice.actions;
export default laptopSlice.reducer