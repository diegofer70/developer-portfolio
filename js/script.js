const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');
const year = document.getElementById('year');

if (year) {
  year.textContent = new Date().getFullYear();
}

menuToggle?.addEventListener('click', () => {
  const isOpen = navLinks?.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
  document.body.classList.toggle('no-scroll', isOpen);
});

document.querySelectorAll('.nav-links a').forEach((link) => {
  link.addEventListener('click', () => {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  });
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 760) {
    navLinks?.classList.remove('open');
    menuToggle?.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('no-scroll');
  }
});

contactForm?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (formStatus) {
    formStatus.textContent = 'Mensagem enviada! Vou responder em breve.';
  }

  contactForm.reset();
});
