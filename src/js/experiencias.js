/**
 * experiencias.js - Pontos turisticos, accordion e drawer de detalhes.
 */

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SplitText } from "gsap/SplitText";
import Lenis from "lenis";
import * as smoothScroll from "./smoothScroll.js";

gsap.registerPlugin(ScrollTrigger, SplitText);

const IMG = {
  picoPiao: [
    "/imgs-videos/pico%20do%20piao/caption-1.webp",
    "/imgs-videos/pico%20do%20piao/caption-2.webp",
    "/imgs-videos/pico%20do%20piao/caption-3.webp",
    "/imgs-videos/pico%20do%20piao/caption-4.webp",
    "/imgs-videos/pico%20do%20piao/caption-5.webp",
    "/imgs-videos/pico%20do%20piao/caption-6.webp",
    "/imgs-videos/pico%20do%20piao/caption-7.webp",
    "/imgs-videos/pico%20do%20piao/caption-8.webp",
    "/imgs-videos/pico%20do%20piao/caption-9.webp",
    "/imgs-videos/pico%20do%20piao/caption-10.webp",
    "/imgs-videos/pico%20do%20piao/img-3195-2-large.webp"
  ],
  janelaCeu: [
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-1.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-2-1.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-2.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-3.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-4.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-5.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-6.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-9.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-10.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca-12.webp",
    "/imgs-videos/janela-do-ceu-parquedeibitipoca/janela-do-ceu-ibitipoca.webp"
  ],
  circuitoAguas: [
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-2.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-4.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-5.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-6.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-7.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-8.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-10.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-11.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-12.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-13.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-14.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca-15.webp",
    "/imgs-videos/circuito-das-aguas/circuito-das-aguas-ibitipoca.webp"
  ],
  comida: [
    "/imgs-videos/comida/algumas-das-delicias.webp",
    "/imgs-videos/comida/arroz-de-camarao.webp",
    "/imgs-videos/comida/cabra-da-peste.webp",
    "/imgs-videos/comida/caption.webp",
    "/imgs-videos/comida/com-um-ambiente-convidativo.webp",
    "/imgs-videos/comida/getlstd-property-photo.webp",
    "/imgs-videos/comida/mesas-apra-grupos-grandes.webp",
    "/imgs-videos/comida/mexidao.webp",
    "/imgs-videos/comida/montanhes-desde-2015.webp",
    "/imgs-videos/comida/nossa-rabada-com-agriao.webp",
    "/imgs-videos/comida/pizza.webp"
  ],
  vila: [
    "/imgs-videos/vila/caption.webp",
    "/imgs-videos/vila/centro-ibitipoca-2.webp",
    "/imgs-videos/vila/download.webp",
    "/imgs-videos/vila/image.webp"
  ]
};

