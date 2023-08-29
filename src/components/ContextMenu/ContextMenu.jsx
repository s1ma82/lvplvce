import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useOutside } from '@hooks'
import {setModalActive, removeBookmark} from '@redux/actions'
import styles from './styles.module.scss';

export default () => {
	const [focus, setFocus] = useOutside(['#context-menu'])
	const [data, setData] = useState()
	const dispatch = useDispatch()
	const ref = useRef()


	function showMenu(e) {
		const block = e.target.closest('[data-context]')
		if(!block) return
		e.preventDefault()
		const menu = ref.current

		if (!menu) return
		
		const { pageX, pageY } = e
		pageX + 150 > document.documentElement.scrollWidth 
			? menu.style.left = `${document.documentElement.scrollWidth - 200}px`
			: menu.style.left = pageX + 'px'
		pageY + 200 > document.documentElement.scrollHeight
			? menu.style.top = `${document.documentElement.scrollHeight - 250}px`
			: menu.style.top = pageY + 'px'

		setData(block)
		setFocus(true)

	}
	
	useEffect(() => {
		document.addEventListener(
			'contextmenu',
			showMenu
		)
	}, [])

	function remove() {
		dispatch(removeBookmark(data.getAttribute('href')))
		setFocus(false)
	}
	function edit() {
		dispatch(setModalActive({ type: 'editBookmark', data: data.getAttribute('href') }))
		setFocus(false)
	}
	function getName() {
		const domain = new URL(data.getAttribute('href')).hostname
		return <span className={styles.name}>[{domain}]</span>
	}

	return (
		<div
			id="context-menu"
			ref={ref}
			className={`
				${styles.contextMenu}
				${focus ? styles.active : ''}
			`}
		>	
			{data ? getName() : null}
			<ul className={styles.list}>
				<li onClick={edit} className={`${styles.item} ${styles.edit}`}>Edit</li>
				<li onClick={remove} className={styles.item}>Delete</li>
			</ul>
		</div>
	);
}

 