import {useEffect, useState} from 'react'


const useOutside = (filter: string[] = [], initState: boolean = false, callback: Function | null = null) => {
    const [activityState, setActivityState] = useState(initState)
    
	useEffect(() => {
		const func1 = e => {
			if (filter) {
				let flag = filter.length
				for (let i of filter) {
					if (e.target.closest(i)) flag--
				}
				if (flag !== filter.length) return
			}
			document.removeEventListener('mousedown', func1)
			document.removeEventListener('keydown', func2)

			typeof callback === 'function' ? callback(): setActivityState(false)
        }
        
		const func2 = e => {
			if (e.keyCode !== 27) return
			document.removeEventListener('mousedown', func1)
			document.removeEventListener('keydown', func2)
			typeof callback === 'function' ? callback(): setActivityState(false)
        }
        
		return () => {
			document.addEventListener('mousedown', func1)
			document.addEventListener('keydown', func2)
		}
	}, [activityState, setActivityState])
	return [activityState, setActivityState]
}
export default useOutside