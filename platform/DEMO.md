# BuildScope platform — demo script (≈90 seconds)

App: `http://localhost:3000`  
Password for all demo users: `buildscope`

## Accounts

| Role | Email | Lands on |
|------|-------|----------|
| GC | `paul@ironline.test` | `/projects` |
| Sub | `jose@sonoranelectric.test` | `/work` |

## Walkthrough

1. **Sign in as Paul** → open **Desert Ridge Medical Office — Shell**
2. Click **Analyze plan set** → watch extraction theater → Scope Packages + Permit Roadmap
3. On **Electrical**, click **Confirm quantities** → **Post to marketplace**
4. Sign out → **Sign in as Jose** → open invitation → submit bid (e.g. `184500`)
5. Sign out → **Paul** → Electrical → **Open now** (or wait 45s) → **Award**
6. Opens Compliance Ledger path: `/projects/[id]/compliance`
7. **Jose** → **My permits** → set Electrical to **Obtained** + permit number → Save

## Reset between runs

```bash
npm run db:reset
```

## REST API (origin/main contract)

| Method | Path |
|--------|------|
| GET | `/api/projects` |
| GET | `/api/projects/:id` |
| POST | `/api/projects/:id/analyze` |
| POST | `/api/scopes/:id/post` |
| POST | `/api/scopes/:id/award` `{ "bidId" }` |
| POST | `/api/permits/:id/acknowledge` `{ "status", "permitNumber?" }` |
| GET | `/api/me?role=gc\|sub` |

Stitched from:
- Local `platform/` design system + Prisma engine
- [origin/main](https://github.com/IAMJORGEVILLARREAL/PermitAI) API + Scope Studio surfaces
- [Faruk branch](https://github.com/IAMJORGEVILLARREAL/PermitAI/tree/Faruk) analyze UX
