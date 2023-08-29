import { forwardRef } from 'react'
import { Checkbox, Submit } from './types'
import styles from './styles.module.scss'
import Props from './props'
import Upload from './types/Upload/Upload'


export default forwardRef(({ className, label, type = "text", name, placeholder = "", status, setValue, getValues, ...props }: Props, ref) => {
    

    const id = `ID:${name}#${styles.input}`

    
    const inputProps = {
        className: `${styles.input} ${className}`,
        type,
        name,
        placeholder,
        ref,
        ...props,
    }

    
    const labelProps = {
        className: styles.label,
        htmlFor: id
    }

    if (type === 'checkbox' && setValue && getValues) {
        return (
            <Checkbox
                tabIndex={inputProps.tabIndex}
                setValue={(value: any) => setValue(name, value)}
                getValue={() => getValues(name)}
                id={id}
            >
                <label {...labelProps}>{label}</label>
            </Checkbox>
        )
    }

    if (type === 'submit') {
        inputProps.className = `${inputProps.className} ${styles.submit}`

        return (
            <Submit data-status={status} disabled={!status} {...inputProps}/>
        )    
    }
    
    if (type === 'file') {
        return (
            <Upload status={status} {...inputProps} />
        )
    }

    if (label) return <>
        <label {...labelProps}>{label}</label>
        <input id={id} {...inputProps} />
    </> 

    
    return  <input id={id} {...inputProps} />

    
})