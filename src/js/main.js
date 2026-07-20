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
    // Eagerly preload mid and bottom sections during page load/loader screen
    // so GSAP ScrollTriggers are fully initialized before user starts scrolling.
    if ('requestIdleCallback' in window) {
      requestIdleCallback(() => {
        loadMid();
        loadBottom();
      }, { timeout: 1500 });
    } else {
      setTimeout(() => {
        loadMid();
        loadBottom();
      }, 50);
    }
  };

  // Immediate eager load of critical mid sections
  loadMid();

  if (document.readyState === 'complete') {
    setupObservers();
  } else {
    window.addEventListener('load', setupObservers);
  }
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
