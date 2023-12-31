import { useSelector } from 'react-redux'

import {Sugg} from '@/types/Sugg'
import RootState from '@/types/state'
import { Icon } from '@ui'

import { SugExtra, SuggsListProps } from './props'


import styles from './styles.module.scss'

export default ({ suggs, activeSugg, setActiveSugg, commandHandler }: SuggsListProps) => {
    
    const dev = useSelector((state: RootState) => state.dev)
    const customStyles = useSelector((state: RootState) => state.customStyles)
    const background = useSelector((state: RootState) => state.background)
    
    // FUNCTIONS
    const getMark = (name: string | number, sugg: Sugg) => {
        if(!sugg) return
        switch (sugg.category) {
            case "theme":
                return customStyles.theme === name
            case "customStyles":
                switch (sugg.id) {
                    case 'bookmarkSize':
                        return customStyles.bookmarkSize === name
                    case 'hiddenElements':
                        return customStyles.hiddenElements.includes(name)
                    case 'theme':
                        return customStyles.theme === name
                    default: return
                }
            case 'background':
                return background.size === name
        }
    }
    
    
    // COMPONENTS
    const SugExtra = ({ extra, index, sugg }: SugExtra) => {
        const mark = getMark(extra.name, sugg)
        return (
            <li
                data-mark={mark}
                onMouseMove={() => {
                    if(activeSugg[1] === index + 1) return
                    setActiveSugg([activeSugg[0], index + 1])
                }}
                onClick={() => commandHandler()}
                className={[
                    styles.item,
                    index + 1 === activeSugg[1] ? styles.active : ''
                ].join(' ')}
            >
                <Icon name="check-lg" className={styles.icon} size="1.3em" />
                {extra.name}
            </li>
        )
    }
    
    const SuggExtraMap = () => {
        if(dev.value === '' || !suggs[1]) return null
        return suggs[1].map((extra, index) =><SugExtra
            key={extra.name + index}
            {...{ extra, index, sugg: suggs[0][activeSugg[0] - 1] }}
        />)
    }

    const SuggMap = () => suggs[0].map((sugg: Sugg, index: number) => (
            <li
                onMouseMove={() => {
                    if(activeSugg[0] === index + 1) return
                    setActiveSugg([index + 1, activeSugg[1]])
                }}
                onClick={() => commandHandler()}
                key={`${sugg.name}#${index}`}
                className={[
                    styles.item,
                    index + 1 === activeSugg[0] ? styles.active : ''
                ].join(' ')}
            >
                <Icon name={sugg.icon} />
                {sugg.name}{sugg.extra ? '..' : ''}
            </li>
    ))
    
    // RENDER
    return (
        <div
            className={[
                styles.suggestions_container,
                dev.devMode !== false  ? styles.active : ''
            ].join(' ')}
        >
            <ul
                key="suggsList"
                id="suggsList"
                className={[
                    styles.suggestions,
                    dev.devMode === '' ? styles.suggestions_active : ''
                ].join(' ')}
            >
                <SuggMap/>   
            </ul>
            <ul
                id="suggsExtraList"
                key="suggsExtraList"
                className={[
                    styles.suggestions,
                    styles.extra, 
                    dev.devMode ? styles.suggestions_active : ''
                ].join(' ')}
            >
                <SuggExtraMap/>
            </ul>
        </div>
    )
}