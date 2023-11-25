import { FormEvent } from 'react';
import isUrl from 'is-url';

import { store } from '@redux/store' 
import {setDev, setStyle} from '@redux/actions'
import { googleSearch, getCustom } from '@futures'

import { EventData } from "./props"
import styles from './styles.module.scss'

export default function useHandleEvents(eventData: EventData) {
    const {dispatch} = store
    const {
        dev,
        setValue,
        value,
        activeSugg,
        modal,
        searchBar,
        suggs,
        setActiveSugg
    } = eventData

    
    
    function setCustomStyle(value: string) {
        const key = dev.custom 
        if (key === 'customBackground') {
            if (value.length === 0) return dispatch(setStyle([key, '']))
            const newStyle = [key, value]
            dispatch(setStyle(newStyle))
        }
    }

    function getSugg() {
        if(dev.devMode) return suggs[1][activeSugg[1] - 1]
        return suggs[0][activeSugg[0] - 1]
    }

    const breakArrows = (e: KeyboardEvent) => {
        const { key } = e
        const arrows = [
            'ArrowUp',  
            'ArrowDown',
            'ArrowLeft',
            'ArrowRight',
        ]
        if (arrows.includes(key)) e.preventDefault()
    }

    function commandHandler() {
        if (dev.devMode && dev.value === '') {
            const newDev = {value: value === '' ? 'null' : value}
            dispatch(setDev(newDev))
            return
        }
        const sugg = getSugg()
        if (!sugg) return
        sugg.command()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (dev.devMode === false) return googleSearch({ value })
        commandHandler()
    }
    
    const focusBarEvent = {
        event: (e: KeyboardEvent) => {
            if (e.key === 'Escape' || e.key === 'Tab' && !modal.status) {
                e.preventDefault()
                if (!searchBar.current) return
                setValue('')
                searchBar.current.focus()
            }
        },
        add: () => window.addEventListener('keydown', focusBarEvent.event),
        remove: () => window.removeEventListener('keydown', focusBarEvent.event) 
    }

    const modMemuNavigation = {

        event: (e: KeyboardEvent) => {
            const { key } = e

            if (dev.devMode === false ) return

            let arrow = null
            
            if(key === 'ArrowDown') arrow = true
            if(key === 'ArrowUp')   arrow = false 

            if (arrow === null) return
            if (dev.devMode) {
                let newStatus = arrow ? activeSugg[1] + 1 : activeSugg[1] - 1
                const breakPoint = suggs[1].length + 1
                const last = breakPoint - 1 

                if (newStatus === breakPoint) newStatus = 1
                if (newStatus === 0) newStatus = last

                return setActiveSugg([activeSugg[0], newStatus])
            }

            const breakPoint = suggs[0].length + 1
            const last = breakPoint - 1 

            let newStatus = arrow ? activeSugg[0] + 1 : activeSugg[0] - 1

            if (newStatus === breakPoint) newStatus = 1
            
            if (newStatus === 0) newStatus = last 
            setActiveSugg([newStatus, activeSugg[1]])
        },
        add: () => window.addEventListener('keydown', modMemuNavigation.event),
        remove: () => window.removeEventListener('keydown', modMemuNavigation.event) 
    }
    
    const toggleModMenu = {
        event: (e: any) => {
            function getTrigger() {
                if (e.type === 'click') return {
                    type: 'click',
                    value:
                        e.target.closest(`.${styles.item}`) ||
                        e.target.closest(`#content`)
                }

                return { value: e.key === 'Escape' || (e.ctrlKey && e.shiftKey && e.key === 'P') }
            }
            
            const modMenuTrigger = getTrigger()
            if (modMenuTrigger.value) e.preventDefault()
            const click = modMenuTrigger.type === 'click'

            if (!click && !modMenuTrigger.value) return

            if(!modal.status) searchBar.current?.focus()
            
            if(!click && dev.extra) return dispatch(setDev({extra: false, value: false}))
            if (!click && dev.devMode) return dispatch(setDev({ devMode: '', value: false }))
            
            if (
                click && !modMenuTrigger.value ||
                !click && dev.devMode === ''
            ) {
                return dispatch(setDev(false))
            }
            
            
            if (dev.devMode === false && !modal.status && !click) {
                setValue('')
                return dispatch(setDev({ devMode: ''}))
            }
            
        },
        add: () => {
            window.addEventListener('keydown', toggleModMenu.event)
            window.addEventListener('click', toggleModMenu.event)
        },
        remove: () => {
            window.removeEventListener('keydown', toggleModMenu.event)
            window.removeEventListener('click', toggleModMenu.event)
        }
    }
    
    return {
        toggleModMenu,
        handleSubmit,
        breakArrows,
        focusBarEvent,
        commandHandler,
        modMemuNavigation,
        setCustomStyle
    }   
}