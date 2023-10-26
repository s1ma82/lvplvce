import {AuthorLink} from '@components'
import styles from './styles.module.scss'

export default () => {
    return (
        <footer className={styles.footer}>
            <AuthorLink />
            <span className={styles.docs}>
                <div>
                    command menu - <b>Esc</b> or <b>Ctrl + Shift + P</b>
                </div>
                <div>
                    change bookmark - <b>&#8592;</b> or <b>&#8594;</b> | enter bookmark - <b>Ctrl + Enter</b>
                </div>
            </span>
        </footer>
    ) 
}