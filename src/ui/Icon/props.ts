import { Colors } from "@/types/colors"
import { enigmaIconsTypes } from "./enigmaIcons"
import { HTMLAttributes } from "react"

export interface Props extends Partial<HTMLAttributes<HTMLInputElement>>{
    name?:  enigmaIconsTypes 
    size?: string | number | 'inherit',
    color?: Colors,
}