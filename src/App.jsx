import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'
import 'bootstrap-icons/font/bootstrap-icons.css'
import { CustomStyles } from '@components'

import {store} from './redux/store'
import Main from './pages/Main.page'

import { setExtension } from './redux/extension/extension.slice'

// import './styles/fonts/fonts.css'
const isExtension = () => {
	const [proto] = window.origin.split(":")
	store.dispatch(setExtension(proto === 'chrome-extension'))
}

window.EXTENSION_FILE_LINK = "https://github.com/s1ma82/lvplvce/releases"

const ModalWindow = React.lazy(() => import("./components/ModalWindow/ModalWindow.tsx"))
const ContextMenu = React.lazy(() => import("./components/ContextMenu/ContextMenu.tsx"))
function App() {
	useEffect(() => {
		
		(async () => {
			await import('./styles/global.css')
		})().then(() => {
			document.body.hidden = false
			document.documentElement.style.backgroundColor = 'var(--sub-alt-color)'
		})
	}, []);		
	isExtension()
	return (
		<Provider store={store}>
			<CustomStyles/>
			<Main />
			<ModalWindow/>
			<ContextMenu/>
		</Provider>
	)
}
export default App