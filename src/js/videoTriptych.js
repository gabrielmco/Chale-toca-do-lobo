// ==========================================================================
// videoTriptych.js - Videos verticais com SplitText e scrub progressivo
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const COLORS = {
  warmLinen: '#ffefb3',
  white: '#ffffff',
  warmLinenGlow60: 'rgba(255, 239, 179, 0.6)',
  warmLinenGlow85: 'rgba(255, 239, 179, 0.85)',
  whiteGlow30: 'rgba(255, 255, 255, 0.3)',
  whiteGlow15: 'rgba(255, 255, 255, 0.15)'
};

export function initVideoTriptych() {
  const section = document.getElementById('video-triptych');
  if (!section) return;

  const cards = Array.from(section.querySelectorAll('[data-video-card]'));
  const wrappers = cards.map((card) => card.querySelector('.video-parallax-wrapper')).filter(Boolean);
  const videos = cards.map((card) => card.querySelector('video')).filter(Boolean);
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isResponsiveLayout = window.matchMedia('(max-width: 1024px)').matches;

  videos.forEach((video) => {
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.pause();
  });

  // initVideoCopyReveal(section, prefersReducedMotion);
  initVideoLogoReveal(section, prefersReducedMotion, isResponsiveLayout);
  initResponsiveVideoCarousel(section, cards);

  const wolfContainer = section.querySelector('.video-reveal-logo-container');
  const allRevealItems = [];
  if (wolfContainer) allRevealItems.push(wolfContainer);
  allRevealItems.push(...Array.from(section.querySelectorAll('[data-video-card]')));

  if (prefersReducedMotion) {
    gsap.set([...allRevealItems, ...wrappers, ...videos], { clearProps: 'opacity,visibility,transform,willChange' });
  } else {
    gsap.fromTo(allRevealItems,
      {
        y: 72,
        autoAlpha: 0,
        willChange: 'transform, opacity'
      },
      {
        y: 0,
        autoAlpha: 1,
        duration: 1.02,
        stagger: 0.08,
        ease: 'power4.out',
        clearProps: 'transform, willChange', // Clear transforms on completion to allow CSS media queries to override
        scrollTrigger: {
          trigger: section,
          start: 'top 68%',
          once: true,
          invalidateOnRefresh: true
        }
      }
    );
  }

  // Lazy-play / Pause all videos when they enter/leave viewport
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      const video = entry.target;
      if (entry.isIntersecting) {
        if (video.paused) {
          video.play().catch(() => {});
        }
      } else {
        if (!video.paused) {
          video.pause();
        }
      }
    });
  }, {
    rootMargin: '120px',
    threshold: 0.02
  });

  section.querySelectorAll('video').forEach((video) => {
    videoObserver.observe(video);
  });
}

