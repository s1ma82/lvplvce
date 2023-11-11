import { enigmaIcons  } from './enigmaIcons'
import {Props} from './props'

export default ({ name = 'code-slash', size = 'inherit', color = 'inherit', className = '', ...props }: Props) => {
    return (
        <i
            className={[
                name ? enigmaIcons[name] : '',
                className
            ].join(' ')}

            style={{
                fontSize: size,
                color: color === 'inherit' ? 'inherit' : `var(--${color}-color)`
            }}
            {...props}
        >
        </i>
    ) 
}