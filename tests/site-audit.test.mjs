import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(__dirname, '..');

function readText(relPath) {
  return fs.readFileSync(path.join(ROOT, relPath), 'utf8');
}

function collectFiles(dir, exts) {
  const results = [];
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...collectFiles(fullPath, exts));
    } else if (exts.some((ext) => entry.name.endsWith(ext))) {
      results.push(fullPath);
    }
  }
  return results;
}

test('all referenced /imgs-videos/ assets in index.html and src/ exist in public/', () => {
  const files = [path.join(ROOT, 'index.html'), ...collectFiles(path.join(ROOT, 'src'), ['.js', '.scss'])];
  const assetRegex = /\/imgs-videos\/[^"'`\s\)]+/g;
  const referenced = new Set();

  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    const matches = content.match(assetRegex) || [];
    for (const m of matches) {
      referenced.add(m);
    }
  }

  assert.ok(referenced.size > 40, `Expected > 40 referenced media assets, got ${referenced.size}`);

  for (const assetUrl of referenced) {
    const decodedRel = decodeURIComponent(assetUrl).replace(/^\/+/, '');
    const diskPath = path.join(ROOT, 'public', decodedRel);
    assert.equal(fs.existsSync(diskPath), true, `Missing asset on disk: public/${decodedRel}`);
  }
});

test('no legacy unused media folders or flatpickr remain referenced or in public/', () => {
  assert.equal(fs.existsSync(path.join(ROOT, 'public/imgs-google-maps')), false);
  assert.equal(fs.existsSync(path.join(ROOT, 'public/novas imgs a serem adicionadas')), false);

  const pkg = JSON.parse(readText('package.json'));
  assert.equal('flatpickr' in (pkg.dependencies || {}), false);

  const files = [path.join(ROOT, 'index.html'), ...collectFiles(path.join(ROOT, 'src'), ['.js', '.scss'])];
  for (const file of files) {
    const content = fs.readFileSync(file, 'utf8');
    assert.doesNotMatch(content, /imgs-google-maps|novas imgs|flatpickr/i, `Found legacy reference in ${file}`);
  }
});

test('chale.js passes and receives isResponsiveLayout in buildChaleResponsiveTimeline', () => {
  const chaleJs = readText('src/js/chale.js');
  const callMatch = chaleJs.match(/buildChaleResponsiveTimeline\(\{[\s\S]*?\}\);/);
  assert.ok(callMatch, 'buildChaleResponsiveTimeline call not found');
  assert.match(callMatch[0], /\bisResponsiveLayout\b/, 'isResponsiveLayout must be passed to buildChaleResponsiveTimeline');

  const fnMatch = chaleJs.match(/function buildChaleResponsiveTimeline\(\{[\s\S]*?\}\)/);
  assert.ok(fnMatch, 'buildChaleResponsiveTimeline signature not found');
  assert.match(fnMatch[0], /\bisResponsiveLayout\b/, 'isResponsiveLayout must be destructured in buildChaleResponsiveTimeline');
});

test('index.html hardens SVG sprite, CSS loading, video preload, drawer imgs, and Google Maps embed', () => {
  const html = readText('index.html');

  const spriteIdx = html.indexOf('id="loader-wolf-path"');
  const loaderIdx = html.indexOf('id="loader"');
  assert.ok(spriteIdx !== -1 && loaderIdx !== -1 && spriteIdx < loaderIdx, 'loader-wolf-path sprite must be defined before #loader');

  assert.doesNotMatch(html, /media="print"\s+onload="this\.media='all'"[^>]*main\.scss|main\.scss[^>]*media="print"/);
  assert.match(html, /<link\s+rel="stylesheet"\s+href="\/src\/styles\/main\.scss"\s*\/>/);
  assert.doesNotMatch(html, /<video[^>]+preload="auto"/i);
  assert.match(html, /<video[^>]+poster="\/imgs-videos\/video_14_poster\.webp"/i);
  assert.match(html, /<video[^>]+poster="\/imgs-videos\/video_6_poster\.webp"/i);
  assert.match(html, /<video[^>]+poster="\/imgs-videos\/video_7_poster\.webp"/i);
  assert.doesNotMatch(html, /<img[^>]+src=""/i);
  assert.doesNotMatch(html, /wolfFillAnimation|moonDropAnimation|moonGlowAnimation/);
  assert.match(html, /https:\/\/www\.google\.com\/maps\/embed\?pb=/);
  assert.match(html, /rel="canonical"\s+href="https:\/\/www\.tocadoloboibitipoca\.com\.br\/"/);
  assert.match(html, /og-toca-do-lobo\.jpg/);
  assert.match(html, /apple-touch-icon\.png/);
  assert.match(html, /media="\(max-width:\s*768px\)"/);
  assert.match(html, /media="\(min-width:\s*769px\)"/);
});

