# BuildScope platform demo

- Landing (design): http://localhost:3000 (`site/`)
- App (Faruk UX + main backend, design system): http://localhost:3100

## Accounts (login page)

Password: `buildscope`

| Role | Email | Lands on |
|------|-------|----------|
| GC | `paul@ironline.test` | `/projects` |
| Sub | `jose@sonoranelectric.test` | `/sub` |

## 90-second walkthrough (origin/main script)

1. Sign in as Paul → open **Brickell Office TI**
2. **Run AI analysis** (Faruk theater) → scopes + permit roadmap
3. On **Electrical** → **Post to marketplace** → **View bids**
4. **Award** Biscayne Electric → Compliance Ledger
5. Sign out → Jose → **Confirm permit obtained**

## Stack

- Backend: origin/main in-memory store + `/api/**`
- Frontend flow: origin/main Scope Studio / bids / ledger / sub
- Analyze UX: Faruk Analyzing overlay
- Visual system: `/design` Minimal Industrial
- Auth + landing: local platform login + `site/` marketing
