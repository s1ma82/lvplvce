import {useEffect, useState} from 'react'
import { AuthorLink } from '@components'
import styles from './styles.module.scss'

export default () => {
    const [state, setState] = useState<boolean>(false)
    useEffect(() => {
        setTimeout(() => setState(true), 5000)
    }, [])
    return (
        <footer className={styles.footer}>
            <AuthorLink />
            <span
                className={[
                    styles.docs,
                    state ? styles.hidden : ''
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