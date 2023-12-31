import { useDispatch } from 'react-redux'
import { Draggable } from 'react-beautiful-dnd'

import {setDisplayedLink} from '@redux/actions'
import BookmarkTypes from '@/types/BookmarkTypes'
import { Bookmark } from '@components'

import styles from './styles.module.scss'

interface Props {
    list: BookmarkTypes[],
    activeMark: number
}   
export const BookmarkList = ({ list, activeMark }: Props) => {
    
    const dispatch = useDispatch()
    return <>
        {list?.map((i, index) => {
         return (
            <Draggable
                draggableId={`${i.id}`}
                key={index}
                index={index + 1}
            >
                {provided => (
                    <Bookmark
                        innerRef={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        data-context="bookmark"
                        tabIndex={-1}
                        href={i.url}
                        onMouseEnter={() =>
                            dispatch(setDisplayedLink({ type: 'hover', data: i.url }))
                        }
                        onMouseLeave={() =>
                            dispatch(setDisplayedLink({ type: 'hover', data: '' }))
                        }
                        data={i}
                        className={[
                            styles.item,
                            activeMark === index + 1 ? styles.active : ''
                        ].join(' ')}
                    />
                )}
            </Draggable>
        )})}
    </>
}