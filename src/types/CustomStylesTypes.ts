const ThemesArr = <const>['arch', '8008', 'aether', 'dracula'] 
      
type Themes = typeof ThemesArr[number]
    
type CustomStylesTypes = {
    theme: Themes,
    fontSize: number,
    bookmarkSize: number,
}

export default CustomStylesTypes