import { useEffect } from 'react'
import isUrl from 'is-url'
import { useDispatch, useSelector } from "react-redux"
import RootState from '@/types/state'
import { setStyle } from '../../redux/actions'
import styles from './styles.module.scss'
export default () => {
    const customStyles =  useSelector((state: RootState) => state.customStyles)

	const customBackground = customStyles.customBackground	
	const theme = customStyles.theme
	const dispatch = useDispatch()

	useEffect(() => {
		const {theme} = customStyles
		const link = document.getElementById('theme') as HTMLLinkElement
		
		link.href = `themes/${theme}.css`
		
		
		if (!document.body.hidden) return
		
	}, [customBackground, theme])
	return (<>
		{customBackground ? (
			<div id={styles.customBackground}>
				<img
					onError={e => dispatch(setStyle(['customBackground', '']))}
					src={customBackground}
					alt="customBackground"
					
				/>
			</div> 
		) : null}
	</>)	
	
}