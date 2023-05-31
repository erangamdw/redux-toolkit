import { configureStore } from "@reduxjs/toolkit";
import numberSliceReducer from "./reducers/numberSlice";
import laptopSliceReducer from "./reducers/laptopSlice";
import postSliceReducer from "./reducers/postSlice";
import number2Reducer from "./reducers/number2Slice";

const store = configureStore({
    reducer:{
        numberSlice: numberSliceReducer,
        laptopSlice: laptopSliceReducer,
        post:postSliceReducer,
        number2: number2Reducer
    }
})

export default store;