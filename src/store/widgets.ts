import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Widget, Widgets } from '../../types/user-space';

interface WidgetStoreInterface {
    widgets: Widgets,
}

const initialState: WidgetStoreInterface = {
    widgets: {},
}

const widgetSlice = createSlice({
    name: 'widgets',
    initialState,
    reducers: {
        setWidget: (state, action: PayloadAction<{ kind: string, widget: Widget }>) => { state.widgets[action.payload.kind] = action.payload.widget },
    },
    selectors: {
        getWidget: (state, payload) => state.widgets[payload]
    }
})

export const {
    setWidget
} = widgetSlice.actions;

export const {
    getWidget
} = widgetSlice.selectors;

export default widgetSlice;