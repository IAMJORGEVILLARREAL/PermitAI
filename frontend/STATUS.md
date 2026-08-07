# BuildScope — Frontend Status

Owner: **Faruk** (frontend platform) · Branch: `Faruk`
Site: Ryan · Backend: Jorge

## Run it

```bash
cd frontend
npm install
npm run dev
```

Open http://localhost:3000

Fallback for the live demo: `frontend/public/demo.html` — a self-contained
single file that runs the whole flow with no server. Use it if anything breaks
on stage.

## What the product does

Upload a project plan set, get every permit/license/document the jurisdiction
requires, then get matched with rated local subcontractors near the project ZIP.

## Demo flow (3 minutes)

1. **Landing** — BuildScope, one CTA
2. **Upload** — drag & drop, browse files, or one-click demo plan set
3. **Analyzing** — ~3s, scope tags stream in with checkmarks
4. **Results** — three sections:
   - **Permits & Approvals** — authority, trigger, code citation, fees, timeline, confidence, link to the official source
   - **Required Documents** — checklist with ready toggles and progress
   - **Local Subcontractors** — ZIP + radius (10/20/30/50 mi) + sort by rating/match/reviews, distance per card, review excerpt, Maps link, Invite

## Data today

All mock, shaped exactly like the API we expect. Scenario is a Phoenix
multifamily Level 2 alteration. Permit citations link to real phoenix.gov,
ICC, and Arizona ROC pages.

## What backend needs to provide (Jorge)

```
POST /analyze        multipart: file
→ {
    project:        { name, address, occupancy, constructionType, workType, valuation, healthScore, scopeTags[] },
    permits:        [ { name, authority, trigger, citation, sourceUrl, verifiedOn, feeLow, feeHigh, timeline, confidence, docs[] } ],
    subcontractors: [ { trade, company, rating, reviewCount, distanceMi, address, phone, mapsUrl, priceRange, eta, match, reviews[] } ]
  }
```

Frontend falls back to mock data when `NEXT_PUBLIC_API_URL` is unset, so the
demo never depends on the backend being up.

### Suggested pipeline

| Step | Service |
| --- | --- |
| Read the drawings, extract scope | Gemini (multimodal) |
| Decide which permits apply | Deterministic jurisdiction rules — never the LLM |
| Find contractors near the ZIP | Google Places API — Nearby Search + Place Details |
| Explain why a permit applies | Gemini, grounded in the matched code section |

Keeping the permit decision deterministic is the point: every card links to a
published code section, so nothing is invented.

Keys live in `frontend/.env.local` (gitignored): `GEMINI_API_KEY`,
`GOOGLE_PLACES_API_KEY`.

## Stack

Next.js 16 · React 19 · TypeScript · Tailwind v4 · Plus Jakarta Sans + Inter

## Not built yet

Auth, saved projects, real plan parsing, live Places calls, license
verification, code-change monitoring.
