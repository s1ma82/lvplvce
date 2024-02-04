import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import {Analytics} from '@vercel/analytics/react'
import { CustomStyles } from '@components'

import {store} from './redux/store'
import { setExtension } from './redux/extension/extension.slice'
import Main from './pages/Main.page'

import 'bootstrap-icons/font/bootstrap-icons.css'

const isExtension = async () => {
	try {
		const [proto] = window.origin.split(":")
		const response = await fetch('https://api.github.com/repos/s1ma82/lvplvce/releases/latest');
		const data = await response.json()
		const latestVersion = data.tag_name;
		const statusExtension = proto === 'chrome-extension'
		if (statusExtension) {
			const currentVersion = chrome.runtime.getManifest().version;
			const version = latestVersion !== 'v' + currentVersion ? latestVersion : null 
			store.dispatch(setExtension([statusExtension, version]))
		}
		store.dispatch(setExtension([statusExtension, latestVersion]))
	} catch(e){
		console.error(e.message)
	}
}

window.EXTENSION_FILE_LINK = "https://github.com/s1ma82/lvplvce/releases"

const ModalWindow = React.lazy(() => import("./components/ModalWindow/ModalWindow.tsx"))
const ContextMenu = React.lazy(() => import("./components/ContextMenu/ContextMenu.tsx"))

function App() {
	useEffect(() => {
		(async () => {
			await import('./styles/global.css')
			document.body.hidden = false
			document.documentElement.style.backgroundColor = 'var(--sub-alt-color)'
			isExtension()
		})()
	}, []);		
	return (
		<Provider store={store}>
			<CustomStyles/>
			<Main />
			<ModalWindow/>
			<ContextMenu />
			{!store.getState().extension.status ? <Analytics /> : null}
		</Provider>
	)
}
export default App