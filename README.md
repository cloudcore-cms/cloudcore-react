# Cloudcore React Frontend

A Vite + React starter for [Cloudcore CMS](https://github.com/cloudcore-cms/cloudcore-cms).

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/cloudcore-cms/cloudcore-react)
[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/cloudcore-cms/cloudcore-react)
[![Deploy to Cloudflare Pages](https://img.shields.io/badge/Deploy%20to-Cloudflare%20Pages-F38020?logo=cloudflare)](https://dash.cloudflare.com/?to=/:account/pages/new/provider/github)

## Quick Start

```bash
npm install
cp .env.example .env
# Edit .env: set your CMS or Public API URL
npm run dev
# http://localhost:5173
```

## Environment Variables

| Variable | Description |
|---|---|
| `VITE_CMS_URL` | Cloudcore API URL (default: `http://localhost:8787/api/v1`) |

For production, point at the [Public API](https://github.com/cloudcore-cms/cloudcore-api) (e.g., `https://api.yourdomain.com`).

## Deploy

```bash
npm run build
# Output in dist/
```

**Cloudflare Pages:** `npx wrangler pages deploy dist`

**Vercel:** Click the button above or `npx vercel`

**Netlify:** Click the button above or `npx netlify deploy --build`

## License

MIT
