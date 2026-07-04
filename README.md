# Outta The Box™ — website

Next.js 14 (App Router) + TypeScript implementation of the Claude Design
prototype in `../client-proposal-deck/project/`.

## Pages

- `/`             — Homepage (OTB Homepage.dc.html)
- `/work`         — Case-file index (OTB Work.dc.html)
- `/work/[slug]`  — Case study (OTB Case Study.dc.html) — slugs:
  bayaan, paradise, kalemah, indiaverse, trueilm, iou, dunes, marookha,
  barakah, revivers, grainer, sifa, quraany
- `/kit`          — Brand starter kit download (OTB Kit Download.dc.html)
- `/logo-vault`   — Marks archive (LogoVault.dc.html)

## Deploy to Vercel

The repo is already `git init`-ed with an initial commit. Vercel builds
in a clean workspace where the `#`-in-path issue below doesn't apply.

1. **Create a GitHub repo** (empty, no README/gitignore) — e.g.
   `otb-website` under your account.
2. **Push:**
   ```sh
   cd otb-website
   git remote add origin git@github.com:<you>/otb-website.git
   git push -u origin main
   ```
3. **Import on Vercel:** https://vercel.com/new → pick the repo.
   Framework preset is detected automatically as Next.js.
   No env vars needed. Click **Deploy**.
4. First build takes ~2 minutes. You'll get a preview URL like
   `otb-website-<hash>.vercel.app`.
5. Every subsequent `git push` to `main` triggers a production deploy.
   PRs get preview deploys automatically.

## Local dev

```sh
npm install
npm run dev
```

Open http://localhost:3000.

## ⚠️ Local dev — the parent folder name breaks Next.js

The parent folder is `#. OTB New Website/`. The `#` character is treated
as a URL fragment by Next.js's React Server Components bundler, which
produces `Could not find the module ".../error-boundary.js#"` errors
during `next dev` and `next build`. Vercel is unaffected — it builds
in `/vercel/path0/`.

**Local workarounds (pick one):**

1. **Rename the parent folder** so it doesn't contain `#` — e.g.
   `OTB New Website/`. `npm run dev` / `build` then work normally.
2. **Copy the project to a `#`-free path** for dev/build:
   ```sh
   rsync -a --exclude node_modules --exclude .next --exclude .git ./ /tmp/otb-run/
   cd /tmp/otb-run && npm install && npm run dev
   ```
   Sync source changes back with the same rsync command; commit + push
   from the original folder (`git` itself handles the `#` fine).
3. **Move `otb-website/` up one level** to a directory whose full path
   has no `#`.

`outputFileTracing: false` in `next.config.mjs` sidesteps a related
tracer crash, but the RSC manifest lookup still fails in the `#`
folder — the rename/move is required for local dev.

## Fonts

Google Fonts are loaded via `<link>` tags in `app/layout.tsx`
(`next/font` also collides with the `#` in the path — it uses URL-encoded
module IDs).

## Deferred work

The implementation nails the visual system, all pages, and the core
interactions. A few prototype behaviors were simplified for time; each
is a clear, contained follow-up:

- **Featured work + services horizontal-scroll pin.** The prototype
  pins those sections and pans them horizontally as you scroll
  vertically. Here they use a normal horizontal-scroll strip. The
  scroll-progress bar and card counter aren't wired up.
- **Case card hover glitch.** The prototype cycles through a project's
  square alt images with a pixel-sort burst on hover. Cards here just
  scale corner-brackets on hover.
- **Burger Strategy mobile pin.** On mobile the prototype scroll-fades
  each phase as it reaches the illustration. Here it's a normal stack.
- **Cal.com iframe height.** The `<iframe>` uses a fixed 700 px; the
  Cal embed script can auto-size it, but that adds a third-party
  script tag.
- **Image optimization.** Components use raw `<img>` tags for
  fastest 1:1 fidelity with the prototype markup. Swapping to
  `next/image` would want an audit for each image's intrinsic size.

## Structure

```
app/
  layout.tsx        globals + fonts
  page.tsx          homepage (stitches sections)
  work/page.tsx     grid
  work/[slug]/page.tsx
  kit/page.tsx
  logo-vault/page.tsx
components/         Header, Footer, Cursor, BootLoader, ... one per section
lib/
  tokens.ts         colors, fonts, animation strings
  projects.ts       PROJECTS listing (Work grid data)
  case-studies.ts   CASES record (Case Study page data)
public/
  assets/           OTB logomark + wordmark SVGs
  images/           bayaan/, kalemah/, paradise/, logos/, team/
```
