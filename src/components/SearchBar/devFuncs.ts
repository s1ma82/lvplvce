import { Dispatch } from "@reduxjs/toolkit"
import { store } from "@redux/store"
import { setBgCustom, setBgFilter, setBgSize, setCustomText, setDev, setStyle } from "@redux/actions"


const dispatch: Dispatch = store.dispatch

const getBgAction = (id: string) =>{
    switch (id) {
        case 'custom': return setBgCustom
        case 'size': return setBgSize
        case 'filter': return setBgFilter
        default: return null
    }
}
export const devFuncs = (dev) => {

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
        
        default: return
    }
    dispatch(setDev(false))
} 