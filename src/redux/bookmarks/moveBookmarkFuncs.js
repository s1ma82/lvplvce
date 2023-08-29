export function increment({state, deleteItem, newPlace, oldPlace, moveItem}) {
    
    state.splice(deleteItem, 1)

    state.forEach(i => {
        if (i.id < newPlace) return i
        
        if (i.id >= newPlace && i.id < oldPlace) {
            i.id++
            return i
        }
    })

    moveItem.id = newPlace 
    state.splice(newPlace - 1, 0, moveItem)
}   
export function decrement({state, deleteItem, newPlace, oldPlace, moveItem}) {
    state.splice(deleteItem, 1)

    state.forEach(i => {
        if (i.id > oldPlace && i.id <= newPlace) {
            i.id--
            return i
        }
    })
    moveItem.id = newPlace
    state.splice(newPlace - 1, 0, moveItem)

}