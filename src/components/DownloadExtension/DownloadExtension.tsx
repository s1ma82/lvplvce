import { useSelector } from 'react-redux'
import { Icon } from '@ui'
import RootState from '@/types/state'
import styles from './styles.module.scss'

export default () => {
    const extension = useSelector((state: RootState) => state.extension)
    return !extension.status && extension.version === null ? (
        <a  
            href={window.EXTENSION_FILE_LINK}
            className={styles.uploadExtension}
        >
            <Icon name='download' /> 
            {` download ${extension.version} update` }
        </a>
    ) : null 
}