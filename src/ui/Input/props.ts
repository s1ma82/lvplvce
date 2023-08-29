import { InputHTMLAttributes } from "react";

export default interface Props extends Partial<InputHTMLAttributes<HTMLInputElement>> {
    name?: string,
    register?: any,
    label?: string,
    status?: boolean | string | null,
    setValue?: Function,
    getValues?: Function,
}