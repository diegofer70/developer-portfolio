/**
 * script.js
 * Responsável por:
 *  - Menu responsivo (abrir/fechar + fechar ao clicar em um link)
 *  - Renderização dinâmica dos cards de projeto a partir de um array de dados
 *  - Contador animado da seção de estatísticas
 *  - Validação e envio (simulado) do formulário de contato
 *  - Ano dinâmico no rodapé
 */
(function () {
  "use strict";

  /* =====================================================
     Menu responsivo
  ===================================================== */
  const navToggle = document.getElementById("navToggle");
  const nav = document.getElementById("nav");

  function closeNav() {
    nav.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    navToggle.setAttribute("aria-label", "Abrir menu");
  }

  function toggleNav() {
    const isOpen = nav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
    navToggle.setAttribute("aria-label", isOpen ? "Fechar menu" : "Abrir menu");
  }

  navToggle.addEventListener("click", toggleNav);
  nav.querySelectorAll(".nav__link").forEach((link) => {
    link.addEventListener("click", closeNav);
  });

  /* =====================================================
     Dados dos projetos
     Edite este array para adicionar, remover ou alterar projetos.
     image: caminho para a imagem em assets/images/projects/
  ===================================================== */
  const projects = [
    {
      title: "KOVA Store",
      description: "E-commerce completo com carrinho, favoritos e checkout, construído com padrões de React e TypeScript.",
      image: "assets/images/projects/kova-store.jpg",
      tags: ["React", "TypeScript", "CSS"],
      github: "https://github.com/diegofer70",
      demo: "#"
    },
    {
      title: "KOVA Sales Dashboard",
      description: "Dashboard de BI interativo com KPIs, gráficos de barras e donut, e consultas SQL equivalentes.",
      image: "assets/images/projects/kova-dashboard.jpg",
      tags: ["JavaScript", "Charts", "SQL"],
      github: "https://github.com/diegofer70",
      demo: "#"
    },
    {
      title: "LogiFlow",
      description: "Sistema de gestão logística com sete módulos: dashboard, pedidos, frota, rotas, estoque, fornecedores e relatórios.",
      image: "assets/images/projects/logiflow.jpg",
      tags: ["HTML5", "CSS3", "JavaScript"],
      github: "https://github.com/diegofer70",
      demo: "#"
    }
  ];

  const grid = document.getElementById("projectsGrid");

  function createProjectCard(project, index) {
    const article = document.createElement("article");
    article.className = "project-card reveal";
    article.setAttribute("data-reveal", "");
    article.setAttribute("data-reveal-delay", String((index % 3) * 100));

    article.innerHTML = `
      <div class="project-card__media">
        <img src="${project.image}" alt="Captura de tela do projeto ${project.title}" loading="lazy" width="480" height="300"
             onerror="this.onerror=null;this.src='https://placehold.co/480x300/111827/3b82f6?text=${encodeURIComponent(project.title)}';">
      </div>
      <div class="project-card__body">
        <h3 class="project-card__title">${project.title}</h3>
        <p class="project-card__desc">${project.description}</p>
        <div class="project-card__tags">
          ${project.tags.map((tag) => `<span class="project-card__tag">${tag}</span>`).join("")}
        </div>
        <div class="project-card__actions">
          <a href="${project.github}" target="_blank" rel="noopener noreferrer" class="btn btn--ghost btn--sm">GitHub</a>
          <a href="${project.demo}" target="_blank" rel="noopener noreferrer" class="btn btn--primary btn--sm">Demo</a>
        </div>
      </div>
    `;
    return article;
  }

  if (grid) {
    projects.forEach((project, index) => {
      grid.appendChild(createProjectCard(project, index));
    });

    // Reobserva os novos elementos [data-reveal] criados dinamicamente,
    // já que o observer em scroll.js roda antes desses cards existirem.
    const dynamicObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target;
            const delay = el.getAttribute("data-reveal-delay");
            if (delay) el.style.transitionDelay = `${delay}ms`;
            el.classList.add("is-visible");
            dynamicObserver.unobserve(el);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -60px 0px" }
    );
    grid.querySelectorAll("[data-reveal]").forEach((el) => dynamicObserver.observe(el));
  }

  /* =====================================================
     Contador animado — seção de estatísticas
  ===================================================== */
  const statNumbers = document.querySelectorAll(".stat-card__number");

  function animateCount(el) {
    const target = parseInt(el.getAttribute("data-count"), 10) || 0;
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();

    function step(now) {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      const value = Math.floor(eased * target);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          statsObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );
  statNumbers.forEach((el) => statsObserver.observe(el));

  /* =====================================================
     Formulário de contato — validação em JS puro
     Obs.: não há backend configurado; o envio é simulado
     localmente. Para uso real, conecte a um serviço como
     Formspree, EmailJS ou uma API própria.
  ===================================================== */
  const form = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  const validators = {
    name: (value) => value.trim().length >= 2,
    email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value.trim()),
    message: (value) => value.trim().length >= 10
  };

  const errorMessages = {
    name: "Informe seu nome (mínimo 2 caracteres).",
    email: "Informe um e-mail válido.",
    message: "Sua mensagem deve ter pelo menos 10 caracteres."
  };

  function validateField(field) {
    const name = field.name;
    const isValid = validators[name] ? validators[name](field.value) : true;
    const errorEl = form.querySelector(`[data-error-for="${name}"]`);
    const group = field.closest(".form-group");

    if (isValid) {
      group.classList.remove("has-error");
      if (errorEl) errorEl.textContent = "";
    } else {
      group.classList.add("has-error");
      if (errorEl) errorEl.textContent = errorMessages[name];
    }
    return isValid;
  }

  if (form) {
    ["name", "email", "message"].forEach((fieldName) => {
      const field = form.elements[fieldName];
      field.addEventListener("blur", () => validateField(field));
      field.addEventListener("input", () => {
        if (field.closest(".form-group").classList.contains("has-error")) {
          validateField(field);
        }
      });
    });

    form.addEventListener("submit", function (event) {
      event.preventDefault();

      const fields = ["name", "email", "message"].map((n) => form.elements[n]);
      const allValid = fields.map(validateField).every(Boolean);

      if (!allValid) {
        formStatus.textContent = "Verifique os campos destacados antes de enviar.";
        formStatus.className = "form-status is-error";
        return;
      }

      const submitBtn = form.querySelector("button[type='submit']");
      submitBtn.disabled = true;
      formStatus.textContent = "Enviando...";
      formStatus.className = "form-status";

      // Simulação de envio assíncrono (substitua por uma chamada real).
      setTimeout(() => {
        formStatus.textContent = "Mensagem enviada com sucesso! Retornarei em breve.";
        formStatus.className = "form-status is-success";
        form.reset();
        submitBtn.disabled = false;
      }, 900);
    });
  }

  /* =====================================================
     Ano dinâmico no rodapé
  ===================================================== */
  const yearEl = document.getElementById("year");
  if (yearEl) yearEl.textContent = new Date().getFullYear();
})();
