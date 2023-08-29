import { setModalActive } from "@redux/modal/modal.slice"
import {store} from '@redux/store'

export default () => {
    const { modal } = store.getState()
    const state = modal.status
    const setFalse = () => store.dispatch(setModalActive(false))

    const modalEvent = {
        event: e => {
            if (!state) return
            if (e.keyCode === 27 || !e.target.closest("#modal")) setFalse() 
            
        },
        add: () => {
            window.addEventListener('keydown', modalEvent.event),
            window.addEventListener('mousedown', modalEvent.event)
        },
        remove: () => {
            window.removeEventListener('keydown', modalEvent.event) 
            window.removeEventListener('mousedown', modalEvent.event )
        } 
    }
    return modalEvent
}