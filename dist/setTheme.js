(() => {
    const link = document.getElementById('data-theme');
    const { theme } = JSON.parse(localStorage.getItem('customStyles'))
    link.href = `themes/${theme}.css`;
})()