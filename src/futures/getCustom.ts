const ucFirst = (str: string) => {
    if(!str) return 
    return str[0].toUpperCase() + str.slice(1)
    
}
export default function (name: string): string | void {
    if(!name) return
    return 'custom' + ucFirst((name.split(' ')[1]))
}
