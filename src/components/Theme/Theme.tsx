import {useState, useEffect} from 'react'
import { useSelector } from "react-redux"
import RootState from '@/types/state'

export default () => {
    const [roots, setRoots] = useState()
    const {customStyles} =  useSelector((state: RootState) => state)
	
	const theme = customStyles.theme
	useEffect(() => {
		(async () => {
			const {default: newRoots} = await import(`../../styles/themes/${theme}.css?raw`)
			setRoots(newRoots)
		})()
	}, [theme, roots]) 
	
	return (
		<style id="theme" data-theme="">{roots}</style>
	)
}