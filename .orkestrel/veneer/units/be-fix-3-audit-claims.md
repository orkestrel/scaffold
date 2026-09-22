# B-PASSIVE-E rounds 2 and 3 — audit claims

Subject: the fix rounds `opus` wrote in `/home/user/veneer-be` from
`/home/user/veneer-be/tmp/units/b-passive-e-brief-2.md` and `b-passive-e-brief-3.md` over the
round-1 verdicts (`/home/user/veneer-be/tmp/units/be-audit-analyst-verdict.md`, `FAIL 1, 3, 4, 6, 7,
9`; `be-audit-reviewer-verdict.md`). Evidence: `/home/user/scaffold/tmp/audit/be-fix-3.diff` (the
whole diff against `3a9202a`, untracked files as additions; the round-1 writes are inside it),
`be-fix-3-status.txt`, and the rounds' reports `/home/user/scaffold/tmp/audit/be-report-2.md` and
`be-report-3.md`. The frames sit under `/home/user/veneer-be/tmp/capture/states/`. The design is
`/home/user/veneer-be/tmp/units/b-passive-design-verdict.md` with D17 and D18; D21 (a uniform region
whose colour differs from the frame's floor is a paint; one equal to the floor is blank) is recorded
in the round-3 brief. Rule each claim CONFIRMED, BROKEN, or UNRESOLVED with `file:line`; rule a claim
about a proof on the mutation named and whether the assertions distinguish it from the passing case.

1. **The spinner and placeholder mode cases read an independent text colour** (round-1 analyst 3;
   round-3 finding 3). In `tests/src/styles/components/spinner.test.ts` and `placeholder.test.ts`,
   each mode case reads each mode twice: inherited (the host's text on `var(--vn-text-body-base)`),
   and moved (the `[data-bs-theme]` scope's own `color` set to `rgb(10, 20, 30)`, a value no rule of
   the cascade writes), requiring the ring, disc, and text (spinner) and the fill (placeholder) to
   follow it, and asserting neither mode's body text resolves to it. Mutations: `currentcolor`
   replaced by `var(--vn-text-body-base)` in `.spinner-border`'s border and in `.placeholder`'s
   background; each reddens the moved reading (`spinner.test.ts` around line 248,
   `placeholder.test.ts` around line 227) where the round-1 bodies passed; the partials are
   byte-identical after the reverts (SHA-256 `da61729a…ca23`, `c76fa3b8…2106`).
2. **The placeholder sizing case drives the font** (round-1 analyst 3). `floors $name at its own
   share of the font` mounts without an inline font and reads the floor at `40px` and `25px`, every
   recorded factor landing on a whole pixel; the mutation `min-height: 40px` for `1em` reddens the
   base row alone (`expected 40 to be 25`).
3. **The guard reads against the floor** (D21; round-3 finding 1). `measureVariation(encoded,
   region, floor?)` in `tests/setupBrowser.ts` measures the region against the named floor when one
   is given, refuses an unreadable floor (`The frame floor "<value>" names no readable color`), and
   keeps the first-pixel reading when omitted; the portfolio case in
   `tests/app/browser/integration.test.ts` passes `reading.floor` and names a blank region in its
   message; `tests/setupBrowser.test.ts` proves the reading both ways with browser-encoded PNG frames
   differing in the bar's colour alone (white on white refused, grey on white admitted, and the
   first-pixel readings 0 for both) plus the refusal case; the mutation "the reference taken from the
   first pixel whatever the floor" reddens `separates a region painting the frame floor from one
   painting another color` (`1 failed | 55 passed (56)`), and `tests/setupBrowser.ts` is
   byte-identical after the revert (SHA-256 `4dc64fc7…a751`).
4. **The glow frame is accepted with the round-2 row** (round-1 reviewer F1; round-3 finding 2).
   The `glowing-placeholder` row reads `animation-name` on `.placeholder-glow .placeholder`; every
   capture variant passes (`25 passed (25)` each) and each variant's artifact records the glow frame
   at variation 1 against its floor (`rgb(255, 255, 255)` light, `rgb(20, 25, 30)` dark); every
   placeholder, progress, and spinner frame and artifact exists for the four variants.
5. **The button placeholder's shape and the guide** (round-1 analyst 4, 6; reviewer F2, F3, F4;
   round-2). The style fixture's and the showcase's button placeholder both read `<a class="btn
   btn-primary disabled placeholder col-4" aria-hidden="true"></a>` with no `href`, `role`,
   `aria-disabled`, `aria-label`, or `tabindex`, each doc block stating the reason and the round-1
   report's D10 attribution corrected; the guide's target-resting sentences rest on the managed
   Chromium and Edge receipts (§ Placeholder classes, § Helper classes, the
   `::-webkit-file-upload-button` deferral row), § Placeholder classes records the wave keyframe's
   `-webkit-mask-position` departure, the spinner compatibility row names what ships and what the
   proof reads; the selector case titles read `writes every recorded selector into the components
   layer`; every `p > .placeholder` lookup reads `p:not([class]) > span.placeholder`; the
   `.placeholder-wave` comment in `_placeholder.scss` rests on the receipts with the compiled cascade
   unchanged (digest `df780eb8…2dc4e` before and after).
6. **Scope is honest.** The status is the round-1 set plus `tests/setupBrowser.ts` and
   `tests/setupBrowser.test.ts` and nothing else; `tests/setupServer.ts`, `tests/setupServer.test.ts`,
   `tests/app/browser/Showcase.test.ts`, `vite.config.ts`, `src/styles/_tokens.scss`,
   `src/styles/_mixins.scss`, and the vendored files are untouched; `tests/setup.ts` carries the
   round-2 row and nothing of round 3; no `tmp/probe/` file remains.
7. **The report's patch body** (round-2 D3, round-3 finding 5). The `vite.config.ts` patch body in
   `tmp/units/b-passive-e-report.md` reads `after the passive`; the Orchestrator has already landed the
   budget in the journey wrapper (J1), so that patch is superseded and lands nowhere.
8. **Gates.** `format:check`, `lint:check`, `check`, `build:src` exit 0; `test:setup:browser`
   `56 passed`; `test:src:styles` `464 passed`; `test:guides` `18 passed`; four capture journeys
   `25 passed` each; observations `test:journey` `100 passed`, `test:policy` `109 passed | 1
   skipped`, `test:setup` red on the Set literal and the sweep case (the latter closed by B-SWEEP-2
   on the session branch), `test:app` red on the Showcase `.btn` assertion (the family's integration
   edit). UNRESOLVED until the Orchestrator's independent chain; rule `npm run check` yourself where
   the sandbox allows it.
