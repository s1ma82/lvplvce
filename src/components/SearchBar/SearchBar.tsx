import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Icon } from '@ui'
import {setDev} from '@redux/actions'
import { suggs as suggsInit} from '@futures'
import { Sugg} from '@futures/searchBar/Sugg'
import RootState from '@/types/state'

import useHandleEvents from './useHandleEvents'
import SuggsList from './SuggsList'
import styles from './styles.module.scss'

export default ({ }) => {
    const [value, setValue] = useState('')
    const [activeSugg, setActiveSugg] = useState([1, 1])
    const [suggs, setSuggs] = useState<[Sugg[], [] | Sugg[]]>([suggsInit, []])
    const searchBar = useRef<HTMLElement>()

    const {dev, modal} = useSelector((state: RootState) => state )
    const dispatch = useDispatch()


    const eventData = {
        setValue,
        value,
        activeSugg,
        setActiveSugg,
        dev,
        modal,
        searchBar,
        suggs
    }

    const {
        breakArrows,
        handleSubmit,
        focusBarEvent,
        commandHandler,
        toggleModMenu,
        modMemuNavigation
    } = useHandleEvents(eventData)
    
    useEffect(() => {
        // chrome.tabs.executeScript({
        //     code: `document.querySelector(${styles.searchBar}).focus();`
        // });
        
    }, [])
    useEffect(() => {
        if (!dev.devMode) return
        
        if (!dev.extra) {
            const newSuggs = suggsInit.filter((i) => {
                if(i.name.toLowerCase().includes(value.toLowerCase())) return i
            })
            setSuggs([newSuggs, suggs[1]])
            setActiveSugg([1, activeSugg[1]])
        } else {
            const newExtraSuggs = suggs[0][activeSugg[0] - 1].extra?.filter(i => {
                if(i.name.toLowerCase().includes(value.toLocaleLowerCase())) return i
            })
            setSuggs([suggs[0], newExtraSuggs])
            setActiveSugg([activeSugg[0], 1])
        }

    }, [value, dev.devMode, dev.extra])

    useEffect(() => {
        const sugg = suggs[0][activeSugg[0] - 1]
        const isExtra = dev.extra && dev.extra === sugg.name
        
        if (!isExtra) return
        const filtered = sugg.extra.filter(extra => {
            if(extra.name.toLowerCase().includes(value.toLowerCase())) return extra
        })
        setValue('')
        setSuggs([suggs[0], filtered])
    }, [dev.extra])


    useEffect(() => { 
        focusBarEvent.add()
        if(modal.status) dispatch(setDev(false))
        return () => focusBarEvent.remove()
    }, [modal.status])
    
    // input_value handler

    useEffect(() => {
        toggleModMenu.add()
        if(!dev.devMode) setActiveSugg([1, 1])
        return () => toggleModMenu.remove()
        
    }, [dev.devMode, dev.extra, modal.status])

    useEffect(() => {
        modMemuNavigation.add()
        return () => modMemuNavigation.remove()
    }, [activeSugg])
   
    
    return (<>
        <form
            className={[
                styles.form,
                dev.devMode ? styles.devMode : ''
            ].join(' ')}
            onSubmit={handleSubmit}
        >
            <div id="content" className={styles.content}>
                <div className={styles.input_container}>
                    {dev.devMode ? <Icon name="search"/> : null}
                    <Input
                        ref={searchBar}
                        onKeyDown={breakArrows}
                        onChange={(e: any) => setValue(e.target.value)}
                        className={styles.searchBar}
                        id="searchBar"
                        value={value}
                        autoFocus
		            	autoComplete="off"
		            	name="searchBar"
		            	placeholder="any desire"
		            	type="text"
                    />
                </div>
                <SuggsList
                    {...{ value, suggs, setSuggs, activeSugg, setActiveSugg, commandHandler }} />
            </div>
        </form>
        <div
            className={`
                ${styles.devMode_placeholder} 
                ${dev.devMode ? styles.active : ''}
            `}
        />
    </>)  
}