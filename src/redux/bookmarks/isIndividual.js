import {useStorage} from '@hooks'
export const isIndividual = (payload) => {
    const [bookmarks] = useStorage('bookmarks')
    
    const newList = bookmarks.filter(i => i.url === payload)
    return newList.length === 0
}