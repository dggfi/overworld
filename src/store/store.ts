import { configureStore } from '@reduxjs/toolkit';
import controlsSlice from './controls';
import widgetSlice from './widgets';
import usersSlice from './users';
import settingsSlice from './settings';

const store = configureStore({ 
    reducer: {
        controls: controlsSlice.reducer,
        widgets: widgetSlice.reducer,
        users: usersSlice.reducer,
        settings: settingsSlice.reducer
    }
});

export default store;