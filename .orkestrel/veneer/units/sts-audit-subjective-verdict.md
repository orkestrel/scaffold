# STATES audit: subjective lane verdict (`reviewer`, Opus 5.5)

I held the subjective lane: whether each proof is named for what it proves, design fit, the truth and voice of the guide and the case comments, and naming. I ran nothing. Every reading comes from the supplied diff, the status output, the logs, and the worktree `/home/user/veneer-sts`.

Every numbered claim holds. The round still fails, because three findings outside the claims are substantiated.

## Numbered verdicts

**1. Press is read from paint: CONFIRMED.**
- **What the case does:** it sets the factor to `0` (`form-range.test.ts:202`), drives a trusted hold (`holdAccessible` at :207), and asserts `[:active, value]` equals `[true, '50']` (:208).
- **What it reads:** it measures the centre against four references (:216-221):
  - the resting shot against the rest gauge;
  - the held shot against the `color-mix` gauge (:185);
  - the held shot against the literal `rgb(182, 212, 254)`;
  - the held shot against the resting fill.
- **Mutation:** the held mix goes from 30% to 60%. The assertion tells this apart from the passing case. `sts-plant-held-mix.log.txt:50` reads `AssertionError: expected [ +0, 1, 1, 1 ] to deeply equal [ +0, +0, +0, 1 ]`.
- **Controls:** a centre off the thumb would fail the resting reading. Removing the `:active` rule entirely would fail both held readings.
- **Design fit:** the literal gives an expectation derived independently of Veneer, as the tenet asks. The gauge follows a token retune.

**2. Disabled is read from paint and hit testing: CONFIRMED.**
- **Pointer and hit test:** `pointer-events` reads `auto` on the enabled host and `none` on the disabled one (`form-range.test.ts:239-242`). `readHit` lands on the enabled host and on the wrapper for the disabled host (:245-246).
- **Paint:** the disabled centre is a flat fill, equals the thumb-shaped gauge, and the enabled thumb differs from the gauge (:256-260). The gauge's thumb is filled by a sheet loaded before mount (:229-233).
- **Mutation:** the disabled fill token changes to `--bs-tertiary-color`. The assertion tells it apart: `sts-plant-disabled-token.log.txt:46` reads `expected [ +0, 1, 1 ] to deeply equal [ +0, +0, 1 ]`.
- **Unplanted mutation:** deleting `pointer-events: none` would fail both the style reading and the hit test. A disabled input still hit-tests, so `readHit` would return the control itself.

**3. The transition is read from paint: CONFIRMED.**
- **Mutation:** the thumb's `@include transition(...)` becomes a bare `transition:`, which drops the twin. The assertion tells it apart: `sts-plant-motion-twin.log.txt:64-82` shows `settled` 0→1 and `collapsed` 0→1.
  - `collapsed` is the reliable kill: a 7.5s forward transition is shot at once.
- **Kept declaration readings** (:363-378):
  - the thumb's only media gate is `REDUCED_MOTION`;
  - the twin declares only `transition-*` longhands.
  - Frames at the default media and at a 4×4 centre cannot show either fact.
- **Dropped readings, and what now covers them:**
  - `transition-property: none` and `0s`, and the staged `matchMedia` flip, are covered by the rendered collapse. A twin declaring a duration would fail `collapsed`. A stage that did nothing would fail it too.
  - The motion-token binding is still pinned declaratively: the `FORM_RANGE_CASES` resting-thumb row reads `--vn-motion-feedback` on `transition` (`setupStyles.ts:5255-5260`), and the part-rules case asserts it (:275-286). The factor-0 and factor-50 frames also exercise it.
- **The tenet audit's gap is closed on the press path.** That gap was "a more specific reduced-motion rule goes unseen." Under the preference, a more specific `:active` or `:focus` thumb rule that keeps a transition would fail `collapsed`.

**4. The disabled link button: CONFIRMED.**
- **What the case reads:** colour against the `--vn-text-secondary` gauge, opacity against `String(Number(readToken(..., button.opacity)))`, `pointer-events`, and `readHit`. It reads all four on the enabled control, `<button disabled>`, and `<a class="disabled">` (`button.test.ts:382-405`).
- **Mutation:** delete `opacity: var(--bs-btn-disabled-opacity)` from the `.btn:disabled` group. The assertion tells it apart: `sts-plant-button-opacity.log.txt:50-65` shows `"0.65"` → `"1"`.
- **Only the anchor row carries the kill.** The diff has one hunk at printed line 60, which is the third object. The `<button disabled>` row keeps `0.65` because `src/styles/elements/_button.scss:60-65` also dims a disabled `button`. `.btn` does not include the `button-reboot` mixin, so nothing reverts that rule.
  - This is true of the rendered result, so the claim holds.

**5. No fake motion: CONFIRMED.**
- **Motion changes:** only the published factor (`form-range.test.ts:202, 311, 321`) and `stageMedia` (:337) change motion.
- **No fakes:** there is no fake clock, mock, or stub.
- **Teardown:** `afterEach` releases the pointer, the pane, the media, and the factor (:37-43).
- **Waiting:** the wait is `waitForCondition` on a pixel change (:324-332), not a delay. The only bound tied to elapsed time is the 7.5s window before `moving` would reach `held`. That is wide against the 1222 ms idle run (`sts-styles.log.txt:49`), and the run under load passed (`sts-styles-project.log.txt:2908-2913`).

**6. The prose: CONFIRMED.**
- The Held, Disabled, and Transition bullets (`guides/veneer.md:4237-4252`) each describe what the matching case reads, as verified under claims 1 to 3.
- `driveHold` (:4234) is accurate for `holdAccessible`, whose declaration states "The hold itself is {@link driveHold}".
- The sentences that state host behaviour no case checks are findings F1 and F2, not falsifications of "how each state is read".

