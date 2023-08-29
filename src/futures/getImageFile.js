export default function getImageFile(file, callback) {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.addEventListener('load', () => callback(reader.result))
}