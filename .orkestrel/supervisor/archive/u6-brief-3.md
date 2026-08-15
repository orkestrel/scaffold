# U6 fix round 2 (micro) — successor to u6-brief-2.md, carrying the closing audit

Two items, both in owned test files, queued behind U4 in the writer order. The journey's
doctrine retargeting is NOT this round's work — J1 carries it, recorded.

1. **The copy sweep binds attributes.** `extractCopy` inspects only direct text nodes, so a stale
   `placeholder`/`title`/`aria-label`-class attribute would evade the vocabulary instrument.
   Extend the sweep to user-facing attributes, and add the negative control the instrument law
   demands: a case that CANNOT produce the failing verdict proves nothing — plant one
   out-of-population string in the assertion's expectations to show the sweep would catch it
   (a control that fails if the sweep goes blind).
2. **The journey acquires resources leak-safe.** `browser`/`context`/`page` are acquired before
   the `try`, so a `newContext()`/`newPage()` rejection leaks the browser, and a rejected
   `context.close()` skips `browser.close()`. Nest the acquisition/cleanup so every successfully
   acquired resource closes under both setup and teardown failure.

Gates: scoped converge + the two files by path. Output: both diffs, git status --porcelain.

## Item 3 (added): the harness's logged-in signal died with the door's prominence

U4 collapsed the typed-id form, so `#open-workflow` is hidden and every integration wait on it
times out (7 red, confirmed). Fix the harness honestly, the way a human now experiences it:
`loginApplication` waits for a signal visible at login TODAY (the navbar's authenticated controls
— the logout button's accessible name — since the rail is not composed until U5);
`openApplicationWorkflow` first expands the disclosure with a real click on its summary control
(a human must), then fills and submits. Update every direct `#open-workflow` wait site the same
way (integration.test.ts, journey.test.ts). When U5 composes the rail, opening re-routes through
rows — that re-route is U5's, not yours; keep the door path working as the interim truth.
