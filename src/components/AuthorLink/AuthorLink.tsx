import { useState } from 'react'
import { ReactSVG } from 'react-svg'
import styles from './styles.module.scss'
import { Icon } from '@ui'

export default () => {
    const [active, setActive] = useState(false)
    
    return (
        <div
            onMouseEnter={() => setActive(true)}
            onMouseLeave={() => setActive(false)}
            className={[styles.authorLink].join(' ')}
        >   
            <span>
                #author..
            </span>
            <div className={[
                styles.slider,
                active ? styles.active : ''
            ].join(' ')}>
                <a href="https://s1ma82.vercel.app/">
                    <Icon name='globe'/>
                    website 
                </a>
                <a href="https://github.com/s1ma82/lvplvce">
                    <ReactSVG
                        className={styles.reactSvg}
                        src='https://api.iconify.design/simple-icons/github.svg'
                        beforeInjection={svg => 
                            svg.setAttribute('fill', 'transparent')
                        }
                    />
                    
                    gitHub
                </a>
                <a href="https://t.me/s1ma_tg">
                    <ReactSVG
                        className={styles.reactSvg}
                        src={`https://api.iconify.design/simple-icons/telegram.svg`}
                    />
                    telergram
                </a>
            </div>
        </div>
    ) 
}