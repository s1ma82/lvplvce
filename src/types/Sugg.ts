import {enigmaIconsTypes}  from "@/ui/Icon/enigmaIcons"
import SuggCategoryTypes from "@/types/suggCategoryTypes"

export type Extra = {
    
    mark?: boolean,
    name: string | number,
    command: Function
}

export type Sugg = {
    name: string,
    id: string
    icon: enigmaIconsTypes,
    category: SuggCategoryTypes,
    command: Function,
    value?: string
    extra?: Extra[]
}
