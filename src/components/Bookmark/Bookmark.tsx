import { useSelector } from 'react-redux'
import { getImage } from '@futures'
import RootState from '@/types/state'
import Props from './props'
import styles from './styles.module.scss'

export default ({ data, gen = false, className, innerRef, ...props}: Props) => {
    const customStyles = useSelector((state: RootState) => state.customStyles)
    
    if (!data && gen) {
        return (
            <div
                className={[
                    styles.bookmark,
                    styles[`bookmark_${customStyles.bookmarkSize}`],
                    styles.bookmark_gen,
                    className,
                ].join(' ')}
                {...props}
            >
                <span className={styles.icon}>
                    ✝
                </span>
            </div>
        )
    }
    
    const getImageUrl = (): string => {
        if (!data) return ''
        if (data.imageFile.url) return data.imageFile.url        
        if (!data.imageFile.url && data.imageUrl) return data.imageUrl
        if (!data.imageFile.url && !data.imageUrl) return getImage(data)
        return ''
    }
    return (
        <a   
            className={[
                styles.bookmark,
                styles[`bookmark_${customStyles.bookmarkSize}`],
                data?.imageFile.url || data?.imageUrl ? styles.imageFile : '',
                className
            ].join(' ')}
            ref={innerRef}
            {...props}
        >   
            <img
                src={getImageUrl()}
                className={styles.bookmark__image} />
        </a>
    )
}