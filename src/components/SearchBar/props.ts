import RootState from '@/types/state';
import { Sugg } from '@/futures';
import { SetStateAction } from 'react';
export type SuggsState = [Sugg[], [] | Sugg[]]
export type EventData = {
    setValue: SetStateAction<string>
    value: string
    activeSugg: number[]
    setActiveSugg: Function
    dev: RootState['dev']
    modal: RootState['modal']
    searchBar: React.RefObject<HTMLElement>
    suggs: SuggsState
}
export type SuggsListProps = {
    activeSugg: number[],
    setActiveSugg: Function
    commandHandler: Function
    suggs: SuggsState,
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