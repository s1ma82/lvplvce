import { createSlice } from "@reduxjs/toolkit";

const initialState = true

export const extension = createSlice({
    name: 'extension',
    initialState,
    reducers: {
        setExtension: (state, {payload}) => payload
    }
})

export const { setExtension } = extension.actions 
export default extension.reducer
