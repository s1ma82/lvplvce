import { customText } from './../../assets/customText';
import { createSlice, current } from "@reduxjs/toolkit";
import { useStorage } from "@hooks"
import CustomStylesTypes from "@/types/CustomStylesTypes";
import { customText } from "@assets";

const initialLocalState: CustomStylesTypes = {
    theme: 'arch',
    bookmarkSize: 'normal',
    fontSize: 'normal',
    hiddenElements: [],
    customText
}

const [localState, setLocalState] = useStorage('customStyles', initialLocalState)

const initialState = localState

export const customStyles = createSlice({
    name: 'customStyles',
    initialState,
    reducers: {
        setStyle: (state, { payload }) => {
            const [key, value] = payload 
            state[key] = value
            setLocalState(current(state))
        },
        setCustomText: (state, { payload }) => {
            const [key, value] = payload
            state.customText[key] = value
            setLocalState(current(state))
        },
        toggleHiding: (state, { payload }) => {
            if (!Array.isArray(state.hiddenElements)) {
                state.hiddenElements = [payload]
                setLocalState(current(state))
                return
            }
            if (!state.hiddenElements.includes(payload)) {
                state.hiddenElements.push(payload)
            } else {
                const arr = state.hiddenElements.filter(i => i !== payload)
                state.hiddenElements = arr
            }
            setLocalState(current(state))
        },
    }
})

export const { setStyle, toggleHiding, setCustomText } = customStyles.actions 
export default customStyles.reducer
