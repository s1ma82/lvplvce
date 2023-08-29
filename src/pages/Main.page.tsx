import { ReactComponent as Pentagram } from '@assets/pentagram.svg'
import { Bookmarks, SearchBar, DisplayedLink, AuthorLink, UploadExtension } from '@components'

export default () => {

    return (
        <div className="container">
			<Pentagram id="logo" />
			
			<h1>help your self</h1>
			
			<SearchBar/>

			<Bookmarks />
			
			<AuthorLink />
			
			<UploadExtension/>

			<DisplayedLink/>
			
		</div>
    )
}