import {Icon} from '@ui'
import styles from './styles.module.scss'
import { useState } from 'react'

export default ({ status = false,...props }) => {
    const [state, setState] = useState(false)
    const [focus, setFocus] = useState(false)
    const iconName = state && status ? 'x-lg' : 'upload' 
    return (
        <div
            onMouseOver={() => setState(true)}
            onMouseOut={() => setState(false)}
            data-focus={focus} 
            className={`
                ${styles.input} 
                ${status ? styles.active : ''} 
                ${status ? styles.delete : ''}
            `}
        >
            <Icon name={iconName} />
            <input
                type="file"
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                {...props}
            />
        </div>
    ) 
}