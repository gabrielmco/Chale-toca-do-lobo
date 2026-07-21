// ==========================================================================
// reservation.js - CTA final com reveal scrubbed e WhatsApp
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, SplitText);

const COLORS = {
  warmLinen: '#ffefb3',
  neutralDark: '#001c18',
  neutralDarkOpaque08: 'rgba(0, 28, 24, 0.08)'
};

const WHATSAPP_NUMBER = '5532988667074';
const DEFAULT_MESSAGE = 'Olá! Quero consultar disponibilidade da Casa Toca do Lobo.';

export function initReservationReveal() {
  const section = document.getElementById('reservar');
  if (!section) return;

  initReservationWhatsApp(section);

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isResponsiveLayout = window.matchMedia('(max-width: 1024px)').matches;
  const kicker = section.querySelector('.reserve-kicker');
  const title = section.querySelector('.reserve-copy h2');
  const sub = section.querySelector('.reserve-copy > p');
  const directCard = section.querySelector('.reserve-direct-card');
  const form = section.querySelector('.reserve-form');
  const formItems = form ? Array.from(form.querySelectorAll(
    '.reserve-form-kicker, h3, .reserve-form > p, .reserve-fields label, .reserve-submit, .reserve-safe-note'
  )) : [];

  const kickerSplit = kicker ? SplitText.create(kicker, {
    type: 'words',
    mask: 'words',
    wordsClass: 'reserve-kicker-word'
  }) : null;

  const titleSplit = title ? SplitText.create(title, {
    type: 'words',
    mask: 'words',
    wordsClass: 'reserve-title-word'
  }) : null;

  const subSplit = sub ? SplitText.create(sub, {
    type: 'words',
    mask: 'words',
    wordsClass: 'reserve-sub-word'
  }) : null;

  if (kicker) kicker.removeAttribute('aria-label');
  if (title) title.removeAttribute('aria-label');
  if (sub) sub.removeAttribute('aria-label');

  const kickerWords = kickerSplit ? kickerSplit.words : kicker ? [kicker] : [];
  const titleWords = titleSplit ? titleSplit.words : title ? [title] : [];
  const subWords = subSplit ? subSplit.words : sub ? [sub] : [];
  const waveWords = [...kickerWords, ...titleWords, ...subWords].filter(Boolean);
  const allItems = [...waveWords, directCard, form, ...formItems].filter(Boolean);

  if (!allItems.length) return;

  if (prefersReducedMotion) {
    gsap.set(allItems, { clearProps: 'opacity,visibility,transform,willChange' });
    return;
  }

  // Initialize springy tactile hovers
  initWhatsAppSpringyHovers(section);

  gsap.set(waveWords, {
    y: 22,
    opacity: 0,
    willChange: 'transform, opacity'
  });

  if (isResponsiveLayout) {
    gsap.set(bg, { scale: 1.04, opacity: 0.72, willChange: 'transform, opacity' });
    gsap.set(shade, { opacity: 0.78, willChange: 'opacity' });
    gsap.set([directCard, form].filter(Boolean), { y: 22, opacity: 0, willChange: 'transform, opacity' });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top 96%',
        once: true,
        invalidateOnRefresh: true
      },
      defaults: { ease: 'power3.out' }
    })
      .to(bg, { scale: 1, opacity: 1, duration: 0.8 }, 0)
      .to(shade, { opacity: 1, duration: 0.6 }, 0.04)
      .to(waveWords, {
        y: 0,
        opacity: 1,
        duration: 0.6,
        stagger: 0.02,
        ease: 'power3.out'
      }, 0.08)
      .to([directCard, form].filter(Boolean), {
        y: 0,
        opacity: 1,
        duration: 0.65,
        stagger: 0.1,
        ease: 'power3.out'
      }, 0.28)
      .set([bg, shade, ...waveWords, directCard, form].filter(Boolean), { clearProps: 'all' });
    return;
  }

  gsap.set(waveWords, {
    x: -12,
    y: 36,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  if (directCard) {
    gsap.set(directCard, {
      x: -12,
      y: 28,
      autoAlpha: 0,
      willChange: 'transform, opacity'
    });
  }

  if (form) {
    gsap.set(form, {
      x: 42,
      y: 34,
      autoAlpha: 0,
      willChange: 'transform, opacity'
    });
  }

  gsap.set(formItems, {
    x: 10,
    y: 24,
    autoAlpha: 0,
    willChange: 'transform, opacity'
  });

  gsap.timeline({
    defaults: { ease: 'none' },
    scrollTrigger: {
      trigger: section,
      start: 'top 95%',
      end: 'bottom 90%',
      scrub: 1.0,
      invalidateOnRefresh: true,
      refreshPriority: -150
    }
  })
    .to(waveWords, {
      x: 0,
      y: 0,
      autoAlpha: 1,
      duration: 1.0,
      stagger: 0.025
    }, 0)
    .to(directCard, {
      x: 0,
      y: 0,
      autoAlpha: 1,
      duration: 0.8
    }, 0.3)
    .to(form, {
      x: 0,
      y: 0,
      autoAlpha: 1,
      duration: 1.0
    }, 0.1)
    .to(formItems, {
      x: 0,
      y: 0,
      autoAlpha: 1,
      duration: 0.8,
      stagger: 0.04
    }, 0.3)
    .set([bg, shade, ...waveWords, directCard, form, ...formItems].filter(Boolean), { clearProps: 'willChange' });
}

function initWhatsAppSpringyHovers(section) {
  const directCard = section.querySelector('#reserve-whatsapp-direct');
  const submitBtn = section.querySelector('.reserve-submit');

  if (directCard) {
    const icon = directCard.querySelector('.reserve-direct-icon');
    const svg = icon ? icon.querySelector('svg') : null;

    directCard.addEventListener('mouseenter', () => {
      gsap.to(directCard, {
        y: -6,
        scale: 1.03,
        rotationZ: -0.5,
        boxShadow: '0 22px 48px rgba(0, 0, 0, 0.35)',
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1.15,
          backgroundColor: COLORS.warmLinen,
          color: COLORS.neutralDark,
          duration: 0.5,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }

      if (svg) {
        gsap.to(svg, {
          rotation: 15,
          scale: 1.15,
          duration: 0.6,
          ease: 'back.out(1.8)',
          overwrite: 'auto'
        });
      }
    });

    directCard.addEventListener('mouseleave', () => {
      gsap.to(directCard, {
        y: 0,
        scale: 1,
        rotationZ: 0,
        boxShadow: '0 18px 42px rgba(0, 0, 0, 0.22)',
        duration: 0.6,
        ease: 'power4.out',
        overwrite: 'auto'
      });

      if (icon) {
        gsap.to(icon, {
          scale: 1,
          backgroundColor: COLORS.neutralDarkOpaque08,
          color: COLORS.neutralDark,
          duration: 0.6,
          ease: 'power4.out',
          overwrite: 'auto'
        });
      }

      if (svg) {
        gsap.to(svg, {
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    directCard.addEventListener('mousedown', () => {
      gsap.to(directCard, {
        scale: 0.98,
        y: -2,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    directCard.addEventListener('mouseup', () => {
      gsap.to(directCard, {
        scale: 1.03,
        y: -6,
        duration: 0.45,
        ease: 'power3.out'
      });
    });
  }

  if (submitBtn) {
    const svg = submitBtn.querySelector('svg');

    submitBtn.addEventListener('mouseenter', () => {
      gsap.to(submitBtn, {
        y: -4,
        scale: 1.015,
        boxShadow: '0 12px 28px rgba(0, 0, 0, 0.3)',
        duration: 0.5,
        ease: 'power3.out',
        overwrite: 'auto'
      });

      if (svg) {
        gsap.to(svg, {
          rotation: -12,
          scale: 1.15,
          duration: 0.6,
          ease: 'back.out(1.8)',
          overwrite: 'auto'
        });
      }
    });

    submitBtn.addEventListener('mouseleave', () => {
      gsap.to(submitBtn, {
        y: 0,
        scale: 1,
        boxShadow: '0 0px 0px rgba(0,0,0,0)',
        duration: 0.6,
        ease: 'power4.out',
        overwrite: 'auto'
      });

      if (svg) {
        gsap.to(svg, {
          rotation: 0,
          scale: 1,
          duration: 0.6,
          ease: 'power3.out',
          overwrite: 'auto'
        });
      }
    });

    submitBtn.addEventListener('mousedown', () => {
      gsap.to(submitBtn, {
        scale: 0.99,
        y: 0,
        duration: 0.15,
        ease: 'power2.out'
      });
    });

    submitBtn.addEventListener('mouseup', () => {
      gsap.to(submitBtn, {
        scale: 1.015,
        y: -4,
        duration: 0.45,
        ease: 'power3.out'
      });
    });
  }
}

function initReservationWhatsApp(section) {
  const directLink = section.querySelector('#reserve-whatsapp-direct');
  const form = section.querySelector('#reserve-form');

  if (directLink) {
    directLink.href = buildWhatsAppUrl(DEFAULT_MESSAGE);
  }

  if (!form) return;

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(form);
    const get = (field) => String(data.get(field) || '').trim();
    const messageLines = [
      'Olá! Quero consultar disponibilidade da Casa Toca do Lobo.',
      '',
      `Nome: ${get('nome')}`,
      `Telefone/WhatsApp: ${get('telefone')}`,
      `Hóspedes: ${get('hospedes')}`,
      get('mensagem') ? `Mensagem: ${get('mensagem')}` : ''
    ].filter(Boolean);

    window.open(buildWhatsAppUrl(messageLines.join('\n')), '_blank', 'noopener');
  });
}

function buildWhatsAppUrl(message) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
