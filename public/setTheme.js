(() => {
    const link = document.getElementById('data-theme');
    const { theme } = JSON.parse(localStorage.getItem('customStyles'))
    console.log(link)
    link.href = `themes/${theme}.css`;
})()