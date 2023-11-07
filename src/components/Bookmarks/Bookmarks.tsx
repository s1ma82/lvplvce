import { SyntheticEvent, useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { Bookmark } from '@components'
import { setModalActive, moveBookmark, removeBookmark, setDisplayedLink } from '@redux/actions'
import RootState from '@/types/state'

import { BookmarkList } from './BookmarksList'
import styles from './styles.module.scss'
import { Reorder } from 'framer-motion'

export default () => {

    const [activeMark, setActiveMark] = useState(0)
    const dev = useSelector((state: RootState) => state.dev)
    const bookmarks = useSelector((state: RootState) => state.bookmarks)
    const dispatch = useDispatch()
    
    function activate(e: SyntheticEvent) {
        if (e.type === 'click') {
            dispatch(setModalActive(true))
        }
    }

    function getMarkUrl(marks: NodeListOf<Element>): string{
        
        if (activeMark === 0 || activeMark === bookmarks.length + 1) return ''
        const activeLink = marks[activeMark - 1]
        const url = activeLink.getAttribute('data-url')
        if (!url) return ''

        return url
    }

    useEffect(() => {
        const marks = document.querySelectorAll(`[data-context="bookmark"]`)
        dispatch(setDisplayedLink(getMarkUrl(marks)))
        const event = (e: KeyboardEvent) => {
            
            const { ctrlKey, key } = e
            if (ctrlKey && key === 'Enter' && !dev.devMode) {
                if (activeMark === bookmarks.length + 1) {
                    dispatch(setModalActive(true))
                    return
                }
                location.replace(getMarkUrl(marks))
                return
            }
            if (key === 'Delete' && !dev.devMode) {
                dispatch(removeBookmark(marks[activeMark - 1].getAttribute('data-url')))
                return
            }

            const
                first = 1,
                last = bookmarks.length + 1,
                keyLeft = key === 'ArrowLeft',
                keyRight = key === 'ArrowRight'

            if (!(keyLeft || keyRight)) return
            
            if (keyLeft)  setActiveMark(activeMark - 1)
            if (keyRight) setActiveMark(activeMark + 1)

            if ((activeMark === first || activeMark === 0) && keyLeft ) setActiveMark(last)
            if (activeMark === last && keyRight) setActiveMark(first)
            
        }
        window.addEventListener('keydown', event)

        return () => {
            window.removeEventListener('keydown', event)
        }
    }, [activeMark])


    return (
        <Reorder.Group
            axis='x'
            as="ul"
            values={bookmarks}
            onReorder={(e) => console.log(e)}
            className={styles.bookmarks__list}>
            <BookmarkList list={bookmarks} activeMark={activeMark} />
            <li
                tabIndex={-1}
                onClick={activate}
            >
                <Bookmark
                    gen    
                    className={[
                        styles.item,
                        activeMark  === bookmarks.length + 1 ? styles.active : ''
                    ].join(' ')}
                />
            </li>
        </Reorder.Group>
    )
}