test('hero.js, perf, a11y, vercel.json and WhatsApp message hardening', () => {
  const heroJs = readText('src/js/hero.js');
  assert.doesNotMatch(heroJs, /scale:\s*150\b/);
  assert.match(heroJs, /prefers-reduced-motion:\s*reduce/);
  assert.match(heroJs, /unlockScroll/);

  const chaleScss = readText('src/styles/_chale.scss');
  assert.doesNotMatch(chaleScss, /background-attachment:\s*fixed/);

  const videosScss = readText('src/styles/_videos.scss');
  assert.match(videosScss, /touch-action:\s*pan-x\s+pan-y/);

  const mapScss = readText('src/styles/_map.scss');
  assert.match(mapScss, /body\.mobile-menu-open\s+\.location-map-frame\s+iframe\s*\{[^}]*display:\s*none/s);

  const baseScss = readText('src/styles/_base.scss');
  assert.match(baseScss, /overflow-x:\s*clip/);

  const expJs = readText('src/js/experiencias.js');
  assert.doesNotMatch(expJs, /^\s*import\s+Lenis\s+from\s+["']lenis["']/m);
  assert.doesNotMatch(expJs, /removeAttribute\(["']aria-label["']\)/);

  const fbJs = readText('src/js/feedback.js');
  assert.doesNotMatch(fbJs, /removeAttribute\(['"]aria-label['"]\)/);
  assert.match(fbJs, /IntersectionObserver/);
  assert.match(fbJs, /quickSetter/);

  const resJs = readText('src/js/reservation.js');
  assert.doesNotMatch(resJs, /removeAttribute\(['"]aria-label['"]\)/);
  assert.match(resJs, /Vim pelo site/i);

  const mqJs = readText('src/js/scrollMarquee.js');
  assert.match(mqJs, /IntersectionObserver/);

  const ftJs = readText('src/js/footer.js');
  assert.match(ftJs, /IntersectionObserver/);

  const vercelJson = JSON.parse(readText('vercel.json'));
  assert.ok(Array.isArray(vercelJson.headers) && vercelJson.headers.length >= 2, 'vercel.json headers missing');

  for (const jsFile of ['src/js/chale.js', 'src/js/experiencias.js', 'src/js/reservation.js', 'src/js/videoTriptych.js']) {
    const content = readText(jsFile);
    assert.doesNotMatch(content, /\bonce:\s*(true|isResponsiveLayout)\b/, `${jsFile} must not use ScrollTrigger once: true / isResponsiveLayout`);
  }
});

test('dist/ build output exists and excludes legacy raw folders', () => {
  const distIndex = path.join(ROOT, 'dist/index.html');
  assert.equal(fs.existsSync(distIndex), true, 'dist/index.html missing — run npm run build first');

  const assetsDir = path.join(ROOT, 'dist/assets');
  assert.equal(fs.existsSync(assetsDir), true, 'dist/assets missing');
  const assetFiles = fs.readdirSync(assetsDir);
  assert.ok(assetFiles.some((f) => f.endsWith('.js')), 'Expected JS bundle in dist/assets');
  assert.ok(assetFiles.some((f) => f.endsWith('.css')), 'Expected CSS bundle in dist/assets');

  assert.equal(fs.existsSync(path.join(ROOT, 'dist/imgs-google-maps')), false);
  assert.equal(fs.existsSync(path.join(ROOT, 'dist/novas imgs a serem adicionadas')), false);
});
