# J1 — the journey layer, the retrofit, and the cascade's true home

## Role and engine

`sol`, engine **GPT-5.6 Sol** (precision layer over a fixed doctrine). Sole serial writer in
`/workspace/supervisor` from clean committed baseline **c1eb5a3** (U5d closed;
full chain green — only the declared U7 parity four red). Perform directly, spawn nothing, no commits/pushes/installs.

## Authority

`/home/user/scaffold/.orkestrel/supervisor/REDESIGN.md` — the owner doctrine block ("journey
tests simulate a person, not a script") and the J1 ledger row are this unit's specification;
AGENTS.md; `.claude/rules/tests.md`. The doctrine, fixed and binding: trusted input only
(`userEvent` in browser mode, Playwright's real keyboard/mouse in the Node harness); never
`dispatchEvent`/programmatic `.click()`/`.focus()`; interactions limited to what a person can
see and reach — targets resolved ONLY among currently visible, focus-reachable elements by
their accessible names, anything else REFUSED; assertions read perception (visible text, field
contents, focus, announcements), never session refs, store internals, or styling-class reads;
transport-level proofs are a separate declared class; every async observation converges.

## The work

1. **The journey layer.** Build the visibility/reachability resolver as journey infrastructure
   beside the Node-side harness (`tests/app/browser/integration/setup.ts` or one sibling module
   it owns): resolution by role + accessible name over the live Playwright page, refusing any
   target that is not visible or not focus-reachable at resolution time, with the refusal
   readable in the failure (a journey that asks for a hidden control fails saying so, not with
   a timeout). Design the surface minimally — the three journeys below are its first and only
   consumers; do not speculate beyond them. One documented property, named in the layer's
   comments: below `lg` the drawer's backdrop blocks pointers but not keyboard reach (the
   recorded Tab-escape asymmetry) — pointer actions on intercepted elements fail through real
   actionability, keyboard reach is real, and the layer represents both rather than hiding
   either.
2. **The login journey retrofit.** `tests/app/browser/integration/journey.test.ts:15-43` holds
   the recorded doctrine violations — each must die: `page.locator('#login-name:focus')` /
   `'#login-secret:focus'` with `state: 'attached'` waits (lines 15, 18, 32) become perception
   focus assertions on targets resolved by accessible name; `page.locator('#login form')` /
   `'#login'` CSS-ID scoping (22, 43) becomes role/name resolution; the `.is-invalid` class
   count (26) becomes a perception read (the field's accessible invalid state or the visible
   refusal, your call, recorded); the `inputValue` reads (27, 28, 35) are field-content
   perception and may stay, re-targeted through the layer. The journey's flow and its facts
   (type, refuse, retype, succeed; values preserved; one alert; no field marked) are fixed —
   only the instrument changes.
3. **The rail journeys onto the layer.** The click-open and keyboard-only journeys (confirmed
   doctrine-clean twice) refactor to resolve their targets through the layer, proving the
   layer serves both pointer and keyboard modalities without changing what the journeys assert.
4. **The cascade's true home (the recorded carry).** Move `import 'halfmoon/css/halfmoon.min.css'`
   from `tests/app/browser/ApplicationView.test.ts:6` into `tests/setupBrowser.ts` (setup CSS's
   documented home, `tests.md:56`). Then run the WHOLE browser project and repair every
   component suite whose visibility assumptions become truthful — hidden elements stop
   answering role queries and stop taking focus once styled; you own all of
   `tests/app/browser/**/*.test.ts` for exactly those repairs. Repair means making the test
   honest against the styled render (reveal the human path before pressing, correct a
   visibility expectation), never weakening a fact. Report every file the move broke and how
   each repair reads.

## Scope

**Owned:** `tests/app/browser/integration/setup.ts`, `tests/app/browser/integration/journey.test.ts`,
`tests/app/browser/integration/integration.test.ts` (only if the layer's extraction touches
shared helpers), `tests/setupBrowser.ts` (the cascade import + any journey-layer declarations
that genuinely belong to shared browser infrastructure), `tests/app/browser/**/*.test.ts` (for
cascade-truth repairs only).

**Off-limits:** all of `app/**` and `src/**` (this unit writes no product code — a journey that
cannot pass against the real product is a deviation report, not a product edit), vendored files
(`tests/setupPolicy.ts`, `tests/policy.test.ts`), `configs/**`, `package.json`, `guides/**`.

Forbidden: the standing list; no new dependencies; no networkidle; no timers on asserted paths;
no CSS-ID targeting on any journey path; no aria-live additions.

## Environment facts

Node/npm on PATH. The integration project needs `npm run build:app` first, then
`npm run test:app:browser:integration`; the journey servers run with APP_LIMIT 600 (already
configured in `tests/setupBrowserServer.ts`). The browser project is
`npm run test:app:browser`; at baseline the closing chain reports the browser group green at
61 files / 661 tests (`tmp/redesign/u5d-gates.log`). Real Chromium at
`/opt/pw-browsers` is configured. The guides-parity project has 4 known reds owned by another
unit; do not run it. An authenticated page holds a permanent roster SSE stream, so `networkidle`
never fires — every wait is a concrete condition.

## Acceptance criteria

1. The layer exists with the refusal property proved: a test-side probe (promoted, named for
   what it proves) shows a hidden or unreachable target is refused with a readable failure.
2. `grep -n "locator('#\|state: 'attached'\|is-invalid" tests/app/browser/integration/journey.test.ts`
   returns nothing; the login journey passes on the layer with its facts intact.
3. Both rail journeys pass through the layer; `npm run test:app:browser:integration` green.
4. The cascade import lives in `tests/setupBrowser.ts` and not in any single test file;
   `npm run test:app:browser` green across all files, with every cascade-truth repair named in
   the report.
5. Static gates green (`format:check`, `lint:check`, `check`).

## Deviation contract

Stop and report if a journey cannot pass through trusted input against the real product (that
is a product finding for the Orchestrator, with the failing output verbatim), or if the cascade
move surfaces a breakage that repair-by-honesty cannot close without weakening a fact. Ancillary
layer-shape and naming calls are yours, recorded. Failing-first where the defect class can run
red (the refusal probe; the retrofit against the old instrument's blind spots).

## Output

Touched files + diffstat; the full diff; the layer's surface and its recorded calls; the
per-violation retrofit table (old line → new instrument); every cascade-truth repair (file,
what became truthful, how the repair reads); per-criterion proofs with commands and tails;
`git status --porcelain`; deviations or none. No diary.
