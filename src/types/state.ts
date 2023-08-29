import CustomStylesTypes from './CustomStylesTypes';
import ModalTypes from "./ModalTypes"
import BookmarkTypes from './BookmarkTypes'
import DevTypes from './DevTypes';
import DisplayedLink from './DisplayedLinkTypes'

type RootState = {
    bookmarks: BookmarkTypes[], 
    modal: ModalTypes,
    customStyles: CustomStylesTypes,
    dev: DevTypes,
    displayedLink: DisplayedLink,
    extension: boolean 
} 
export default RootState

