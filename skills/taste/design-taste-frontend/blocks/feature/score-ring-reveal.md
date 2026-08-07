---
name: score-ring-reveal
category: feature
dial_compatibility:
  variance: [4, 7]
  motion: [5, 8]
  density: [3, 5]
when_to_use: "Revealing a single headline score/result with an explainable breakdown. A drawing SVG ring + count-up number, a plain-language verdict and the one fix that matters, plus compact breakdown chips. Works as the payoff at the end of an interactive demo."
not_for: "Comparison tables, multi-metric dashboards, anything needing precise data viz."
stack: ["vanilla"]
---

## Visual sketch
```
  ( ring 84 )   Solid, one fix left
                Tighten the funding answer with exact figures, and name one concrete tie.
  [Clarity 86] [Home ties 70] [Red flags low]
```

## Structure (vanilla)
- `.vresult` panel: separated by a top hairline (`border-top:1px solid --line`), NOT a heavy tinted box.
- `.vr-top`: `.vr-ring` (SVG circle track `.rt` + progress `.rf` + absolute `.vr-num`) and `.vr-head` (b verdict + p one-line fix).
- `.vr-chips`: small mono pills (accent text, `--accent-soft` bg, `--accent-line` border) for the breakdown. NOT filled meter bars.

## Motion (motivated = storytelling, the reveal)
- Ring: `.rf` has `stroke-dasharray: C` (circumference, e.g. 170 for r=27), `stroke-dashoffset: C` initial, transition `stroke-dashoffset 1.2s`. After insert, set offset = `C*(1 - target/100)` on next frame.
- Number: rAF count-up with cubic ease-out `Math.round(target*(1-(1-p)^3))` over ~1.3s.
- Panel enters with one `bub` keyframe.

## Why chips, not bars
The skill discourages filled-background progress bars as landing-page comparison visuals; they read
dashboard-y. Compact mono chips ("Clarity 86") convey the explainable breakdown without the clutter.
Use bars only inside a genuine product-UI screenshot, not as a landing decoration.

## Mobile
Stacks naturally; `.vr-chips{flex-wrap:wrap}`.

## Dark mode
Tokens only. Ring track `color-mix(--accent 16%, transparent)`, progress `--accent`, number `--accent-d`.

## Reduced motion
Render final state instantly: set `stroke-dashoffset` to the target with no transition, set the number to the final value, no count-up.

## Anti-patterns
- No fake-precise sub-scores you can't justify; keep the breakdown plausible and few (3).
- Don't wrap it in a loud tinted card; a hairline + clean type reads more premium.
- Don't animate `width`/`height`; only `stroke-dashoffset` (transform-equivalent) and opacity.

## Reference
Built for Vizard voice-console result, landing/index.html (`renderResult`).
