import { useSelector } from 'react-redux'
import { elements } from '@assets/elements'
import RootState from '@/types/state'

export default ({name, children}: {name: typeof elements[number], children: any}) => {
    const {hiddenElements} = useSelector((state: RootState) => state.customStyles)
    
    return (
        <div
            hidden={!!hiddenElements.includes(name)}
        >
        {children}  
        </div>
    ) 
}