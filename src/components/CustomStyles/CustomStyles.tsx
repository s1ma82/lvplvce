import { useEffect } from 'react'
import isUrl from 'is-url'
import { useDispatch, useSelector } from "react-redux"
import RootState from '@/types/state'
import { setStyle } from '../../redux/actions'

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
		{isUrl(customBackground) ? (
			<div id='customBackground'>
				<img
					onError={e => dispatch(setStyle(['customBackground', '']))}
					src={customBackground}
					alt="customBackground"
					style={{
						width: "calc(100% + 0rem)",
						height: "calc(100% + 0rem)",
						left: "0rem",
						top: "0rem",
						position: "absolute",
						objectFit: "cover",
					}}
				/>
			</div> 
		) : null}
	</>)	
	
}