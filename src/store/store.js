import { configureStore } from "@reduxjs/toolkit";
// almost same configurations of store as we did in the previous examples 
const store = configureStore({
    reducer: {
        // Here you can add your reducers
    }
});

export default store;