import { setModalActive, setDev, toggleHiding,  } from '@redux/actions';
import { Dispatch } from "@reduxjs/toolkit"
import { store } from '@redux/store'
import { themes, bookmarkSizes, elements, background, customText} from '@assets';
import {Extra, Sugg} from '@/types/Sugg';

const dispatch: Dispatch = store.dispatch

export function suggsFilter(value: string, state: Sugg[]) {
    value = value.substring(1)
    return state
}   

function toggleHiddenElement(this: Sugg) {
    dispatch(toggleHiding(this.name))
}

const changeBg = {
    filter: function (this: Extra) {
        dispatch(setDev({extra: this.name, value: ''}))
    },
    size: function (this: Sugg) {
        dispatch(setDev({value: this.name}))
    }
}
function changeCustomText(this: Extra) {
    dispatch(setDev({extra: this.name, value: ''}))
} 

function valueCommand(this: Sugg) {
    const {id, category} = this
    dispatch(setDev({devMode: `${category}:${id}`, value: ''}))
}

function extraCommand(this: Sugg) {
    const { id, category } = this
    
    dispatch(setDev({devMode: `${category}:${id}`}))
}
function getMapExtra(arr: any[], command: Function): Extra[]  {

    return arr.map(i => ({
        name: i,
        command: command
    }))
}

function defaultCommand(this: Extra) {
    dispatch(setDev({value: this.name}))
}
export const suggs: Sugg[] = [
    {
        name: 'Add bookmark',
        id: 'addBookmark',
        icon: 'bookmark-plus-fill',
        category: 'bookmarks',
        command: () => dispatch(setModalActive(true)),
    },
    {
        name: 'Bookmark size',
        icon: 'bookmark',
        id: 'bookmarkSize',
        category: 'customStyles',
        command: extraCommand,
        extra: getMapExtra(bookmarkSizes, changeBg.size)
    },
    {
        name: 'Background filter',
        id: 'filter',
        icon: 'image',
        category: 'background',
        command: extraCommand,
        extra: getMapExtra(Object.keys(background.filter), changeBg.filter)
    },
    {
        name: 'Background size',
        id: 'size',
        icon: 'image',
        category: 'background',
        command: extraCommand,
        extra: getMapExtra(background.size, changeBg.size)
    },
    {
        name: 'Custom background',
        icon: 'image',
        id: 'custom',
        category: 'background',
        command: valueCommand,
    },
    {
        name: 'Hidden elements',
        id: 'hiddenElements',
        icon: 'list',
        category: 'customStyles',
        command: extraCommand,
        extra: getMapExtra(elements, toggleHiddenElement)
    },
    {
        name: 'Theme',
        id: 'theme',
        icon: 'palette-fill',
        category: 'customStyles',
        command: extraCommand,
        extra: getMapExtra(themes, defaultCommand)
    },
    {
        name: 'Custom text',
        id: 'customText',
        icon: 'globe',
        category: 'customStyles',
        command: extraCommand,
        extra: getMapExtra(Object.keys(customText), changeCustomText)
    },
    {
        name: 'Custom logo',
        id: 'custom',
        icon: 'image',
        category: 'logo',
        command: valueCommand,
    }
].sort((a, b) => {
    return a.category.localeCompare(b.category)
})