import RootState from '@/types/state';
import {Sugg} from '../../futures';
export type EventData = {
    setValue: Function
    value: string
    activeSugg: number[]
    setActiveSugg: Function
    dev: RootState['dev']
    modal: RootState['modal']
    searchBar: React.RefObject<HTMLElement>
    suggs: [Sugg[], [] | Sugg[]]
}
export type SuggsListProps = {
    activeSugg: number[],
    setActiveSugg: Function
    commandHandler: Function
    suggs: [Sugg[], [] | Sugg[]],
    value: string
    setSuggs: Function
}

export type SugExtra = {
    extra: {
        name: number | string
        command: Function
    },
    sugg: Sugg
    index: number
}