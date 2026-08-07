# PROMPT — Build the BuildScope Landing Page

> Paste this whole file to your coding agent. It is self-contained.

---

## 0. ROLE & MISSION

You are a senior product designer + creative front-end engineer. Build a **single-page marketing landing page** for **BuildScope** — the quiet tool that turns construction plans into quantified scopes, verified subcontractor matching, and source-linked permit compliance.

The page must feel like a **premium Minimal Industrial product site**: Apple hardware × Braun × Swiss editorial × fabrication documentation. Not a generic SaaS template. Not construction-company branding.

This is a conviction machine: a mid-market GC or compliance lead lands here and within 8 seconds understands “this is the quiet, precise system that turns plans into biddable, compliance-ready work.”

---

## 1. MANDATORY FIRST STEP — LOAD THE TASTE SKILLS

Before writing a single line of code, invoke these skills (they live in `skills/taste/` in this repo) and internalize them:

1. **`design-taste-frontend`** — primary design-quality bar
2. **`high-end-visual-design`** — premium/artistic ceiling
3. **`brandkit`** — lock and apply the brand system below
4. **`imagegen-frontend-web`** — generate/spec imagery
5. **`full-output-enforcement`** — do not truncate; ship every section fully built

Also read:

- `BRAND_THEME.md` — locked Minimal Industrial system
- `ASSET_GENERATION_PROMPTS.md` — image prompts
- `permitAI.pdr` — product truth

If any skill or brand file is present, its rules **override** your defaults.

---

## 2. BRAND THEME — "MINIMAL INDUSTRIAL" (LOCKED)

One theme, applied everywhere. No stray colors, no second metaphor.

**Concept:** A beautifully machined aluminum measuring tool. Grayscale surfaces, massive whitespace, one precious Safety Lime accent. Permit artifacts and fabrication language as identity — not decorative construction graphics.

### Palette

| Token | Hex | Use |
|---|---|---|
| `--carbon` | `#111111` | Primary text / structure |
| `--graphite` | `#242424` | Deep surfaces |
| `--steel` | `#5E5E5E` | Secondary text |
| `--concrete` | `#A7A7A7` | Tertiary |
| `--fog` | `#EAEAEA` | Soft surfaces |
| `--paper` | `#F8F8F6` | Page background |
| `--lime` | `#C7F000` | **Only accent** — selection, current, status, one action |

- Default to a **light Paper** experience.
- Lime budget: **3–5% max** per composition. Never fill whole buttons or backgrounds with lime.
- No orange. No blue accent. No startup purple.

### Typography

- **Display:** Geist / Satoshi / Neue Haas Grotesk — huge, tight tracking
- **Body:** Inter
- **Mono:** Geist Mono — permit IDs, code citations, dimensions, revision IDs, drawing labels

### Motifs

- Hairline rules, registration marks, corner brackets, crosshairs, measurement ticks
- Serial numbers, revision IDs, barcode labels, title-block fragments
- Matte materials: aluminum, powder-coated steel, concrete, paper
- Almost no shadows; cards disappear into one carved surface

### Motion

Mechanical, precise, CNC-like. Snap points. Linear slides. No bounce. No elastic easing.

---

## 3. WHAT THE PAGE MUST SAY (grounded in the PRD)

Lead with the wedge, not the feature list.

- **Hero:** “Plans in. Scopes, bids, and compliance out.” Sub: BuildScope reads commercial plan sets, builds quantified trade packages, matches verified subcontractors, and carries source-linked permit compliance through award and closeout.
- **Pain:** Manual takeoff, blind bid packages, and permit chasing still sit outside one system. Chat tools hallucinate code. Bid boards don’t scope. PM tools don’t close the compliance loop.
- **Shift:** From scattered tools → one quiet operating system for scoping, procurement, and regulatory ground truth.
- **Pillars:**
  1. **Scope Packages** — AI decomposes plans into MasterFormat-ready quantified packages with plan evidence.
  2. **Verifiable Permit Intelligence** — deterministic rules engine + source-linked citations (never generative free text as final authority).
  3. **Matched Marketplace** — verified license, insurance, radius, capacity, and performance.
  4. **Compliance Ledger** — award activates responsible-party permit tracking.
