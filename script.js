(function () {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const yearSpan = document.getElementById('current-year');
  const form = document.getElementById('contact-form');
  const successMessage = document.getElementById('form-success');
  const errorMessage = document.getElementById('form-error');
  const cookieBanner = document.getElementById('cookie-banner');
  const cookieAccept = document.getElementById('cookie-accept');

  const closeMenu = () => {
    if (!navMenu || !navToggle) return;
    navMenu.classList.remove('open');
    navToggle.setAttribute('aria-expanded', 'false');
  };

  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      navMenu.classList.toggle('open');
      const expanded = navMenu.classList.contains('open');
      navToggle.setAttribute('aria-expanded', expanded ? 'true' : 'false');
    });
  }

  const anchorLinks = document.querySelectorAll('a[href^="#"]');
  anchorLinks.forEach((link) => {
    link.addEventListener('click', (event) => {
      const targetId = link.getAttribute('href');
      if (!targetId || targetId.length <= 1) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        event.preventDefault();
        targetElement.scrollIntoView({ behavior: 'smooth' });
        if (window.innerWidth <= 800) {
          closeMenu();
        }
      }
    });
  });

  if (navMenu) {
    navMenu.querySelectorAll('a').forEach((navLink) => {
      navLink.addEventListener('click', closeMenu);
    });
  }

  const handleScroll = () => {
    if (!header) return;
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  if (yearSpan) {
    yearSpan.textContent = String(new Date().getFullYear());
  }

  if (form) {
    form.addEventListener('submit', (event) => {
      event.preventDefault();
      successMessage?.classList.remove('visible');
      errorMessage?.classList.remove('visible');

      const formData = new FormData(form);
      const requiredFields = ['nombre', 'telefono', 'matricula'];
      let hasErrors = false;

      requiredFields.forEach((field) => {
        const value = formData.get(field);
        const formattedValue = typeof value === 'string' ? value.trim() : '';
        if (!formattedValue) {
          hasErrors = true;
        } else {
          formData.set(field, formattedValue);
        }
      });

      const privacyAccepted = form.querySelector('#acepto');
      if (!(privacyAccepted instanceof HTMLInputElement) || !privacyAccepted.checked) {
        hasErrors = true;
      }

      if (hasErrors) {
        if (errorMessage) {
          errorMessage.textContent = 'Por favor, completa los campos obligatorios y acepta la política de privacidad.';
          errorMessage.classList.add('visible');
        }
        return;
      }

      const submitButton = form.querySelector('button[type="submit"]');
      if (submitButton) {
        submitButton.setAttribute('disabled', 'disabled');
      }

      const payload = Object.fromEntries(formData.entries());
      console.group('Formulario Select Auto');
      console.info('Destino simulado: info@selecauto.es');
      console.table(payload);
      console.groupEnd();

      window.setTimeout(() => {
        form.reset();
        if (submitButton) {
          submitButton.removeAttribute('disabled');
        }
        if (successMessage) {
          successMessage.textContent = 'Gracias, te contactamos hoy mismo.';
          successMessage.classList.add('visible');
        }
      }, 900);
    });
  }

  if (cookieBanner && cookieAccept) {
    const consent = window.localStorage.getItem('selectautoCookieConsent');
    if (!consent) {
      cookieBanner.classList.add('visible');
    }

    cookieAccept.addEventListener('click', () => {
      window.localStorage.setItem('selectautoCookieConsent', 'accepted');
      cookieBanner.classList.remove('visible');
    });
  }
})();
