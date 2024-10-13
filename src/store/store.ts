import { configureStore } from '@reduxjs/toolkit';
import exampleSlice from './example';

const store = configureStore({ 
    reducer: {
        example: exampleSlice.reducer
    }
});

export default store;