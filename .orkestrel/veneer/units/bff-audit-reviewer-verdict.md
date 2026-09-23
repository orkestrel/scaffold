# `reviewer` verdict — B-FORMS-CLOSE-FORCED (`bff`), subjective lane (Opus 5.5, agent a6b833f04635a40d0)

Retained verbatim from the lane's returned message.

---

# B-FORMS-CLOSE-FORCED (`bff`): `reviewer` verdict, subjective lane

- **Lane and engine:** I held the subjective lane on Opus 5.5, as a native clean-context subagent.
- **Evidence read:**
  - the claims file `/home/user/scaffold/.orkestrel/veneer/units/bff-audit-claims.md`
  - `bff.diff`, `bff-status.txt`, `bff-button-compile.log.txt`, and `bff-probe-mutations.log.txt`
  - the brief `b-forms-close-forced-brief.md` and the report `b-forms-close-forced-report.md`
  - the design verdict's rulings R2, R3, R3a, R3b, R8, R11, and R12
  - the worktree `/home/user/veneer-bff`
- **What I ran:** nothing. This lane has only `Read`, `Grep`, and `Glob`, so every ruling rests on reading the source and the diff. Where the only evidence is the writer's probe log, I say so and refer it.

## Numbered verdicts

1. **CONFIRMED.** The status the Orchestrator supplied (`bff-status.txt:1-13`) lists exactly these files: `guides/veneer.md`, `src/styles/_mixins.scss`, the five forms partials, their five proofs, and `tests/src/styles/mixins.test.ts`.
   - Attack: I searched the status and the diff headers for any path outside that set. None appears. `tests/setupStyles.ts`, `tests/setupServer.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `app/**`, the passive partials, and `tests/fixtures/**` are absent.

2. **CONFIRMED.** At `/home/user/veneer-bff/src/styles/_mixins.scss:188-193`, `forced-ring($width: var(--vn-focus-width), $highlight: var(--vn-focus-highlight))` emits `@include forced-colors { outline: $width solid $highlight; @content; }`. At `:204-206`, `focus-ring` includes it with `box-shadow: $reset` as its content.
   - Attack: could the button's compiled output change? The arguments pass by position in the declared order. The content block is lexically scoped, so `$reset` still resolves in `focus-ring`. The expansion is therefore `@media (forced-colors: active) { outline: …; box-shadow: $reset }`, which is text-identical to the removed inline branch (`bff.diff:534-538`). No `.btn*` or `button` block can move.
   - Fit: the name follows the siblings `forced-colors` and `focus-ring`, and the mixin sits between them in the file. It has five includers (`focus-ring` and the four forms rules), so it passes the two-partial threshold in `styles.md`.
   - The mutation sub-clause (a second media block is caught by the expanded comparison and not by the shipped bytes) rests only on the writer's log. I refer it to the objective lane (Referral A).

3. **CONFIRMED.** Evidence, all in `bff.diff`:
   - `:551-556`, `:570-577`, `:590-593`, and `:607-612`: each forms `:focus` rule keeps its `outline: 0` (and, where it has one, its shadow) and adds `@include forced-ring;`.
   - The `_form-control.scss` hunk (`:563-577`) leaves `.form-control-plaintext:focus` alone.
   - No forms rule authors a `box-shadow` reset.
   - Attack: could the compile delta be wider? The only other SCSS edits are the mixin refactor, which expands identically (claim 2), and the width `@each` at `bff.diff:626-629`, which emits two selector-list rules. So the source cannot produce more than four forced-colours outline blocks and two width rules. That matches Step 4 of the log (`bff-button-compile.log.txt:26-33`).

4. **CONFIRMED.** `_validation.scss` writes `width: calc(var(--vn-space-24) + calc(1.5em + 0.75rem))` for all four selectors (`bff.diff:626-629`). The comments on both `81` expectations name the token (`bff.diff:779`, `:815`).
   - Case: 'widens the $state swatch by the same icon room at any density and under a direct space override' (`validation.test.ts:~402`).
   - Mutation: revert to the `3rem` literal. The assertions distinguish it at density 2 (stated 84 minus resting 96 is −12, not 36) and under the override (84 minus 64 is 20, not 36).
   - Density 1 alone would not distinguish it, because 84 − 48 = 36 under the literal as well. The case does not rely on density 1 alone.
   - The claim's words "on the class and the scoped native-validity forms" say more than R2 asks, and more than the proof does: only the class form gets the difference readings (see Attacked and held).

5. **BROKEN.** The case titles are not named for what they prove.
   - **Where:**
     - `/home/user/veneer-bff/tests/src/styles/components/form-control.test.ts:317`
     - `form-select.test.ts:373`
     - `form-check.test.ts:342`
     - `form-range.test.ts:106`
     - `validation.test.ts:379`
   - **What is wrong:** each title asserts the outline is "in the system highlight" (or is "the system-highlight outline"). No assertion reads the outline's colour. Each case's own comment says the outline "is read by its style and its width rather than by its paint" (for example `form-check.test.ts:351`).
   - **Mutation not distinguished:** change `forced-ring`'s `$highlight` default to `CanvasText` or `var(--vn-focus-color)`. Every case stays green while its title says the colour is pinned.
   - **Mutations that are distinguished**, from reading the assertions:
     - Remove one `@include forced-ring`: that control reads `none` under forced colours instead of `solid`.
     - Hoist the outline out of the media block: the resting reading becomes `solid` instead of `none`.
     - Add `outline: 0` to `.form-control.is-invalid:focus`: specificity (0,3,0) beats (0,2,0) in the same layer, so the validated case reads `none` instead of `solid`.
   - **Width binding:** only `form-control.test.ts` retunes the token (`:337-342`). The other cases compare against a gauge, so a literal written at a single forms include site would pass everywhere except the text control. That coverage is acceptable because all the rules share one mixin default.
   - **Why it matters:** a title that claims a property its assertions cannot fail on reads exactly like a real proof of that property. The brief's example title (`b-forms-close-forced-brief.md:174`) is where the phrase came from.
   - **What right looks like:** take one of two fixes, depending on Referral B.
     - Add a colour reading under the staged media: `expect(readStyle(control, 'outline-color')).toBe(readStyle(gauge, 'color'))`, with the gauge carrying `color: var(--vn-focus-highlight)`.
     - Or retitle all five cases without the colour, for example 'draws a solid outline at the focus width on the focused control under forced colors, where its shadow ring is not painted'.

6. **CONFIRMED.** At `bff.diff:888-913`, the `sendProtocol` import and the "no forced-colors axis" explanation are gone. The case stages with `stageMedia({ forced: true })` and restores with `releaseMedia()`.
   - Mutation: make staging a no-op. The `not.toBe(resting)` assertion (`:911`) fails, so it is distinguished.
   - Mutation: make the release a no-op. The `toBe(resting)` assertion (`:914`) fails, so it is distinguished.

7. **BROKEN.** Several changed sentences break `writing.md`, and one describes the proofs as reading more than they read. The following items are wrong:
   - **Bare code token:** `/home/user/veneer-bff/guides/veneer.md:2070` reads "rules include `forced-ring` beside the shadow ring…". The code token has no noun after it, which `writing.md` § Code tokens forbids, and claim 7 names this rule. It should read "include the `forced-ring` mixin beside…". Line 1215 has the same pattern ("the release's `outline: 0` with no ring"); write "the release's `outline: 0` declaration".
   - **Overclaim in § Compatibility:** `guides/veneer.md:3668-3670` says "the forms proofs read under it the system-highlight outline each focused … control … draws". The proofs read the outline's style and width, not its colour (claim 5). It should read "the forms proofs read under it the outline's style and width on each focused text control, select, check, and range".
   - **Plaintext sentence:** `guides/veneer.md:1215-1217` carries three ideas in one sentence, and "it" can attach to either "the plaintext form" or "its focus rule". Split it: "The plaintext form's focus rule writes the release's `outline: 0` declaration and no ring. The plaintext form therefore draws no focus indicator in any mode, so forced colors remove nothing there and the rule includes no outline."
   - **What holds:**
     - the four width cells and their `tokenized` departures (`:3168-3190`)
     - the width bullet and the § Form control classes sentence on the resting and validated widths retuning together (`:803-808`, `:1224-1225`)
     - the `focus-ring` paragraph, which names `forced-ring` and its forms callers
     - a forced-colours sentence in each of the four forms sections
     - the four Additions rows in the `btn` rows' voice (`:3616-3619`)
     - the plaintext limit (R3a)
     - the § Compatibility statement of the installed axis, as the brief requires
     - no count and no banned term in the changed sentences
     - realigned Additions rows that keep their cell text: I spot-checked the reboot, btn, and table rows; the checker owns the full equality check.

8. **CONFIRMED** for the parts this lane can read. I found none of the following in the diff:
   - any `any`
   - any `as`: the generics on `querySelector<HTMLInputElement>` are type arguments, not `as`
   - any `!`
   - any suppression
   - any nested function other than callbacks passed directly to `it`/`it.each`
   - any helper that rewrites an installed export: the cases call `stageMedia`, `releaseMedia`, `readStyle`, `readPixels`, and `traverseAccessible`
   - Off-limits files are untouched, per claim 1.
   - The styles follow `styles.md`: one mixin in `_mixins.scss`, the components layer, no per-variant block repeated.
   - The `npm run check` exit code belongs to the objective lane by the claim's own text (Referral D). This lane holds no verdict on it.

## Findings outside the claims

- **F1: § Validation classes proof paragraph is out of date.**
  - **Where:** `/home/user/veneer-bff/guides/veneer.md:810-815`.
  - **What is wrong:** the paragraph lists what `validation.test.ts` reads. The unit added two readings to that file and left the list unchanged:
    - the forced-colours outline on a focused validated control (`validation.test.ts:~379`)
    - the density and override width readings (`~402`)

    Each sibling section's proof paragraph was updated for its new case (`:1080`, `:1158-1159`, `:1248-1250`, `:1307`).
  - **Why it matters:** `documentation.md` requires re-reading the prose against what shipped. A reader of § Validation classes finds no proof behind "the resting and validated widths therefore retune together" (`:806-807`).
  - **What right looks like:** add one clause to the list, for example: "…the stacking an input-group child takes, the outline a focused validated control keeps under staged forced colors, and the validated color control's width against the resting one at a doubled density and under a direct `--vn-space-24` override."
- **F2: the `forced-ring` doc comment misstates what the mixin does and possessivizes a code token.**
  - **Where:** `/home/user/veneer-bff/src/styles/_mixins.scss:184-187`.
  - **What is wrong:**
    - "`focus-ring`'s shadow reset" possessivizes a code token, which `writing.md` § Code tokens forbids. It is the only such occurrence under `src/`.
    - "Emits the focus indicator a shadow ring keeps under forced colors" says the shadow ring keeps something under forced colors. It keeps nothing there; the mixin supplies the replacement.
  - **What right looks like:** "Emits the outline a focused control draws in place of its shadow ring under forced colors, in the system highlight, because forced colors paint no `box-shadow`. A caller includes it beside its shadow. Content passed to it, such as the shadow reset the `focus-ring` mixin passes, lands in the same media block after the outline."

## Unknowns ruled

- **Second-media-block mutation:** no committed test is owed, and no carrier is needed. The mutation changes no shipped byte and no ledger row, because the ledger keys on selector, property, and condition, so it does not reach a consumer.
  - A committed byte comparison against a frozen baseline would go red on every intended button change. It checks that this refactor changed nothing; it does not guard a behaviour.
  - The behaviour it protects, the button's forced-colours outline and shadow reset, is already pinned by the `btn` Additions rows under `@media (forced-colors: active)` (`guides/veneer.md:3554-3569`). The conformance gate compares the cascade against those rows.
  - The retained probe is sufficient acceptance evidence. How `quality.md` § Instruments ("adopt an instrument … as a test") applies here is for the objective lane to rule (Referral A).
- **The forced-reading sequence repeated in the five proof files:** this is not a near-duplicate helper. The repeated part is test registration plus `expect` calls, which `tests.md` keeps out of `setup*.ts`.
  - The only piece that could be extracted is a reader that stages forced colours and returns `{ style, width }`. Extracting it here would hide the rest, forced, and released readings each case exists to show.
  - Proposed carrier for re-evaluation: B-PASSIVE-CLOSE-B (R10). That unit adds the same reading for `.page-link`, `.btn-close`, and the button. If that third shape appears, it is the point to extract one reader into `tests/setupStyles.ts`.

## Referrals

- **A (objective lane):** reproduce the second-media-block mutation's reach with the in-memory compile. My lane's only evidence for it is the writer's log (`bff-button-compile.log.txt:37-43`, `bff-probe-mutations.log.txt:27-32`). Also rule whether `quality.md` § Instruments requires adopting the byte comparison as a test.
- **B (objective lane):** under `stageMedia({ forced: true })` in Chromium, is an author-specified system colour (`Highlight`, from `--vn-focus-highlight`, `_tokens.scss:18`) preserved in the computed `outline-color`?
  - If it is, the guide sentence "forced colors replace every color a rule writes" (`guides/veneer.md:1249-1250`) and the matching test comments (`form-control.test.ts:330`, `form-select.test.ts:382`, `form-check.test.ts:351`, `form-range.test.ts:116`, `validation.test.ts:392`) are false, and the fix for claim 5 is the colour reading.
  - If it is not, the mixin's `$highlight` parameter and every "in the system highlight" sentence overclaim.
  - The artifacts disagree with each other either way.
- **C (objective lane):** the browser density and override readings cover only the `.form-control-color.is-*` form. Confirm that the conformance ledger's compiled-value cells for `.was-validated .form-control-color:valid` and `:invalid` pin the token binding on the scoped form.
- **D (objective lane):** the `npm run check` exit code for claim 8.
- **E (Orchestrator):** `guides/veneer.md:3670` names the internal unit label B-PASSIVE-CLOSE-B in the product guide, and "until it lands" promises future work, with an ambiguous "it". The brief (criterion 7) and claim 7 require the label, and line 67 already names B-COLLAPSE, so I rule no defect. The sentence becomes false when that unit lands. Put the rewrite of this sentence into B-PASSIVE-CLOSE-B's brief.

## Attacked and held

- **Claim 4, scoped form:** the scoped `.was-validated .form-control-color:invalid` form is now reachable through `setCustomValidity` (`bff.diff:799-806`). It gets only the density-1 `81` reading, which the `3rem` mutation cannot break. That is adequate because the class and scoped selectors share one declaration in one selector list. The only way to make them diverge is to split the rule, which Referral C covers.
- **Claim 5, test design:** the `validation.test.ts` forced case drives focus with `traverseAccessible`, while the file's older ring cases use `focus()` and an arrow key. The departure follows the brief's "drives keyboard focus" and is internally consistent.
- **Claim 5, gauges:** each gauge follows its own file's convention: `TOKEN_NAMES` in `form-check`, `form-control`, and `form-range`, and the literal `var(--vn-focus-width)` in `form-select` and `validation`. This is consistent within each file, not drift.
- **Claim 7, section placement:** each forced-colours sentence sits after the departures list and before the paragraph on values with no departure. That placement fits a Veneer addition, which is not a departure.

VERDICT: FAIL 5, 7; outside the claims: F1, F2
