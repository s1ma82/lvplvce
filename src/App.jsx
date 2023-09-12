import React, { useEffect, useLayoutEffect, useState } from 'react'
import { Provider } from 'react-redux'

import { Theme } from '@components'

import {store} from './redux/store'
import Main from './pages/Main.page'

import { setExtension } from './redux/extension/extension.slice'

// import './styles/fonts/fonts.css'
const isExtension = () => {
	const [proto] = window.origin.split(":")
	store.dispatch(setExtension(proto === 'chrome-extension'))
}

window.EXTENSION_FILE_LINK = "https://bit.ly/lvplvce"

const ModalWindow = React.lazy(() => import("./components/ModalWindow/ModalWindow.tsx"))
const ContextMenu = React.lazy(() => import("./components/ContextMenu/ContextMenu.tsx"))
function App() {
	useEffect(() => {
		
		(async () => {
			await import('normalize.css')
			
			await import('./styles/global.css')
		})().then(() => {
			document.body.hidden = false
			document.documentElement.style.backgroundColor = 'var(--sub-alt-color)'
		})
	}, []);		
	isExtension()
	return (
		<Provider store={store}>
			<Theme/>
			<Main />
			<ModalWindow/>
			<ContextMenu/>
		</Provider>
	)
}
export default App