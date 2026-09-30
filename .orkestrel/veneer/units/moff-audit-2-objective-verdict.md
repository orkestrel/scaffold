Lane: **objective**, held by `reviewer` on Opus 5.5. Opus 5.5 also wrote the work under audit.

Evidence read:
- the retained round diff `moff-instruments-2/moff-2.diff` and status `moff-2-status.txt`. For the whole-unit diff I read `moff-instruments/moff.diff` together with the round diff. I ran no `git` command.
- the worktree files at `/home/user/veneer-moff`
- the built cascade `dist/src/styles/index.css`
- `node_modules/bootstrap/dist/css/bootstrap.css`
- every plant and gate log in `moff-instruments-2/`

Every ruling comes from reading these files; I executed nothing.

## Verdicts

**1. The responsive exit — CONFIRMED.**
- The case at `tests/src/styles/components/offcanvas.test.ts:611-695` drives the class sequence the engine writes. The engine in `src/browser/Offcanvas.ts` adds `showing`, then `show` (303, 308), and removes `showing` (314). On hide it adds `hiding` (362), removes `show` (377), then removes `hiding` (383). The test does the same at 636, 643, 645-646 and 653. Joining two classes without a style flush between them changes no start or end value, because `.showing` and `.show:not(.hiding)` resolve to the same values.
- It samples `transform` and `opacity` on entry (637-641) and on exit (647-651). The expected values are the specimen's duration and the two curves below the boundary, and no sample, opacity `1` and no animations at and above it (664-692).

Each case in the coverage table, with the mutation that makes it fail and whether its assertions tell that mutation apart from the passing case:
- **State case (278-295).** Fails if the `hiding` exclusion is dropped or the rest opacity is removed. The `opacity` plant fails it (`moff-plant-opacity.log.txt:112,136`). Distinguished.
- **Placement slide-and-fade (536-598).** Fails with the release's literal timing (`moff-plant-literal.log.txt:85`, "expected undefined to be defined") and with the transition removed. `.offcanvas.hiding{opacity:1}` would fail `expect(disappearance).toBeDefined()` at 582; that one is derived, not planted. Distinguished.
- **Responsive case (611-695).**
  - `hiding-opaque` fails it at 575: `hidden` reads `'1'`, the exit opacity sample is `undefined`, and a lingering `CSSTransition` appears (`moff-plant-hiding-opaque.log.txt:67-98`).
  - `leak` fails it at each boundary with `resting '0'` (`moff-plant-leak.log.txt:66-234`).
  - `literal`, `opacity` and `transition` each fail it at the first reading below the boundary.
  - All of these are distinguished.
  - A transition written outside the `transition` mixin is **not** distinguished by this case, because it runs with motion allowed. The ramp case's condition list (354-358) and the factor case catch it.
  - A transition declared in the flow alone is **not** distinguished. See claim 4(b).
- **Factor case (706-757).** The `mixin` plant fails it at `expect(reduced)` (`moff-plant-mixin.log.txt:86-131`). The `literal` plant fails it at 740 (log 352). Distinguished.
- **Expanded bar (771+) and the `navbar.test.ts` row case.** The `navbar-reset` plant fails both (7 failed; log 69-249). Distinguished.
- **Ramp and bare-panel cases (302-419).** The `transition` plant fails the condition list (log 84-194), and the `mixin` plant fails the bare panel's `REDUCED_MOTION` list (mixin log 65). Distinguished.

**2. The plants — CONFIRMED.**
- Each of the seven logs in `moff-instruments-2/` shows `build=0`, `exit=1`, an `AssertionError` in the failing case, and `restored=identical`. `moff-plants-2-summary.log.txt` lists the same.
- `hiding-opaque` fails exactly one case, the extended `sm` case at 575 (1 failed, 81 passed; log 62-67, 116).
- `mixin` fails the factor case's reduced-motion reading and the bare panel's condition list (mixin log 64-131).
- On restoration: the per-plant `cmp` at `moff-plants-2.sh:64-65` only compares the backup with the copy just made from it, so it proves the copy worked and nothing more. Restoration holds on the worktree itself. `_offcanvas.scss` still has `opacity: 0` (20) and both `@include transition` lines (115, 155), with no planted rule after 197. `_navbar.scss:209` still has `opacity: 1`. `moff-2-status.txt` lists no `_navbar.scss` change.

**3. The guide — BROKEN.**
- The values are true. The built cascade has `--vn-motion-panel:calc(.25s * var(--vn-factor-motion))`, `--vn-ease-panel:cubic-bezier(.32, .72, 0, 1)` and `--vn-ease-out:ease-out`. `bootstrap.css:6286` has `transform 0.3s ease-in-out`. The guide sentences at `guides/veneer.md:6149-6152` and `6173-6175` match these.
- The claim fails on voice. At `guides/veneer.md:6151`, "in place of the release's `0.3s`," leaves a code token with no noun after it. `.claude/rules/writing.md` § Code tokens says: "Put a code token in backticks and follow it with a noun."
- This phrase also departs from the guide's own form. Every other sentence of this kind writes "the release's `0.15s` value" (4792, 5057, 5139, 5283, 5390). No other bare `release's \`<time>\`` occurs in the guide.
- Fix: write "in place of the release's `0.3s` duration", and "each move resolves to a `250ms` duration". The second fix is the same rule; the bare form it replaces also appears in the Modal section at 5755, so that sentence already existed before this round.

**4. The comments — BROKEN.**
- The 100-column half holds. A width-aware search over the four owned files (tab counted as one column, as `awk` counts it) finds only `offcanvas.test.ts:423`, the `.btn-close` comment. That line appears in neither `moff.diff` nor `moff-2.diff`, so it predates the unit.

