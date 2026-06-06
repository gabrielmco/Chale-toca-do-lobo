// ==========================================================================
// footer.js - Edge-to-edge footer parallax, fireflies and SplitText reveal
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initFooter() {
  const footer = document.getElementById('site-footer');
  if (!footer) return;

  const bg = footer.querySelector('.footer-bg');
  const stars = footer.querySelector('.footer-stars');
  const moonWrapper = footer.querySelector('.footer-moon-wrapper');
  const moon = footer.querySelector('.footer-moon');
  const silWrapper = footer.querySelector('.footer-silhouette-wrapper');
  const silFill = footer.querySelector('.footer-silhouette-fill');
  const particlesContainer = footer.querySelector('.footer-particles-container');
  const brandTitle = document.getElementById('footer-brand-title');
  const content = footer.querySelector('.site-footer-content');

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isResponsiveLayout = window.matchMedia('(max-width: 1024px)').matches;
  const allowPointerParallax = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const contentItems = content ? Array.from(content.querySelectorAll('.site-footer-main p, .site-footer-links a')) : [];

  // 1. Static Wolf Silhouette Mask is set directly in CSS (_reservation.scss)

  // 2. Generate Firefly Particles
  const numParticles = isResponsiveLayout ? 12 : 20;
  const particles = [];
  if (particlesContainer) {
    particlesContainer.innerHTML = '';
    for (let i = 0; i < numParticles; i++) {
      const p = document.createElement('div');
      p.className = 'footer-particle';
      const size = gsap.utils.random(2, 5);
      gsap.set(p, {
        x: gsap.utils.random(50, window.innerWidth - 50),
        y: gsap.utils.random(200, 360), // float in the middle/lower footer area
        width: size,
        height: size,
        scale: gsap.utils.random(0.6, 1.3),
        opacity: 0
      });
      particlesContainer.appendChild(p);
      particles.push(p);

      // Start perpetual infinite drift animation immediately
      animateParticleDrift(p);
    }
  }

  // 3. Setup SplitText on Brand Title
  let titleSplit = null;
  if (brandTitle) {
    titleSplit = SplitText.create(brandTitle, {
      type: 'words,chars',
      charsClass: 'footer-brand-char',
      aria: 'auto'
    });
  }

  if (prefersReducedMotion) {
    gsap.set(silFill, { clipPath: 'inset(0% 0% 0% 0%)' });
    if (titleSplit) {
      gsap.set(titleSplit.chars, { opacity: 1, x: 0 });
    }
    gsap.set(contentItems, { opacity: 1, y: 0 });
    return;
  }

  // Set initial states
  gsap.set(silFill, {
    clipPath: 'inset(100% 0% 0% 0%)'
  });
  if (titleSplit && titleSplit.chars) {
    gsap.set(titleSplit.chars, {
      x: -18,
      opacity: 0
    });
  }
  if (isResponsiveLayout) {
    gsap.set(contentItems, {
      y: 18,
      opacity: 0,
      willChange: 'transform, opacity'
    });
  }

  // 4. Create Scroll-Reveal Timeline
  // start: 'top bottom' means starts revealing as soon as the footer top enters the bottom of the viewport.
  // end: 'bottom bottom' means animation reaches 100% when the page is scrolled to the absolute bottom.
  // refreshPriority: -200 ensures footer triggers calculate position AFTER sections above them.
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: footer,
      start: 'top 85%',
      end: 'bottom bottom',
      scrub: 1.5,
      invalidateOnRefresh: true,
      refreshPriority: -200
    }
  });

  // Wolf silhouette fill (reveal bottom-to-top)
  scrollTimeline.to(silFill, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 1.4,
    ease: 'none'
  }, 0.2);

  // Staggered left-to-right character slide reveal
  if (titleSplit && titleSplit.chars && titleSplit.chars.length > 0) {
    scrollTimeline.to(titleSplit.chars, {
      x: 0,
      opacity: 1,
      stagger: 0.04,
      duration: 1.0,
      ease: 'power3.out'
    }, 0.35);
  }

  if (isResponsiveLayout && contentItems.length) {
    scrollTimeline.to(contentItems, {
      y: 0,
      opacity: 1,
      stagger: 0.055,
      duration: 0.9,
      ease: 'power3.out'
    }, 0.48);
  }

  // 5. Interactive Mouse-Hover Depth Parallax
  if (allowPointerParallax) footer.addEventListener('mousemove', (e) => {
    const rect = footer.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5; // range: -0.5 to 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5; // range: -0.5 to 0.5

    // Depth Layer Translation
    if (bg) {
      gsap.to(bg, {
        x: -x * 20,
        y: -y * 20,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
    if (stars) {
      gsap.to(stars, {
        x: -x * 10,
        y: -y * 10,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
    if (silWrapper) {
      gsap.to(silWrapper, {
        x: x * 15,
        y: y * 15,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
    if (content) {
      gsap.to(content, {
        x: x * 12,
        y: y * 12,
        duration: 0.6,
        ease: 'power2.out',
        overwrite: 'auto'
      });
    }
  });

  if (allowPointerParallax) footer.addEventListener('mouseleave', () => {
    // Smooth reset all parallax offsets
    const duration = 0.9;
    const ease = 'power3.out';

    if (bg) gsap.to(bg, { x: 0, y: 0, duration, ease, overwrite: 'auto' });
    if (stars) gsap.to(stars, { x: 0, y: 0, duration, ease, overwrite: 'auto' });
    if (silWrapper) gsap.to(silWrapper, { x: 0, y: 0, duration, ease, overwrite: 'auto' });
    if (content) gsap.to(content, { x: 0, y: 0, duration, ease, overwrite: 'auto' });
  });
}

// Standalone infinite drifting firefly animation
function animateParticleDrift(p) {
  const resetAndDrift = () => {
    const startX = gsap.utils.random(50, window.innerWidth - 50);
    const startY = gsap.utils.random(220, 380);

    gsap.set(p, {
      x: startX,
      y: startY,
      opacity: 0,
      scale: gsap.utils.random(0.6, 1.3)
    });

    const driftDuration = gsap.utils.random(3.0, 5.0);

    gsap.timeline({
      onComplete: resetAndDrift
    })
      .to(p, {
        opacity: gsap.utils.random(0.35, 0.9),
        duration: driftDuration * 0.3,
        ease: 'power1.out'
      }, 0)
      .to(p, {
        y: `-=${gsap.utils.random(100, 180)}`,
        x: `+=${gsap.utils.random(-40, 40)}`,
        scale: '+=0.2',
        duration: driftDuration,
        ease: 'power1.inOut'
      }, 0)
      .to(p, {
        opacity: 0,
        duration: driftDuration * 0.3,
        ease: 'power1.in'
      }, driftDuration * 0.7);
  };

  // Stagger initial starts randomly
  gsap.delayedCall(gsap.utils.random(0, 3.5), resetAndDrift);
}


