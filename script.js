/*
 * Select Auto - Interacciones front-end
 * Funciones incluidas:
 *  - Menú responsive accesible
 *  - Destacado de enlaces activos según sección visible
 *  - Animaciones de aparición progresiva
 *  - Año dinámico en el pie de página
 */

document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.querySelector('.nav-links');
  const menuToggle = document.getElementById('menu-toggle');
  const navAnchors = navLinks ? Array.from(navLinks.querySelectorAll('a')) : [];
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Menú hamburguesa accesible para móviles
  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      const isOpen = navLinks.classList.toggle('open');
      menuToggle.setAttribute('aria-expanded', String(isOpen));
      menuToggle.querySelector('.sr-only').textContent = isOpen ? 'Cerrar menú' : 'Abrir menú';
      if (isOpen) {
        const firstLink = navLinks.querySelector('a');
        if (firstLink) {
          firstLink.focus();
        }
      }
    });

    navAnchors.forEach((anchor) => {
      anchor.addEventListener('click', () => {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
      });
    });

    document.addEventListener('keydown', (event) => {
      const isEscape = event.key === 'Escape' || event.key === 'Esc';
      if (isEscape && navLinks.classList.contains('open')) {
        navLinks.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.querySelector('.sr-only').textContent = 'Abrir menú';
        menuToggle.focus();
      }
    });
  }

  // Destacar enlace activo según la sección visible en el viewport
  const sections = document.querySelectorAll('section[id]');
  const observerOptions = {
    threshold: 0.35,
  };

  const highlightNavigation = (entryId) => {
    navAnchors.forEach((anchor) => {
      const isActive = anchor.getAttribute('href') === `#${entryId}`;
      anchor.classList.toggle('is-active', isActive);
    });
  };

  const onIntersect = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        highlightNavigation(entry.target.id);
        entry.target.classList.add('is-visible');
      }
    });
  };

  if ('IntersectionObserver' in window && sections.length) {
    const observer = new IntersectionObserver(onIntersect, observerOptions);
    sections.forEach((section) => {
      section.classList.add('fade-in');
      observer.observe(section);
    });
  } else {
    sections.forEach((section) => section.classList.add('is-visible'));
  }

  if (prefersReducedMotion) {
    sections.forEach((section) => {
      section.classList.remove('fade-in');
    });
  }

  // Añadir año actual en el pie de página
  const yearElement = document.getElementById('current-year');
  if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
  }
});
