export default (name, defaultValue = null) => {
    let data
    if (!name) return
    if (!data) get()
    
    function get() {
        const localData = JSON.parse(localStorage.getItem(name))
        data = localData
        return localData
    }

    function set(value) {
        if(typeof value !== 'string') value = JSON.stringify(value)
        localStorage.setItem(name, value)
        get()
    }

    function init() {
        const localData = get()
        
        if (!localData) {
            set(defaultValue)
            
        }
    }

    if(defaultValue !== null) init()
    return [data, set]
}