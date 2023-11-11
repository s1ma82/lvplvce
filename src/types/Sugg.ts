import {enigmaIconsTypes}  from "@/ui/Icon/enigmaIcons"
import SuggCategoryTypes from "@/types/suggCategoryTypes"

export type Extra = {
    mark?: boolean,
    name: string,
    command: Function
}

export type Sugg = {
    name: string,
    icon: enigmaIconsTypes,
    category: SuggCategoryTypes,
    command: Function,
    extra: Extra[] | null
}
