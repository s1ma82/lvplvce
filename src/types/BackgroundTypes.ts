type Background = {
    custom: URL | ''
    size: 'max' | 'cover' | 'contain',
    filter: {
        blur: number
        brightness: number
        saturation: number
        opacity: number
    } 
}

export default Background