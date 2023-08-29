import { createSlice, current } from "@reduxjs/toolkit";
import { useStorage } from "@hooks"


const initialLocalState = {
    theme: 'arch',
    bookmarkSize: 'normal',
}

const [localState, setLocalState] = useStorage('customStyles', initialLocalState)

const initialState = localState


export const customStyles = createSlice({
    name: 'customStyles',
    initialState,
    reducers: {
        setStyle: (state, {payload}) => {
            const [key, value] = payload 
            state[key] = value
            console.log(current(state))
            setLocalState(current(state))
        }
    }
})

export const { setStyle } = customStyles.actions 
export default customStyles.reducer
