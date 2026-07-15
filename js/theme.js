/**
 * theme.js
 * Controla a alternância entre tema escuro (padrão) e tema claro.
 * A preferência do usuário é salva no localStorage e respeitada
 * em visitas futuras. Também respeita `prefers-color-scheme` na
 * primeira visita, caso o usuário não tenha escolhido nada ainda.
 */
(function () {
  "use strict";

  const STORAGE_KEY = "portfolio-theme";
  const body = document.body;
  const toggleBtn = document.getElementById("themeToggle");

  function applyTheme(theme) {
    body.setAttribute("data-theme", theme);
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
    }
  }

  function getInitialTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "dark" || saved === "light") return saved;

    const prefersLight = window.matchMedia("(prefers-color-scheme: light)").matches;
    return prefersLight ? "light" : "dark";
  }

  // Aplica o tema o quanto antes para evitar "flash" de tema errado.
  applyTheme(getInitialTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current = body.getAttribute("data-theme") === "light" ? "light" : "dark";
      const next = current === "light" ? "dark" : "light";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }
})();
