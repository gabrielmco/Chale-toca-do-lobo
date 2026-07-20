// ==========================================================================
// navbar.js - scroll state + mobile menu
// ==========================================================================
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import * as smoothScroll from './smoothScroll.js';

gsap.registerPlugin(ScrollTrigger);

export function initNavbarScroll() {
  const navbar = document.getElementById('main-navbar');
  const container = navbar ? navbar.querySelector('.navbar-container') : null;
  const menu = document.getElementById('nav-menu');
  const logo = document.getElementById('nav-logo');
  const actions = navbar ? navbar.querySelector('.navbar-actions') : null;
  const controlSection = document.getElementById('chale-section');

  if (!navbar) return;

  const START_HIDE_AFTER_SECTION = 90;
  const SHOW_AFTER_UP = 24;
  const HIDE_AFTER_DOWN = 18;

  let lastScroll = window.scrollY;
  let upDistance = 0;
  let downDistance = 0;
  let controlTrigger = null;
  let isControlledArea = false;

  const syncLogoPosition = () => {
    if (!container || !logo) return;

    if (window.innerWidth <= 1024) {
      container.style.removeProperty('--nav-logo-left');
      return;
    }

    container.style.setProperty('--nav-logo-left', '50%');
  };

  const resetControlledDistances = () => {
    upDistance = 0;
    downDistance = 0;
  };

  let navState = 'shown';

  const showNavbar = () => {
    if (navState === 'shown') return;
    navState = 'shown';
    navbar.classList.remove('nav-hidden');
    gsap.to(navbar, {
      y: 0,
      yPercent: 0,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const hideNavbar = () => {
    if (window.innerWidth <= 1024) return; // Navbar stays permanently visible on mobile
    if (navState === 'hidden') return;
    navState = 'hidden';
    navbar.classList.add('nav-hidden');
    gsap.to(navbar, {
      y: 0,
      yPercent: -100,
      duration: 0.42,
      ease: 'power3.out',
      overwrite: 'auto'
    });
  };

  const getControlStart = () => {
    if (controlTrigger && Number.isFinite(controlTrigger.start)) {
      return controlTrigger.start;
    }

    if (!controlSection) return window.innerHeight;
    return controlSection.getBoundingClientRect().top + window.scrollY;
  };

  const applyScrollState = (scroll, delta) => {
    const normalizedScroll = Math.max(0, scroll);
    const controlStart = getControlStart();
    const shouldControl = controlSection && normalizedScroll >= controlStart - 1;

    navbar.classList.toggle('scrolled', normalizedScroll > 50);

    if (!shouldControl) {
      showNavbar();
      isControlledArea = false;
      resetControlledDistances();
      return;
    }

    if (!isControlledArea) {
      gsap.set(navbar, { clearProps: 'transform' });
      showNavbar();
      isControlledArea = true;
      resetControlledDistances();

      if (normalizedScroll <= controlStart + START_HIDE_AFTER_SECTION) {
        return;
      }
    }

    if (Math.abs(delta) < 1) return;

    if (delta > 0) {
      downDistance += delta;
      upDistance = 0;

      if (normalizedScroll > controlStart + START_HIDE_AFTER_SECTION && downDistance >= HIDE_AFTER_DOWN) {
        hideNavbar();
        downDistance = 0;
      }
      return;
    }

    upDistance += Math.abs(delta);
    downDistance = 0;

    if (upDistance >= SHOW_AFTER_UP) {
      showNavbar();
      upDistance = 0;
    }
  };

  const handleScroll = (currentScroll) => {
    const delta = currentScroll - lastScroll;
    lastScroll = currentScroll;
    applyScrollState(currentScroll, delta);
  };

  if (smoothScroll.lenis) {
    smoothScroll.lenis.on('scroll', (event) => {
      handleScroll(event.scroll);
    });
  }

  window.addEventListener('scroll', () => {
    handleScroll(window.scrollY);
  }, { passive: true });

  if (controlSection) {
    controlTrigger = ScrollTrigger.create({
      trigger: controlSection,
      start: 'top top',
      end: 'max',
      invalidateOnRefresh: true,
      onEnter: () => {
        isControlledArea = true;
        resetControlledDistances();
        showNavbar();
      },
      onEnterBack: () => {
        isControlledArea = true;
        resetControlledDistances();
        showNavbar();
      },
      onLeaveBack: () => {
        isControlledArea = false;
        resetControlledDistances();
        showNavbar();
      }
    });

    ScrollTrigger.addEventListener('refresh', () => {
      applyScrollState(window.scrollY, 0);
    });
  }

  syncLogoPosition();
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return; // Ignore height-only resizes from mobile address bar toggle
    lastWidth = window.innerWidth;
    requestAnimationFrame(() => {
      syncLogoPosition();
      applyScrollState(window.scrollY, 0);
    });
  }, { passive: true });

  window.addEventListener('load', syncLogoPosition, { once: true });
  setTimeout(syncLogoPosition, 600);
  applyScrollState(window.scrollY, 0);
  initScrollSpy();
}

function initScrollSpy() {
  const sectionsConfig = [
    { id: '#hero', linkSelector: 'a[href="#hero"]' },
    { id: '#chale-section', linkSelector: 'a[href="#chale-section"]' },
    { id: '#video-triptych', linkSelector: 'a[href="#video-triptych"]' },
    { id: '#experiencias-section', linkSelector: 'a[href="#experiencias-section"]' },
    { id: '#reservar', linkSelector: 'a[href="#reservar"]' }
  ];

  let isTicking = false;

  const updateActiveLink = () => {
    isTicking = false;
    const scrollPos = window.scrollY + window.innerHeight * 0.38;
    let activeId = '#hero';

    sectionsConfig.forEach(({ id }) => {
      const el = document.querySelector(id);
      if (el) {
        const pinSpacer = el.closest('.pin-spacer');
        const targetEl = pinSpacer || el;
        const top = targetEl.getBoundingClientRect().top + window.scrollY;
        const height = targetEl.offsetHeight;
        if (scrollPos >= top && scrollPos < top + height) {
          activeId = id;
        }
      }
    });

    sectionsConfig.forEach(({ id, linkSelector }) => {
      const links = document.querySelectorAll(linkSelector);
      links.forEach(link => {
        if (link.classList.contains('menu-item') || link.classList.contains('mobile-menu-item')) {
          link.classList.toggle('active', id === activeId);
        }
      });
    });
  };

  const onScroll = () => {
    if (!isTicking) {
      isTicking = true;
      requestAnimationFrame(updateActiveLink);
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  ScrollTrigger.addEventListener('refresh', updateActiveLink);
  updateActiveLink();
}

export function initMobileMenu() {
  const toggleBtn = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('mobile-menu');
  const navbar = document.getElementById('main-navbar');
  const menuItems = document.querySelectorAll('.mobile-menu-item');
  const menuFooter = document.querySelector('.mobile-menu-footer');

  if (!toggleBtn || !menuOverlay) return;

  let isMenuOpen = false;

  const menuTl = gsap.timeline({ paused: true });

  gsap.set(menuOverlay, { autoAlpha: 0 });
  gsap.set(menuItems, { y: 30, opacity: 0 });
  gsap.set(menuFooter, { y: 30, opacity: 0 });
  toggleBtn.setAttribute('aria-expanded', 'false');

  menuTl
    .to(menuOverlay, { autoAlpha: 1, opacity: 1, duration: 0.8, ease: 'power4.inOut' })
    .to(menuItems, { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: 'power4.out' }, '-=0.4')
    .to(menuFooter, { y: 0, opacity: 1, duration: 0.6, ease: 'power3.out' }, '-=0.5');

  const setMenuState = (open) => {
    isMenuOpen = open;
    toggleBtn.classList.toggle('active', open);
    menuOverlay.classList.toggle('active', open);
    navbar?.classList.toggle('menu-open', open);
    document.body.classList.toggle('mobile-menu-open', open);
    toggleBtn.setAttribute('aria-expanded', String(open));
    toggleBtn.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
  };

  const openMenu = () => {
    if (isMenuOpen) return;
    setMenuState(true);
    if (smoothScroll.lenis) smoothScroll.lenis.stop();
    menuTl.play();
  };

  const closeMenu = () => {
    if (!isMenuOpen) return;
    setMenuState(false);
    if (smoothScroll.lenis) smoothScroll.lenis.start();
    menuTl.reverse();
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };

  toggleBtn.addEventListener('click', toggleMenu);
  menuItems.forEach(item => item.addEventListener('click', closeMenu));

  menuOverlay.addEventListener('click', (event) => {
    if (event.target === menuOverlay) closeMenu();
  });

  window.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') closeMenu();
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 1024) closeMenu();
  }, { passive: true });
}

export function closeMobileMenuIfOpen() {
  const toggleBtn = document.getElementById('menu-toggle');
  const menuOverlay = document.getElementById('mobile-menu');
  const navbar = document.getElementById('main-navbar');

  if (!toggleBtn || !menuOverlay || !menuOverlay.classList.contains('active')) return;

  toggleBtn.classList.remove('active');
  menuOverlay.classList.remove('active');
  navbar?.classList.remove('menu-open');
  document.body.classList.remove('mobile-menu-open');
  toggleBtn.setAttribute('aria-expanded', 'false');
  toggleBtn.setAttribute('aria-label', 'Abrir menu');

  if (smoothScroll.lenis) smoothScroll.lenis.start();
  gsap.to(menuOverlay, { autoAlpha: 0, duration: 0.45, ease: 'power3.inOut' });
  gsap.to(menuOverlay.querySelectorAll('.mobile-menu-item'), { y: 30, opacity: 0, duration: 0.25, ease: 'power2.in' });
  gsap.to(menuOverlay.querySelector('.mobile-menu-footer'), { y: 30, opacity: 0, duration: 0.25, ease: 'power2.in' });
}
