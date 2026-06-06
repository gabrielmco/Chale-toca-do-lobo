# Chalé Toca do Lobo

Um site premium e envolvente desenvolvido com HTML, SCSS e Javascript (Vanilla), focando em animações de alto desempenho utilizando GSAP e Lenis Smooth Scroll.

## 🚀 Tecnologias Utilizadas

- **Vite:** Build tool extremamente rápido.
- **SCSS:** Arquitetura de estilos com variáveis CSS para manutenção e flexibilidade.
- **GSAP (GreenSock):** Biblioteca de animações robusta (ScrollTrigger para efeitos baseados na rolagem da página).
- **Lenis:** Smooth scroll nativo para navegação suave.

## 📦 Instalação e Execução

Para rodar este projeto na sua máquina local:

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Para gerar a versão de produção (build):
   ```bash
   npm run build
   ```
   *Os arquivos otimizados serão gerados na pasta `dist/`.*

## 📂 Estrutura do Projeto

- `/src/styles`: Arquivos SCSS, separados por escopo (variáveis, resets, utilitários, mixins e estilos de cada seção).
- `/src/js`: Scripts isolados responsáveis por cada funcionalidade (GSAP, cursores personalizados, menus, etc).
- `index.html`: Arquivo principal contendo toda a semântica do projeto.
- `package.json` / `vite.config.js`: Configurações do Vite e scripts de npm.

## 🎨 Design

O layout foi conceituado com estética "premium", dark mode envolvente e micro-interações, focado na exibição das acomodações (Chalé Toca do Lobo). Efeitos imersivos de revelação de textos e galerias horizontais orientadas pelo scroll foram implementados para oferecer a melhor experiência desktop possível.
