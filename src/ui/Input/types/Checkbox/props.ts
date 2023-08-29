import { InputHTMLAttributes } from "react";

export default interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>>{
    children: React.ReactNode,
    setValue: Function,
    getValue: Function,
}