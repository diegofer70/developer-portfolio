const themeToggle = document.getElementById('theme-toggle');
const storedTheme = localStorage.getItem('portfolio-theme');
const prefersLight = window.matchMedia('(prefers-color-scheme: light)').matches;

const applyTheme = (theme) => {
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('portfolio-theme', theme);

  if (themeToggle) {
    const icon = themeToggle.querySelector('span');
    if (icon) {
      icon.textContent = theme === 'light' ? '🌙' : '☀️';
    }
    themeToggle.setAttribute('aria-label', theme === 'light' ? 'Ativar tema escuro' : 'Ativar tema claro');
  }
};

const initialTheme = storedTheme || (prefersLight ? 'light' : 'dark');
applyTheme(initialTheme);

themeToggle?.addEventListener('click', () => {
  const nextTheme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
  applyTheme(nextTheme);
});
