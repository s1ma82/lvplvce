import {AuthorLink} from '@components'
import styles from './styles.module.scss'

export default () => {
    return (
        <footer className={styles.footer}>
            <AuthorLink />
            <span className={styles.docs}>
                command menu - <b>Esc</b> or <b>Ctrl + Shift + P</b>
            </span>
        </footer>
    ) 
}