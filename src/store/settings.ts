import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SettingsState {
    rootSizeMultiplier: number
}

const initialState: SettingsState = {
    rootSizeMultiplier: 1
}

const settingsSlice = createSlice({
    name: 'settings',
    initialState,
    reducers: {
        setRootSizeMultipler: (state, action: PayloadAction<number>) => {
            state.rootSizeMultiplier = action.payload
        }
    },
    selectors: {
        getRootSizeMultiplier: (state) => state.rootSizeMultiplier
    }
})

export const {
    setRootSizeMultipler
} = settingsSlice.actions;

export const {
    getRootSizeMultiplier
} = settingsSlice.selectors;

export default settingsSlice;