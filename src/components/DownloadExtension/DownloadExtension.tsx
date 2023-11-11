import { useSelector } from 'react-redux'
import { Icon } from '@ui'
import RootState from '@/types/state'
import styles from './styles.module.scss'
import { useState } from 'react'

export default () => {
    const [state, setState] = useState(true)
    const extension = useSelector((state: RootState) => state.extension)
    return !extension ? (
        <a  
            title={state ? 'хочешь узнать как установить? ткни ПКМ' : 'хочешь скачать? тоже ткни ПКМ'}
            onContextMenu={e => {
                e.preventDefault()
                setState(!state)
            }}
            onClick={() => {
                setTimeout(() => setState(!state), 1000)
            }}    
            href={state ? window.EXTENSION_FILE_LINK : 'https://github.com/s1ma82/lvplvce'}
            download={state}
            className={styles.uploadExtension}
        >
            {state ? <>
                <Icon name='download' /> download extension
            </> : <>проблемы с установкой?</>}
        </a>
    ) : null 
}