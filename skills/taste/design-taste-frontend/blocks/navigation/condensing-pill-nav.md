---
name: condensing-pill-nav
category: navigation
dial_compatibility:
  variance: [5, 8]
  motion: [4, 7]
  density: [3, 5]
when_to_use: "Premium landing pages. A nav that is full-width at the top, then condenses into a floating rounded pill with a blurred translucent backdrop once the user scrolls. Centered link group, theme toggle, one CTA, mobile drawer."
not_for: "Dense product apps, public-sector/accessibility-first (use a plain solid bar), pages with >6 nav items."
stack: ["vanilla"]
---

## Visual sketch
```
top:      [logo            How · Features · Coverage · Pricing · FAQ            (toggle) (CTA)]   full width
scrolled:        [ logo   ·  links  ·  toggle  CTA ]   <- narrower floating pill, blur + shadow
mobile:   [logo                                   (toggle)(CTA)(burger)]  -> drawer drops below
```

## Structure (vanilla)
- `.nav` (fixed, flex-center, padding) > `.nav-pill` (max-width, border-radius, transitions) > `.nav-in` (flex row, position relative) + `.nav-drawer` (mobile, below).
- `.nl` links are `position:absolute; left:50%; translateX(-50%)` so they stay centered independent of the side items.
- `.nr` holds theme toggle + CTA + `.nav-burger`.

## Motion (motivated)
- Scroll toggles `.nav.on` (IntersectionObserver or rAF-throttled scroll on a sentinel; here a small rAF scroll check at `scrollY>14`).
- `.nav.on .nav-pill`: `max-width` shrinks (e.g. 1100 -> 880), gains `background: color-mix(--bg 72%, transparent)`, `backdrop-filter: blur(18px)`, border, shadow. Transition `max-width .42s`, plus bg/shadow/border.
- Link underline: `a::after` width 0 -> full on hover.

## CTA nesting rule (important)
The CTA sits inside the pill. For its corners to look right, CTA `border-radius = pill_radius - gap`
(concentric), NOT plus. Example: pill 18px, ~8px gap -> CTA radius ~10px. And keep the side
padding small so the CTA's gap to the pill edge ~matches its top/bottom gap.

## Mobile (<820px)
`.nl{display:none}`, `.nav-burger{display:flex}`. Burger toggles `.nav-drawer.open` and swaps the icon (bars <-> x). Drawer links close the drawer on click.

## Dark mode
Tokens only (`--bg`, `--ink`, `--line`, `--accent`). The `color-mix(... --bg ...)` backdrop adapts automatically.

## Reduced motion
The condense transition is subtle and transform/opacity-light; acceptable. If MOTION dial is low, drop the max-width animation and just fade in the backdrop.

## Anti-patterns
- Do not let the nav exceed 80px tall; pill row ~54px.
- Do not put a CTA + duplicate-intent link in the nav.
- Do not use a `window.addEventListener('scroll')` that does heavy work each frame; throttle with rAF and a flag, or use IntersectionObserver on a top sentinel.

## Reference
Built for Vizard, landing/index.html nav. Ported from the earlier home-classic pill nav, recolored to the warm token system.