const EXPERIENCIAS_DATA = {
  "pico-piao": {
    badge: "Aventura & História",
    title: "Pico do Pião",
    subtitle: "Ruínas lendárias e visão panorâmica em 360 graus",
    images: IMG.picoPiao,
    text: `
      <div class="drawer-detail-grid">
        <div class="drawer-detail-card"><span>Percurso</span><strong>9,5 km</strong></div>
        <div class="drawer-detail-card"><span>Tempo médio</span><strong>6 h</strong></div>
        <div class="drawer-detail-card"><span>Altitude</span><strong>1.721 m</strong></div>
      </div>
      <p>O <strong>Roteiro do Pico do Pião</strong> é uma das caminhadas mais fascinantes e ricas do Parque Estadual do Ibitipoca, combinando natureza selvagem, campos rupestres e um forte apelo histórico e espiritual.</p>
      <p>A jornada nos leva por extensos campos abertos, mirantes de pedra e vento constante de montanha. A grande atração é a ruína de uma antiga capela localizada no alto do Pico do Pião, conhecida popularmente como a “escada para o céu”. Prestes a completar 100 anos, a estrutura de alvenaria ergue-se contra o azul do firmamento, servindo como testemunho do passado colonial e das romarias da serra.</p>
      
      <h4>Pontos de Destaque no Caminho</h4>
      <ul class="drawer-feature-list">
        <li><strong>Ruína da Capela:</strong> O cume do Pico do Pião (1.721 m) com vista 360° panorâmica espetacular.</li>
        <li><strong>Gruta dos Viajantes:</strong> Uma caverna ampla que historicamente servia de abrigo para tropeiros e viajantes contra tempestades.</li>
        <li><strong>Cachoeira da Pedra Furada:</strong> Queda d'água exótica cujo leito corre por dentro de uma fenda na rocha antes de despencar.</li>
        <li><strong>Cachoeira do Encanto & Poço do Campari:</strong> Paradas refrescantes ideais para reidratação e descanso no percurso de volta.</li>
        <li><strong>Gruta do Monjolinho:</strong> Formação rochosa mística envolta em vegetação mais densa.</li>
      </ul>

      <h4>Conselhos de Segurança</h4>
      <p>O percurso de 9,5 km (ida e volta) é longo e muito exposto ao sol. Recomenda-se o uso de tênis confortável de trilha ou bota de montanhismo, protetor solar, chapéu, lanche leve e no mínimo 1,5L de água por pessoa. Evite subir ao pico em dias chuvosos ou com previsão de tempestade elétrica devido ao perigo de descargas atmosféricas nas cristas rochosas.</p>
    `
  },
  "janela-ceu": {
    badge: "Ecoturismo Icônico",
    title: "Janela do Céu",
    subtitle: "O portal natural que emoldura o horizonte da serra",
    images: IMG.janelaCeu,
    text: `
      <div class="drawer-detail-grid">
        <div class="drawer-detail-card"><span>Percurso</span><strong>16 km</strong></div>
        <div class="drawer-detail-card"><span>Ritmo</span><strong>Dia inteiro</strong></div>
        <div class="drawer-detail-card"><span>Ponto alto</span><strong>Borda infinita</strong></div>
      </div>
      <p>A <strong>Janela do Céu</strong> é o circuito mais famoso, extenso e desafiador de Conceição do Ibitipoca. Trata-se do topo de uma cachoeira onde o curso d'água corta um portal rochoso de quartzito e cai no abismo, criando um efeito visual de piscina de borda infinita com o horizonte da serra.</p>
      <p>O caminho é circular e passa pelos ecossistemas de altitude mais impressionantes da serra, cruzando riachos dourados e campos rupestres secos antes de alcançar a mata ciliar preservada onde corre a cachoeira.</p>

      <h4>O Roteiro de Atrativos Inclusos</h4>
      <ul class="drawer-feature-list">
        <li><strong>O Cruzeiro:</strong> Ponto histórico marcado por uma cruz de madeira e mirante natural da serra.</li>
        <li><strong>Lombada:</strong> O ponto mais alto de todo o Parque Estadual do Ibitipoca, a 1.784 metros de altitude, com forte vento e horizonte infinito.</li>
        <li><strong>Gruta dos Três Arcos & Gruta dos Moreiras:</strong> Enormes salões de rocha quartzítica com iluminação natural espetacular pelas frestas.</li>
        <li><strong>Janela do Céu:</strong> O mirante da borda infinita de onde a água despenca 35 metros em direção ao vale.</li>
        <li><strong>Cachoeirinha:</strong> Uma queda d'água super agradável com prainha de areia branca na base, perfeita para banho de sol e de rio.</li>
      </ul>

      <h4>Dicas Práticas de Sobrevivência</h4>
      <p>Com 16 km de percurso acidentado e muitas subidas, reserve um dia inteiro. Comece o passeio preferencialmente entre as 7h e as 9h. Leve lanches reforçados (frutas, sanduíches), casaco corta-vento (na Lombada a temperatura cai e venta forte), toalha, calçado resistente com boa aderência e bastante água. A descida úmida até a Janela requer atenção redobrada para evitar escorregões.</p>
    `
  },
  "circuito-aguas": {
    badge: "Cachoeiras & Lazer",
    title: "Circuito das Águas",
    subtitle: "Poços dourados, prainhas e banho de rio na serra",
    images: IMG.circuitoAguas,
    text: `
      <div class="drawer-detail-grid">
        <div class="drawer-detail-card"><span>Percurso</span><strong>5 km</strong></div>
        <div class="drawer-detail-card"><span>Perfil</span><strong>Leve/moderado</strong></div>
        <div class="drawer-detail-card"><span>Melhor para</span><strong>Banho e pausa</strong></div>
      </div>
      <p>O <strong>Circuito das Águas</strong> é o menor e mais refrescante roteiro do parque. Ao contrário dos outros circuitos que exigem longos deslocamentos para chegar às atrações, o Circuito das Águas revela poços dourados, prainhas fluviais de areia clara e quedas d'água a cada poucas centenas de metros.</p>
      <p>A coloração alaranjada/avermelhada das águas é um charme à parte, resultante da decomposição natural de matéria orgânica vegetal (tanino) presente no solo quartzítico da serra, sendo perfeitamente limpa e própria para banho.</p>

      <h4>Pontos de Parada Detalhados</h4>
      <ul class="drawer-feature-list">
        <li><strong>Lago das Miragens & Gruta dos Gnomos:</strong> Um poço largo e de águas calmas costeando os imponentes paredões de pedra da descida do rio.</li>
        <li><strong>Raia das Ninfas:</strong> Sucessão de piscinas naturais rasas e transparentes moldadas pelas rochas.</li>
        <li><strong>Ponte de Pedra:</strong> Uma impressionante caverna quartzítica natural por onde o rio atravessa.</li>
        <li><strong>Mirante do Gavião:</strong> Excelente local para avistar de cima a Cachoeira dos Macacos e a vegetação preservada do cânion.</li>
        <li><strong>Cachoeira dos Macacos:</strong> A maior queda d'água do circuito, com um poço profundo ideal para nadar e pequenas piscinas naturais que parecem banheiras na base.</li>
        <li><strong>Prainha:</strong> Uma margem de areia branca rasa e sem correnteza, excelente para descansar com crianças.</li>
        <li><strong>Lago Negro & Lago dos Espelhos:</strong> Poços calmos e muito espelhados. No Lago Negro a profundidade impede a visão do fundo, criando um visual misterioso.</li>
        <li><strong>A Ducha:</strong> Forte queda d'água onde o visitante pode se posicionar embaixo para uma massagem natural forte.</li>
      </ul>

      <h4>Dica de Roteiro Inverso</h4>
      <p>Para aproveitar o sol no auge sobre a Cachoeira dos Macacos e os poços dos lagos, inicie a trilha no sentido inverso (passando primeiro pela Cachoeira dos Macacos de manhã e terminando nos lagos de tarde). Leve repelente, protetor solar e calçado extra para molhar se quiser explorar o leito do rio.</p>
    `
  },
  "culinaria-gastronomia": {
    badge: "Sabores Mineiros",
    title: "Sabores da Serra",
    subtitle: "Fogão a lenha, pão de canela e cozinha de montanha",
    images: IMG.comida,
    text: `
      <div class="drawer-detail-grid">
        <div class="drawer-detail-card"><span>Clima</span><strong>Noite fria</strong></div>
        <div class="drawer-detail-card"><span>Ritmo</span><strong>Pós-trilha</strong></div>
        <div class="drawer-detail-card"><span>Estilo</span><strong>Mineiro e serra</strong></div>
      </div>
      <p>A gastronomia em Conceição de Ibitipoca é uma atração à parte que combina perfeitamente com o clima frio e aconchegante da serra. Fogão a lenha, panelas de ferro, queijos locais (como o queijo canastra) e doces caseiros dão o tom dos almoços e jantares pós-trilha.</p>
      
      <h4>Guia de Restaurantes Recomendados</h4>
      <ul class="drawer-feature-list">
        <li><strong>Cabra da Peste:</strong> Pratos quentes de grelhados e carnes nobres com acompanhamentos tipicamente mineiros.</li>
        <li><strong>Bar do Firma (Candeias Blues Bar):</strong> O bar mais icônico de Ibitipoca. O ambiente rústico e repleto de antiguidades do teto ao chão ganha vida nas noites de fim de semana com rock e blues ao vivo.</li>
        <li><strong>The Wall Ibitipoca:</strong> Restaurante e pub animado que serve petiscos típicos mineiros generosos e drinks elaborados.</li>
        <li><strong>Recanto do Fondue:</strong> Bistrô aconchegante focado em fondues de queijo, carnes na pedra e chocolate para aquecer as noites frias de outono e inverno. Funciona sob reserva.</li>
        <li><strong>Pizzaria Serra Nostra:</strong> Servindo pizzas artesanais assadas no forno a lenha, massas frescas e uma carta de vinhos selecionada há mais de 25 anos.</li>
        <li><strong>Montanhês Hamburgueria:</strong> Hambúrgueres artesanais de alta qualidade servidos com queijo canastra fundido e pão caseiro. A sobremesa de goiabada com queijo gorgonzola é imperdível.</li>
        <li><strong>Oliva Bistrô:</strong> Pratos contemporâneos sofisticados com foco em ingredientes locais, como truta e carne de porco acompanhados de cogumelos shiitake colhidos na serra.</li>
      </ul>

      <h4>Dica Prática</h4>
      <p>A vila é pequena e a maioria dos restaurantes de destaque concentra-se na rua central (Rua Olga Silva Oliveira). Em finais de semana prolongados ou feriados, as mesas costumam ser muito disputadas de noite, por isso chegue cedo (por volta das 19h30) ou agende reserva antecipadamente nos bistrôs.</p>
    `
  },
  "vila-cruzeiro": {
    badge: "Charme Colonial",
    title: "Vila & Cruzeiro",
    subtitle: "Ruas de pedra e fim de tarde nas montanhas",
    images: IMG.vila,
    text: `
      <div class="drawer-detail-grid">
        <div class="drawer-detail-card"><span>Distância</span><strong>3 km do parque</strong></div>
        <div class="drawer-detail-card"><span>Ritmo</span><strong>Caminhar leve</strong></div>
        <div class="drawer-detail-card"><span>Base</span><strong>Lima Duarte</strong></div>
      </div>
      <p>A <strong>Vila de Conceição de Ibitipoca</strong> é um charmoso distrito histórico do município de Lima Duarte - MG. Situada nos contrafortes da Serra da Mantiqueira, a vila encanta os visitantes com suas ruas estreitas de pedra, casinhas coloniais coloridas, praça central arborizada e hospitalidade calorosa.</p>
      
      <h4>História, Nome e Tradição</h4>
      <ul class="drawer-feature-list">
        <li><strong>Origem do Nome:</strong> De origem indígena Tupi, o termo significa "Casa da Terra que Treme" (Yby = terra, tipe = tremer, oka = casa), em alusão aos fortes trovões que ecoam nas montanhas na época das chuvas de verão.</li>
        <li><strong>Igreja Matriz de Nossa Senhora da Conceição:</strong> Edificada no século XVIII durante o ciclo da exploração do ouro em Minas Gerais, a igreja domina o vilarejo com sua arquitetura colonial imponente.</li>
        <li><strong>Passagem de Saint-Hilaire:</strong> Em 1822, o renomado botânico e naturalista francês Auguste de Saint-Hilaire explorou e registrou a fauna e a exuberante flora da região.</li>
        <li><strong>Redescoberta Turística:</strong> Nos anos 70, a vila foi redescoberta por estudantes universitários e pesquisadores que se encantaram com a biodiversidade local, transformando o ecoturismo no novo ouro de Ibitipoca.</li>
      </ul>

      <h4>Dicas Importantes para o Viajante</h4>
      <p>Não há postos de combustível em Conceição do Ibitipoca. O motorista deve abastecer o veículo no centro de Lima Duarte antes de subir a serra de 27 km de terra. Também não existem agências bancárias ou caixas eletrônicos na vila (embora quase todos os estabelecimentos aceitem cartão e Pix). Dedique um fim de tarde para caminhar pela vila, saborear um pão de queijo e ouvir causos dos moradores locais.</p>
    `
  }
};

