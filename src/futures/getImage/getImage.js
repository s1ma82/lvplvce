export default function (data) {
    const { url } = data
    console.log(new URL(url))

    const domain = new URL(url).hostname
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=128`
}