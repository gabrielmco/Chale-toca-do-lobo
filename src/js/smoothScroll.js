import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

export let lenis;

export async function initSmoothScroll() {
  const isMobile = window.matchMedia('(max-width: 1024px)').matches;

  if (isMobile) {
    // Mobile: use native momentum scroll (saves bundles, saves CPU!)
    initAnchorLinksFallback();
    return;
  }

  try {
    // Desktop: load Lenis dynamically to keep it out of the main chunk
    const { default: Lenis } = await import('lenis');

    lenis = new Lenis({
      duration: 1.85,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 0.92,
      touchMultiplier: 1.35,
    });

    lenis.on('scroll', ScrollTrigger.update);

    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });

    gsap.ticker.lagSmoothing(0);

    initAnchorLinks();
  } catch (err) {
    console.error('Error loading Lenis:', err);
    initAnchorLinksFallback();
  }
}

function initAnchorLinks() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement && lenis) {
        e.preventDefault();
        
        let scrollTarget = targetElement;
        const pinSpacer = targetElement.closest('.pin-spacer');
        
        if (pinSpacer) {
          if (targetId === '#experiencias-section') {
            const rect = pinSpacer.getBoundingClientRect();
            scrollTarget = rect.bottom + window.scrollY - window.innerHeight;
          } else {
            scrollTarget = pinSpacer;
          }
        }
        
        lenis.scrollTo(scrollTarget, {
          offset: 0,
          duration: 1.5,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t))
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
          }
          document.getElementById('main-navbar')?.classList.remove('menu-open');
          document.body.classList.remove('mobile-menu-open');
          document.body.style.overflow = '';
          lenis.start();
        }
      }
    });
  });
}

function initAnchorLinksFallback() {
  const anchors = document.querySelectorAll('a[href^="#"]');
  
  anchors.forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        
        targetElement.scrollIntoView({
          behavior: 'smooth'
        });

        // Close mobile menu if open
        const mobileMenu = document.getElementById('mobile-menu');
        const menuToggle = document.getElementById('menu-toggle');
        if (mobileMenu && mobileMenu.classList.contains('active')) {
          mobileMenu.classList.remove('active');
          if (menuToggle) {
            menuToggle.classList.remove('active');
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.setAttribute('aria-label', 'Abrir menu');
          }
          document.getElementById('main-navbar')?.classList.remove('menu-open');
          document.body.classList.remove('mobile-menu-open');
          document.body.style.overflow = '';
        }
      }
    });
  });
}
