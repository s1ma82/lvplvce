import { setModalActive, setDev, setStyle } from '@redux/actions';
import { Dispatch } from "@reduxjs/toolkit"
import { store } from '@redux/store'
import { themes, bookmarkSizes } from '@/data';
import {Sugg} from './Sugg';

const dispatch: Dispatch = store.dispatch

export function suggsFilter(value: string, state: Sugg[]) {
    value = value.substring(1)
    return state
}   

function extraCommand(this: Sugg) {
    const newDev = {
        devMode: true,
        extra: this.name
    }
    dispatch(setDev(newDev))
}


function changeTheme(this: Sugg) {
    dispatch(setStyle(['theme', this.name]))
}

function changeBookmarksSize(this: Sugg) {
    dispatch(setStyle(['bookmarkSize', this.name]))
}



export const suggs: Sugg[] =  [
    {
        name: 'Theme',
        icon: 'chat-fill',
        category: 'theme',
        command: extraCommand,
        extra: themes.map((i: string) => ({
            name: i,
            command: changeTheme
        }))
    }, 
    {
        name: 'Bookmarks size',
        icon: 'qr-code',
        category: 'bookmarks',
        command: extraCommand,
        extra: bookmarkSizes.map((i: number) => ({
            name: i,
            command: changeBookmarksSize
        }))
    }, 
    {
        name: 'Add bookmark',
        icon: 'code-slash',
        category: 'bookmarks',
        command: () => dispatch(setModalActive(true)),
        extra: null
    }, 
]