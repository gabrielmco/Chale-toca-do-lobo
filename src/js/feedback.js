// ==========================================================================
// feedback.js - Feedbacks em marquee com reveal scrubbed
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

export function initFeedbackReveal() {
  const section = document.getElementById('feedback-section');
  if (!section) return;

  const marquee = section.querySelector('[data-feedback-marquee]');
  const track = section.querySelector('.feedback-track');
  const kicker = section.querySelector('.feedback-kicker');
  const title = section.querySelector('.feedback-title');
  const sub = section.querySelector('.feedback-sub');
  const cards = Array.from(section.querySelectorAll('.feedback-card'));
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isResponsiveLayout = window.matchMedia('(max-width: 1024px)').matches;
  const isPointerFine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;

  const kickerSplit = kicker ? SplitText.create(kicker, {
    type: 'words',
    mask: 'words',
    wordsClass: 'feedback-kicker-word'
  }) : null;
  const titleSplit = title ? SplitText.create(title, {
    type: 'words',
    mask: 'words',
    wordsClass: 'feedback-title-word'
  }) : null;
  const subSplit = sub ? SplitText.create(sub, {
    type: 'words',
    mask: 'words',
    wordsClass: 'feedback-sub-word'
  }) : null;

  if (kicker) kicker.removeAttribute('aria-label');
  if (title) title.removeAttribute('aria-label');
  if (sub) sub.removeAttribute('aria-label');

  const kickerWords = kickerSplit ? kickerSplit.words : kicker ? [kicker] : [];
  const titleWords = titleSplit ? titleSplit.words : title ? [title] : [];
  const subWords = subSplit ? subSplit.words : sub ? [sub] : [];
  const waveWords = [...kickerWords, ...titleWords, ...subWords].filter(Boolean);
  const introItems = [...waveWords].filter(Boolean);
  const allItems = [...introItems, marquee, ...cards].filter(Boolean);

  if (track && marquee) {
    section.classList.toggle('feedback-responsive-marquee', isResponsiveLayout);

    let targetX = 0;
    let currentX = 0;
    const speed = isResponsiveLayout ? -0.72 : -1.15;

    const getWrapWidth = () => {
      return track.scrollWidth / 2;
    };

    const tick = () => {
      targetX += speed;
      currentX = targetX;

      const wrapWidth = getWrapWidth();
      if (wrapWidth > 0) {
        if (targetX <= -wrapWidth) {
          targetX += wrapWidth;
          currentX += wrapWidth;
        } else if (targetX > 0) {
          targetX -= wrapWidth;
          currentX -= wrapWidth;
        }
      }
      
      gsap.set(track, { x: currentX });
    };

    if (!prefersReducedMotion) {
      gsap.ticker.add(tick);
    }
  }

  if (prefersReducedMotion) {
    section.classList.add('is-paused');
    gsap.set(allItems, { clearProps: 'opacity,visibility,transform,clipPath,willChange' });
    return;
  }

  if (kicker) {
    gsap.set(kicker, { '--kicker-dash-scale': 0 });
  }

  gsap.set(waveWords, {
    y: (index) => -Math.max(34, window.innerHeight * 0.062) + Math.sin(index * 0.72) * 28,
    x: (index) => Math.sin(index * 0.4) * 12,
    rotationZ: (index) => Math.sin(index * 0.58) * 6,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  gsap.set(marquee, {
    y: 54,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  gsap.set(cards, {
    y: 28,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  const intro = section.querySelector('.feedback-intro') || section;

  const tl = gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top 95%',
      end: 'bottom 95%',
      scrub: 1.0,
      invalidateOnRefresh: true,
      refreshPriority: -100
    }
  });

  if (kicker) {
    tl.to(kicker, {
      '--kicker-dash-scale': 1,
      duration: 0.3
    }, 0);
  }

  tl.to(waveWords, {
    y: 0,
    x: 0,
    rotationZ: 0,
    autoAlpha: 1,
    duration: 1.0,
    stagger: {
      each: 0.028,
      from: 'start'
    }
  }, 0)
    .to(marquee, {
      y: 0,
      autoAlpha: 1,
      duration: 0.8
    }, 0.3)
    .to(cards, {
      y: 0,
      autoAlpha: 1,
      duration: 0.6,
      stagger: 0.06
    }, 0.4);
}

// createFeedbackCursor removido per user request
