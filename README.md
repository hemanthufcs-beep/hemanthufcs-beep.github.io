# hemanthufcs-beep.github.io

Personal portfolio of **Hemanth Reddy**, software engineer (distributed systems, performance, applied ML).

**Live:** https://hemanthufcs-beep.github.io

## Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | [Astro 5](https://astro.build) + TypeScript (strict) | Content site: pages are pre-rendered to static HTML with no framework runtime shipped, so crawlers and link previews see full content and Lighthouse stays at 100. |
| Styling | Tailwind CSS v4 | Design tokens live as CSS variables in `src/styles/global.css`; light/dark themes swap the variables, not the classes. |
| Fonts | Geist / Geist Mono (self-hosted via Fontsource) | No third-party font requests. |
| Hosting | GitHub Pages via GitHub Actions | Every push to `main` type-checks, builds, verifies and deploys. |

Total client JavaScript is one small inline module (theme toggle, mobile menu, scroll-spy, reveal-on-scroll). The page is fully readable with JS disabled.

## Project layout

```
src/
  data/          ← all copy lives here (edit these to update the site)
    site.ts        name, links, hero metrics
    experience.ts  roles + education
    projects.ts    featured projects + "also built"
    research.ts    papers and their status
    skills.ts      skill groups
  components/    one component per section (Hero, About, Experience, …)
  layouts/Base.astro   <head>: SEO, Open Graph, JSON-LD, theme bootstrap
  styles/global.css    design tokens, base styles, motion
public/          favicons, og.png, robots.txt, manifest
scripts/
  generate-assets.mjs  regenerates favicons + og.png (sharp)
  verify-build.mjs     post-build checks (files, anchors, meta, links)
```

## Development

Requires Node 20+.

```bash
npm install
npm run dev        # http://localhost:4321
npm run build      # astro check (types) + static build into dist/
npm run preview    # serve dist/ locally
npm test           # verify dist/: required files, anchors, SEO tags
node scripts/verify-build.mjs --external   # also check every outbound link
```

## Maintenance

- **Update content:** edit the files in `src/data/`. Copy supports `**bold**` in experience highlights.
- **Paper status changes:** update `status`, `venue` and `doi` in `src/data/research.ts`.
- **Name/headline changes:** also run `npm run assets` to regenerate `og.png` and the favicons, then commit them.
- **Dependencies:** versions are pinned exactly in `package.json`; bump deliberately and run `npm run build && npm test`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`:

1. `npm ci` → `npm run build` (type-check + build) → `npm test`
2. Upload `dist/` as a Pages artifact
3. Deploy with `actions/deploy-pages`

Pull requests run steps 1 only. One-time setup: **Settings → Pages → Source: GitHub Actions**.

## Quality targets

Lighthouse (mobile and desktop): Performance, Accessibility, Best Practices and SEO all at 100 at the time of writing.
Includes canonical URL, Open Graph + Twitter cards, JSON-LD `Person` schema, sitemap, robots.txt, skip link, visible focus states,
`prefers-reduced-motion` and `prefers-color-scheme` support, and WCAG AA contrast in both themes.
