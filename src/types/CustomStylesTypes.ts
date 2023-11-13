import { themes } from "@assets/themes"
import { elements } from "@assets/elements"

type CustomStylesTypes = {
    theme: typeof themes[number],
    fontSize: string | number,
    bookmarkSize: string,
    customBackground: string,
    hiddenElements: Partial<typeof elements>
}

export default CustomStylesTypes