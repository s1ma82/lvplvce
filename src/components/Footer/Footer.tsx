import {useEffect, useState} from 'react'
import { AuthorLink } from '@components'
import styles from './styles.module.scss'

export default () => {
    const [state, setState] = useState<number>(0)
    useEffect(() => {
        setTimeout(() => {
            setState(1)
        }, 3000)
    }, [])
    return (
        <>
            <AuthorLink />
            <div
                className={[
                    styles.docs,
                    state === 1 ? styles.hidden : ''
                ].join(' ')}
            >
                <div>
                    command menu <br/><b>Esc</b> or <b>Ctrl + Shift + P</b>
                </div>
                <div>
                    change bookmark <br/>
                    <b className={styles.arrow}>&#8656;</b>
                    {' or '}
                    <b className={styles.arrow}>&#8658;</b>
                </div>
                <div >
                    enter bookmark <br /><b>Ctrl + Enter</b>
                </div>
            </div>
        </>
    ) 
}