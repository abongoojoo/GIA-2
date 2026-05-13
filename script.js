const nav = document.getElementById('primary-navigation');
const toggleButton = document.querySelector('.menu-toggle');
const navLinks = document.querySelectorAll('.primary-nav a');
const sections = document.querySelectorAll('.section-animate');

const toggleMenu = () => {
  const expanded = toggleButton.getAttribute('aria-expanded') === 'true';
  toggleButton.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('show');
};

toggleButton.addEventListener('click', toggleMenu);

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('show');
    toggleButton.setAttribute('aria-expanded', 'false');
  });
});

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.15,
});

sections.forEach((section) => observer.observe(section));

const handleScrollSpy = () => {
  const scrollPos = window.scrollY + window.innerHeight * 0.2;
  sections.forEach((section) => {
    const id = section.id;
    const offset = section.offsetTop;
    const height = section.offsetHeight;
    const link = document.querySelector(`.primary-nav a[href="#${id}"]`);

    if (!link) return;

    if (scrollPos >= offset && scrollPos < offset + height) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
};

window.addEventListener('scroll', handleScrollSpy);
window.addEventListener('load', handleScrollSpy);
