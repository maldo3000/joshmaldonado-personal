# Josh Maldonado Personal Site

Rebuilt from the ground up with React, TypeScript, and Vite to preserve the current homepage feel with a cleaner codebase and easier deployment flow.

## Local Development

```bash
npm install
npm run dev
```

The local dev server runs at `http://127.0.0.1:4173/` when started with the current preview command used during development.

## Scripts

- `npm run dev` starts the Vite dev server
- `npm run build` creates the production build in `dist/`
- `npm run lint` runs ESLint
- `npm run preview` serves the production build locally

## Deploying To Vercel

This repo includes a minimal `vercel.json` so Vercel uses the expected Vite settings:

- Build command: `npm run build`
- Output directory: `dist`

If importing this repo into Vercel manually, those values should be detected automatically.
