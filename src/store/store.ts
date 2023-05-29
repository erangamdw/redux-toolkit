import { configureStore } from "@reduxjs/toolkit";
import numberSliceReducer from "./reducers/numberSlice";
import laptopSliceReducer from "./reducers/laptopSlice";
import postSliceReducer from "./reducers/postSlice";

const store = configureStore({
    reducer:{
        numberSlice: numberSliceReducer,
        laptopSlice: laptopSliceReducer,
        post:postSliceReducer
    }
})

export default store;