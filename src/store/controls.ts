import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ControlsState {
    activeControlsId: string | null // UUID for Widget
}

const initialState: ControlsState = {
    activeControlsId: null
}

const controlsSlice = createSlice({
    name: 'controls',
    initialState,
    reducers: {
        setActiveControlsId: (state, action: PayloadAction<string | null>) => { state.activeControlsId = action.payload }
    },
    selectors: {
        getActiveControlsId: (state) => state.activeControlsId
    }
})

export const {
    setActiveControlsId
} = controlsSlice.actions;

export const {
    getActiveControlsId
} = controlsSlice.selectors;

export default controlsSlice;