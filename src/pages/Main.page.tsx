import { useSelector } from 'react-redux'
import { ReactComponent as Pentagram } from '@assets/pentagram.svg'
import RootState from '@/types/state'
import { Bookmarks, SearchBar, DisplayedLink, DownloadExtension, Footer } from '@components'
import {HideContainer} from '@components'

export default () => {
	const customStyles = useSelector((state: RootState )=> state.customStyles)
	return (
		<div className="container">
			<HideContainer name="logo">
				<Pentagram id="logo" />
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