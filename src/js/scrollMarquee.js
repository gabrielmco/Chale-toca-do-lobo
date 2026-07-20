// ==========================================================================
// scrollMarquee.js - Marquee infinito guiado pela direcao do scroll
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as smoothScroll from './smoothScroll.js';

gsap.registerPlugin(ScrollTrigger);

export function initScrollMarquee() {
  const stages = Array.from(document.querySelectorAll('.marquee-experiencias-stage'));
  if (!stages.length) return;

  stages.forEach(initMarqueeStage);
}

function initMarqueeStage(stage) {
  const section = stage.querySelector('.scroll-marquee-section');
  const lane = stage.querySelector('.scroll-marquee-lane');
  const track = stage.querySelector('.scroll-marquee-track');
  if (!section || !track) return;

  const marqueeText = 'CASA TOCA DO LOBO — CASA TOCA DO LOBO — CASA TOCA DO LOBO —';
  Array.from(track.children).forEach((child) => {
    child.textContent = marqueeText;
  });

  let x = 0;
  let velocity = -4.7;
  let targetVelocity = -4.7;
  let loopWidth = track.scrollWidth / Math.max(1, track.children.length);
  let isTicking = false;
  const setX = gsap.quickSetter(track, 'x', 'px');

  const syncMetrics = () => {
    loopWidth = Math.max(1, track.scrollWidth / Math.max(1, track.children.length));
  };

  const tick = () => {
    velocity += (targetVelocity - velocity) * 0.065;
    x = gsap.utils.wrap(-loopWidth, 0, x + velocity);
    setX(x);
  };

  const updateDirection = (delta) => {
    if (Math.abs(delta) < 0.15) return;

    const direction = delta > 0 ? -1 : 1;
    const boost = Math.min(Math.abs(delta) * 0.052, 9.4);
    targetVelocity = direction * (4.7 + boost);
  };

  const startTicker = () => {
    if (isTicking) return;
    isTicking = true;
    gsap.ticker.add(tick);
  };

  if (smoothScroll.lenis) {
    let lastScroll = window.scrollY;
    smoothScroll.lenis.on('scroll', (event) => {
      const currentScroll = event.scroll;
      updateDirection(currentScroll - lastScroll);
      lastScroll = currentScroll;
    });
  } else {
    let lastScroll = window.scrollY;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      updateDirection(currentScroll - lastScroll);
      lastScroll = currentScroll;
    }, { passive: true });
  }

  ScrollTrigger.create({
    trigger: section,
    start: 'top bottom',
    end: 'bottom top',
    onRefresh: syncMetrics
  });

  if (lane) {
    const pointsSection = stage.querySelector('.experiencias-section');
    const pointsContent = pointsSection ? pointsSection.querySelector('.reveal-content') : null;

    if (pointsSection) {
      const mm = gsap.matchMedia();

      // DESKTOP: Mantém toda a pinagem e o efeito do marquee reativo intactos
      mm.add("(min-width: 1025px)", () => {
        gsap.set(pointsSection, { yPercent: 100 });
        if (pointsContent) gsap.set(pointsContent, { y: 56, opacity: 0.98 });

        const getPinDistance = () => window.innerHeight * 1.95;

        const revealTimeline = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage,
            start: 'top top',
            end: () => `+=${getPinDistance()}`,
            pin: true,
            scrub: 0.92,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            refreshPriority: -50
          }
        });

        revealTimeline
          .to(lane, {
            x: () => -window.innerWidth * 0.24,
            y: () => window.innerHeight * 0.34,
            rotate: -2.4,
            opacity: 0.42,
            duration: 0.82
          }, 0.18)
          .to(pointsSection, {
            yPercent: 0,
            duration: 0.82
          }, 0.18);

        if (pointsContent) {
          revealTimeline.to(pointsContent, {
            y: 0,
            opacity: 1,
            duration: 0.62
          }, 0.34);

          revealTimeline.to(pointsContent, {
            y: -6,
            duration: 0.16
          }, 1);
        }
      });

      // MOBILE/TABLET: Desativa toda a pinagem e as translações verticais
      mm.add("(max-width: 1024px)", () => {
        gsap.set(pointsSection, { clearProps: "yPercent,position,inset,zIndex" });
        if (pointsContent) gsap.set(pointsContent, { clearProps: "y,opacity" });
        gsap.set(lane, { clearProps: "x,y,rotate,opacity" });
      });
    }
  }

  let lastMarqueeWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastMarqueeWidth) return;
    lastMarqueeWidth = window.innerWidth;
    requestAnimationFrame(syncMetrics);
  }, { passive: true });

  syncMetrics();
  startTicker();
}
