import { ChangeEvent, FormEvent, useEffect, useRef, useState, KeyboardEvent } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import isUrl from 'is-url'

import { Input } from '@ui'
import { addBookmark, editBookmark } from '@redux/bookmarks/bookmarks.slice'
import {setModalActive} from '@redux/modal/modal.slice'
import { getImageFile } from '@futures'
import RootState from '@/types/state'


import getModalEvent from './getModalEvent'
import styles from './styles.module.scss'


export default () => {
    const modal  = useSelector((state: RootState) => state.modal)
    const bookmarks = useSelector((state: RootState) => state.bookmarks)
    
    const dispatch = useDispatch()
    const [url, setUrl] = useState('')
    const [imageUrl, setImageUrl] = useState('')

    const imageFileInitState: {
        name: null | string,
        url: null | string
    } = {
        name: null,
        url: null
    }
    const [imageFile, setImageFile] = useState(imageFileInitState)

    const ref = useRef<HTMLElement>(null) 


    const editableBookmark = bookmarks.find(i => i.url === modal.data)

    useEffect(() => {
        const modalEvent = getModalEvent()
        modalEvent.add()
        if (!modal.status) clearAll()
        if (editableBookmark) setImageFile(editableBookmark.imageFile)
        if (modal.status && ref.current) ref.current.focus()
        return () => modalEvent.remove()

    }, [modal.status])
    
    function clearAll() {
        setUrl('')
        setImageUrl('')
        setImageFile(imageFileInitState)
    }

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault()
        if (modal.type === 'default') {

            if (!isUrl(url)) return

            const newBookmark = { url, imageUrl, imageFile: imageFile, }
            dispatch(addBookmark(newBookmark))
            dispatch(setModalActive(false))
            clearAll()
        }

        if (modal.type === 'editBookmark') {

            if (!imageFile.url && !imageUrl) return
            if (!editableBookmark) return

            const copyBookmark = { ...editableBookmark }
            copyBookmark.imageFile = imageFile
            copyBookmark.imageUrl = imageUrl
            dispatch(editBookmark(copyBookmark))
            dispatch(setModalActive(false))
            clearAll()
        }
    }   

    const loopFocus = (e: KeyboardEvent, x: any) => {
        if (e.key === 'Tab' && x) {
            e.preventDefault()
            ref.current?.focus()
        }
    }
    return (
        
        <div className={`${styles.modal} ${modal.status ? styles.active : ''}`}>
            <div id="modal" className={`${styles.modal__content}`} >
                <form onSubmit={handleSubmit} className={styles.modal__form}>
                    <Input
                        tabIndex={1}
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setUrl(e.target.value)}
                        value={url}
                        name="url"
                        ref={ref}
                        autoComplete="off"
                        placeholder="url:"
                        hidden={modal.type === 'editBookmark'}
                    />
                    <div className={styles.image_container}>
                        <Input
                            tabIndex={2}
                            onChange={e => {
                                setImageUrl(e.target.value)
                            }}
                            value={imageFile.name ? imageFile.name : imageUrl}
                            readOnly={!!imageFile.name}
                            name="imageUrl"
                            autoComplete="off"
                            placeholder="image url or file:"
                        /> 
                        <Input
                            tabIndex={3}
                            onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => loopFocus(e, !isUrl(url))}
                            status={imageFile.url}
                            type="file"
                            accept="image/"
                            onClick={e => {
                                if (!imageFile.url) return
                                e.preventDefault()
                                setImageFile(imageFileInitState)
                            }}
                            onChange={e => {
                                if(!e.target.files) return
                                const file = e.target.files[0]
                                getImageFile(file, (data: string) =>
                                    setImageFile({ url: data, name: file.name })
                                )
                            }}
                        />
                    </div>
                    <Input
                        onKeyDown={(e: KeyboardEvent) => loopFocus(e, isUrl(url))}
                        tabIndex={4}
                        type="submit"
                        value={modal.type === 'editBookmark' ? 'Edit bookmark': 'Add bookmark'}
                        status={modal.type === 'default' ? isUrl(url) : !!imageUrl}
                    />
                </form>
            </div>
        </div>
    )
}