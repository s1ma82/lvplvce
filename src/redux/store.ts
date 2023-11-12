import { configureStore } from "@reduxjs/toolkit";
import bookmarksReducer from './bookmarks/bookmarks.slice'
import modalReducer from './modal/modal.slice'
import customStylesReducer from './customStyles/customStyles.slice'
import devReducer from './dev/dev.slice'
import displayedLinkReducer from './displayedLink/displayedLink.slice'
import extensionReducer from './extension/extension.slice'
export const store = configureStore({
    reducer: {
        modal: modalReducer,
        bookmarks: bookmarksReducer,
        customStyles: customStylesReducer,
        dev: devReducer,
        displayedLink: displayedLinkReducer,
        extension: extensionReducer
    },
    middleware: getMiddleware => getMiddleware({
        serializableCheck: false
    })
})

