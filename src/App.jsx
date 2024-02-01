import React, { useEffect, useState } from 'react'
import { Provider } from 'react-redux'
import {Analytics} from '@vercel/analytics/react'
import { CustomStyles } from '@components'

import {store} from './redux/store'
import { setExtension } from './redux/extension/extension.slice'
import Main from './pages/Main.page'

import 'bootstrap-icons/font/bootstrap-icons.css'

const isExtension = () => {
	const [proto] = window.origin.split(":")
	store.dispatch(setExtension(proto === 'chrome-extension'))
}

window.EXTENSION_FILE_LINK = "https://github.com/s1ma82/lvplvce/releases/latest/download/"

const ModalWindow = React.lazy(() => import("./components/ModalWindow/ModalWindow.tsx"))
const ContextMenu = React.lazy(() => import("./components/ContextMenu/ContextMenu.tsx"))

const checkForUpdates = async () => {
  	const response = await fetch('https://api.github.com/repos/s1ma82/lvplvce/releases/latest');
  	const data = await response.json();
  	const latestVersion = data.tag_name;
  	const currentVersion = chrome.runtime.getManifest().version;

	if (latestVersion !== currentVersion) {
		console.log("Вышла новая версия")
  	}
};	

function App() {
	useEffect(() => {
		(async () => {
			checkForUpdates();
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
			<ContextMenu />
			<Analytics/>
		</Provider>
	)
}
export default App