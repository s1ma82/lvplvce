import { FormEvent } from 'react';
import { store } from '@redux/store' 
import {setDev} from '@redux/actions'
import { googleSearch,} from '@futures'
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
    

    function getSugg() {
        if (dev.extra) {
            return suggs[1][activeSugg[1] - 1]
        }
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
        const sugg = getSugg()
        if (!sugg) return
        sugg.command()
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()

        if (!dev.devMode) return googleSearch({ value })
        commandHandler()
    }
    
    const focusBarEvent = {
        event: (e: KeyboardEvent) => {
            if (e.key === 'Tab' && !modal.status) {
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

            if (!dev.devMode) return

            let arrow = null
            
            if(key === 'ArrowDown') arrow = true
            if(key === 'ArrowUp')   arrow = false 

            if (arrow === null) return
            if (dev.extra) {
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
            const click = modMenuTrigger.type === 'click'
            if(!modal.status) searchBar.current?.focus()
            if (!click && !modMenuTrigger.value) return

            if (
                click && !modMenuTrigger.value ||
                !click && dev.devMode && !dev.extra
            ) return dispatch(setDev(false))
            
            
            if (!dev.devMode && !modal.status && !click || dev.extra && !click) {
                if (dev.extra && !click) setValue('')
                return dispatch(setDev({ devMode: true, extra: false }))
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
        modMemuNavigation
    }   
}