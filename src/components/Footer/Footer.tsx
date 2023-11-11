import {useEffect, useState} from 'react'
import { AuthorLink } from '@components'
import styles from './styles.module.scss'

export default () => {
    const [state, setState] = useState<number>(0)
    useEffect(() => {
        setTimeout(() => {
            setState(1)
            setTimeout(() => setState(2), 1000)
        }, 3000)
    }, [])
    return (
        <footer className={styles.footer}>
            <AuthorLink />
            <span
                style={{display: state === 2 ? 'none' : ''}}
                className={[
                    styles.docs,
                    state === 1 ? styles.hidden : ''
                ].join(' ')}
            >
                <div>
                    command menu <br/><b>Esc</b> or <b>Ctrl + Shift + P</b>
                </div>
                <div>
                    change bookmark <br/><b>&#8592;</b> or <b>&#8594;</b>
                </div>
                <div >
                    enter bookmark  <br/><b>Ctrl + Enter</b>
                </div>
            </span>
        </footer>
    ) 
}