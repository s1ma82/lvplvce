import { setModalActive, setDev, setStyle } from '@redux/actions';
import { Dispatch } from "@reduxjs/toolkit"
import { store } from '@redux/store'
import { themes, bookmarkSizes } from '@assets';
import {Sugg} from '@/types/Sugg';

const dispatch: Dispatch = store.dispatch

export function suggsFilter(value: string, state: Sugg[]) {
    value = value.substring(1)
    return state
}   

function extraCommand(this: Sugg) {
    const newDev = {
        devMode: true,
        extra: this.name,
        custom: false
    }
    dispatch(setDev(newDev))
}

function customCommand(this: Sugg) {
    const newDev = {
        devMode: true,
        extra: false,
        custom: this.name
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
        name: 'Custom background',
        icon: 'image',
        category: 'styles',
        command: customCommand,
        extra: null
    },
    {
        name: 'Add bookmark',
        icon: 'code-slash',
        category: 'bookmarks',
        command: () => dispatch(setModalActive(true)),
        extra: null
    }, 
]