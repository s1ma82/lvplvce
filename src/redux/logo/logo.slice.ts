import {useStorage} from '@hooks'
import { createSlice } from "@reduxjs/toolkit";

const initialLocalState = {
    custom: ''
}
const [localState, setLocalState] = useStorage('logo', initialLocalState)
const initialState = localState
export const logo = createSlice({
    name: 'logo',
    initialState,
    reducers: {
        setLogo: (state, { payload }) => {
            state.custom = payload
            setLocalState(state)
        }
    }
})

export const { setLogo } = logo.actions 
export default logo.reducer
