import { createSlice, current } from "@reduxjs/toolkit";
import DevTypes from "@/types/DevTypes";

const initialState: DevTypes = {
    devMode: false,
    extra: false,
    value: false 
}


export const dev = createSlice({
    name: 'dev',
    initialState,
    reducers: {
        setDev: (state, { payload }) => {
            if (typeof payload === 'boolean' && !payload) return initialState
            if (Object.keys(state) !== Object.keys(payload)) {
                const copy = current(state)
                const newState = { ...copy, ...payload }
                return newState
            }
            return payload

        }
    }
})

export const {setDev} = dev.actions
export default dev.reducer