**7. Scope, law, and gates: CONFIRMED.**
- **Scope:** `sts-status.txt` lists only the three owned files.
- **Law:** the diff has no `any`, no `as`, no `!`, and no suppression. Its callbacks are anonymous arguments. It adds no module helper.
- **Titles:** each title states what its case proves.
- **Gates:** each exits 0:
  - `sts-check.log.txt:29`
  - `sts-lint.log.txt:5`
  - `sts-styles.log.txt:163-168` (98 passed, with all four titles at :46, :47, :49, and :156)
  - `sts-guides.log.txt:10-15`
  - `sts-policy.log.txt:10-15`
- The line numbers in the plant logs (183, 224, 303, 358, 382) match the audited tree.

## Findings outside the claims

**F1. The guide states the `getAnimations` limit, and no assertion checks it.**
- **Where:** `guides/veneer.md:4247` says "Chromium lists no animation for the thumb in `document.getAnimations()`". The case repeats it only as a comment (`form-range.test.ts:317-318`). A search of `tests/` finds no thumb `getAnimations` assertion.
- **What is wrong:** `.claude/rules/documentation.md` requires an executed assertion behind a prose claim about behaviour. This file already pins its other host limits: `readRing` undefined (:104), the Gecko discard (:287-295), and the part style (:296-300).
- **Why it matters:**
  - The carrier (`tenets-styles-audit-verdict.md:60-62`) asked for the reading from the document's animations. If Chromium starts listing the thumb transition, nothing reports that the preferred reading became available.
  - The only evidence for the sentence is the writer's report.
- **What right looks like:**
  - Add `expect(document.getAnimations()).toEqual([])` while the hold lasts after the `moving` shot (around :333, before `releasePointer`).
  - Add a comment in the form of :289-290: this assertion is what reports an engine that starts listing the thumb's transition, so the reading moves to the document's animations.

**F2. The guide states a rounding measurement that nothing checks, and the sentence is hard to read.**
- **Where:** `guides/veneer.md:4244-4246` says "The gauge is a thumb rather than a box because the token is translucent, and a thumb and a box round its composite over the track a channel step apart."
- **What is wrong:**
  - The only evidence is the writer's probe (`states-report.md:66`: `69,76,92` against `70,76,92`), and no test reads it. That is the same rule as F1.
  - The sentence describes how the instrument was built, not how the state is read, and it does not parse on a first reading.
- **What right looks like:** delete that sentence from the guide. Keep the rationale in the case comment (`form-range.test.ts:225-228`). The guide bullet then ends at "fills that gauge's thumb with `--bs-secondary-color`."

**F3. The centre-region literal is repeated inline, and the unit left it with no carrier.**
- **Where:** `{ x: box.width / 2 - 2, y: box.height / 2 - 2, width: 4, height: 4 }` appears after `readRegion(element, element)` at `form-range.test.ts:197-198`, :247-248, and :306-307. The report names a fourth inline centre read in `tests/app/browser/integration.test.ts` and says "no carrier is named here" (`states-report.md:114`).
- **What is wrong:**
  - `.claude/rules/tests.md:183-190` says to extract a builder as soon as it could serve another test, and to prefer factories over repeated inline setup.
  - The brief let the unit return a shared-file patch.
  - Each site also calls `readRegion` before `stagePane`, against that helper's documented remark (`setupBrowser.ts:236-237`). It is harmless here only because the box is read relative to the element itself.
- **What right looks like:**
  - Add a `tests/setupBrowser.ts` export that returns a square `FrameRegion` of a given device-pixel size at an element's centre, read after staging.
  - Prove it in `tests/setupBrowser.test.ts`.
  - Adopt it at all four sites.
  - Both setup files are report-only for this unit, so the Orchestrator names a carrier unit.

## Attacked and held

- **The disabled gauge's fairness.** I attacked whether the gauge differs from the disabled thumb in anything but the token. The track reads `--bs-secondary-bg` in both states, the disabled host carries no opacity, and the sheet loads before mount, so no transition runs. The flat centre and the enabled control rule out a reading taken off the thumb.
- **Whether the held reading is circular.** The gauge uses the same `color-mix` expression as the source, but the release literal pins the value on its own, and a colour-space mutation would fail both.
- **Stale range prose elsewhere in the guide.** `guides/veneer.md:10876-10880` says the range thumb "has no other reading". That means no reading other than the pixel read, and it remains true.

## Referrals to the objective lane

- **R1. Whether the `settled` reading can distinguish cancellation reliably.**
  - `settled` (`form-range.test.ts:338`, :355) is the only reading behind "the running transition is cancelled" (:335-336; `guides/veneer.md:4250`).
  - Without the twin, the release starts a reverse transition. The CSS Transitions reversing shortening factor makes it last about 7.5s × the progress reached at release, which here is a few percent.
  - `settled` flips only if that reverse outlasts `stageMedia` plus a screenshot. Under the plant, `returned` stayed `0` (`sts-plant-motion-twin.log.txt:78`), which fits this reading.
  - Rule whether that sentence has a kill that does not depend on timing.
- **R2. Whether the button case needs a row the element layer cannot mask.**
  - The `<button disabled>` row's opacity and `pointer-events` are also written by `src/styles/elements/_button.scss:60-65`. Only the anchor row binds the `.btn:disabled` group.
  - Rule whether the case needs a `.btn`-only kill for the button row, such as `fieldset:disabled .btn` on a `<button>` that is not itself disabled.

VERDICT: FAIL none; outside the claims: F1, F2, F3
