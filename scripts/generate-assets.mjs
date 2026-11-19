// Generates favicon PNGs and the Open Graph card from SVG sources.
// Run with `npm run assets` after changing name/role copy; outputs are committed to public/.
import sharp from 'sharp';
import { writeFile } from 'node:fs/promises';

const out = (f) => new URL(`../public/${f}`, import.meta.url);

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="#0c0c0d"/>
  <text x="32" y="41" text-anchor="middle" font-family="Menlo, 'SF Mono', monospace" font-size="24" font-weight="700" fill="#fafaf9" letter-spacing="-1">HR</text>
  <circle cx="51" cy="13" r="4" fill="#fb923c"/>
</svg>`;

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#09090a"/>
  <g stroke="#1b1b1e" stroke-width="1">
    ${Array.from({ length: 16 }, (_, i) => `<line x1="${i * 80}" y1="0" x2="${i * 80}" y2="630"/>`).join('')}
    ${Array.from({ length: 9 }, (_, i) => `<line x1="0" y1="${i * 80}" x2="1200" y2="${i * 80}"/>`).join('')}
  </g>
  <rect x="80" y="80" width="56" height="56" rx="12" fill="#ededef"/>
  <text x="108" y="117" text-anchor="middle" font-family="Menlo, monospace" font-size="21" font-weight="700" fill="#09090a">HR</text>
  <text x="80" y="290" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="84" font-weight="700" fill="#ededef" letter-spacing="-3">Hemanth Reddy</text>
  <text x="80" y="356" font-family="Helvetica Neue, Helvetica, Arial, sans-serif" font-size="34" fill="#a0a1a8" letter-spacing="-0.3">Software Engineer · Distributed Systems · Performance · ML</text>
  <g font-family="Menlo, monospace" font-size="24" fill="#ededef">
    <text x="80" y="500"><tspan fill="#fb923c">1.1s→180ms</tspan> p95</text>
    <text x="380" y="500"><tspan fill="#fb923c">4×</tspan> throughput</text>
    <text x="600" y="500"><tspan fill="#fb923c">−36%</tspan> batch runtime</text>
  </g>
  <text x="80" y="560" font-family="Menlo, monospace" font-size="20" fill="#8a8b92">M.S. CS, University of Florida · ex-TCS · hemanthufcs-beep.github.io</text>
</svg>`;

await writeFile(out('favicon.svg'), favicon);
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile(out('favicon-32.png').pathname);
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile(out('apple-touch-icon.png').pathname);
await sharp(Buffer.from(favicon)).resize(512, 512).png().toFile(out('icon-512.png').pathname);
await sharp(Buffer.from(og)).png({ compressionLevel: 9 }).toFile(out('og.png').pathname);
console.log('assets written');