function initResponsiveVideoCarousel(section, cards) {
  const carousel = section.querySelector('.video-triptych-grid');
  if (!carousel || !cards.length || !window.matchMedia('(max-width: 1024px)').matches) return;

  carousel.setAttribute('tabindex', '0');
  carousel.classList.add('is-looping-carousel');
  carousel.querySelectorAll('.video-card.is-clone').forEach((clone) => clone.remove());

  const realCards = Array.from(cards);
  realCards.forEach((card, index) => {
    card.dataset.videoIndex = String(index);
    card.classList.remove('is-clone');
    if (index === 0) {
      card.classList.add('is-active');
    } else {
      card.classList.remove('is-active');
    }
  });

  const existingControls = section.querySelector('.video-carousel-controls');
  if (existingControls) existingControls.remove();

  const controls = document.createElement('div');
  controls.className = 'video-carousel-controls';
  controls.innerHTML = `
    <button class="video-carousel-btn video-carousel-prev" type="button" aria-label="V&iacute;deo anterior">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 6 9 12l6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="video-carousel-dots" aria-hidden="true">
      ${realCards.map((_card, index) => `<span class="video-carousel-dot${index === 0 ? ' is-active' : ''}" data-video-dot="${index}"></span>`).join('')}
    </div>
    <button class="video-carousel-btn video-carousel-next" type="button" aria-label="Pr&oacute;ximo v&iacute;deo">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;

  carousel.insertAdjacentElement('afterend', controls);

  const prev = controls.querySelector('.video-carousel-prev');
  const next = controls.querySelector('.video-carousel-next');
  const dots = Array.from(controls.querySelectorAll('.video-carousel-dots span'));

  const getCardLeft = (card) => card.offsetLeft - (carousel.clientWidth - card.offsetWidth) * 0.5;

  const getCenteredIndex = () => {
    const center = carousel.scrollLeft + carousel.clientWidth * 0.5;
    let activeIndex = 0;
    let activeDistance = Infinity;

    realCards.forEach((card, index) => {
      const cardCenter = card.offsetLeft + card.offsetWidth * 0.5;
      const distance = Math.abs(cardCenter - center);
      if (distance < activeDistance) {
        activeDistance = distance;
        activeIndex = index;
      }
    });

    return activeIndex;
  };

  const updateDots = () => {
    const activeIndex = getCenteredIndex();
    realCards.forEach((card, index) => {
      card.classList.toggle('is-active', index === activeIndex);
    });
    dots.forEach((dot, index) => {
      dot.classList.toggle('is-active', index === activeIndex);
    });
  };

  let scrollTimer = null;
  carousel.addEventListener('scroll', () => {
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(updateDots, 60);
  }, { passive: true });

  const navigate = (direction) => {
    const currentIndex = getCenteredIndex();
    const targetIndex = Math.max(0, Math.min(realCards.length - 1, currentIndex + direction));
    const targetCard = realCards[targetIndex];
    if (targetCard) {
      carousel.scrollTo({
        left: getCardLeft(targetCard),
        behavior: 'smooth'
      });
    }
  };

  prev?.addEventListener('click', () => navigate(-1));
  next?.addEventListener('click', () => navigate(1));

  // Initial call
  updateDots();
}

function initVideoLogoReveal(section, prefersReducedMotion, isResponsiveLayout = false) {
  const container = section.querySelector('.video-reveal-logo-container');
  if (!container) return;

  const moonWrapper = container.querySelector('.wolf-card-moon-wrapper');
  const moon = container.querySelector('.wolf-card-moon');
  const wolfFill = container.querySelector('.wolf-card-silhouette-fill');
  const sectionParticlesContainer = section.querySelector('#video-section-particles');

  // Generate section-wide firefly particles (increased count and positioned outside the transparent wolf card area)
  const numParticles = isResponsiveLayout ? 36 : 75;
  const particles = [];
  if (sectionParticlesContainer) {
    sectionParticlesContainer.innerHTML = ''; // clear any existing
    for (let i = 0; i < numParticles; i++) {
      const p = document.createElement('div');
      p.className = 'video-triptych-particle';
      const size = gsap.utils.random(2, 5);
      // Avoid the wolf card (from 4% to 26% width of the section)
      const leftVal = isResponsiveLayout
        ? gsap.utils.random(8, 92)
        : gsap.utils.random(0, 1) < 0.05 ? gsap.utils.random(0, 3) : gsap.utils.random(27, 98);
      gsap.set(p, {
        left: `${leftVal}%`,
        top: `${gsap.utils.random(5, 95)}%`, // distributed across the entire section height
        width: size,
        height: size,
        scale: gsap.utils.random(0.6, 1.4),
        opacity: 0
      });
      sectionParticlesContainer.appendChild(p);
      particles.push(p);
    }
  }

  if (prefersReducedMotion) {
    gsap.set(wolfFill, { clipPath: 'inset(0% 0% 0% 0%)' });
    if (moonWrapper && moon) {
      gsap.set(moonWrapper, { opacity: 1, y: 0, scale: 1 });
      gsap.set(moon, {
        backgroundColor: COLORS.warmLinen,
        boxShadow: `0 0 25px ${COLORS.warmLinen}, 0 0 50px ${COLORS.warmLinenGlow60}`
      });
    }
    return;
  }

  if (moonWrapper && moon) {
    gsap.set(moonWrapper, {
      y: 80,
      opacity: 0,
      scale: 0.6
    });
    gsap.set(moon, {
      backgroundColor: COLORS.white,
      boxShadow: `0 0 25px ${COLORS.whiteGlow30}, 0 0 50px ${COLORS.whiteGlow15}`
    });
  }

  gsap.set(wolfFill, {
    clipPath: 'inset(100% 0% 0% 0%)'
  });

  // Create ScrollTrigger timeline tied directly to scroll progress (triggering when the card enters the screen)
  const scrollTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: isResponsiveLayout ? section : container.parentElement || container,
      start: isResponsiveLayout ? 'top 82%' : 'top 65%',
      end: isResponsiveLayout ? 'top 34%' : 'bottom 15%',
      scrub: isResponsiveLayout ? 0.7 : 1.0,
      invalidateOnRefresh: true
    }
  });

  if (moonWrapper && moon) {
    scrollTimeline.to(moonWrapper, {
      y: 0,
      opacity: 1,
      scale: 1,
      duration: 0.4,
      ease: 'power3.out'
    }, 0);

    scrollTimeline.to(moon, {
      backgroundColor: COLORS.warmLinen,
      boxShadow: `0 0 25px ${COLORS.warmLinen}, 0 0 50px ${COLORS.warmLinenGlow85}`,
      duration: 0.4,
      ease: 'power3.out'
    }, 0);
  }

  // Wolf fill reveals from bottom to top (inset 100% -> 0%)
  scrollTimeline.to(wolfFill, {
    clipPath: 'inset(0% 0% 0% 0%)',
    duration: 0.35,
    ease: 'power2.out'
  }, 0.05);

  // Spacer to extend the timeline to 1.0, ensuring the animations complete within the first 40% of scroll
  scrollTimeline.to({}, { duration: 0.6 }, 0.4);

  // Create a separate ScrollTrigger timeline for section-wide background particles to rise on scroll
  if (particles.length > 0) {
    const particlesTimeline = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top bottom', // starts when section enters viewport
        end: 'bottom top',   // ends when section leaves viewport
        scrub: 1.2,
        invalidateOnRefresh: true
      }
    });

    particles.forEach((p, idx) => {
      // Float up and drift left/right
      particlesTimeline.to(p, {
        yPercent: -180 - gsap.utils.random(0, 180),
        x: () => gsap.utils.random(-80, 80),
        opacity: () => gsap.utils.random(0.4, 0.95),
        scale: '+=0.2',
        duration: 1.0
      }, idx * 0.015);

      // Fade out towards the top
      particlesTimeline.to(p, {
        opacity: 0,
        scale: 0.2,
        duration: 0.3
      }, idx * 0.015 + 0.7);
    });
  }
}

/* Arquivado: Lógica anterior de reveal de textos
function initVideoCopyReveal(section, prefersReducedMotion) {
  const copy = section.querySelector('.video-triptych-copy');
  if (!copy) return;

  const kicker = copy.querySelector('.video-triptych-kicker');
  const title = copy.querySelector('h2');
  const sub = copy.querySelector('.video-triptych-sub');
  const actions = Array.from(copy.querySelectorAll('a, button'));
  const titleSplit = title ? SplitText.create(title, {
    type: 'words',
    mask: 'words',
    wordsClass: 'video-title-word',
    aria: 'auto'
  }) : null;
  const subSplit = sub ? SplitText.create(sub, {
    type: 'lines',
    mask: 'lines',
    linesClass: 'video-sub-line',
    aria: 'auto'
  }) : null;
  const titleWords = titleSplit ? titleSplit.words : title ? [title] : [];
  const subLines = subSplit ? subSplit.lines : sub ? [sub] : [];
  const revealItems = [kicker, ...titleWords, ...subLines, ...actions].filter(Boolean);

  if (!revealItems.length) return;

  if (prefersReducedMotion) {
    gsap.set(revealItems, { clearProps: 'opacity,visibility,transform,clipPath,willChange' });
    return;
  }

  gsap.set(kicker, {
    x: -42,
    autoAlpha: 0,
    clipPath: 'inset(0% 100% 0% 0%)',
    willChange: 'transform, opacity, clip-path'
  });

  gsap.set(titleWords, {
    yPercent: 116,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  gsap.set([...subLines, ...actions], {
    y: 42,
    autoAlpha: 0,
    clipPath: 'inset(12% 0% 0% 0%)',
    willChange: 'transform, opacity, clip-path'
  });

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top 95%',
      end: 'bottom 95%',
      scrub: 1.0,
      invalidateOnRefresh: true
    }
  })
    .to(kicker, {
      x: 0,
      autoAlpha: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.28
    }, 0)
    .to(titleWords, {
      yPercent: 0,
      autoAlpha: 1,
      duration: 0.72,
      stagger: 0.02
    }, 0.08)
    .to(subLines, {
      y: 0,
      autoAlpha: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.42,
      stagger: 0.035
    }, 0.38)
    .to(actions, {
      y: 0,
      autoAlpha: 1,
      clipPath: 'inset(0% 0% 0% 0%)',
      duration: 0.34
    }, 0.5);
}
*/
