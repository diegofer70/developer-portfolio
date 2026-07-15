/**
 * scroll.js
 * Responsável por:
 *  - Estado do header ao rolar a página (fundo com blur)
 *  - Destaque do link de navegação ativo conforme a seção visível
 *  - Scroll Reveal (animações de entrada) via IntersectionObserver
 *  - Botão "voltar ao topo"
 * Não depende de bibliotecas externas.
 */
(function () {
  "use strict";

  /* ---------- Header com fundo ao rolar ---------- */
  const header = document.getElementById("header");
  function updateHeaderState() {
    if (window.scrollY > 12) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });

  /* ---------- Destaque da seção ativa no menu ---------- */
  const sections = document.querySelectorAll("main section[id]");
  const navLinks = document.querySelectorAll("[data-nav]");

  const sectionObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute("id");
          navLinks.forEach((link) => {
            const isActive = link.getAttribute("href") === `#${id}`;
            link.classList.toggle("active", isActive);
          });
        }
      });
    },
    { rootMargin: "-45% 0px -50% 0px", threshold: 0 }
  );
  sections.forEach((section) => sectionObserver.observe(section));

  /* ---------- Scroll Reveal (JS puro) ---------- */
  const revealItems = document.querySelectorAll("[data-reveal]");

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const delay = el.getAttribute("data-reveal-delay");
          if (delay) el.style.transitionDelay = `${delay}ms`;
          el.classList.add("is-visible");
          revealObserver.unobserve(el);
        }
      });
    },
    { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
  );
  revealItems.forEach((item) => revealObserver.observe(item));

  /* ---------- Botão voltar ao topo ---------- */
  const backToTop = document.getElementById("backToTop");
  function updateBackToTop() {
    if (window.scrollY > 480) {
      backToTop.classList.add("is-visible");
    } else {
      backToTop.classList.remove("is-visible");
    }
  }
  updateBackToTop();
  window.addEventListener("scroll", updateBackToTop, { passive: true });

  backToTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
})();
