# AGENTS.md

## Project
Static React/Vite marketing site for Mike P Studio, deployed to GitHub Pages with the custom domain `mikepofficial.com`.

## Operating Rules
- Keep the site static-hosting safe: no server-only form handling or secrets.
- Preserve the approved visual direction: dark studio UI, warm wood imagery, pink accent, compact sections, real studio proof.
- Reuse `src/data.js` for links, tracks, services, and contact details instead of scattering constants.
- Use `mailto:` for project intake until a real form backend is explicitly added.
- Run `npm run validate` first, then `npm run build` before publishing.

## Deployment
GitHub Pages serves the committed `docs/` build output from `main`; Vite base path must stay `/` for the custom domain.