(a) `src/styles/components/_offcanvas.scss:67`: "Every value here but the transition is Bootstrap 5.3.8's own" is false.
- "Here" is the `@layer components` block. The comment itself names the backdrop's opacity, which is set later in that block, and the navbar partial's matching header uses "here" the same way.
- That block writes `opacity: 0` (from `$panel`, line 20, emitted at 112-114 and 152-154) and `opacity: 1` (from `$nested`, line 59). The built cascade has `.offcanvas-sm{…opacity:0…}` under `(width<576px)` and `.offcanvas-sm.showing,.offcanvas-sm.show:not(.hiding){opacity:1;transform:none}`.
- The release writes no opacity on any panel (`bootstrap.css:6290-6349`), and the guide records these declarations as additions (6177-6178).
- Fix: "Every value here but the transition and the panel's opacity is Bootstrap 5.3.8's own", plus one sentence saying the transparent rest and the opaque shown state are Veneer's additions.

(b) `tests/src/styles/components/offcanvas.test.ts:600-601`: "The mutations this catches are the panel's opacity or its transition written outside the rules each responsive panel carries below its boundary" overstates the transition half.
- At and above the boundary, no rule sets `transform` or `opacity` on any state class. The built `@media (width>=Npx){.offcanvas-{bp}{…}}` blocks hold only the height variable, the border-width variable and the fill.
- A CSS transition starts only when a computed value changes. So a `transition: var(--bs-offcanvas-transition);` added to the `breakpoint-up` block (after `--bs-offcanvas-border-width: 0;`, the `leak` plant's anchor) leaves `entering`, `leaving` and `lingering` idle at every in-flow reading, and the case passes.
- The ramp case's condition list does not catch it either, because the declaration adds no new media condition.
- This is derived from the source, not executed. To settle it, run that plant through `moff-plants-2.sh`'s harness. The expected result is that the responsive case passes.
- Fix, stronger option: add `transition: readStyle(panel, 'transition-duration')` to the reading before the class writes, expecting `'0s'` at and above the boundary and the specimen's durations below it.
- Fix, weaker option: narrow the comment to "the panel's opacity written outside those rules, its transition dropped from them, and a hiding panel left opaque below the boundary".

**5. No regression — CONFIRMED.**
- The round diff touches rule files only at `_offcanvas.scss:75`, which is a comment. The status lists no `_navbar.scss` change.
- The built rules that set `opacity`, `transform` or `transition` on `.offcanvas` and `.offcanvas-{sm…xxl}` show the round-1 shape: rest `opacity:0` with the token transition below the boundary, the `(width<N) and (prefers-reduced-motion:reduce)` `transition:none` twin, `opacity:1;transform:none` on `showing` and `show:not(.hiding)`, and nothing in the flow. The navbar `.offcanvas` rule keeps `opacity:1;transition:none`.

**6. Scope and gates — CONFIRMED.**
- `moff-2-status.txt` lists `guides/veneer.md` (only § Offcanvas classes is touched), `_offcanvas.scss` and `offcanvas.test.ts`. All are owned under `e-id-motion-offcanvas-brief.md:89-92`.
- `moff-gates-2.sh` records each gate's own exit status directly, with no pipe after the command.
- Every `-2` log ends `exit=0`: format, check, lint, guides (26 passed), policy (109 passed, 1 skipped), setup (357), build-src, browser (75), app (223) and conformance (45). The styles observation also exits 0 (1565).

## Findings outside the claims

**F1 — `src/styles/components/_navbar.scss:6`.**
- The header "Every value here is Bootstrap 5.3.8's own, apart from the forced-colors focus outline" became false when the unit added `opacity: 1` at 209.
- The release's `.navbar-expand-sm .offcanvas` rule (`bootstrap.css:4087-4098`) writes no opacity. The unit's own comment at 161 says "The opacity reset is Veneer's own".
- Fix: add "and the expanded bar's offcanvas opacity reset" to the exceptions.
- Scope: `e-id-motion-offcanvas-brief-2.md` grants only "that rule and its comment" in `_navbar.scss`, so the carrier needs this header line granted.

## Attacked and held

- **Exit held opaque by `&.show` without `:not(.hiding)`.** The responsive case passes, because it removes `show` as it adds `hiding`. The state case's `show hiding` row catches it through the shared `$nested` map. The case also passes under the engine's order, which is correct behaviour.
- **Fade on a different token.** Caught. The expected duration is the specimen's maximum (`readDuration`, `setupBrowser.ts:1833`), which the partial's value cannot move.
- **Removing `hiding` after the exit.** Changes only `visibility`, which is not transitioned, so `lingering` reads `[]` correctly.
- **"Once" in claim 3.** The `250ms` value appears in both the paragraph and the bullet. The Modal section does the same (5755, 5789), and brief-3 item 3 required both. I rule it not a repetition.

## Referrals to the Orchestrator

- **Guide-wide code-token form.** The guide writes "resolves to `250ms` at a factor of `1`" at 5755, and "at a factor of `1`" throughout, with no noun after the token. Rule whether that is the guide's accepted form under `writing.md` § Code tokens.
- **Conformance coverage.** It is unverified whether `npm run test:conformance`'s declaration-addition ledger reports the in-flow transition plant from claim 4(b). Run it with that plant.

Process: no lane of this round ran on an engine that did not write the work. The verdict file must record that.

VERDICT: FAIL 3, 4; outside the claims: F1
