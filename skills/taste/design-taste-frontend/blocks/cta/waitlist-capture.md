---
name: waitlist-capture
category: cta
dial_compatibility:
  variance: [4, 8]
  motion: [3, 6]
  density: [2, 4]
when_to_use: "Pre-launch products. An inline email capture wired to a no-backend form service (Formspree/Tally), with in-place success/error, no page redirect. Replaces fake 'Get the app / Start trial' CTAs when the product is not yet live."
not_for: "Live products that should drive to signup/checkout; multi-field lead forms (use a real form pattern)."
stack: ["vanilla"]
---

## Visual sketch
```
  Walk into your interview already ready.
  Vizard is launching soon. Join the waitlist and you'll be first in line.
  [ you@email.com ........... ] [ Join the waitlist ]
  status line (success / error renders here)
  No spam · One email when we launch · Unsubscribe anytime
```

## Structure (vanilla)
```html
<form id="wl-form" class="wl-form" action="https://formspree.io/f/XXXX" method="POST">
  <input type="email" name="email" required placeholder="you@email.com" aria-label="Email address" />
  <button class="btn btn-w btn-lg" type="submit">Join the waitlist</button>
</form>
<p id="wl-msg" class="wl-msg" role="status" aria-live="polite"></p>
```

## Behavior (AJAX, custom fetch - no library)
- Intercept submit, `preventDefault`, POST `FormData` with `headers:{Accept:'application/json'}`.
- On `r.ok`: add `.done` to the form (dim + disable), show success copy in `#wl-msg`.
- On error: read `d.errors[0].message`, show in `#wl-msg.err`, re-enable button.
- Disable the button during the request.

## States (all four, mandatory)
- Idle: input + button.
- Loading: button disabled, "Joining...".
- Success: "You're on the list. We'll email you the moment it opens." form dimmed.
- Error: inline message + fallback email, button re-enabled.

## Pre-launch honesty (important)
When the product is not live, do NOT keep "Get the app", "Start free trial", "$X/mo" CTAs that
imply availability and link nowhere. Convert all primary CTAs to this waitlist (point them at the
form's section id). Change any "now in TestFlight" / launch-implying copy to "launching soon".

## Mobile
`.wl-form{flex-wrap:wrap}` so input + button stack; input `flex:1 1 220px`.

## Dark mode
Tokens (`--paper`, `--ink`, `--line-2`, `--accent`). Input focus border -> `--accent`.

## Anti-patterns
- No redirect to the form provider's default thank-you page (use AJAX).
- No fake live-stock counters ("412 of 800 spots"). Real waitlist, real number only.
- Don't collect more than email pre-launch.

## Reference
Built for Vizard, landing/index.html (`#wl-form`, Formspree endpoint), plus the morning-notes deploy step.