- **How it works:** Upload → Decompose → Match & Bid → Award & Comply.
- **Trust:** Progressive confidence UI (AI-suggested vs human-confirmed). “Show me” grounding to plan geometry. Advisory disclaimer for professional validation.
- **Personas:** Paul (GC owner), Maria (compliance director), Jose (electrical sub). Mark invented quotes as illustrative.
- **Metrics:** time-to-first-bid target, scope accept rate, citation dispute rate, bids-per-scope — use PRD figures carefully; do not invent unverified claims.
- **Pricing:** GC Pro / Business / Enterprise and Sub Free / Sub Pro from PRD §4.
- **Footer disclaimer:** BuildScope outputs are AI-generated advisory drafts for professional validation. Not a licensed design, engineering, or legal service.

Copy voice: **confident, technical, calm.** Short declaratives. No hype adjectives.

---

## 4. PAGE STRUCTURE

1. **Sticky nav** — Paper/graphite hairline; BuildScope wordmark; Product, How, Trust, Pricing; one Carbon primary CTA; lime only for current nav state if needed.
2. **Hero** — full-viewport one composition: brand-level wordmark presence, one headline, one supporting sentence, one CTA group, one dominant plan/artifact visual. No stats strip. No cards in the hero.
3. **Trust bar** — mono technical strip with 3–4 precise proof points.
4. **Problem** — the fragmented workflow: takeoff grind, blind bids, permit chase.
5. **How it works** — 4 measured steps with hairline connector and mechanical motion.
6. **Feature pillars** — Scope Packages, Ground Truth permits, Marketplace matching, Compliance Ledger. One job per section.
7. **Ground Truth** — plan fragment + source-linked permit citation metaphor; progressive confidence states.
8. **Use cases** — Paul / Maria / Jose.
9. **Pricing** — restrained tiers; Business highlighted with a thin lime tick, not a glow card stack.
10. **Trust & security** — rules engine, citations, audit log, isolation, advisory disclaimer.
11. **Final CTA** — quiet Carbon band with one lime laser-level line and email/CTA.
12. **Footer** — sitemap + non-dismissible disclaimer.

---

## 5. MOTION REQUIREMENTS

- Scroll reveals: short linear rise / opacity, no bounce
- Hero: measured slide-in of plan artifact; optional hairline draw
- How-it-works: stroke-dash connector draws
- Status ticks snap; lime appears only on active state
- Buttons: 1px press, no magnetic glow bloom
- `prefers-reduced-motion` respected
- Animate `transform` / `opacity` only

House easing: `cubic-bezier(0.2, 0, 0, 1)` (machine) and `cubic-bezier(0.85, 0, 0.15, 1)` (snap).

---

## 6. TECH & DELIVERY

- Prefer Next.js + React + TypeScript + Tailwind aligned to `platform/` tokens in `globals.css`
- Fully responsive; mobile hero remains one composition
- Accessible: landmarks, focus states, AA contrast, alt text
- Real PRD-grounded copy — no lorem
- Use `ASSET_GENERATION_PROMPTS.md` for imagery; typeset important text in code

---

## 7. IMAGE DIRECTION

All images: Minimal Industrial, ≥95% grayscale, Safety Lime ≤5%, matte materials, vast whitespace. See `ASSET_GENERATION_PROMPTS.md` for the full prompt pack.

Priority assets:

1. Homepage hero — scope from plans
2. AI scope decomposition
3. Source-linked ground truth
4. Compliance Ledger
5. Builder reviewing drawings / hands marking plans
6. Final CTA background
7. Logo symbol + wordmark

---

## 8. ACCEPTANCE CRITERIA

- [ ] Brand is **BuildScope**, never AreaOS / PermitAI as product name
- [ ] Minimal Industrial locked: grayscale + Safety Lime only
- [ ] Lime ≤ 5% of any viewport
- [ ] Hero is one composition; brand is hero-level; no hero cards
- [ ] No orange / amber / purple / cyberpunk motifs
- [ ] All sections built with PRD-grounded copy
- [ ] Motion is mechanical, never bouncy
- [ ] Advisory disclaimer present and non-dismissible
- [ ] Looks like a machined measuring tool, not a startup template

**Build the whole thing. Do not stub sections. Lock the theme and go.**
