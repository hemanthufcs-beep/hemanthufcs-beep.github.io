// Post-build checks for dist/: required files, internal anchors, SEO tags,
// and (with --external) that every outbound link resolves.
import { readFile, access } from 'node:fs/promises';

const dist = new URL('../dist/', import.meta.url);
const read = (f) => readFile(new URL(f, dist), 'utf8');
const failures = [];
const check = (ok, msg) => (ok ? console.log(`  ok    ${msg}`) : failures.push(msg) && console.log(`  FAIL  ${msg}`));

for (const f of ['index.html', '404.html', 'sitemap-index.xml', 'robots.txt', 'og.png', 'favicon.svg']) {
  check(await access(new URL(f, dist)).then(() => true, () => false), `dist/${f} exists`);
}

const html = await read('index.html');
const ids = new Set([...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]));
const hrefs = [...html.matchAll(/\shref="([^"]+)"/g)].map((m) => m[1]);

for (const h of new Set(hrefs.filter((h) => h.startsWith('#')))) check(ids.has(h.slice(1)), `anchor ${h} has a target`);
for (const h of new Set(hrefs.filter((h) => h.startsWith('/')))) {
  check(await access(new URL(h.slice(1), dist)).then(() => true, () => false), `local link ${h} resolves`);
}

for (const tag of ['og:title', 'og:description', 'og:image', 'twitter:card']) check(html.includes(`"${tag}"`), `meta ${tag}`);
check(/<link rel="canonical"/.test(html), 'canonical link');
check(html.includes('application/ld+json'), 'JSON-LD person schema');
check((html.match(/<h1[\s>]/g) || []).length === 1, 'exactly one <h1>');
check(![...html.matchAll(/<a [^>]*target="_blank"[^>]*>/g)].some((m) => !m[0].includes('noopener')), 'external links use rel=noopener');
check(hrefs.every((h) => !/github\.com/i.test(h) || /github\.com\/hemanthufcs-beep\//i.test(h)), 'GitHub links only point to this account');
check(!/linkedin\.com|\.pdf"/i.test(html), 'no LinkedIn or PDF links');

if (process.argv.includes('--external')) {
  const external = [...new Set(hrefs.filter((h) => h.startsWith('http')))];
  await Promise.all(
    external.map(async (url) => {
      try {
        const res = await fetch(url, { method: 'GET', redirect: 'follow', signal: AbortSignal.timeout(15000), headers: { 'user-agent': 'Mozilla/5.0 link-check' } });
        check(res.ok, `${res.status} ${url}`);
      } catch (e) {
        check(false, `unreachable ${url} (${e.message})`);
      }
    }),
  );
}

if (failures.length) {
  console.error(`\n${failures.length} check(s) failed`);
  process.exit(1);
}
console.log('\nAll checks passed');