export function initExperiencias() {
  const accordions = Array.from(document.querySelectorAll(".chale-accordion"));
  if (!accordions.length) return;

  const sideDrawer = document.getElementById("side-drawer");
  const drawerContainer = sideDrawer ? sideDrawer.querySelector(".drawer-container") : null;
  const backdrop = document.getElementById("drawer-backdrop");
  const closeBtn = document.getElementById("drawer-close");
  let lastFocusedElement = null;
  let drawerTitleSplit = null;
  let drawerSubtitleSplit = null;
  let drawerImageTimer = null;
  let drawerImageIndex = 0;
  let drawerImages = [];
  let isDrawerImageAnimating = false;
  let isHovered = false;
  let isDrawerTransitioning = false;
  let currentDrawerDataId = null;
  let slideTimeline = null;
  let exitTimeline = null;
  let enterTimeline = null;
  const DRAWER_DATA_KEYS = Object.keys(EXPERIENCIAS_DATA);
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const getPanelRevealItems = (panel) => Array.from(panel.querySelectorAll(
    ".panel-tag, .panel-title, .panel-description, .btn-panel-details"
  ));

  const isResponsiveAccordion = () => window.matchMedia("(max-width: 1024px)").matches;

  const getPanelContentHeight = (panel) => {
    const content = panel?.querySelector(".panel-content");
    if (!content) return 0;

    const contentStyle = window.getComputedStyle(content);
    const paddingY = (parseFloat(contentStyle.paddingTop) || 0) + (parseFloat(contentStyle.paddingBottom) || 0);
    const revealItems = getPanelRevealItems(panel);
    const itemsHeight = revealItems.reduce((total, item) => {
      const itemStyle = window.getComputedStyle(item);
      const marginY = (parseFloat(itemStyle.marginTop) || 0) + (parseFloat(itemStyle.marginBottom) || 0);
      return total + Math.max(item.scrollHeight, item.offsetHeight, item.getBoundingClientRect().height) + marginY;
    }, 0);

    return paddingY + itemsHeight;
  };

  const getResponsivePanelHeight = (panel) => {
    if (!panel) return 0;

    const contentHeight = getPanelContentHeight(panel);
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight || 800;
    const isPhone = window.innerWidth <= 500;
    const isCompact = window.innerWidth <= 768;
    const minHeight = isPhone ? 390 : isCompact ? 430 : 460;
    const viewportCap = isPhone ? viewportHeight * 0.72 : isCompact ? viewportHeight * 0.68 : viewportHeight * 0.62;
    const maxHeight = Math.max(minHeight + 24, viewportCap);

    return Math.ceil(gsap.utils.clamp(minHeight, maxHeight, contentHeight + 92));
  };

  const syncResponsivePanelHeights = (accordion) => {
    if (!accordion || !isResponsiveAccordion()) return;

    const activePanel = accordion.querySelector(".accordion-panel.active");
    const panels = Array.from(accordion.querySelectorAll(".accordion-panel"));
    const targetHeight = getResponsivePanelHeight(activePanel);
    if (targetHeight) {
      accordion.style.setProperty("--active-panel-height", `${targetHeight}px`);
    }

    panels.forEach((panel) => {
      if (panel.classList.contains("active")) {
        gsap.set(panel, { height: targetHeight || "var(--active-panel-height)" });
      } else {
        gsap.set(panel, { clearProps: "height" });
      }
    });
  };

  const keepResponsivePanelInView = (panel) => {
    if (!panel || !isResponsiveAccordion()) return;

    requestAnimationFrame(() => {
      const rect = panel.getBoundingClientRect();
      const viewportPadding = 18;
      const isTopCut = rect.top < viewportPadding;
      const isBottomCut = rect.bottom > window.innerHeight - viewportPadding;
      const isCut = isTopCut || isBottomCut;
      if (!isCut) return;

      let target = window.scrollY;
      if (isBottomCut) {
        target += rect.bottom - (window.innerHeight - viewportPadding);
      }
      if (isTopCut) {
        target += rect.top - Math.max(72, window.innerHeight * 0.12);
      }
      target = Math.max(0, target);
      if (smoothScroll.lenis) {
        smoothScroll.lenis.scrollTo(target, { duration: 0.5, lock: false });
      } else {
        window.scrollTo({ top: target, behavior: "smooth" });
      }
    });
  };

  const animatePanelContent = (panel) => {
    if (prefersReducedMotion || !panel) return;

    const items = getPanelRevealItems(panel);
    if (!items.length) return;

    gsap.killTweensOf(items);
    gsap.fromTo(items,
      {
        y: 18,
        opacity: 0,
        clipPath: "inset(10% 0% 0% 0%)"
      },
      {
        y: 0,
        clipPath: "inset(0% 0% 0% 0%)",
        opacity: (_index, element) => element.classList.contains("panel-description") ? 0.84 : 1,
        duration: 0.38,
        stagger: 0.028,
        ease: "power3.out",
        overwrite: true
      }
    );
  };

  const setupAccordion = (accordion) => {
    const panels = Array.from(accordion.querySelectorAll(".accordion-panel"));
    if (!panels.length) return;
    let isAccordionTransitioning = false;

    const updatePanelInteractivity = () => {
      panels.forEach((panel) => {
        const isActive = panel.classList.contains("active");
        const detailButton = panel.querySelector(".btn-panel-details");
        if (!detailButton) return;

        detailButton.setAttribute("aria-hidden", String(!isActive));
        detailButton.tabIndex = isActive ? 0 : -1;
      });
    };

    const setActivePanel = (activePanel) => {
      if (!activePanel || activePanel.classList.contains("active")) {
        syncResponsivePanelHeights(accordion);
        updatePanelInteractivity();
        return;
      }

      if (isResponsiveAccordion()) {
        if (isAccordionTransitioning) return;
        isAccordionTransitioning = true;
        accordion.classList.add("is-transitioning");

        const previousPanel = panels.find((panel) => panel.classList.contains("active"));
        const closedHeight = () => {
          const fallback = window.innerWidth <= 500 ? 72 : 104;
          const value = parseFloat(getComputedStyle(activePanel).getPropertyValue("--closed-panel-height"));
          return Number.isFinite(value) && value > 0 ? value : fallback;
        };
        const nextHeight = getResponsivePanelHeight(activePanel);
        accordion.style.setProperty("--active-panel-height", `${nextHeight}px`);

        panels.forEach((panel) => {
          const isActive = panel === activePanel;
          panel.classList.toggle("active", isActive);
          panel.setAttribute("aria-expanded", String(isActive));

          if (!isActive) {
            const items = getPanelRevealItems(panel);
            gsap.killTweensOf(items);
            gsap.set(items, { clearProps: "opacity,transform,clipPath" });
          }
        });
        updatePanelInteractivity();

        const tl = gsap.timeline({
          defaults: { ease: "power3.inOut", overwrite: true },
          onComplete: () => {
            panels.forEach((panel) => {
              if (panel !== activePanel) gsap.set(panel, { clearProps: "height" });
            });
            activePanel.style.height = `${nextHeight}px`;
            accordion.classList.remove("is-transitioning");
            isAccordionTransitioning = false;
            // No mobile, os textos revelam-se de forma nativa e fluida via CSS a partir do momento em que o card
            // ganha a classe .active, portanto não chamamos animatePanelContent aqui para evitar dupla animação e pulos.
            ScrollTrigger.refresh();
            window.setTimeout(() => ScrollTrigger.refresh(), 200);
          }
        });

        if (previousPanel && previousPanel !== activePanel) {
          tl.to(previousPanel, {
            height: closedHeight(),
            duration: 0.52
          }, 0);
        }

        tl.fromTo(activePanel,
          { height: previousPanel === activePanel ? nextHeight : closedHeight() },
          { height: nextHeight, duration: 0.68 },
          0
        );
        return;
      }

      panels.forEach((panel) => {
        const isActive = panel === activePanel;
        panel.classList.toggle("active", isActive);
        panel.setAttribute("aria-expanded", String(isActive));

        if (!isActive) {
          const items = getPanelRevealItems(panel);
          gsap.killTweensOf(items);
          gsap.set(items, { clearProps: "opacity,transform,clipPath" });
        }
      });

      updatePanelInteractivity();
      animatePanelContent(activePanel);
    };

    panels.forEach((panel) => {
      const title = panel.querySelector(".panel-title");
      if (title) panel.dataset.title = title.textContent.trim();

      panel.setAttribute("role", "button");
      panel.setAttribute("tabindex", "0");
      panel.setAttribute("aria-expanded", String(panel.classList.contains("active")));

      panel.addEventListener("click", (e) => {
        if (e.target.closest(".btn-panel-details")) return;
        if (isDrawerTransitioning) return;
        setActivePanel(panel);
      });

      panel.addEventListener("keydown", (e) => {
        if (e.key !== "Enter" && e.key !== " ") return;
        e.preventDefault();
        if (isDrawerTransitioning) return;
        setActivePanel(panel);
      });
    });

    initExperienciasReveal(accordion, prefersReducedMotion);
    syncResponsivePanelHeights(accordion);
    updatePanelInteractivity();
    window.addEventListener("resize", () => {
      requestAnimationFrame(() => {
        syncResponsivePanelHeights(accordion);
        updatePanelInteractivity();
      });
    }, { passive: true });

    const detailButtons = accordion.querySelectorAll(".btn-panel-details");
    detailButtons.forEach((btn) => {
      btn.addEventListener("click", (e) => {
        e.stopPropagation();
        if (isDrawerTransitioning) return;
        const owningPanel = btn.closest(".accordion-panel");
        if (owningPanel && !owningPanel.classList.contains("active")) {
          setActivePanel(owningPanel);
          return;
        }
        const targetId = btn.getAttribute("data-target");
        const itemData = EXPERIENCIAS_DATA[targetId];
        if (itemData) openDrawer(itemData, targetId);
      });
    });
  };

  accordions.forEach(setupAccordion);

  const updateDrawerScrollCue = () => {
    const scrollArea = document.getElementById("drawer-scroll-area");
    const scrollCue = document.getElementById("drawer-scroll-cue");
    if (!scrollArea || !scrollCue) return;

    const hasOverflow = scrollArea.scrollHeight > scrollArea.clientHeight + 8;
    const remaining = scrollArea.scrollHeight - scrollArea.clientHeight - scrollArea.scrollTop;
    scrollCue.classList.toggle("is-hidden", !hasOverflow || remaining < 28);
  };

  const updateDrawerThumbs = () => {
    const countEl = document.getElementById("drawer-image-count");
    const thumbButtons = Array.from(document.querySelectorAll(".drawer-thumb"));
    if (countEl) {
      const current = String(drawerImageIndex + 1).padStart(2, "0");
      const total = String(drawerImages.length || 1).padStart(2, "0");
      
      const currentEl = countEl.querySelector(".current-num");
      const totalEl = countEl.querySelector(".total-num");
      
      if (currentEl && totalEl) {
        totalEl.textContent = total;
        if (currentEl.textContent !== current) {
          gsap.killTweensOf(currentEl);
          gsap.timeline()
            .to(currentEl, {
              y: -12,
              opacity: 0,
              duration: 0.28,
              ease: "power2.in",
              onComplete: () => {
                currentEl.textContent = current;
                gsap.set(currentEl, { y: 12 });
              }
            })
            .to(currentEl, {
              y: 0,
              opacity: 1,
              duration: 0.35,
              ease: "power2.out"
            });
        }
      } else {
        countEl.textContent = `${current} / ${total}`;
      }
    }

    thumbButtons.forEach((button, index) => {
      const active = index === drawerImageIndex;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
    });

    // Centering the active thumbnail smoothly when it changes
    const activeBtn = thumbButtons[drawerImageIndex];
    const thumbStrip = document.getElementById("drawer-thumb-strip");
    if (activeBtn && thumbStrip) {
      const containerWidth = thumbStrip.clientWidth;
      const btnOffsetLeft = activeBtn.offsetLeft;
      const btnWidth = activeBtn.clientWidth;
      const targetScrollLeft = btnOffsetLeft - (containerWidth / 2) + (btnWidth / 2);

      gsap.to(thumbStrip, {
        scrollLeft: targetScrollLeft,
        duration: 0.65,
        ease: "power2.out",
        overwrite: "auto"
      });
    }
  };

  const updateNextPointButton = (currentId) => {
    const nextBtn = document.getElementById("drawer-next-btn");
    if (!nextBtn || !currentId) return;
    const currentIndex = DRAWER_DATA_KEYS.indexOf(currentId);
    if (currentIndex === -1) return;
    const nextIndex = (currentIndex + 1) % DRAWER_DATA_KEYS.length;
    const nextId = DRAWER_DATA_KEYS[nextIndex];
    const nextData = EXPERIENCIAS_DATA[nextId];
    if (nextData) {
      const nextImg = nextData.images && nextData.images[0] ? nextData.images[0] : "";
      const span = nextBtn.querySelector("span");
      if (span) {
        span.textContent = `Próximo: ${nextData.title}`;
      }
      if (nextImg) {
        nextBtn.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0.55), rgba(0, 0, 0, 0.55)), url('${nextImg}')`;
      } else {
        nextBtn.style.backgroundImage = "";
      }
    }
  };

  const stopDrawerImageLoop = () => {
    if (!drawerImageTimer) return;
    window.clearInterval(drawerImageTimer);
    drawerImageTimer = null;
  };

  const startDrawerImageLoop = () => {
    stopDrawerImageLoop();
    if (prefersReducedMotion || drawerImages.length < 2) return;
    drawerImageTimer = window.setInterval(() => {
      if (!isHovered) {
        goToDrawerImage((drawerImageIndex + 1) % drawerImages.length, false, 'down');
      }
    }, 5000);
  };

  // ── Centralised cleanup helper ──────────────────────────────────────
  function killSlideTransition() {
    if (slideTimeline) { slideTimeline.kill(); slideTimeline = null; }
    isDrawerImageAnimating = false;
    const currentImg = document.getElementById("drawer-stage-img-current");
    if (currentImg) {
      gsap.killTweensOf(currentImg);
      gsap.set(currentImg, { yPercent: 0, autoAlpha: 1, scale: 1.1, x: 0, y: 0 });
    }
    const frame = document.getElementById("drawer-stage-frame");
    if (frame) {
      frame.querySelectorAll(".slide-transition-container").forEach(c => c.remove());
    }
  }

  function killContentTransitions() {
    if (exitTimeline)  { exitTimeline.kill();  exitTimeline = null; }
    if (enterTimeline) { enterTimeline.kill(); enterTimeline = null; }
  }

  // ── Go-To Image (Slide & Parallax transition) ──────────────────────
  function goToDrawerImage(index, immediate = false, direction = 'down', onCompleteCallback = null) {
    const currentImg = document.getElementById("drawer-stage-img-current");
    const frame = document.getElementById("drawer-stage-frame");
    if (!currentImg || !frame || !drawerImages.length) return;

    const nextIndex = ((index % drawerImages.length) + drawerImages.length) % drawerImages.length;
    if (!immediate && nextIndex === drawerImageIndex) return;

    // ── Always kill any running slide transition first ──
    killSlideTransition();

    const nextSrc = drawerImages[nextIndex];

    // ── Immediate swap (no animation) ──
    if (immediate || prefersReducedMotion) {
      drawerImageIndex = nextIndex;
      currentImg.src = nextSrc;
      currentImg.alt = `${document.getElementById("drawer-title")?.textContent || "Imagem"} - imagem ${drawerImageIndex + 1}`;
      gsap.set(currentImg, { autoAlpha: 1, scale: 1.1, x: 0, y: 0, yPercent: 0 });
      // Update blurred bg
      const bg = document.getElementById("drawer-stage-bg");
      if (bg) bg.style.backgroundImage = `url('${nextSrc}')`;
      updateDrawerThumbs();
      return;
    }

    // Update counter / thumbs immediately for responsiveness
    drawerImageIndex = nextIndex;
    updateDrawerThumbs();
    isDrawerImageAnimating = true;

    // ── Prepare old image state (clear translations, scale 1.1) ──
    gsap.killTweensOf(currentImg);
    gsap.set(currentImg, { x: 0, y: 0, scale: 1.1, yPercent: 0, autoAlpha: 1 });

    // ── Build slide container ──
    const slideContainer = document.createElement("div");
    slideContainer.className = "slide-transition-container";
    Object.assign(slideContainer.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      overflow: "hidden",
      zIndex: "3",
      pointerEvents: "none"
    });

    const slideImg = document.createElement("img");
    slideImg.src = nextSrc;
    slideImg.alt = "";
    Object.assign(slideImg.style, {
      position: "absolute",
      left: "0",
      top: "0",
      width: "100%",
      height: "100%",
      objectFit: "cover",
      transform: "scale(1.1) translate3d(0,0,0)"
    });

    // ── Determine vertical positioning for Parallax Reverso ──
    const containerStart = direction === 'up' ? -100 : 100;
    const imgStart = direction === 'up' ? 30 : -30;
    const currentImgEnd = direction === 'up' ? 30 : -30;

    gsap.set(slideContainer, { yPercent: containerStart });
    gsap.set(slideImg, { yPercent: imgStart });

    slideContainer.appendChild(slideImg);
    frame.appendChild(slideContainer);

    // ── Animate Slide & Parallax ──
    slideTimeline = gsap.timeline({
      onComplete: () => {
        // Swap real image underneath and clean up
        currentImg.src = nextSrc;
        currentImg.alt = `${document.getElementById("drawer-title")?.textContent || "Imagem"} - imagem ${drawerImageIndex + 1}`;
        gsap.set(currentImg, { scale: 1.1, x: 0, y: 0, yPercent: 0, autoAlpha: 1 });

        // Update blurred bg only AFTER slide finishes
        const bg = document.getElementById("drawer-stage-bg");
        if (bg) bg.style.backgroundImage = `url('${nextSrc}')`;

        slideContainer.remove();
        isDrawerImageAnimating = false;
        slideTimeline = null;
        if (onCompleteCallback) onCompleteCallback();
      }
    });

    slideTimeline
      // Slide container in
      .to(slideContainer, {
        yPercent: 0,
        duration: 1.25,
        ease: "power3.inOut"
      }, 0)
      // Slide new image opposite direction (parallax reverso)
      .to(slideImg, {
        yPercent: 0,
        duration: 1.25,
        ease: "power3.inOut"
      }, 0)
      // Slide old image out + fade out + scale down slightly
      .to(currentImg, {
        yPercent: currentImgEnd,
        autoAlpha: 0,
        scale: 1.0,
        duration: 1.25,
        ease: "power3.inOut"
      }, 0);
  }

  const setupDrawerImages = (data, immediate = true) => {
    const thumbStrip = document.getElementById("drawer-thumb-strip");
    drawerImages = Array.isArray(data.images) ? data.images.filter(Boolean) : [];
    drawerImageIndex = immediate ? 0 : -1;
    stopDrawerImageLoop();

    if (thumbStrip) {
      thumbStrip.innerHTML = drawerImages.map((src, index) => `
        <button class="drawer-thumb" type="button" aria-label="Ver imagem ${index + 1}" aria-pressed="${index === 0}">
          <img src="${src}" alt="" loading="eager" />
        </button>
      `).join("");

      Array.from(thumbStrip.querySelectorAll(".drawer-thumb")).forEach((button, index) => {
        button.addEventListener("click", () => {
          if (isDrawerTransitioning) return;
          stopDrawerImageLoop();
          const direction = index > drawerImageIndex ? 'down' : 'up';
          goToDrawerImage(index, false, direction);
          startDrawerImageLoop();
        });

        // Mousemove heavy parallax on thumbnail card images
        button.addEventListener("mousemove", (e) => {
          const img = button.querySelector("img");
          if (!img || isDrawerImageAnimating) return;

          const rect = button.getBoundingClientRect();
          const mouseX = e.clientX - rect.left;
          const mouseY = e.clientY - rect.top;

          const normX = (mouseX / rect.width) - 0.5;
          const normY = (mouseY / rect.height) - 0.5;

          const moveX = normX * -12;
          const moveY = normY * -12;

          gsap.to(img, {
            x: moveX,
            y: moveY,
            scale: 1.22,
            duration: 0.45,
            ease: "power2.out",
            overwrite: "auto"
          });
        });

        button.addEventListener("mouseleave", () => {
          const img = button.querySelector("img");
          if (!img) return;

          gsap.to(img, {
            x: 0,
            y: 0,
            scale: 1.08,
            duration: 0.55,
            ease: "power3.out",
            overwrite: "auto"
          });
        });
      });
    }

    if (immediate) {
      goToDrawerImage(0, true);
      startDrawerImageLoop();
    }
  };

  const drawerScrollArea = document.getElementById("drawer-scroll-area");
  if (drawerScrollArea) {
    drawerScrollArea.addEventListener("scroll", updateDrawerScrollCue, { passive: true });
  }

  // Active Stage Image heavy mousemove parallax
  function handleStageMouseMove(e) {
    const currentImg = document.getElementById("drawer-stage-img-current");
    const stage = document.getElementById("drawer-stage-frame") || document.getElementById("drawer-image-stage");
    if (!currentImg || !stage || isDrawerImageAnimating || isDrawerTransitioning) return;

    const rect = stage.getBoundingClientRect();
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;

    const normX = (mouseX / rect.width) - 0.5;
    const normY = (mouseY / rect.height) - 0.5;

    const moveX = normX * -24;
    const moveY = normY * -24;

    gsap.to(currentImg, {
      x: moveX,
      y: moveY,
      duration: 0.8,
      ease: "power2.out",
      overwrite: "auto"
    });
  }

  function handleStageMouseLeave() {
    const currentImg = document.getElementById("drawer-stage-img-current");
    if (!currentImg) return;

    gsap.to(currentImg, {
      x: 0,
      y: 0,
      duration: 0.8,
      ease: "power3.out",
      overwrite: "auto"
    });
  }

  function transitionDrawerContent(data, dataId) {
    if (!sideDrawer) return;

    // ── Kill absolutely everything that might be running ──
    killSlideTransition();
    killContentTransitions();
    isDrawerTransitioning = true;
    stopDrawerImageLoop();

    const badgeEl = document.getElementById("drawer-badge");
    const titleEl = document.getElementById("drawer-title");
    const subtitleEl = document.getElementById("drawer-subtitle");
    const textEl = document.getElementById("drawer-text");
    const ctaEl = document.getElementById("drawer-cta");
    const nextBtn = document.getElementById("drawer-next-btn");
    const countEl = document.getElementById("drawer-image-count");
    const thumbStripEl = document.getElementById("drawer-thumb-strip");
    const currentImg = document.getElementById("drawer-stage-img-current");

    if (!badgeEl || !titleEl || !subtitleEl || !textEl) {
      isDrawerTransitioning = false;
      return;
    }

    // Determine direction
    const oldIndex = DRAWER_DATA_KEYS.indexOf(currentDrawerDataId);
    const newIndex = DRAWER_DATA_KEYS.indexOf(dataId);
    let direction = 'down';
    if (oldIndex !== -1 && newIndex !== -1) {
      if (oldIndex === DRAWER_DATA_KEYS.length - 1 && newIndex === 0) {
        direction = 'down';
      } else if (oldIndex === 0 && newIndex === DRAWER_DATA_KEYS.length - 1) {
        direction = 'up';
      } else {
        direction = newIndex > oldIndex ? 'down' : 'up';
      }
    }

    // ── Collect exit targets ──
    const textBlocks = Array.from(textEl.querySelectorAll(".drawer-detail-grid, p, h4, .drawer-feature-list"));
    const exitTargets = [
      badgeEl,
      ...(drawerTitleSplit ? drawerTitleSplit.lines : [titleEl]),
      ...(drawerSubtitleSplit ? drawerSubtitleSplit.lines : [subtitleEl]),
      ...textBlocks,
      ctaEl,
      nextBtn
    ].filter(Boolean);

    const supportEls = [thumbStripEl, countEl].filter(Boolean);

    // Center parallax before exit so image is aligned
    if (currentImg) gsap.set(currentImg, { x: 0, y: 0, scale: 1.1 });

    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    //  PHASE 1 — EXIT  (text + support fade out)  ≈ 0.35s
    // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    exitTimeline = gsap.timeline({
      onComplete: () => {
        exitTimeline = null;
        // ──────────────────────────────────────────────────────────
        //  PHASE 2 — UPDATE  (sync DOM swap while everything hidden)
        // ──────────────────────────────────────────────────────────
        currentDrawerDataId = dataId;
        badgeEl.textContent = data.badge;
        titleEl.textContent = data.title;
        subtitleEl.textContent = data.subtitle;
        textEl.innerHTML = data.text;

        if (drawerTitleSplit) drawerTitleSplit.revert();
        if (drawerSubtitleSplit) drawerSubtitleSplit.revert();
        drawerTitleSplit = SplitText.create(titleEl, { type: "lines", mask: "lines" });
        drawerSubtitleSplit = SplitText.create(subtitleEl, { type: "lines", mask: "lines" });

        const newTitleLines = drawerTitleSplit ? drawerTitleSplit.lines : [titleEl];
        const newSubtitleLines = drawerSubtitleSplit ? drawerSubtitleSplit.lines : [subtitleEl];
        const newTextBlocks = Array.from(textEl.querySelectorAll(".drawer-detail-grid, p, h4, .drawer-feature-list"));

        // Prepare new thumbnails but do NOT start blinds yet
        setupDrawerImages(data, false);
        updateNextPointButton(dataId);

        // Scroll to top
        const scrollArea = document.getElementById("drawer-scroll-area");
        if (scrollArea) {
          scrollArea.scrollTop = 0;
          if (window.drawerLenis) window.drawerLenis.scrollTo(0, { immediate: true });
        }

        // Collect enter targets
        const enterTargets = [
          badgeEl, ...newTitleLines, ...newSubtitleLines,
          ...newTextBlocks, ctaEl, nextBtn
        ].filter(Boolean);

        // Pre-set hidden state
        gsap.set(enterTargets, { y: 35, autoAlpha: 0, clipPath: "inset(12% 0% 0% 0%)" });
        gsap.set(supportEls, { y: 12, autoAlpha: 0 });

        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        //  PHASE 3 — ENTER  (blinds + text reveal sequentially)
        // ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

        // Start blinds image transition with completion callback
        goToDrawerImage(0, false, direction, () => {
          isDrawerTransitioning = false;
          startDrawerImageLoop();
          updateDrawerScrollCue();
        });

        enterTimeline = gsap.timeline({
          onComplete: () => {
            enterTimeline = null;
          }
        });

        enterTimeline
          .to(enterTargets, {
            y: 0, autoAlpha: 1, clipPath: "inset(0% 0% 0% 0%)",
            duration: 0.85, stagger: 0.04, ease: "power4.out"
          }, 0)
          .to(supportEls, {
            y: 0, autoAlpha: 1,
            duration: 0.75, ease: "power3.out"
          }, 0.15);
      }
    });

    exitTimeline
      .to(exitTargets, {
        y: -24, autoAlpha: 0,
        duration: 0.35, stagger: 0.02, ease: "power3.in"
      }, 0)
      .to(supportEls, {
        y: 12, autoAlpha: 0,
        duration: 0.3, ease: "power2.in"
      }, 0);
  }

  function openDrawer(data, dataId) {
    if (!sideDrawer || !drawerContainer || !backdrop) return;

    // Se o drawer já estiver aberto, roda a transição suave de conteúdo
    if (sideDrawer.classList.contains("open") && currentDrawerDataId) {
      transitionDrawerContent(data, dataId);
      return;
    }

    currentDrawerDataId = dataId || null;

    isDrawerTransitioning = true; // Lock interaction during opening
    lastFocusedElement = document.activeElement;
    if (smoothScroll.lenis) smoothScroll.lenis.stop();
    document.documentElement.style.overflow = "hidden";
    document.body.style.overflow = "hidden";

    const badgeEl = document.getElementById("drawer-badge");
    const titleEl = document.getElementById("drawer-title");
    const subtitleEl = document.getElementById("drawer-subtitle");
    const textEl = document.getElementById("drawer-text");
    const scrollArea = document.getElementById("drawer-scroll-area");
    const ctaEl = document.getElementById("drawer-cta");
    const grid = document.getElementById("drawer-left-grid");
    const imageStage = document.getElementById("drawer-image-stage");
    const thumbStrip = document.getElementById("drawer-thumb-strip");

    if (!badgeEl || !titleEl || !subtitleEl || !textEl) return;

    if (drawerTitleSplit) drawerTitleSplit.revert();
    if (drawerSubtitleSplit) drawerSubtitleSplit.revert();
    drawerTitleSplit = null;
    drawerSubtitleSplit = null;

    badgeEl.textContent = data.badge;
    titleEl.textContent = data.title;
    subtitleEl.textContent = data.subtitle;
    textEl.innerHTML = data.text;

    drawerTitleSplit = SplitText.create(titleEl, { type: "lines", mask: "lines", aria: "auto" });
    drawerSubtitleSplit = SplitText.create(subtitleEl, { type: "lines", mask: "lines", aria: "auto" });
    const titleLines = drawerTitleSplit ? drawerTitleSplit.lines : [titleEl];
    const subtitleLines = drawerSubtitleSplit ? drawerSubtitleSplit.lines : [subtitleEl];
    const textBlocks = Array.from(textEl.querySelectorAll(".drawer-detail-grid, p, h4, .drawer-feature-list"));
    const drawerTextItems = [badgeEl, ...titleLines, ...subtitleLines, ...textBlocks, ctaEl].filter(Boolean);

    if (scrollArea) scrollArea.scrollTop = 0;
    const bg = document.getElementById("drawer-stage-bg");
    if (bg && data.images && data.images[0]) {
      bg.style.backgroundImage = `url('${data.images[0]}')`;
    }
    setupDrawerImages(data);
    updateNextPointButton(dataId);
    updateDrawerScrollCue();

    // Initialize local Lenis smooth scroll on drawer
    const scrollContent = scrollArea ? scrollArea.querySelector(".drawer-scroll-content") : null;
    if (scrollArea && scrollContent) {
      if (window.drawerLenis) {
        window.drawerLenis.destroy();
      }
      window.drawerLenis = new Lenis({
        wrapper: scrollArea,
        content: scrollContent,
        duration: 1.85,
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        orientation: "vertical",
        gestureOrientation: "vertical",
        smoothWheel: true,
        wheelMultiplier: 0.92,
        touchMultiplier: 1.35,
      });

      window.drawerLenis.on("scroll", () => {
        updateDrawerScrollCue();
      });

      window.drawerRaf = (time) => {
        if (window.drawerLenis) {
          window.drawerLenis.raf(time * 1000);
        }
      };
      gsap.ticker.add(window.drawerRaf);
    }

    // Attach parallax mouse handlers on main image stage
    if (imageStage) {
      imageStage.addEventListener("mousemove", handleStageMouseMove);
      imageStage.addEventListener("mouseleave", handleStageMouseLeave);
    }

    sideDrawer.classList.add("open");
    sideDrawer.setAttribute("aria-hidden", "false");

    gsap.killTweensOf([drawerContainer, backdrop, badgeEl, titleEl, subtitleEl, textEl, ctaEl, grid, imageStage, thumbStrip, ...drawerTextItems]);
    gsap.set(drawerContainer, { xPercent: 102 });
    gsap.set(backdrop, { opacity: 0 });
    gsap.set(drawerTextItems, {
      y: 32,
      autoAlpha: 0,
      clipPath: "inset(10% 0% 0% 0%)",
      willChange: "transform, opacity, clip-path"
    });
    gsap.set(imageStage, { x: 36, scale: 0.975, autoAlpha: 0, willChange: "transform, opacity" });
    gsap.set(thumbStrip, { y: 18, autoAlpha: 0, willChange: "transform, opacity" });

    const openTl = gsap.timeline({
      onComplete: () => {
        isDrawerTransitioning = false; // Unlock once fully open
        updateDrawerScrollCue();
        if (closeBtn) closeBtn.focus({ preventScroll: true });
      }
    });

    openTl
      .to(backdrop, { opacity: 1, duration: 0.48, ease: "power2.out" }, 0)
      .to(drawerContainer, { xPercent: 0, duration: 0.86, ease: "power4.out" }, 0.02)
      .to(imageStage, { x: 0, scale: 1, autoAlpha: 1, duration: 0.78, ease: "power4.out" }, 0.34)
      .to(thumbStrip, { y: 0, autoAlpha: 1, duration: 0.58, ease: "power3.out" }, 0.52)
      .to(drawerTextItems, {
        y: 0,
        autoAlpha: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.66,
        stagger: 0.045,
        ease: "power3.out"
      }, 0.46);
  }

  function closeDrawer() {
    if (!sideDrawer || !drawerContainer || !backdrop) return;

    const badgeEl = document.getElementById("drawer-badge");
    const titleEl = document.getElementById("drawer-title");
    const subtitleEl = document.getElementById("drawer-subtitle");
    const textEl = document.getElementById("drawer-text");
    const ctaEl = document.getElementById("drawer-cta");
    const grid = document.getElementById("drawer-left-grid");
    const imageStage = document.getElementById("drawer-image-stage");
    const thumbStrip = document.getElementById("drawer-thumb-strip");
    const titleTargets = drawerTitleSplit ? drawerTitleSplit.lines : [titleEl].filter(Boolean);
    const subtitleTargets = drawerSubtitleSplit ? drawerSubtitleSplit.lines : [subtitleEl].filter(Boolean);
    const textBlocks = textEl ? Array.from(textEl.querySelectorAll(".drawer-detail-grid, p, h4, .drawer-feature-list")) : [];
    const drawerTextItems = [ctaEl, ...textBlocks.reverse(), ...subtitleTargets, ...titleTargets, badgeEl].filter(Boolean);

    stopDrawerImageLoop();
    killSlideTransition();
    killContentTransitions();
    isDrawerTransitioning = true; // Lock interaction during closing

    // Cleanup local Lenis smooth scroll
    if (window.drawerLenis) {
      gsap.ticker.remove(window.drawerRaf);
      window.drawerLenis.destroy();
      window.drawerLenis = null;
      window.drawerRaf = null;
    }

    // Cleanup parallax mouse handlers on image stage
    if (imageStage) {
      imageStage.removeEventListener("mousemove", handleStageMouseMove);
      imageStage.removeEventListener("mouseleave", handleStageMouseLeave);
    }

    const closeTl = gsap.timeline({
      onComplete: () => {
        isDrawerTransitioning = false; // Reset lock once fully closed
        sideDrawer.classList.remove("open");
        sideDrawer.setAttribute("aria-hidden", "true");
        if (drawerTitleSplit) drawerTitleSplit.revert();
        if (drawerSubtitleSplit) drawerSubtitleSplit.revert();
        drawerTitleSplit = null;
        drawerSubtitleSplit = null;
        if (smoothScroll.lenis) smoothScroll.lenis.start();
        document.documentElement.style.overflow = "";
        document.body.style.overflow = "";
        if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
          lastFocusedElement.focus({ preventScroll: true });
        }
      }
    });

    closeTl
      .to(drawerTextItems, {
        y: 16,
        autoAlpha: 0,
        clipPath: "inset(0% 0% 10% 0%)",
        duration: 0.32,
        stagger: 0.02,
        ease: "power3.in"
      }, 0)
      .to([thumbStrip, imageStage].filter(Boolean), {
        x: 20,
        scale: 0.98,
        autoAlpha: 0,
        duration: 0.34,
        stagger: 0.025,
        ease: "power3.in"
      }, 0.06)
      .to(drawerContainer, { xPercent: 102, duration: 0.62, ease: "power4.inOut" }, 0.18)
      .to(backdrop, { opacity: 0, duration: 0.5, ease: "power2.in" }, 0.18);
  }

  // Register hover pause loop listeners
  const imageStage = document.getElementById("drawer-image-stage");
  const thumbStrip = document.getElementById("drawer-thumb-strip");
  if (imageStage) {
    imageStage.addEventListener("mouseenter", () => { isHovered = true; });
    imageStage.addEventListener("mouseleave", () => { isHovered = false; });
  }
  if (thumbStrip) {
    thumbStrip.addEventListener("mouseenter", () => { isHovered = true; });
    thumbStrip.addEventListener("mouseleave", () => { isHovered = false; });

    // Drag-to-scroll (grab to scroll)
    let isDown = false;
    let startX;
    let scrollLeft;

    thumbStrip.addEventListener("mousedown", (e) => {
      isDown = true;
      thumbStrip.classList.add("grabbing");
      startX = e.pageX - thumbStrip.offsetLeft;
      scrollLeft = thumbStrip.scrollLeft;
      e.preventDefault();
    });

    thumbStrip.addEventListener("mouseleave", () => {
      isDown = false;
      thumbStrip.classList.remove("grabbing");
    });

    thumbStrip.addEventListener("mouseup", () => {
      isDown = false;
      thumbStrip.classList.remove("grabbing");
    });

    thumbStrip.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - thumbStrip.offsetLeft;
      const walk = (x - startX) * 1.5;
      thumbStrip.scrollLeft = scrollLeft - walk;
    });

    // Prevent default browser image dragging (prevents ghost images and text selections)
    thumbStrip.addEventListener("dragstart", (e) => {
      e.preventDefault();
    });
  }

  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (backdrop) backdrop.addEventListener("click", closeDrawer);

  // "Próximo ponto" button in the drawer
  const nextBtn = document.getElementById("drawer-next-btn");
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      if (isDrawerTransitioning) return;
      if (!currentDrawerDataId) return;
      const currentIndex = DRAWER_DATA_KEYS.indexOf(currentDrawerDataId);
      const nextIndex = (currentIndex + 1) % DRAWER_DATA_KEYS.length;
      const nextId = DRAWER_DATA_KEYS[nextIndex];
      const nextData = EXPERIENCIAS_DATA[nextId];
      if (nextData) {
        const scrollArea = document.getElementById("drawer-scroll-area");
        if (scrollArea) scrollArea.scrollTop = 0;
        stopDrawerImageLoop();
        openDrawer(nextData, nextId);
      }
    });
  }

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && sideDrawer && sideDrawer.classList.contains("open")) {
      closeDrawer();
    }
  });

  if (sideDrawer) {
    sideDrawer.addEventListener("wheel", (e) => {
      e.stopPropagation();
    }, { passive: true });

    sideDrawer.addEventListener("touchmove", (e) => {
      if (!e.target.closest("#drawer-scroll-area")) {
        e.preventDefault();
      }
    }, { passive: false });
  }
}

function initExperienciasReveal(accordion, prefersReducedMotion) {
  const section = accordion.closest(".experiencias-section");
  if (!section) return;

  const content = section.querySelector(".reveal-content");
  const stage = section.closest(".marquee-experiencias-stage");
  const supra = section.querySelector(".experiencias-supra");
  const title = section.querySelector(".experiencias-title");
  const sub = section.querySelector(".experiencias-sub");
  const titleSplit = title ? SplitText.create(title, { type: "lines", mask: "lines" }) : null;
  const subSplit = sub ? SplitText.create(sub, { type: "lines", mask: "lines" }) : null;
  const introItems = [
    supra,
    ...(titleSplit ? titleSplit.lines : title ? [title] : []),
    ...(subSplit ? subSplit.lines : sub ? [sub] : [])
  ].filter(Boolean);

  const introArray = Array.from(introItems);

  if (content) gsap.set(content, { opacity: 1 });

  if (prefersReducedMotion) {
    gsap.set(introArray, { clearProps: "opacity,visibility,transform,clipPath,willChange" });
    return;
  }

  if (window.innerWidth <= 1024) {
    gsap.set(introArray, {
      y: 26,
      autoAlpha: 0,
      clipPath: "inset(12% 0% 0% 0%)",
      willChange: "transform, opacity, clip-path"
    });

    gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: "top 95%",
        end: "top 55%",
        scrub: 0.8,
        invalidateOnRefresh: true,
        refreshPriority: -45
      }
    })
      .to(introArray, {
        y: 0,
        autoAlpha: 1,
        clipPath: "inset(0% 0% 0% 0%)",
        duration: 0.74,
        stagger: 0.07,
        ease: "power2.out"
      });

    // Revelação dos cards do acordeão em cascata (stagger) à medida que o contêiner do acordeão entra no viewport
    const accordionEl = section.querySelector(".chale-accordion");
    if (accordionEl) {
      const panels = Array.from(accordionEl.querySelectorAll(".accordion-panel"));
      gsap.set(panels, { y: 40, autoAlpha: 0 });

      gsap.timeline({
        scrollTrigger: {
          trigger: accordionEl,
          start: "top 92%",
          end: "top 62%",
          scrub: 0.8,
          invalidateOnRefresh: true
        }
      })
        .to(panels, {
          y: 0,
          autoAlpha: 1,
          stagger: 0.08,
          duration: 0.8,
          ease: "power2.out"
        });
    }
    return;
  }

  gsap.set(introArray, {
    y: 38,
    autoAlpha: 0,
    clipPath: "inset(10% 0% 0% 0%)",
    willChange: "transform, opacity, clip-path"
  });

  gsap.timeline({
    scrollTrigger: {
      trigger: stage || section,
      start: "top top",
      end: () => `+=${Math.round(window.innerHeight * 1.45)}`,
      scrub: 0.9,
      invalidateOnRefresh: true
    }
  })
    .to(introArray, {
      y: 0,
      autoAlpha: 1,
      clipPath: "inset(0% 0% 0% 0%)",
      duration: 0.72,
      stagger: 0.08,
      ease: "none"
    }, 0.42);
}
