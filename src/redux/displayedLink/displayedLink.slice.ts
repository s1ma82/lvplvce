import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    value: '',
    hoverValue: ''
}

export const searchBar = createSlice({
    name: 'displayedLink',
    initialState,
    reducers: {
        setDisplayedLink: (state, { payload }) => {
            if (typeof payload === 'string') state.value = payload 
            if (payload.type === 'hover') state.hoverValue = payload.data
        } 
    }
})

export const { setDisplayedLink } = searchBar.actions 
export default searchBar.reducer
