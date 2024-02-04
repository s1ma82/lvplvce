import { useSelector } from 'react-redux'
import RootState from '@/types/state'
import {HideContainer, Logo, Bookmarks, SearchBar, DisplayedLink, DownloadExtension, Footer } from '@components'

export default () => {
	const customStyles = useSelector((state: RootState )=> state.customStyles)
	return (
		<div className="container">
			<HideContainer name="logo">
				<Logo/>
			</HideContainer>

			<HideContainer name="title">
				<h1>{customStyles.customText.title}</h1>
			</HideContainer>

			<SearchBar />
			<HideContainer name="bookmarks">
				<Bookmarks />
			</HideContainer>
			<DownloadExtension />

			<DisplayedLink />
			<Footer />

		</div>
	)
}