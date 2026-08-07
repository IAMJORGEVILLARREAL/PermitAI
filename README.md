# BuildScope AI — Hackathon Demo

Plans → structured Scope Packages → marketplace bids → award → Compliance Ledger.

Product definition: [`Documentation/buildScopeAI.prd`](Documentation/buildScopeAI.prd)

## Quick start

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Demo script (≈90 seconds)

1. **Continue as GC** → open **Brickell Office TI** (Miami, FL)
2. Click **Run AI Analysis** → review Scope Packages + Permit Roadmap
3. On **Electrical**, click **Post to Marketplace** → **View bids**
4. **Award** a bid → lands on **Compliance Ledger** (sub assigned)
5. Home → **Continue as Sub** → **Confirm Permit Obtained**

## Team lanes

| Role | Owns |
|---|---|
| Backend | `src/app/api/**`, `src/lib/**` |
| Frontend A | `/`, `/projects`, `/projects/[id]` (Scope Studio) |
| Frontend B | bids, `/compliance/[projectId]`, `/sub` |

## Notes

- AI, license APIs, e-sign, and payments are **mocked**
- Sample plan: `public/sample-plan.svg`
- In-memory store resets when the Next.js server restarts
