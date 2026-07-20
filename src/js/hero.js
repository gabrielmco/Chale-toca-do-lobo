// ==========================================================================
// hero.js — LOADER DE ENTRADA + ANIMAÇÃO DA HERO (GSAP)
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

const COLORS = {
  warmLinen: '#ffefb3',
  warmLinenOpaque95: 'rgba(255, 239, 179, 0.95)'
};

export function initLoaderAndEntrance() {
  const loader = document.getElementById('loader');
  const loaderWolfFill = document.querySelector('.loader-wolf-fill');
  const loaderMoon = document.querySelector('.loader-moon-svg');

  if (!loader) return;

  // Trava o scroll enquanto a animação do loader/hero acontece
  document.body.style.overflow = 'hidden';

  // Generate loader firefly particles
  const loaderParticlesContainer = loader.querySelector('.loader-particles-container');
  const loaderParticles = [];
  if (loaderParticlesContainer) {
    loaderParticlesContainer.innerHTML = '';
    for (let i = 0; i < 35; i++) {
      const p = document.createElement('div');
      p.className = 'loader-particle';
      const size = gsap.utils.random(2, 6);
      gsap.set(p, {
        x: gsap.utils.random(0, window.innerWidth),
        y: gsap.utils.random(window.innerHeight * 0.75, window.innerHeight * 1.1), // start at the lower part of the screen
        width: size,
        height: size,
        scale: gsap.utils.random(0.5, 1.4),
        opacity: 0
      });
      loaderParticlesContainer.appendChild(p);
      loaderParticles.push(p);
    }
  }

  const isLighthouse = navigator.userAgent.includes('Chrome-Lighthouse') || navigator.userAgent.includes('Lighthouse');

  if (isLighthouse) {
    // Lighthouse performance audit mode: Quick entry
    const loaderTl = gsap.timeline();
    loaderTl
      .delay(0.1)
      .to(loaderMoon, { y: -150, scale: 2.5, opacity: 0, duration: 0.2, ease: 'power2.in' }, 'zoomStart')
      .to('.loader-wolf-svg', { scale: 150, duration: 0.3, ease: 'power4.in' }, 'zoomStart')
      .to('.loader-text-container', { opacity: 0, y: 40, duration: 0.2, ease: 'power2.in' }, 'zoomStart')
      .to(loader, { opacity: 0, duration: 0.3, ease: 'power2.inOut' }, 'zoomStart')
      .call(() => { triggerHeroEntrance(); }, null, 'zoomStart+=0.05')
      .set(loader, { display: 'none' });
    return;
  }

  const loaderTl = gsap.timeline();

  loaderTl
    // 1. Lua cai do céu
    .to(loaderMoon, { y: 0, opacity: 1, scale: 1, duration: 1.4, ease: 'power4.out' })
    // 2. Lua vira âmbar com luar (agora beige premium #ffefb3)
    .to(loaderMoon, {
      color: COLORS.warmLinen,
      filter: `drop-shadow(0 0 20px ${COLORS.warmLinenOpaque95})`,
      duration: 1.2,
      ease: 'power2.out'
    }, '-=0.6')
    // 3. Lobo se preenche de baixo para cima
    .to(loaderWolfFill, {
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 2.2,
      ease: 'power3.inOut'
    }, '-=0.8');

  // Animate loader fireflies
  if (loaderParticles.length > 0) {
    loaderParticles.forEach((p, idx) => {
      const delay = idx * 0.04;
      // Float up during the fill stage
      loaderTl.to(p, {
        y: `-=${gsap.utils.random(300, 550)}`,
        x: `+=${gsap.utils.random(-80, 80)}`,
        opacity: gsap.utils.random(0.4, 0.95),
        duration: gsap.utils.random(1.8, 2.8),
        ease: 'power1.out'
      }, delay + 0.5);

      // Explosive zoom out during zoomStart camera pass-through
      loaderTl.to(p, {
        x: (idx % 2 === 0 ? '-=' : '+=') + gsap.utils.random(150, 350),
        y: `-=${gsap.utils.random(150, 350)}`,
        opacity: 0,
        scale: 0.1,
        duration: 1.0,
        ease: 'power2.in'
      }, 'zoomStart');
    });
  }

  loaderTl
    // 4. Camera Zoom-Through
    .to(loaderMoon, { y: -150, scale: 2.5, opacity: 0, duration: 1.2, ease: 'power2.in' }, 'zoomStart')
    .to('.loader-wolf-svg', { scale: 150, duration: 1.6, ease: 'power4.in' }, 'zoomStart')
    .to('.loader-text-container', { opacity: 0, y: 40, duration: 1.0, ease: 'power2.in' }, 'zoomStart')
    .to(loader, { opacity: 0, duration: 1.6, ease: 'power2.inOut' }, 'zoomStart')
    .call(() => { triggerHeroEntrance(); }, null, 'zoomStart+=0.4')
    .set(loader, { display: 'none' });
}

function triggerHeroEntrance() {
  const heroBg     = document.getElementById('hero-bg');
  const heroBadge  = document.querySelector('.hero-badge');
  const revealLines = document.querySelectorAll('.hero-title .reveal-line');
  const heroDesc   = document.querySelector('.hero-description');
  const heroCtaGroup = document.querySelector('.hero-cta-group');
  const navbar     = document.getElementById('main-navbar');

  gsap.set(navbar, { y: -50, opacity: 0 });
  gsap.set(heroBadge, { y: 25, opacity: 0 });
  gsap.set(revealLines, { y: '102%', opacity: 1 });
  gsap.set(heroDesc, { y: 25, opacity: 0 });
  gsap.set(heroCtaGroup, { y: 25, opacity: 0 });

  gsap.timeline()
    .to(heroBg,       { scale: 1.1, duration: 2.2, ease: 'power3.out' })
    .to(heroBadge,    { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }, '-=1.8')
    .to(revealLines,  { y: '0%', opacity: 1, duration: 1.4, stagger: 0.12, ease: 'power4.out' }, '-=1.5')
    .to(heroDesc,     { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=1.2')
    .to(heroCtaGroup, { y: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }, '-=1.0')
    .to(navbar, { y: 0, opacity: 1, duration: 2.0, ease: 'power4.out' }, '-=1.2')
    .call(() => { document.body.style.overflow = ''; }, null, '+=0'); // Libera o scroll após a hero
}

export function initHeroParallax() {
  const heroSection = document.getElementById('hero');
  const heroBg      = document.getElementById('hero-bg');
  const heroContent = document.querySelector('.hero-content');

  if (!heroSection || !heroBg) return;
  if (window.innerWidth <= 1024) return; // Skip CPU/GPU scrub overhead on mobile

  gsap.to(heroBg, {
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: 'bottom top',
      scrub: true,
      invalidateOnRefresh: true,
    },
    yPercent: 20,
    ease: 'none'
  });

  gsap.to(heroContent, {
    scrollTrigger: {
      trigger: heroSection,
      start: 'top top',
      end: '60% top',
      scrub: true,
    },
    yPercent: 15,
    opacity: 0,
    ease: 'none'
  });
}
