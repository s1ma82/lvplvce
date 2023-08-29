import { createSlice } from "@reduxjs/toolkit";
import { useStorage } from "@hooks"

import { isIndividual } from "./isIndividual"
import {increment, decrement} from './moveBookmarkFuncs'


const [localState, setLocalState] = useStorage('bookmarks', [])
const initialState = localState

export const bookmarksSlice = createSlice({
    name: 'bookmarks',
    initialState,
    reducers: {
        addBookmark: (state, { payload }) => {
            if (payload.url.length <= 0 || !isIndividual(payload.url)) return 

            payload.id = state.length + 1
            
            const newData = [...state, payload]

            newData.sort((a, b) => a.id < b.id)

            setLocalState(newData)
            return newData
        },

        editBookmark: (state, { payload }) => {
            const newState = state.map(i => {
                if (i.id === payload.id) {
                    return payload
                }
                return i
            })
            setLocalState(newState)
            return newState
        },

        removeBookmark: (state, { payload }) => {

            const deleteItem = state.findIndex(i => i.url === payload)

            state.splice(deleteItem, 1)
            state.forEach((i, index) => {
                i.id = index + 1
                return i
            })

            setLocalState(state)
            
        },

        moveBookmark: (state, { payload }) => {
            if (!payload.destination) return
            
            const oldPlace = +payload.draggableId
            const newPlace = payload.destination.index 

            if (oldPlace === newPlace) return
            
            const moveItem = { ...state[oldPlace - 1] }
            const deleteItem = state.findIndex(i => i.id === oldPlace) 

            const data = {
                state,
                oldPlace,
                newPlace,
                moveItem,
                deleteItem

            }
            
            if (oldPlace > newPlace) increment(data)
            if (oldPlace < newPlace) decrement(data)
            setLocalState(state)
        }
    }
})

export const { addBookmark, removeBookmark, moveBookmark, editBookmark } = bookmarksSlice.actions

export default bookmarksSlice.reducer