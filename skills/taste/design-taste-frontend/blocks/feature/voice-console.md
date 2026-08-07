---
name: voice-console
category: feature
dial_compatibility:
  variance: [6, 8]
  motion: [6, 8]
  density: [3, 5]
when_to_use: "Showing a voice/AI product on a landing page. A central animated voice orb that changes state by who is speaking, a live transcript feed, and a result reveal. Auto-plays on scroll into view."
not_for: "Static feature lists, non-voice products, dense dashboards."
stack: ["vanilla"]
---

## Visual sketch
```
   ( voice orb )      <- ripple rings + waveform; neutral when system speaks, accent glow when listening
    SPEAKER LABEL
  [ transcript bubbles, newest at bottom, top fade mask ]
  ---------------------------------
  [ score ring 84 ]  Verdict + one fix
  Clarity 86  Home ties 70  Red flags low
```

## Structure (vanilla)
- `.voicecore` column container, fixed min-height to avoid layout jump.
- `.vstage`: `.orb[data-state]` (idle | officer | listening) containing `.orb-core > .wave > i*7`, plus `.vspeaker` label with a state dot.
- `.chat`: appended `.bubble.off` / `.bubble.usr`, `overflow-y:auto`, top `mask:linear-gradient`.
- `.chatfoot`: result panel injected at the end.

## Motion (motivated)
- Orb `data-state` drives color + scale; `.spk` class drives ripple rings (`::before/::after`) and the waveform bars (`scaleY` keyframe with staggered `nth-child` delays). State = who is speaking (feedback, not decoration).
- Bubbles enter with a single `bub` keyframe (opacity + translateY).
- Result: SVG ring draws via `stroke-dashoffset` transition; number counts up with rAF easing `1-(1-p)^3`.

## Trigger
IntersectionObserver (threshold .01, rootMargin bottom -10%), play once, `unobserve`. Expose `window.__vzPlayChat` for manual trigger. NEVER a scroll listener.

## Sequence pattern
```
officer: set state -> wait ~1150ms -> append bubble -> idle -> next
you:     set state -> wait ~1250ms -> append bubble -> idle -> next
end:     status "Scoring" -> ~760ms -> renderResult()
```

## Mobile (<860px)
Parent `.frow` collapses to one column; the console becomes full width. Orb and bubbles already fluid. No changes needed.

## Dark mode
All colors via tokens (`--ink`, `--accent`, `--paper`, `--accent-soft`, `--line`). Orb officer state uses `--ink` gradient, listening state uses `--accent`. Verified both themes.

## Reduced motion
`@media (prefers-reduced-motion: reduce)`: disable orb/wave/ripple/bubble animations; in JS, render the full transcript and the final score instantly (`renderResult(true)`), no timed sequence.

## Anti-patterns
- Do not fake a voice product with only text bubbles; the orb IS the differentiator.
- Do not use dashboard-style filled meter bars for the result; compact mono chips read cleaner on a landing page.
- Do not auto-loop the orb forever; it animates only while "speaking."

## Reference
Built for Vizard product section, landing/index.html (`#voiceVis`).
