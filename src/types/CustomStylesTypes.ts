import { elements, themes} from "@assets"

type CustomStylesTypes = {
    theme: typeof themes[number],
    fontSize: string | number,
    bookmarkSize: string
    hiddenElements: Partial<typeof elements>
}

export default CustomStylesTypes