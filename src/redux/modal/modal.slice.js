import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    type: 'default',
    status: false,
    data: null
}



export const modalSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        setModalActive: (state, { payload }) => {
            if (typeof payload === 'boolean') return {type: 'default', status: payload, data: null}
            if (typeof payload === 'object' && payload.type === 'editBookmark') {
                return { type: payload.type, status: true, data: payload.data }
            }
        },
        
    }
})

export const { setModalActive } = modalSlice.actions

export default modalSlice.reducer