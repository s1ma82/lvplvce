import { useSelector } from 'react-redux'
import styles from './styles.module.scss'
import RootState from '@/types/state'

export default ({ }) => {
    const { displayedLink } = useSelector((state: RootState) => state)
    
    function removeHttp(url: string) {
        return url.replace(/^https?:\/\//, '');
    }
    return (
        <span className={styles.displayedLink}>
            {displayedLink.hoverValue ?
                removeHttp(displayedLink.hoverValue) :
                removeHttp(displayedLink.value)}
        </span>
    ) 
}