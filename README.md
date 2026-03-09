# 💡 Business Idea Validator

Validate your business idea in ~3 minutes using Lean Startup & Product-Market Fit frameworks. Get a score out of 100, a verdict, and 3 actionable next steps.

## Deploy to Netlify

### Option A — Netlify Drop (fastest, no account needed)
1. Run `npm run build` locally
2. Drag and drop the `dist/` folder onto [app.netlify.com/drop](https://app.netlify.com/drop)

### Option B — Git + Netlify (recommended)
1. Push this folder to a GitHub/GitLab repo
2. Go to [app.netlify.com](https://app.netlify.com) → **Add new site** → **Import an existing project**
3. Connect your repo — Netlify auto-detects the `netlify.toml` config
4. Click **Deploy site** — done ✅

Build settings (auto-detected from `netlify.toml`):
- **Build command:** `npm run build`
- **Publish directory:** `dist`

## Local Development

```bash
npm install
npm run dev
```

## Tech Stack
- React 18 + Vite
- Inline styles (no CSS framework dependency)
- Google Fonts (Playfair Display + DM Sans)
