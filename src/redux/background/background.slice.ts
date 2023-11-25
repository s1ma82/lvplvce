import { createSlice, current } from "@reduxjs/toolkit";
import { useStorage } from "@hooks"
import Background from "@/types/BackgroundTypes";
const initialLocalState: Background = {
    custom: '',
    size: 'max',
    filter: {
        blur: 0,
        brightness: 1,
        saturation: 1,
        opacity: 1
    }
} 

const [localState, setLocalState] = useStorage('background', initialLocalState)
const initialState = localState
export const backgroundSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        setBgCustom: (state, { payload }) => {
            console.log(payload[1])
            state.custom = payload[1]
            setLocalState(state)
        },
        setBgSize: (state, { payload }) => {
            state.size = payload[1]

            setLocalState(state)
        },
        setBgFilter: (state, { payload }) => {
            const [key, value] = payload 
            state.filter[key] = value
            setLocalState(state)
        }
    }
})

export const {setBgCustom, setBgSize, setBgFilter } = backgroundSlice.actions

export default backgroundSlice.reducer