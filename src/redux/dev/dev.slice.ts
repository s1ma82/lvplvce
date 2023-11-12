import getCustom  from '@futures/getCustom';
import { createSlice } from "@reduxjs/toolkit";
import DevTypes from "@/types/DevTypes";
const initialState: DevTypes = {
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
            if (payload.custom) {
                const newState = {
                    ...payload,
                    custom: getCustom(payload.custom)
                }
                console.log(newState)
                return newState
            }
            return payload

        }
    }
})

export const {setDev} = dev.actions
export default dev.reducer
