# Deadwood Digital — Pinnacle Storefront

Multi-page e-commerce storefront. 3 pages, 10 service tiers, cart + checkout flow, AI concierge widget.

## Structure

```
deadwood-digital/
├── index.html      ← Entire SPA (client-side router, all 3 pages)
├── api/chat.js     ← Vercel serverless function for AI concierge
├── vercel.json     ← SPA route rewrites
├── .env.example    ← API key template
└── README.md
```

## Pages

| Route | Page |
|-------|------|
| `/` | Home — hero, featured packages, process, niches |
| `/shop` | Shop — all 10 tiers, filters, comparison table |
| `/about` | About + Contact — story, Start a Project form, FAQ |

## 10 Tiers

| # | Name | Price | Deposit | Timeline |
|---|------|-------|---------|----------|
| 1 | Starter | $299 | $149 | 3 days |
| 2 | Spark | $499 | $249 | 5 days |
| 3 | Found Online | $750 | $375 | 7 days |
| 4 | Local Presence | $1,200 | $600 | 10 days |
| 5 | Trusted Local Choice | $2,000 | $1,000 | 2–3 wks |
| 6 | Market Leader | $2,800 | $1,400 | 3 wks |
| 7 | Customer Engine | $4,500 | $1,350 | 4–6 wks |
| 8 | Niche Authority | $6,000 | $1,800 | 5–7 wks |
| 9 | Brand System | $8,500 | $2,550 | 6–8 wks |
| 10 | Growth Partner | $12,000 | $3,600 | 8–10 wks |

## Deploy (10 min)

```bash
npm i -g vercel
vercel
vercel env add ANTHROPIC_API_KEY
vercel --prod
```

`vercel.json` handles SPA routing automatically. `/shop` and `/about` work as real URLs after deploy.

## Two TODOs before launch

### 1. Brief form
Search `// TODO` in `index.html` → `handleBrief()`. Replace `console.log` with a POST to Formspree/Resend.

### 2. Stripe Payment Links
Search `// TODO` in `index.html` → `checkoutBtn` click handler. Replace `alert()` with redirect to Stripe Payment Link (one per tier, or one with `client_reference_id`).

## Cost

- Hosting: Vercel free tier
- AI concierge: Haiku 4.5 ~$0.001/conversation
- Form: Formspree free tier (50 submissions/month)
- Total: ~$0–15/month
