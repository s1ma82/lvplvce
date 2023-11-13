import { ReactComponent as Pentagram } from '@assets/pentagram.svg'
import { Bookmarks, SearchBar, DisplayedLink, DownloadExtension, Footer } from '@components'
import {HideContainer} from '@components'

export default () => {
	return (
		<div className="container">
			<HideContainer name="logo">
				<Pentagram id="logo" />
			</HideContainer>

			<HideContainer name="title">
				<h1>help your self</h1>
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