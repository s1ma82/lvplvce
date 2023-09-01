import React from 'react'
import { Provider } from 'react-redux'

import { ContextMenu, ModalWindow, Theme } from '@components'

import {store} from './redux/store'
import Main from './pages/Main.page'

import { setExtension } from './redux/extension/extension.slice'

import 'bootstrap-icons/font/bootstrap-icons.css'
import './styles/global.css'


const isExtension = () => {
	const [proto] = window.origin.split(":")
	store.dispatch(setExtension(proto === 'chrome-extension'))
}

window.EXTENSION_FILE_LINK = "https://bit.ly/lvplvce"

function App() {
	isExtension()
	return (
		<Provider store={store}>
			<Theme/>
			<Main/>
			<ModalWindow />
			<ContextMenu />
		</Provider>
	)
}
export default App