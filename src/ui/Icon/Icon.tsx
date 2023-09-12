import { enigmaIcons  } from './enigmaIcons'
import {Props} from './props'
import 'bootstrap-icons/font/bootstrap-icons.css'
export default ({ name = 'code-slash', size = 'inherit', color = 'inherit', ...props } : Props) => {
    
    return (
        <i
            className={[
                name ? enigmaIcons[name] : '',
                props.className
            ].join(' ')}
            style={{
                fontSize: size,
                color: color === 'inherit' ? 'inherit' : `var(--${color}-color)`
            }}>
        </i>
    ) 
}