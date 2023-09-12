import {useEffect, useLayoutEffect, useState} from 'react'
import { useSelector } from "react-redux"
import RootState from '@/types/state'
// import '@styles/themes/arch.css'

export default () => {
    const {customStyles} =  useSelector((state: RootState) => state)

	
	const theme = customStyles.theme
	useEffect(() => {
		const {theme} = customStyles
		const link = document.getElementById('theme') as HTMLLinkElement
		
		link.href = `themes/${theme}.css`
		
		
		if (!document.body.hidden) return
		
		// link.addEventListener("load", () => {

		
		// })
		

	}, [theme])
	
	// useEffect(() => {
	// 	(async () => {
	// 		const newRoots = await fetch(`themes/${theme}.css`).then(data => data.text())
			
	// 		setRoots(newRoots)
	// 	})()
	// }, [theme]) 
	// return (
	// 	<style id="theme" data-theme="">{roots}</style>
	// )
}