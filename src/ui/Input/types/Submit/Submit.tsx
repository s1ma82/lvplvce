import Props from './props'
import styles from './styles.module.scss'

export default ({ className, ...props }: Props) => {
    return (
        <input
            className={`
                ${className}
                ${styles.input}
            `}
            {...props}
        />
    ) 
}  