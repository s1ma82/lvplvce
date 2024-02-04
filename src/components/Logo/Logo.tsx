import { ReactComponent as Logo } from '@assets/logo.svg'
import { useSelector } from 'react-redux'
import RootState from '@/types/state'
import { useState } from 'react'
import styles from './styles.module.scss'
export default () => {
    const logo = useSelector((state: RootState) => state.logo)
    const [flag, setFlag] = useState(!!logo.custom)
    
    return (
        <div className={styles.logo}>{
            flag
                ? <img
                    src={logo.custom}
                    onError={e => setFlag(false)}
                />
                : <Logo
                    id="logo"
                    fill="var(--caret-color)" />
        }</div>
    )
    
}