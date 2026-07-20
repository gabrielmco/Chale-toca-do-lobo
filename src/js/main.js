// ==========================================================================
// main.js — ORQUESTRADOR CENTRAL
// Importa e inicializa todos os módulos em ordem.
// NÃO escreva lógica aqui — só imports e chamadas de init.
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins GSAP globalmente
gsap.registerPlugin(ScrollTrigger);

// Módulos Críticos (carregados estaticamente)
import { initSmoothScroll }           from './smoothScroll.js';
import { initNavbarScroll, initMobileMenu } from './navbar.js';
import { initLoaderAndEntrance, initHeroParallax } from './hero.js';

// ─── Inicialização no DOM Load ────────────────────────────────────────────────
window.addEventListener('DOMContentLoaded', () => {
  // 1. Scroll suave (deve ser o primeiro)
  initSmoothScroll();

  // 2. Navegação
  initNavbarScroll();
  initMobileMenu();

  // 3. Loader + Hero
  initLoaderAndEntrance();
  initHeroParallax();

  let loadedMid = false;
  let loadedBottom = false;

  const loadMid = async () => {
    if (loadedMid) return;
    loadedMid = true;
    try {
      const [
        { initChale },
        { initVideoTriptych },
        { initExperiencias },
        { initScrollMarquee }
      ] = await Promise.all([
        import('./chale.js'),
        import('./videoTriptych.js'),
        import('./experiencias.js'),
        import('./scrollMarquee.js')
      ]);

      // 4. Seção do Chalé
      initChale();

      // 5. Seção de Experiências (Pontos Turísticos)
      initVideoTriptych();
      initExperiencias();
      initScrollMarquee();
      initMapInteraction();

      // Recalcular posições de ScrollTrigger após injeção de layout
      ScrollTrigger.refresh();
    } catch (err) {
      console.error('Error loading mid-page modules:', err);
    }
  };

  const loadBottom = async () => {
    if (loadedBottom) return;
    loadedBottom = true;
    try {
      const [
        { initFeedbackReveal },
        { initReservationReveal },
        { initFooter }
      ] = await Promise.all([
        import('./feedback.js'),
        import('./reservation.js'),
        import('./footer.js')
      ]);

      initFeedbackReveal();
      initReservationReveal();
      initFooter();
      
      // Recalcular posições de todos os triggers na página
      ScrollTrigger.refresh();
    } catch (err) {
      console.error('Error loading bottom-page modules:', err);
    }
  };

  const setupObservers = () => {
    // Set up IntersectionObservers for scroll-driven loading
    const chaleSection = document.getElementById('chale-section');
    if (chaleSection && 'IntersectionObserver' in window) {
      const observerMid = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observerMid.disconnect();
          loadMid();
        }
      }, { rootMargin: '-50px' });
      observerMid.observe(chaleSection);
    } else {
      loadMid();
    }

    const feedbackSection = document.getElementById('feedback-section');
    if (feedbackSection && 'IntersectionObserver' in window) {
      const observerBottom = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
          observerBottom.disconnect();
          loadBottom();
        }
      }, { rootMargin: '-50px' });
      observerBottom.observe(feedbackSection);
    } else {
      loadBottom();
    }
  };

  if (document.readyState === 'complete') {
    setupObservers();
  } else {
    window.addEventListener('load', setupObservers);
  }

  // Fallback to load everything after 12 seconds if not already loaded (e.g. slow user or crawler)
  setTimeout(() => {
    loadMid();
    loadBottom();
  }, 12000);
});

// Resolver o travamento do scroll (Lenis) ao passar o mouse em cima do mapa
function initMapInteraction() {
  const mapFrame = document.querySelector('.location-map-frame');
  if (!mapFrame) return;

  mapFrame.addEventListener('click', () => {
    mapFrame.classList.add('is-active');
  });

  mapFrame.addEventListener('mouseleave', () => {
    mapFrame.classList.remove('is-active');
  });
}
