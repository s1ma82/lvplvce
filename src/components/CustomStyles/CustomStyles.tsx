import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import RootState from '@/types/state'
import { setBgCustom } from '@redux/actions'
import styles from './styles.module.scss'
import customTheme from '/public/themes/arch.css?row'
export default () => {
    const customStyles =  useSelector((state: RootState) => state.customStyles)
    const background =  useSelector((state: RootState) => state.background)
	const [webTheme, setWebTheme] = useState('') 
	const customBackground = background.custom	
	const theme = customStyles.theme
	const dispatch = useDispatch()

	useEffect(() => {
		const {theme} = customStyles
		const link = document.getElementById('theme') as HTMLLinkElement
		
		// link.href = `themes/${theme}.css`
		fetch(
			`https://raw.githubusercontent.com/s1ma82/lvplvce/master/public/themes/${theme}.css`,
			{cache: 'force-cache'}
		)
			.then(r => r.text())
			.then(data => setWebTheme(data))
		
		if (!document.body.hidden) return
		
	}, [customBackground, theme])
	const style = {
		opacity: background.filter.opacity,
		filter: [
			`blur(${background.filter.blur}rem)`,
			`brightness(${background.filter.brightness})`,
			`saturate(${background.filter.saturation})`,
		].join(' '),
		objectFit: background.size === 'max' ? 'fill' : background.size,
	}
	
	return (<>
		<style>{`
			${webTheme}	
		`}</style>
		{customBackground ? (
			<div id={styles.customBackground}>
				<img
					onError={e => dispatch(setBgCustom(['custom', '']))}
					src={customBackground}
					alt="customBackground"
					style={style}
					
				/>
			</div> 
		) : null}
	</>)	
	
}