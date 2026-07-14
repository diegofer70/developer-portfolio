const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

document.querySelectorAll('.reveal').forEach((element) => {
  revealObserver.observe(element);
});

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.nav-links a')];
const setActiveLink = () => {
  let current = 'home';

  sections.forEach((section) => {
    const top = section.offsetTop - 140;
    if (window.scrollY >= top) {
      current = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
  });
};

window.addEventListener('scroll', setActiveLink);
setActiveLink();

const backToTop = document.getElementById('topo');
window.addEventListener('scroll', () => {
  backToTop?.classList.toggle('visible', window.scrollY > 520);
});

backToTop?.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
