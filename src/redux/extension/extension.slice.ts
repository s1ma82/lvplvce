import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    status: true,
    version: null
}

export const extension = createSlice({
    name: 'extension',
    initialState,
    reducers: {
        setExtension: (state, { payload }) => {
            const [status, version] = payload
            return {status, version}
        }
    }
})

export const { setExtension } = extension.actions 
export default extension.reducer
