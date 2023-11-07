import { useDispatch} from 'react-redux'

import {setDisplayedLink} from '@redux/actions'
import BookmarkTypes from '@/types/BookmarkTypes'
import { Bookmark } from '@components'
import styles from './styles.module.scss'
import { Reorder, motion} from 'framer-motion'
import { useState } from 'react'

interface Props {
    list: BookmarkTypes[],
    activeMark: number
}   
export const BookmarkList = ({ list, activeMark }: Props) => {
    
    const dispatch = useDispatch()

    const Item = ({i, index}) => {
        const [drag, setDrag] = useState(true)

        return <Reorder.Item
            onMouseDown={e => {
                setDrag(false)
                setTimeout(() => {
                    setDrag(true)
                }, 200)
            }}
            onMouseUp={e => {
                if(!drag) location.replace(i.url)
            }}
            value={i}
            key={i.url} 
            data-context="bookmark"
            data-url={i.url}
            tabIndex={-1}
            onMouseEnter={() => 
                dispatch(setDisplayedLink({type: 'hover', data: i.url}))
            }
            onMouseLeave={() => 
                dispatch(setDisplayedLink({type: 'hover', data: ''}))
            }
        >
            <Bookmark
                data={i}
                className={[
                    styles.item,
                    activeMark === index + 1 ? styles.active : ''
                ].join(' ')}
            />
        </Reorder.Item>
    }
    
    return list?.map((i, index) => (
        <Item i={i} index={index} key={index} />
    ))
}

 // <Draggable
            //     draggableId={`${i.id}`}
            //     key={index}
            //     index={index + 1}
            // >
            //     {provided => (
            //         <a
            //         ref={provided.innerRef}
            //         {...provided.draggableProps}
            //         {...provided.dragHandleProps}
            //         data-context="bookmark"
            //         tabIndex={-1}
            //         href={i.url}
            //         onMouseEnter={() =>
            //             dispatch(setDisplayedLink({type: 'hover', data: i.url}))
            //         }
            //         onMouseLeave={() =>
            //             dispatch(setDisplayedLink({type: 'hover', data: ''}))
            //         }
            //         >
            //             <Bookmark
            //                 data={i}
            //                 className={[
            //                     styles.item,
            //                     activeMark === index + 1 ? styles.active : ''
            //                 ].join(' ')}
            //             />
            //         </a>
            //     )}
        // </Draggable>