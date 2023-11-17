import  CustomStylesTypes from '@/types/CustomStylesTypes'
type DevTypes = {
    devMode: false | string,
    extra: false | string,
    value: false | string |keyof CustomStylesTypes
}
export default DevTypes