import { useEffect } from 'react'
import { useDispatch, useSelector } from "react-redux"
import RootState from '@/types/state'
import { setBgCustom } from '@redux/actions'
import styles from './styles.module.scss'
export default () => {
    const customStyles =  useSelector((state: RootState) => state.customStyles)
    const background =  useSelector((state: RootState) => state.background)

	const customBackground = background.custom	
	const theme = customStyles.theme
	const dispatch = useDispatch()

	useEffect(() => {
		const {theme} = customStyles
		const link = document.getElementById('theme') as HTMLLinkElement
		
		link.href = `themes/${theme}.css`
		
		
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