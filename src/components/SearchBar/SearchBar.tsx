import { useEffect, useState, useRef} from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input, Icon } from '@ui'
import {setDev, setStyle} from '@redux/actions'
import { suggs as suggsInit} from '@futures'
import RootState from '@/types/state'
import { Sugg } from '@/types/Sugg'

import useHandleEvents from './useHandleEvents'
import DevMenu from './DevMenu'

import { SuggsState } from './props'
import styles from './styles.module.scss'

export default ({ }) => {
    const [value, setValue] = useState('')
    const [activeSugg, setActiveSugg] = useState([1, 1])
    const [suggs, setSuggs] = useState<SuggsState>([suggsInit, []])
    const searchBar = useRef<HTMLInputElement>()

    const dev = useSelector((state: RootState) => state.dev )
    const modal = useSelector((state: RootState) =>  state.modal )
    const customStyles = useSelector((state: RootState) =>  state.customStyles )
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
        modMemuNavigation,
        setCustomStyle
    } = useHandleEvents(eventData)
    


    useEffect(() => {
        if (!dev.custom) return 
        if (customStyles[dev.custom] && searchBar.current) {
            setValue(customStyles[dev.custom])
        }
    }, [dev.custom])
    useEffect(() => {
        if (!dev.devMode) return
        
        if (!dev.extra) {
            const newSuggs = suggsInit.filter((i: Sugg) => {
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
        
        if (!isExtra || !sugg.extra) return

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
        setValue('')
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
                <div className={[
                    styles.input_container,
                    !dev.custom ? styles.noborder : ''
                ].join(' ')}>
                    {dev.devMode && !dev.custom ? <Icon name="search" /> : null}
                    <Input
                        ref={searchBar}
                        onKeyDown={breakArrows}
                        onChange={(e) => setValue(e.target.value)}
                        className={[
                            styles.searchBar,
                        ].join(' ')}
                        id="searchBar"
                        value={value}
                        autoFocus
		            	autoComplete="off"
		            	name="searchBar"
		            	placeholder={dev.custom || "any desire"}
		            	type="text"
                    />
                </div>
                <DevMenu
                    {...{ value, suggs, setSuggs, activeSugg, setActiveSugg, commandHandler }} />
            </div>
        </form>
        <div
            className={[
                styles.devMode_placeholder,
                dev.devMode ? styles.active : '',
            ].join(' ')}
        />
    </>)  
}
