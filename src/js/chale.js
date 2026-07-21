/**
 * chale.js - Secao do chale: galeria horizontal wide com pin e parallax.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as smoothScroll from "./smoothScroll.js";

gsap.registerPlugin(ScrollTrigger);

let localTriggers = [];
let resizeRefreshHandler = null;
let resizeRefreshTimer = null;

const GALLERY_ITEMS = [
  { src: "/imgs-videos/melhoradas/externas/wide/Espaço_Externo_--_Wide_--_202606021251.webp", label: "Fachada da casa à noite" },
  { src: "/imgs-videos/melhoradas/externas/wide/Espaço_Externo_--_Wide_--_202606021251_2.webp", label: "Varanda do primeiro andar" },
  { src: "/imgs-videos/melhoradas/externas/wide/Espaço_Externo_--_Wide_--_202606021251_3.webp", label: "Varanda do segundo andar" },
  { src: "/imgs-videos/melhoradas/externas/wide/Espaço_Externo_--_Wide_--_202606021251_4.webp", label: "Deck de madeira" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_1.webp", label: "Área da churrasqueira" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_2.webp", label: "Deck integrado com área para churrasco" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_3.webp", label: "Terceiro banheiro (área externa)" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_4.webp", label: "Fachada com o detalhe do lobo entalhado" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_5.webp", label: "Deck da casa, um ótimo espaço para saborear seu café" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_6.webp", label: "Área externa da casa" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_7.webp", label: "Detalhes da decoração rústica com lustre" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_8.webp", label: "Lustre rústico no ambiente" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_9.webp", label: "Cozinha da casa (itens de café da manhã não inclusos)" },
  { src: "/imgs-videos/melhoradas/novas/casa_nova_10.webp", label: "Ambiente com lareira" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251.webp", label: "Banheiro do segundo andar" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_2.webp", label: "Quarto no segundo andar" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_3.webp", label: "Quarto do primeiro andar" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_4.webp", label: "Cozinha equipada para uso dos hóspedes" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_5.webp", label: "Quarto no primeiro andar com cama de casal" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_6.webp", label: "Banheiro do primeiro andar" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_7.webp", label: "Sala de estar do segundo andar" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_8.webp", label: "Sala de estar com acesso ao mezanino" },
  { src: "/imgs-videos/melhoradas/internas/wide/Espaço_Interno_--_Wide_--_202606021251_9.webp", label: "Suíte do segundo andar com cama de casal" },
  { src: "/imgs-videos/externa/hero_chale_paisagem_16-9.webp", label: "Vista da Serra de Ibitipoca" }
];

const GALLERY_ROWS = [
  GALLERY_ITEMS.slice(0, 12),
  GALLERY_ITEMS.slice(12)
];

const GALLERY_ICON_PATHS = {
  exterior: [
    '<path d="M4.5 20V10.5L12 4l7.5 6.5V20M8.5 20v-6.5h7V20M9 11.5h6" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ],
  deck: [
    '<path d="M4 19h16M6 16h12M8 13h8M10 10h4M12 4v6M7 8l5-4 5 4" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ],
  bath: [
    '<path d="M6 11V7a3 3 0 0 1 6 0v4M4 11h16v3a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5v-3ZM8 21h8" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ],
  bed: [
    '<path d="M4 20V8M20 20V10a3 3 0 0 0-3-3h-5v6M4 13h16M4 10h5a3 3 0 0 1 3 3M4 17h16" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ],
  kitchen: [
    '<path d="M7 3v8M4 3v4a3 3 0 0 0 6 0V3M7 11v10M15 3h3v18M15 3v8a3 3 0 0 0 3 3" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ],
  living: [
    '<path d="M5 12V9a3 3 0 0 1 3-3h8a3 3 0 0 1 3 3v3M4 12h16v6H4v-6ZM7 18v2M17 18v2" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>'
  ]
};

const HEADING_LINES = [
  "Clima de serra.",
  "Pertinho da Vila."
];

export function initChale() {
  const chaleSection = document.getElementById("chale-section");
  const textBlock = document.getElementById("chale-text-block");
  const subText = document.getElementById("chale-sub");
  const viewport = document.getElementById("chale-gallery-viewport");
  const track = document.getElementById("chale-gallery-track");
  const isResponsiveLayout = window.matchMedia("(max-width: 1024px)").matches;

  if (!chaleSection || !textBlock || !track || !viewport) return;

  const lightbox = createGalleryLightbox();
  chaleSection.dataset.chaleLayout = isResponsiveLayout ? "responsive" : "desktop";

  textBlock.innerHTML = "";
  HEADING_LINES.forEach((lineText) => {
    const lineWrapper = document.createElement("span");
    lineWrapper.classList.add("chale-heading-line");

    const textSpan = document.createElement("span");
    textSpan.textContent = lineText;

    lineWrapper.appendChild(textSpan);
    textBlock.appendChild(lineWrapper);
  });

  track.innerHTML = "";
  const initialBatchCount = 6;

  if (isResponsiveLayout) {
    // Mobile: Render only first 6 slides initially
    const initialBatch = GALLERY_ITEMS.slice(0, initialBatchCount);
    const row = document.createElement("div");
    row.classList.add("chale-gallery-row", "chale-gallery-row-top");
    initialBatch.forEach((item) => {
      const slide = createSlideElement(item, lightbox);
      row.appendChild(slide);
    });
    track.appendChild(row);

    initResponsiveChaleCarousel(chaleSection, track, GALLERY_ITEMS.slice(initialBatchCount), lightbox);
  } else {
    // Desktop: Render everything immediately
    GALLERY_ROWS.forEach((rowItems, rowIndex) => {
      const row = document.createElement("div");
      row.classList.add("chale-gallery-row", rowIndex === 0 ? "chale-gallery-row-top" : "chale-gallery-row-bottom");
      rowItems.forEach((item) => {
        const slide = createSlideElement(item, lightbox);
        row.appendChild(slide);
      });
      track.appendChild(row);
    });
    chaleSection.querySelector(".chale-carousel-controls")?.remove();
    chaleSection.querySelector(".chale-carousel-hint")?.remove();
  }

  const supraText = document.getElementById("chale-supra");
  const pillsSubText = document.getElementById("chale-pills-sub");
  const pills = chaleSection.querySelectorAll(".chale-pill-large");
  const headingWords = textBlock.querySelectorAll(".chale-heading-line > span");
  const carouselHint = chaleSection.querySelector(".chale-carousel-hint");
  const carouselControls = chaleSection.querySelector(".chale-carousel-controls");

  gsap.set([supraText, subText, pillsSubText, carouselHint, carouselControls].filter(Boolean), { opacity: 0, y: 30 });
  gsap.set(headingWords, { opacity: 0, yPercent: 105 });
  gsap.set(pills, { opacity: 0, y: 40, scale: 0.95 });

  // Since .chale-slide has a defined aspect-ratio and height in CSS, its layout size is stable immediately.
  // We do not block critical GSAP timeline generation on off-screen lazy-loaded images to avoid deadlocks.
  setTimeout(() => {
    buildChaleTimeline({ chaleSection, textBlock, subText, track });
    requestAnimationFrame(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    });
  }, 150);

  if (resizeRefreshHandler) {
    window.removeEventListener("resize", resizeRefreshHandler);
  }
  let lastWidth = window.innerWidth;
  resizeRefreshHandler = () => {
    if (window.innerWidth === lastWidth) return; // Ignora resizes verticais da barra de URL do mobile
    lastWidth = window.innerWidth;
    window.clearTimeout(resizeRefreshTimer);
    resizeRefreshTimer = window.setTimeout(() => {
      ScrollTrigger.sort();
      ScrollTrigger.refresh();
    }, 180);
  };
  window.addEventListener("resize", resizeRefreshHandler, { passive: true });
}

function createSlideElement(item, lightbox) {
  const slide = document.createElement("div");
  slide.classList.add("chale-slide");
  slide.setAttribute("role", "button");
  slide.setAttribute("tabindex", "0");
  slide.setAttribute("aria-label", `Ampliar imagem: ${item.label}`);

  const img = document.createElement("img");
  img.src = item.src;
  img.alt = item.label;
  img.loading = "lazy";
  img.decoding = "async";
  img.draggable = false;

  const overlay = document.createElement("div");
  overlay.classList.add("slide-overlay");

  const caption = document.createElement("div");
  caption.classList.add("slide-caption");
  caption.innerHTML = `
    <span class="slide-caption-icon" aria-hidden="true">
      <svg viewBox="0 0 24 24" fill="none">
        ${getGalleryIcon(item.label)}
      </svg>
    </span>
    <span class="slide-caption-text">${item.label}</span>
    <span class="slide-caption-line" aria-hidden="true"></span>
  `;

  const zoomBadge = document.createElement("div");
  zoomBadge.classList.add("slide-zoom-badge");
  zoomBadge.setAttribute("aria-hidden", "true");
  zoomBadge.innerHTML = `
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
      <line x1="12" y1="5" x2="12" y2="19"></line>
      <line x1="5" y1="12" x2="19" y2="12"></line>
    </svg>
  `;

  slide.append(img, overlay, caption, zoomBadge);
  slide.addEventListener("click", () => {
    lightbox.open(item);
  });
  slide.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    lightbox.open(item);
  });
  return slide;
}

function initResponsiveChaleCarousel(chaleSection, track, remainingItems = [], lightbox) {
  const row = track.querySelector(".chale-gallery-row");
  let slides = Array.from(track.querySelectorAll(".chale-slide"));
  if (!row || !slides.length) return;

  const existingControls = chaleSection.querySelector(".chale-carousel-controls");
  if (existingControls) existingControls.remove();
  const existingHint = chaleSection.querySelector(".chale-carousel-hint");
  if (existingHint) existingHint.remove();

  const hint = document.createElement("p");
  hint.className = "chale-carousel-hint";
  hint.textContent = "Toque na foto para ampliar";
  track.insertAdjacentElement("beforebegin", hint);

  // Pre-generate dot slots matching the total amount of slides (24)
  const totalSlidesCount = slides.length + remainingItems.length;
  const dotsHtml = Array.from({ length: totalSlidesCount })
    .map((_, index) => `<span class="chale-carousel-dot${index === 0 ? " is-active" : ""}"></span>`)
    .join("");

  const controls = document.createElement("div");
  controls.className = "chale-carousel-controls";
  controls.innerHTML = `
    <button class="chale-carousel-btn chale-carousel-prev" type="button" aria-label="Imagem anterior">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M15 6 9 12l6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
    <div class="chale-carousel-dots" aria-hidden="true">
      ${dotsHtml}
    </div>
    <button class="chale-carousel-btn chale-carousel-next" type="button" aria-label="Pr&oacute;xima imagem">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    </button>
  `;

  track.insertAdjacentElement("afterend", controls);

  const prev = controls.querySelector(".chale-carousel-prev");
  const next = controls.querySelector(".chale-carousel-next");
  let dots = Array.from(controls.querySelectorAll(".chale-carousel-dot"));

  const getStep = () => {
    const firstSlide = slides[0];
    const rect = firstSlide ? firstSlide.getBoundingClientRect() : null;
    const gap = parseFloat(getComputedStyle(row).columnGap || getComputedStyle(row).gap || "0") || 0;
    return Math.max(row.clientWidth * 0.72, (rect ? rect.width : row.clientWidth * 0.82) + gap);
  };

  const scrollByDirection = (direction) => {
    row.scrollBy({
      left: direction * getStep(),
      behavior: "smooth"
    });
  };

  const updateDots = () => {
    const center = row.scrollLeft + row.clientWidth * 0.5;
    let activeIndex = 0;
    let activeDistance = Infinity;

    slides.forEach((slide, index) => {
      const slideCenter = slide.offsetLeft + slide.offsetWidth * 0.5;
      const distance = Math.abs(slideCenter - center);
      if (distance < activeDistance) {
        activeDistance = distance;
        activeIndex = index;
      }
    });

    dots.forEach((dot, index) => {
      dot.classList.toggle("is-active", index === activeIndex);
    });
    slides.forEach((slide, index) => {
      slide.classList.toggle("is-active", index === activeIndex);
    });
  };

  let ticking = false;
  row.addEventListener("scroll", () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      updateDots();
      ticking = false;
    });
  }, { passive: true });

  prev?.addEventListener("click", () => scrollByDirection(-1));
  next?.addEventListener("click", () => scrollByDirection(1));
  updateDots();

  // Defer-append the remaining slides to save main-thread execution time
  if (remainingItems.length > 0) {
    const appendRemaining = () => {
      remainingItems.forEach((item) => {
        const slide = createSlideElement(item, lightbox);
        row.appendChild(slide);
      });
      // Re-query slides array to contain all 24 slides
      slides = Array.from(track.querySelectorAll(".chale-slide"));
      updateDots();
    };

    if ("requestIdleCallback" in window) {
      window.requestIdleCallback(appendRemaining, { timeout: 3000 });
    } else {
      setTimeout(appendRemaining, 2000);
    }
  }
}

function getGalleryIcon(label = "") {
  const normalized = label.toLowerCase();

  if (normalized.includes("banheiro")) return GALLERY_ICON_PATHS.bath.join("");
  if (normalized.includes("quarto")) return GALLERY_ICON_PATHS.bed.join("");
  if (normalized.includes("cozinha")) return GALLERY_ICON_PATHS.kitchen.join("");
  if (normalized.includes("sala")) return GALLERY_ICON_PATHS.living.join("");
  if (normalized.includes("varanda") || normalized.includes("deck")) return GALLERY_ICON_PATHS.deck.join("");

  return GALLERY_ICON_PATHS.exterior.join("");
}



function createGalleryLightbox() {
  const existing = document.querySelector(".gallery-lightbox");
  if (existing) existing.remove();

  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";
  lightbox.setAttribute("role", "dialog");
  lightbox.setAttribute("aria-modal", "true");
  lightbox.setAttribute("aria-hidden", "true");
  lightbox.innerHTML = `
    <div class="gallery-lightbox-panel" role="document">
      <button class="gallery-lightbox-close" type="button" aria-label="Fechar imagem ampliada">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M6 6l12 12M18 6 6 18" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>
        </svg>
      </button>
      <button class="gallery-lightbox-nav gallery-lightbox-prev" type="button" aria-label="Imagem anterior">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M15 6 9 12l6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="gallery-lightbox-image-container">
        <div class="gallery-lightbox-image-wrapper wrapper-buffer-a" style="position: absolute; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; z-index: 2;">
          <img class="gallery-lightbox-image img-buffer-a" alt="" style="position: absolute; max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; transform: scale(1.15); will-change: transform, opacity;" />
        </div>
        <div class="gallery-lightbox-image-wrapper wrapper-buffer-b" style="position: absolute; inset: 0; overflow: hidden; display: flex; align-items: center; justify-content: center; z-index: 1; visibility: hidden;">
          <img class="gallery-lightbox-image img-buffer-b" alt="" style="position: absolute; max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; transform: scale(1.15); visibility: hidden; will-change: transform, opacity;" />
        </div>
      </div>
      <button class="gallery-lightbox-nav gallery-lightbox-next" type="button" aria-label="Pr&oacute;xima imagem">
        <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="m9 6 6 6-6 6" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </button>
      <div class="gallery-lightbox-caption"></div>
    </div>
  `;

  document.body.appendChild(lightbox);

  const wrapperA = lightbox.querySelector(".wrapper-buffer-a");
  const wrapperB = lightbox.querySelector(".wrapper-buffer-b");
  const imgA = lightbox.querySelector(".img-buffer-a");
  const imgB = lightbox.querySelector(".img-buffer-b");
  const imageContainer = lightbox.querySelector(".gallery-lightbox-image-container");
  let activeWrapper = wrapperA;
  let inactiveWrapper = wrapperB;
  let activeImg = imgA;
  let inactiveImg = imgB;

  const caption = lightbox.querySelector(".gallery-lightbox-caption");
  const panel = lightbox.querySelector(".gallery-lightbox-panel");
  const closeButton = lightbox.querySelector(".gallery-lightbox-close");
  const prevButton = lightbox.querySelector(".gallery-lightbox-prev");
  const nextButton = lightbox.querySelector(".gallery-lightbox-next");
  const controls = [closeButton, prevButton, nextButton].filter(Boolean);
  let activeIndex = 0;
  let lastFocusedElement = null;
  let isOpen = false;

  const render = () => {
    const item = GALLERY_ITEMS[activeIndex];
    if (!item || !activeImg || !caption) return;

    activeImg.src = item.src;
    activeImg.alt = item.label;
    caption.innerHTML = `${item.label} <span class="gallery-counter">${String(activeIndex + 1).padStart(2, "0")} / ${String(GALLERY_ITEMS.length).padStart(2, "0")}</span>`;
  };

  const open = (item) => {
    const index = GALLERY_ITEMS.findIndex((galleryItem) => galleryItem.src === item.src);
    activeIndex = index >= 0 ? index : 0;
    lastFocusedElement = document.activeElement;
    
    // Resetar posições e visibilidade dos buffers
    activeWrapper = wrapperA;
    inactiveWrapper = wrapperB;
    activeImg = imgA;
    inactiveImg = imgB;
    
    gsap.set([wrapperA, wrapperB], { x: 0, y: 0 });
    gsap.set(activeWrapper, { yPercent: 0, autoAlpha: 1, zIndex: 2, visibility: "visible" });
    gsap.set(inactiveWrapper, { yPercent: 100, autoAlpha: 0, zIndex: 1, visibility: "hidden" });
    gsap.set([imgA, imgB], { yPercent: 0, scale: 1.15 });
    
    render();

    isOpen = true;
    lightbox.classList.add("is-open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.classList.add("gallery-lightbox-open");
    if (smoothScroll.lenis) smoothScroll.lenis.stop();

    gsap.killTweensOf([lightbox, panel, wrapperA, wrapperB, imgA, imgB, caption, ...controls]);
    gsap.set(lightbox, { autoAlpha: 0 });
    gsap.set(activeWrapper, { yPercent: 100, autoAlpha: 0 });
    gsap.set(activeImg, { yPercent: -30 });
    gsap.set(caption, { y: 30, autoAlpha: 0 });
    gsap.set(controls, { autoAlpha: 0 });

    gsap.timeline({ defaults: { ease: "power4.out" } })
      .to(lightbox, { autoAlpha: 1, duration: 0.6 }, 0)
      .to(activeWrapper, { yPercent: 0, autoAlpha: 1, duration: 1.15 }, 0.1)
      .to(activeImg, { yPercent: 0, duration: 1.15 }, 0.1)
      .to(caption, { y: 0, autoAlpha: 1, duration: 0.8 }, 0.3)
      .to(controls, { autoAlpha: 1, duration: 0.6 }, 0.4);

    if (closeButton) closeButton.focus({ preventScroll: true });
  };

  const close = () => {
    if (!isOpen) return;
    isOpen = false;

    gsap.killTweensOf([lightbox, panel, wrapperA, wrapperB, imgA, imgB, caption, ...controls]);
    gsap.timeline({
      defaults: { ease: "power3.inOut" },
      onComplete: () => {
        lightbox.classList.remove("is-open");
        lightbox.setAttribute("aria-hidden", "true");
        document.body.classList.remove("gallery-lightbox-open");
        if (smoothScroll.lenis) smoothScroll.lenis.start();

        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
          lastFocusedElement.focus({ preventScroll: true });
        }
      }
    })
      .to([wrapperA, wrapperB, caption, ...controls], { autoAlpha: 0, duration: 0.3 }, 0)
      .to(lightbox, { autoAlpha: 0, duration: 0.4 }, 0.1);
  };

  const goTo = (direction) => {
    if (!imageContainer || !imgA || !imgB || !wrapperA || !wrapperB) return;

    activeIndex = gsap.utils.wrap(0, GALLERY_ITEMS.length, activeIndex + direction);
    const nextItem = GALLERY_ITEMS[activeIndex];

    // O inativo se torna a próxima imagem/wrapper ativa
    const nextWrapper = activeWrapper === wrapperA ? wrapperB : wrapperA;
    const prevWrapper = activeWrapper;
    const nextImg = activeImg === imgA ? imgB : imgA;
    const prevImg = activeImg;

    // Configura src e alt da nova imagem antes de iniciar a transição
    nextImg.src = nextItem.src;
    nextImg.alt = nextItem.label;

    // Posiciona nextWrapper (a nova) fora da tela para deslizar
    const startYPercent = direction > 0 ? 100 : -100;
    const imgStartPercent = direction > 0 ? -30 : 30;
    const prevImgEndPercent = direction > 0 ? -30 : 30;

    gsap.set(nextWrapper, {
      yPercent: startYPercent,
      autoAlpha: 1,
      zIndex: 3,
      visibility: "visible"
    });
    gsap.set(nextImg, {
      yPercent: imgStartPercent,
      scale: 1.15,
      visibility: "visible"
    });

    // Garante que o wrapper antigo fique no nível de z-index intermediário
    gsap.set(prevWrapper, {
      zIndex: 2
    });

    // Fazemos o fade out rápido do caption atual e fade in do novo
    gsap.killTweensOf([caption]);
    const captionTl = gsap.timeline();
    captionTl.to(caption, {
      opacity: 0,
      y: direction > 0 ? -15 : 15,
      duration: 0.4,
      ease: "power2.inOut",
      onComplete: () => {
        caption.innerHTML = `${nextItem.label} <span class="gallery-counter">${String(activeIndex + 1).padStart(2, "0")} / ${String(GALLERY_ITEMS.length).padStart(2, "0")}</span>`;
        gsap.set(caption, { y: direction > 0 ? 15 : -15 });
      }
    })
    .to(caption, {
      opacity: 1,
      y: 0,
      duration: 0.6,
      ease: "power3.out"
    }, 0.6);

    // Anima a nova imagem passando por cima da antiga (prevWrapper)
    gsap.killTweensOf([nextWrapper, prevWrapper, nextImg, prevImg]);
    
    gsap.timeline({
      onComplete: () => {
        // Oculta a imagem e wrapper anteriores após a nova cobri-los completamente
        gsap.set(prevWrapper, {
          visibility: "hidden",
          autoAlpha: 0,
          zIndex: 1
        });
        gsap.set(prevImg, {
          visibility: "hidden"
        });
        activeWrapper = nextWrapper;
        inactiveWrapper = prevWrapper;
        activeImg = nextImg;
        inactiveImg = prevImg;
      }
    })
    // Slide container in
    .to(nextWrapper, {
      yPercent: 0,
      duration: 1.25,
      ease: "power3.inOut"
    }, 0)
    // Parallax reverso on incoming image
    .to(nextImg, {
      yPercent: 0,
      duration: 1.25,
      ease: "power3.inOut"
    }, 0)
    // Slide old wrapper out slightly and fade out
    .to(prevWrapper, {
      yPercent: prevImgEndPercent * 0.5,
      autoAlpha: 0,
      duration: 1.25,
      ease: "power3.inOut"
    }, 0)
    .to(prevImg, {
      scale: 1.0,
      yPercent: prevImgEndPercent,
      duration: 1.25,
      ease: "power3.inOut"
    }, 0);
  };

  closeButton?.addEventListener("click", close);
  prevButton?.addEventListener("click", () => goTo(-1));
  nextButton?.addEventListener("click", () => goTo(1));

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) close();
  });

  window.addEventListener("keydown", (event) => {
    if (!lightbox.classList.contains("is-open")) return;

    if (event.key === "Escape") close();
    if (event.key === "ArrowLeft") goTo(-1);
    if (event.key === "ArrowRight") goTo(1);
  });

  return { open };
}

function buildChaleTimeline({ chaleSection, textBlock, subText, track }) {
  const supraText = document.getElementById("chale-supra");
  const pillsSubText = document.getElementById("chale-pills-sub");
  const titleWrapper = document.getElementById("chale-title-wrapper");
  const subWrapper = document.getElementById("chale-sub-wrapper");
  const headerRight = chaleSection.querySelector(".chale-header-right");
  const isResponsiveLayout = window.matchMedia("(max-width: 1024px)").matches;

  const getOrder = (el) => {
    const orderStr = window.getComputedStyle(el).order;
    const parsed = parseInt(orderStr, 10);
    return isNaN(parsed) ? 0 : parsed;
  };
  const pills = Array.from(chaleSection.querySelectorAll(".chale-pill-large")).sort((a, b) => {
    return getOrder(a) - getOrder(b);
  });
  const rows = Array.from(track.querySelectorAll(".chale-gallery-row"));

  if (isResponsiveLayout) {
    buildChaleResponsiveTimeline({
      chaleSection,
      supraText,
      subText,
      pillsSubText,
      titleWrapper,
      subWrapper,
      headerRight,
      pills,
      rows,
      textBlock
    });
    return;
  }

  const getRowDistance = (row) => Math.max(0, row.scrollWidth - window.innerWidth);
  const getMaxDistance = () => Math.max(...rows.map(getRowDistance), 0);
  const scrollDistance = Math.round(Math.max(
    window.innerHeight * 1.2,
    getMaxDistance() * 1.12 + Math.min(window.innerWidth * 0.4, 520)
  ));
  const slides = Array.from(track.querySelectorAll(".chale-slide"));

  const updateSlideParallax = () => {
    const viewportCenter = window.innerWidth * 0.5;

    slides.forEach((slide) => {
      const img = slide.querySelector("img");
      if (!img) return;

      const rect = slide.getBoundingClientRect();
      const slideCenter = rect.left + rect.width * 0.5;
      const normalized = gsap.utils.clamp(-1, 1, (slideCenter - viewportCenter) / viewportCenter);
      const position = 50 - normalized * 6;

      img.style.objectPosition = `${position}% center`;
    });
  };

  // 1. Criar primeiro o ScrollTrigger de entrada (reveal dos textos) com prioridade superior para evitar offset da pinagem
  const headingWords = textBlock.querySelectorAll(".chale-heading-line > span");

  const revealTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: chaleSection,
      start: "top 65%",
      end: "top 15%",
      scrub: 1,
      invalidateOnRefresh: true,
      refreshPriority: 1 // Lower number for first trigger on page as per SKILL.md
    }
  });
  localTriggers.push(revealTimeline.scrollTrigger);

  revealTimeline
  .fromTo(supraText,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 0.65 },
    0
  )
  .fromTo(headingWords,
    { yPercent: 105, opacity: 0 },
    { yPercent: 0, opacity: 1, stagger: 0.08 },
    0
  )
  .fromTo(subText,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 0.7 },
    0.1
  )
  .fromTo(pillsSubText,
    { y: 30, opacity: 0 },
    { y: 0, opacity: 0.65 },
    0.1
  )
  .fromTo(pills,
    { y: 40, opacity: 0, scale: 0.95 },
    { y: 0, opacity: 1, scale: 1, stagger: 0.05 },
    0.1
  );

  gsap.set(rows, { autoAlpha: 1 });

  // 2. Criar depois o timeline pinado
  const chaleTimeline = gsap.timeline({
    scrollTrigger: {
      trigger: chaleSection,
      start: "top top",
      end: () => `+=${Math.round(Math.max(window.innerHeight * 1.2, getMaxDistance() * 1.12 + Math.min(window.innerWidth * 0.4, 520)))}`,
      pin: true,
      scrub: 1.2,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      refreshPriority: 2, // Second trigger on page, so higher number than revealTimeline
      onUpdate: updateSlideParallax,
      onRefresh: updateSlideParallax
    }
  });
  localTriggers.push(chaleTimeline.scrollTrigger);

  const topRow = rows[0];
  const bottomRow = rows[1];

  if (topRow) {
    gsap.set(topRow, { x: () => -getRowDistance(topRow) });
    chaleTimeline.fromTo(topRow, {
      x: () => -getRowDistance(topRow)
    }, {
      x: 0,
      ease: "none",
      duration: scrollDistance
    }, 0);
  }

  if (bottomRow) {
    gsap.set(bottomRow, { x: 0 });
    chaleTimeline.to(bottomRow, {
      x: () => -getRowDistance(bottomRow),
      ease: "none",
      duration: scrollDistance
    }, 0);
  }

  // Fade out do subtexto e pílulas (usando os wrappers externos para isolar do reveal)
  const quickFadeElements = [subWrapper, headerRight].filter(Boolean);
  if (quickFadeElements.length > 0) {
    chaleTimeline.set(quickFadeElements, { y: 0, autoAlpha: 1 }, 0);
    chaleTimeline.to(quickFadeElements, {
      y: -30,
      autoAlpha: 0,
      stagger: 0.02,
      duration: scrollDistance * 0.06,
      ease: "power2.out"
    }, scrollDistance * 0.045);
  }

  // Fade out do título e supra-título (usando o wrapper de título para isolar do reveal)
  if (titleWrapper) {
    chaleTimeline.set(titleWrapper, { y: 0, autoAlpha: 1 }, 0);
    chaleTimeline.to(titleWrapper, {
      y: -50,
      autoAlpha: 0,
      duration: scrollDistance * 0.12,
      ease: "power2.inOut"
    }, scrollDistance * 0.035);
  }

  const getTrackYStart = () => {
    const header = chaleSection.querySelector(".chale-header");
    if (!header) return 0;
    const headerBottom = header.offsetTop + header.offsetHeight;
    const trackHeight = track.offsetHeight;
    
    // Calcula o bottomSpacing correspondente a clamp(1.2rem, 2.5vh, 2.5rem)
    const vh2_5 = window.innerHeight * 0.025;
    const rem1_2 = parseFloat(getComputedStyle(document.documentElement).fontSize) * 1.2;
    const rem2_5 = parseFloat(getComputedStyle(document.documentElement).fontSize) * 2.5;
    const bottomSpacing = Math.min(Math.max(rem1_2, vh2_5), rem2_5);
    
    const defaultTop = window.innerHeight - bottomSpacing - trackHeight;
    const targetTop = headerBottom + Math.min(window.innerHeight * 0.02, 24);
    const yStart = targetTop - defaultTop;
    return yStart < 0 ? 0 : yStart;
  };

  // Pre-set initial y on track so there is no layout jump when entering section
  gsap.set(track, { y: getTrackYStart });

  // Centraliza o track da galeria na tela cheia à medida que o cabeçalho desaparece
  chaleTimeline.fromTo(track, {
    y: getTrackYStart
  }, {
    y: 0,
    ease: "power2.inOut",
    duration: scrollDistance * 0.18
  }, scrollDistance * 0.03);

  updateSlideParallax();
}

function buildChaleResponsiveTimeline({
  chaleSection,
  supraText,
  subText,
  pillsSubText,
  titleWrapper,
  subWrapper,
  headerRight,
  pills,
  rows,
  textBlock
}) {
  const headingWords = textBlock.querySelectorAll(".chale-heading-line > span");
  const hint = chaleSection.querySelector(".chale-carousel-hint");
  const controls = chaleSection.querySelector(".chale-carousel-controls");

  const introTargets = [
    supraText,
    ...Array.from(headingWords),
    subText,
    pillsSubText,
    ...pills,
    hint,
    controls
  ].filter(Boolean);

  // 1. Reveal do Cabeçalho (Supra + Título)
  const headTrigger = gsap.timeline({
    scrollTrigger: {
      trigger: titleWrapper || chaleSection,
      start: "top 88%",
      once: true,
      invalidateOnRefresh: true
    }
  })
  .to(supraText, { y: 0, opacity: 0.65, duration: 0.5, ease: "power2.out" }, 0)
  .to(headingWords, { yPercent: 0, opacity: 1, stagger: 0.07, duration: 0.6, ease: "power2.out" }, 0.05);
  localTriggers.push(headTrigger.scrollTrigger);

  // 2. Reveal do Subtexto de Descrição
  if (subText) {
    const subTextTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: subWrapper || subText,
        start: "top 90%",
        once: true,
        invalidateOnRefresh: true
      }
    })
    .to(subText, { y: 0, opacity: 0.86, duration: 0.6, ease: "power2.out" });
    localTriggers.push(subTextTrigger.scrollTrigger);
  }

  // 3. Reveal das Comodidades (Subtítulo + Pílulas)
  if (pillsSubText && pills.length) {
    const commoditiesTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: headerRight || pillsSubText,
        start: "top 90%",
        once: true,
        invalidateOnRefresh: true
      }
    })
    .to(pillsSubText, { y: 0, opacity: 0.72, duration: 0.4, ease: "power2.out" }, 0)
    .to(pills, { y: 0, opacity: 1, scale: 1, stagger: 0.05, duration: 0.6, ease: "power2.out" }, 0.08);
    localTriggers.push(commoditiesTrigger.scrollTrigger);
  }

  // 4. Reveal dos Controles e Dica do Carrossel
  if (hint || controls) {
    const galleryControlsTrigger = gsap.timeline({
      scrollTrigger: {
        trigger: chaleSection.querySelector(".chale-gallery-viewport") || hint || controls,
        start: "top 92%",
        once: true,
        invalidateOnRefresh: true
      }
    })
    .to([hint, controls].filter(Boolean), { y: 0, opacity: 1, stagger: 0.05, duration: 0.5, ease: "power2.out" });
    localTriggers.push(galleryControlsTrigger.scrollTrigger);
  }

  // 5. Revelação dos Slides do Carrossel (apenas em layout responsivo/mobile)
  if (isResponsiveLayout) {
    rows.forEach((row) => {
      const rowTrigger = gsap.fromTo(row,
        { y: 30, autoAlpha: 0, scale: 0.985 },
        {
          y: 0,
          scale: 1,
          autoAlpha: 1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: row,
            start: "top 92%",
            once: true,
            invalidateOnRefresh: true
          }
        }
      );
      localTriggers.push(rowTrigger.scrollTrigger);
    });
  } else {
    gsap.set(rows, { autoAlpha: 1, y: 0, scale: 1 });
  }

  gsap.set([titleWrapper, subWrapper, headerRight, ...introTargets].filter(Boolean), {
    clearProps: "willChange"
  });
}

if (import.meta.hot) {
  import.meta.hot.dispose(() => {
    localTriggers.forEach((t) => t && t.kill());
    localTriggers = [];
    if (resizeRefreshHandler) {
      window.removeEventListener("resize", resizeRefreshHandler);
      resizeRefreshHandler = null;
    }
    window.clearTimeout(resizeRefreshTimer);
  });
}
