import { Dispatch } from "@reduxjs/toolkit"
import { store } from "@redux/store"
import { setBgCustom, setBgFilter, setBgSize, setCustomText, setDev, setStyle, setLogo } from "@redux/actions"
import DevTypes from "@/types/DevTypes"


const dispatch: Dispatch = store.dispatch

const getBgAction = (id: string) =>{
    switch (id) {
        case 'custom': return setBgCustom
        case 'size': return setBgSize
        case 'filter': return setBgFilter
        default: return null
    }
}
export const devFuncs = (dev: DevTypes) => {

    if (!dev.devMode || !dev.value ) return
    
    const [category, id] = dev.devMode.split(':')
    
    switch (category) {
        
        case 'customStyles':
            if (id === 'customText') {
                dispatch(setCustomText([dev.extra, dev.value]))
                break
            }
            dispatch(setStyle([id, dev.value]))  
            break
        case 'background':
            const action = getBgAction(id)
            if (action === null) break
            dispatch(action([dev.extra, dev.value]))
            break
        case 'logo': 
            dispatch(setLogo(dev.value))
            location.reload()
            break
        
        default: return
    }
    dispatch(setDev(false))
} 