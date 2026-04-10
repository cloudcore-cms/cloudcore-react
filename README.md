# Cloudcore React Frontend

A Vite + React starter for Cloudcore CMS.

## Quick Start

```bash
# Install dependencies
npm install

# Configure CMS URL
# Create .env file with:
VITE_CMS_URL=http://localhost:8787/api/v1

# Start development
npm run dev
```

## Structure

```
src/
├── components/
│   ├── BlockRenderer.tsx    # Renders CMS content blocks
│   └── Layout.tsx           # Base layout with header/footer
├── lib/
│   └── api.ts               # CMS API client
├── routes/
│   ├── Home.tsx             # Homepage
│   ├── Blog.tsx             # Blog listing
│   ├── BlogPost.tsx         # Single post
│   └── Page.tsx             # Dynamic pages
├── styles/
│   └── globals.css
├── App.tsx                  # Router setup
└── main.tsx                 # Entry point
```

## Environment Variables

| Variable | Description |
|----------|-------------|
| `VITE_CMS_URL` | Cloudcore CMS API URL (default: `http://localhost:8787/api/v1`) |

## Build & Deploy

```bash
# Build
npm run build

# Preview
npm run preview
```

Deploy the `dist/` folder to any static hosting.
