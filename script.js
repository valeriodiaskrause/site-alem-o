/**
 * ============================================================
 * GERADOR DE LINKS (edite os valores abaixo)
 * ============================================================
 *
 * WhatsApp:
 *   Formato: https://wa.me/55DDDNUMERO?text=SUA_MENSAGEM
 *   Exemplo: https://wa.me/5527999320154?text=Olá!%20Vim%20pelo%20site.
 *
 * Google Maps (como chegar):
 *   Formato: https://www.google.com/maps/dir/?api=1&destination=LATITUDE,LONGITUDE
 *   Exemplo: https://www.google.com/maps/dir/?api=1&destination=-18.123,-40.456
 *   Ou use o endereço: https://www.google.com/maps/dir/?api=1&destination=Rua+Exemplo+123+Cidade+UF
 *
 * Google Empresa (perfil):
 *   Formato: https://www.google.com/maps/place/?q=place_id:SEU_PLACE_ID
 *   Ou copie diretamente o link "Compartilhar" do seu Perfil da Empresa.
 *
 * Avaliações do Google:
 *   Formato: https://search.google.com/local/writereview?placeid=SEU_PLACE_ID
 *   Ou: https://www.google.com/maps/place/NOME+EMPRESA/@LAT,LNG/reviews
 *
 * ============================================================
 */

document.addEventListener('DOMContentLoaded', () => {

  // ---- MENU MOBILE ----
  const menuToggle = document.getElementById('menuToggle');
  const nav = document.getElementById('nav');
  const navLinks = nav.querySelectorAll('a');

  menuToggle.addEventListener('click', () => {
    nav.classList.toggle('open');
    const isOpen = nav.classList.contains('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Fechar menu' : 'Abrir menu');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => nav.classList.remove('open'));
  });

  // ---- TEMA CLARO/ESCURO ----
  const themeToggle = document.getElementById('themeToggle');
  const heroFaixada = document.getElementById('heroFaixada');
  const aboutFaixada = document.getElementById('aboutFaixada');

  const updateThemeImages = (isDark) => {
    const daySrc = 'imagens/faixada.webp';
    const nightSrc = 'imagens/faixada-noite.webp';
    if (heroFaixada) heroFaixada.src = isDark ? nightSrc : daySrc;
    if (aboutFaixada) aboutFaixada.src = isDark ? nightSrc : daySrc;

    // Atualiza outras imagens baseadas nos atributos data-light e data-dark
    document.querySelectorAll('img[data-light][data-dark]').forEach(img => {
      img.src = isDark ? img.getAttribute('data-dark') : img.getAttribute('data-light');
    });
  };
  const storedTheme = window.localStorage.getItem('theme');
  if (storedTheme === 'dark') {
    document.body.classList.add('dark-mode');
    updateThemeImages(true);
  } else {
    updateThemeImages(false);
  }
  if (themeToggle) {
    const updateLabel = () => {
      const isDark = document.body.classList.contains('dark-mode');
      themeToggle.textContent = isDark ? 'Modo claro' : 'Modo escuro';
      themeToggle.setAttribute('aria-pressed', isDark ? 'true' : 'false');
    };
    updateLabel();
    themeToggle.addEventListener('click', () => {
      const isDark = document.body.classList.toggle('dark-mode');
      window.localStorage.setItem('theme', isDark ? 'dark' : 'light');
      updateLabel();
      updateThemeImages(isDark);
    });
  }

  // ---- HEADER SCROLL ----
  const header = document.getElementById('header');
  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 40);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ---- NAV ACTIVE LINK ----
  const sections = document.querySelectorAll('section[id]');
  const observerNav = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const id = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === '#' + id);
        });
      }
    });
  }, { rootMargin: '-40% 0px -55% 0px' });
  sections.forEach(s => observerNav.observe(s));

  // ---- FADE-UP ANIMATIONS ----
  const fadeEls = document.querySelectorAll('.fade-up');
  const observerFade = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observerFade.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });
  fadeEls.forEach(el => observerFade.observe(el));

  // ---- FAQ ACCORDION ----
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const btn = item.querySelector('.faq-question');
    btn.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // fecha todos
      faqItems.forEach(i => {
        i.classList.remove('active');
        i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      });
      // abre o clicado (se não estava aberto)
      if (!isActive) {
        item.classList.add('active');
        btn.setAttribute('aria-expanded', 'true');
      }
    });
  });

  // ---- GALERIA MODAL ----
  const galleryItems = document.querySelectorAll('.gallery-item img');
  const modal = document.getElementById('galleryModal');
  const modalImg = document.getElementById('modalImg');
  const modalClose = document.getElementById('modalClose');

  galleryItems.forEach(img => {
    img.addEventListener('click', () => {
      modalImg.src = img.src;
      modalImg.alt = img.alt;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  });

  const closeModal = () => {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  };

  modalClose.addEventListener('click', closeModal);
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closeModal();
  });

  // ---- SMOOTH SCROLL para links internos ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });

});
