import { configureStore } from "@reduxjs/toolkit";
import numberSliceReducer from "./reducers/numberSlice";
import laptopSliceReducer from "./reducers/laptopSlice";

const store = configureStore({
    reducer:{
        numberSlice: numberSliceReducer,
        laptopSlice: laptopSliceReducer
    }
})

export default store;