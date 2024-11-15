import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LocalUser, NetworkUser, Users } from '../../types/user-space';
import { v4 as uuidv4 } from 'uuid';

interface UserState {
    local: LocalUser,
    users: Users
}

const initialState: UserState = {
    local: {
        id: uuidv4(),
        name: 'New Soul',
        password: null,
        lastServer: null,
        authoredWidgets: [],
        sharedWidgets: [],
        characters: []
    },
    users: {}
}

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
        setLocal: (state, action: PayloadAction<LocalUser>) => {
            state.local = action.payload
        },
        setUser: (state, action: PayloadAction<{ id: string, user: NetworkUser }>) => {
            state.users[action.payload.id] = action.payload.user
        }
    },
    selectors: {
        getLocal: (state, action) => state.local,
        getUser: (state, action: PayloadAction<string>) => {
            return state.users[action.payload]
        }
    }
})

export const {
    setLocal, setUser
} = usersSlice.actions;

export const {
    getLocal, getUser
} = usersSlice.selectors;

export default usersSlice;