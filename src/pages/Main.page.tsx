import { ReactComponent as Pentagram } from '@assets/pentagram.svg'
import { Bookmarks, SearchBar, DisplayedLink, DownloadExtension, Footer } from '@components'

export default () => {
	return (
		<div className="container">
			<Pentagram id="logo" />

			<h1>help your self</h1>

			<SearchBar />
			<Bookmarks />
			<DownloadExtension />


			<DisplayedLink />
			<Footer />

		</div>
	)
}