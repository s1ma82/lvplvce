import { useSelector } from 'react-redux'
import { Icon } from '@ui'
import RootState from '@/types/state'
import styles from './styles.module.scss'

export default () => {
    const {extension} = useSelector((state: RootState) => state)
    return !extension ? (
        <a
            className={styles.uploadExtension}
            href={window.EXTENSION_FILE_LINK}
            download
        >
            <Icon name='download'/> download extension 
        </a>
    ) : null
}