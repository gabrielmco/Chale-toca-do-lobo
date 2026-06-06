// ==========================================================================
// main.js — ORQUESTRADOR CENTRAL
// Importa e inicializa todos os módulos em ordem.
// NÃO escreva lógica aqui — só imports e chamadas de init.
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Registrar plugins GSAP globalmente
gsap.registerPlugin(ScrollTrigger);

// Módulos
import { initSmoothScroll }           from './smoothScroll.js';
import { initNavbarScroll, initMobileMenu } from './navbar.js';
import { initLoaderAndEntrance, initHeroParallax } from './hero.js';
import { initChale }                  from './chale.js';
import { initExperiencias }           from './experiencias.js';
import { initVideoTriptych }          from './videoTriptych.js';
import { initScrollMarquee }          from './scrollMarquee.js';
import { initFeedbackReveal }         from './feedback.js';
import { initReservationReveal }      from './reservation.js';
import { initFooter }                 from './footer.js';

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

  // 4. Seção do Chalé
  initChale();

  // 5. Seção de Experiências (Pontos Turísticos)
  initVideoTriptych();
  initExperiencias();
  initScrollMarquee();
  initMapInteraction();

  // ─── Adicione novos módulos aqui conforme o projeto cresce ───────────────
  // initDepoimentos();
  // initLocalizacao();
});

// Inicializar revelações dependentes de layout após todas as imagens e estilos carregarem
window.addEventListener('load', () => {
  initFeedbackReveal();
  initReservationReveal();
  initFooter();
  
  // Recalcular posições de todos os triggers na página
  ScrollTrigger.refresh();
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
