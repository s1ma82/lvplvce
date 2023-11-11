import { themes } from "@assets/themes"

type CustomStylesTypes = {
    theme: typeof themes[number],
    fontSize: string | number,
    bookmarkSize: string,
    customBackground: string 
}

export default CustomStylesTypes