import { createSlice, PayloadAction } from "@reduxjs/toolkit";


interface ExampleState {
    message: string
}

const initialState: ExampleState = {
    message: "Hello, world!"
}

const exampleSlice = createSlice({
    name: 'example',
    initialState,
    reducers: {
        setMessage: (state, action: PayloadAction<string>) => {
            state.message = action.payload
        },
        
    },
    selectors: {
        getMessage: (state) => state.message
    }
})

export const {
    setMessage
} = exampleSlice.actions;

export const {
    getMessage
} = exampleSlice.selectors;

export default exampleSlice;