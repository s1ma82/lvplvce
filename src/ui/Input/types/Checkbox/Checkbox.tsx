import {useEffect, useState} from 'react'
import Props from './props'
import {Icon} from '@/ui'
import styles from './styles.module.scss'

export default ({children, id, setValue, getValue, tabIndex}: Props) => {
    
    const [state, setState] = useState<boolean>(getValue())

    function handleEvent() {
        setValue(!getValue())
        setState(!state)
    }
    return (
        <div
            tabIndex={tabIndex}
            onKeyDown={e => e.code === 'Enter' ? handleEvent()  : {}}
            onClick={handleEvent}    
            className={styles.container}
        >
            {children}
            <div
                id={id}
                className={`
                    ${styles.checkbox}
                    ${state ? styles.checkbox_active : ''}
                `}
            >
                <div
                    className={`
                        ${styles.pointer}
                        ${styles.pointer_active}
                    `}
                >
                    <span>
                        <Icon name="check-lg" size={20} color='sub-alt'/>
                    </span>
                </div>
            </div>
        </div>
    ) 
}