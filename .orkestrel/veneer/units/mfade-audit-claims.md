# E-ID-MOTION-FADE audit — claims

Subject: E-ID-MOTION-FADE round 2 in `/home/user/veneer-mfade` (branch `unit/mfade`, uncommitted over Veneer
`2376710`), briefed by `e-id-motion-fade-brief-2.md` under `../e-id-motion-design-verdict.md` (its `.fade` row and
§ Proof) and D50 (`decisions-round-2.md`). Written by `opus` on Opus 5.5 and reported in
`e-id-motion-fade-report-2.md`; round 1 stopped before editing (`e-id-motion-fade-report.md`). Evidence: `mfade-2.diff`
(`git diff 2376710`), `mfade-2-status.txt`, and `mfade-instruments/` (the gate driver and the logs). All sit under
`/home/user/scaffold/.orkestrel/veneer/units/`. A unit report's prose is not a claim subject. A mutation counts as a kill
only when the failing case's message names an assertion failure. Rule every claim.

1. **The rule.** `src/styles/components/_fade.scss` writes the `.fade` opacity transition as
   `opacity var(--vn-motion-feedback) var(--vn-ease-out)` through the `transition` mixin, keeps its reduced-motion twin,
   and changes nothing else; `--vn-ease-out` is Elements' ease-out curve as the motion verdict names it.
2. **The reader.** `sampleTransition` in `tests/setupBrowser.ts` returns the `CSSTransition` whose `transitionProperty`
   is the named property, its duration and easing from `effect.getTiming()`, and the computed value at `currentTime` `0`
   and at the delay plus half the duration, leaving the transition paused there; it returns `undefined` when no
   transition runs on that property and throws on a transition with no effect, duration, or easing. Its proof in
   `tests/setupBrowser.test.ts` fails under each named mutation (the midpoint without the delay; the first transition
   instead of the named one), and its control, the same change under `transition: none`, reads `undefined`.
3. **The fade proof reads the rendered motion.** `tests/src/styles/components/fade.test.ts` drives the real class
   change in both directions and asserts, through `sampleTransition`, the property, a duration equal to the resolved
   `--vn-motion-feedback`, the easing `ease-out`, each direction's start value, and a midpoint strictly between the
   endpoints and past the linear halfway value; at a motion factor of `2` the duration doubles, at `0` no transition
   runs, and under the reduced-motion preference none runs.
4. **Failing first, mutations.** The fade proof read red at the base with the rule on `linear` and green after; writing
   `linear` back fails it with an assertion and fails the ledger's stale-departure case naming the fade row; writing the
   duration as the `0.15s` literal fails the factor case with an assertion.
5. **The record.** The `.fade` row in § Departures' `transition` table reads
   `opacity var(--vn-motion-feedback) var(--vn-ease-out)` in its Veneer cell and stays `tokenized`, the ledger reads green,
   and § Fade classes states the easing, what it replaces, and the zero-factor behaviour, true of the shipped rule.
6. **Scope and law.** The diff changes only the five owned files; the one edit to an existing case (the export list in
   `exports the showcase mount, …`) is the entry `sampleTransition` makes false; the diff adds no `any`, prohibited
   assertion, non-null assertion, suppression, nested function declaration, hidden helper, mock, fake clock, or fake
   animation; `TransitionSample` members are readonly single words; every title states what its case proves.
7. **Gates.** Every gate in the brief's Execution step 4 exits 0 in `mfade-instruments/logs/`; the first `test:setup`
   run's red is timeouts in files the unit did not touch, and the re-run reads `Tests 321 passed (321)`.
