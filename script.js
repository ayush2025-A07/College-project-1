const root = document.documentElement;
const themeButton = document.querySelector('.theme-toggle');
const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('.site-navigation');

const savedTheme = localStorage.getItem('peak-fitness-theme');
if (savedTheme === 'dark') {
    root.dataset.theme = 'dark';
}

function updateThemeButton() {
    const darkThemeIsActive = root.dataset.theme === 'dark';
    themeButton.textContent = darkThemeIsActive ? 'Light mode' : 'Dark mode';
    themeButton.setAttribute('aria-label', `Switch to ${darkThemeIsActive ? 'light' : 'dark'} theme`);
}

updateThemeButton();

themeButton.addEventListener('click', () => {
    const darkThemeIsActive = root.dataset.theme === 'dark';
    if (darkThemeIsActive) {
        delete root.dataset.theme;
        localStorage.setItem('peak-fitness-theme', 'light');
    } else {
        root.dataset.theme = 'dark';
        localStorage.setItem('peak-fitness-theme', 'dark');
    }
    updateThemeButton();
});

menuButton.addEventListener('click', () => {
    const menuIsOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!menuIsOpen));
    navigation.classList.toggle('is-open', !menuIsOpen);
});

navigation.addEventListener('click', (event) => {
    if (event.target instanceof HTMLAnchorElement && navigation.classList.contains('is-open')) {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
    }
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && navigation.classList.contains('is-open')) {
        navigation.classList.remove('is-open');
        menuButton.setAttribute('aria-expanded', 'false');
        menuButton.focus();
    }
});