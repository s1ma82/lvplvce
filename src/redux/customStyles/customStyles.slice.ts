import { createSlice, current } from "@reduxjs/toolkit";
import { useStorage } from "@hooks"
import CustomStylesTypes from "@/types/CustomStylesTypes";

const initialLocalState: CustomStylesTypes = {
    theme: 'arch',
    bookmarkSize: 'normal',
    customBackground: '',
    fontSize: 'normal'
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
        }
    }
})

export const { setStyle } = customStyles.actions 
export default customStyles.reducer
