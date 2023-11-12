import  CustomStylesTypes from '@/types/CustomStylesTypes'
type DevTypes = {
    devMode: boolean,
    extra: false | string,
    custom: false | keyof CustomStylesTypes
}
export default DevTypes