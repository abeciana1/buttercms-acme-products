import { createSlice } from "@reduxjs/toolkit";

const instanceInitialState = {
    display: false,
    name: '',
    data: null
}

const instanceSlice = createSlice({
    name: 'instance',
    initialState: instanceInitialState,
    reducers: {
        setInstance: (state, action) => {
            state.display = true
            state.name = action.payload.name
            state.data = action.payload.data
        },
        clearInstance: (state) => {
            state.display = false
            state.name = ''
            state.data = null
        }
    }
})

export const { setInstance, clearInstance } = instanceSlice.actions

export default instanceSlice.reducer