import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    devMode: false,
    extra: false,
    custom: false
}

export const dev = createSlice({
    name: 'dev',
    initialState,
    reducers: {
        setDev: (state, { payload }) => {
            if (typeof payload === 'boolean' && !payload) return initialState
            console.log(payload)
            return payload

        }
    }
})

export const {setDev} = dev.actions
export default dev.reducer
