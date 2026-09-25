# STATES audit round 2: subjective lane verdict

**Lane and engine:** I ran the subjective lane as `reviewer` on Opus 5.5, in a clean context. I read the diff, the status, the round 2 logs, the D52 ruling, and the worktree `/home/user/veneer-sts`. I ran nothing and edited nothing.

## Verdicts

1. **CONFIRMED.** The declaration readings are back.
   - **Where:** `/home/user/veneer-sts/tests/src/styles/components/form-range.test.ts:384-385` asserts `transition-property` is `none` and `transition-duration` is `0s`. The rendered readings sit beside them at `:353-360`.
   - **Mutation:** the `twin-other` plant, a gated `transition: box-shadow 7.5s ease` (`sts-instruments/r2/sts-2-plant-twin-other.log.txt:1-25`).
   - **Distinguishes:** yes. The failure is `AssertionError: expected 'box-shadow' to be 'none'` at `:384:63` (log `:52-57`). That line runs after the rendered `toEqual` at `:353-360` and the longhand filter at `:380`, so both of those passed under the plant. Restore evidence: `cmp` exit 0 and an empty `git diff --stat -- src` (log `:74-79`).

2. **CONFIRMED.** The moving frame is the frame asserted on.
   - **Where:** `form-range.test.ts:323-335`. Each call to the producer takes one `page.screenshot` and measures that frame against `started` and `held`. The predicate at `:333` requires both measurements to equal `1`, which means every centre pixel differs.
   - **Installed behaviour:** `retryUntil` returns the value it accepted (`node_modules/@orkestrel/test/dist/src/core/index.js:354`; declaration `index.d.ts:537`).
   - **Asserted readings:** `:356` reads `moving.started`, `moving.held`, and a fresh `measureDifference` of `moving.frame` against `rest`. No screenshot is taken between acceptance and those readings.
   - **Mutation:** take a second shot after acceptance, which was the round 1 shape. The assertions cannot tell that mutation apart on an idle host. The property holds by construction, not by an assertion, and this claim states it that way.
   - **If the transition ends between tries:** the predicate never accepts, and the case fails with the retry's own refusal rather than a wrong reading.

3. **CONFIRMED.** No listed animation.
   - **Where:** `form-range.test.ts:339` asserts `expect(document.getAnimations()).toEqual([])`. It runs after the moving frame is accepted and before `releasePointer` at `:340`. The comment at `:336-338` names what the assertion reports.
   - **Guide:** `/home/user/veneer-sts/guides/veneer.md:4245` rests on that assertion.
   - **Mutation:** an engine that lists the thumb's `CSSTransition`. A non-empty array fails `toEqual([])`. The frame accepted just before shows a transition is running at that moment, so the empty reading is not an idle-state reading.
   - **Limit:** no executed control exists, because the failing state is an engine change and cannot be planted here.

4. **CONFIRMED.** The gauge sentence is gone.
   - The Disabled bullet ends at "fills that gauge's thumb with `--bs-secondary-color`." (`guides/veneer.md:4242-4244`).
   - The round 1 sentence ("The gauge is a thumb rather than a box…", `sts.diff:31-33`) is gone.
   - Its rationale is in the case comment at `form-range.test.ts:224-227`.

5. **CONFIRMED.** There is one centre helper.
   - **Helper:** `/home/user/veneer-sts/tests/setupBrowser.ts:278-286` builds on `readRegion` (`:246-256`) and passes `frame` through unchanged. It returns a `size` square centred on the subject's box.
   - **Proof:** `tests/setupBrowser.test.ts:553-582` places the subject at 130,60 in a 200x100 frame, away from the frame's centre.
   - **Mutation "frame's centre":** `centre` would equal the control and fail `:566`, and the paint reading would become `[1, 1]` and fail `:578-581`.
   - **Mutation "subject's origin":** the arithmetic fails at `:566`, and a 128..132 square straddles white and red, so its variation is not `0`.
   - **Mutation "size offset dropped":** the arithmetic catches it.
   - **Export list:** `readCentre` is at `:954`.
   - **Adoption:** form-range calls it at `:202`, `:247`, and `:309`. A grep of `tests/src/styles/` for `width / 2`, `height / 2`, `width: 4`, and `readRegion(` finds only point hit tests and geometry comparisons in CSS pixels (pagination, nav, button-group, carousel, modal, alert). The only `readRegion` call is an origin read in `object-fit.test.ts:53`. None of these is a box-centred `FrameRegion`.

6. **CONFIRMED.** The integration read is a different calculation.
   - **Where:** `tests/app/browser/integration.test.ts:2246`, `:2252`, and `:2262-2267`. The case decodes each element shot whole and reads the pixel at `floor(height / 2), floor(width / 2)`. It takes no box, so the read does not depend on scale.
   - **Staging:** the pane is not staged before either shot inside `FRAMES.lift`.
   - **Scale:** the probe log (`sts-2-probe-unstaged-scale.log.txt:16-18`) shows a 200x24 box decoded at 77x10, 20x3, and 81x10. `readCentre`'s box coordinates would therefore sit off the pixels.
   - **Coverage:** the probe ran in the styles project, not the app project. It corroborates why `readCentre` cannot serve the read; the scale independence holds by construction.

7. **BROKEN.** The guide's transition bullet overstates what the gated rule declares.
   - **Guide:** `guides/veneer.md:4249-4251` says the gated rule "declares `transition-property: none` and a `0s` duration and nothing else".
   - **Built cascade:** `/home/user/veneer-sts/dist/src/styles/index.css` declares `@media (prefers-reduced-motion:reduce){.form-range::-webkit-slider-thumb{transition:none}}`, from the mixin at `src/styles/_mixins.scss:357-361`. That shorthand expands to `transition-property: none`, `transition-duration: 0s`, `transition-timing-function: ease`, `transition-delay: 0s`, and `transition-behavior: normal`.
   - **The proof agrees with the cascade, not the guide.** Its filter at `form-range.test.ts:380` admits every `transition-*` longhand. It asserts "no property outside the transition", not "nothing beyond those two". Round 1's deleted comment said the same thing ("The shorthand arrives expanded", `sts-2.diff:421-423`).
   - **Why it matters:** the sentence names longhands and then claims there are no others. Round 1's wording ("declares nothing beyond the transition", `sts.diff:38-39`) was true, and round 2 replaced it with a stronger claim that nothing checks. The trailing "which refuses…" also attaches grammatically to "nothing else".
   - **Fix:** rewrite `guides/veneer.md:4249-4251` to say "The frames read the fill alone, so the gated rule is read as well: it declares `transition: none` and no other property, and its `transition-property: none` refuses a transition surviving on another thumb property." This matches all three declaration assertions at `:380`, `:384`, and `:385`.

8. **CONFIRMED.** Every gate log ends in `exit=0`:
   - check: `sts-2-check.log.txt:29`
   - lint: `sts-2-lint.log.txt:5`
   - format, "5 files": `sts-2-format.log.txt:4-5`
   - styles, 98 passed: `sts-2-styles.log.txt:163,167`
   - setup:browser, 89 passed: `sts-2-setup-browser.log.txt:6,10`
   - guides: `sts-2-guides.log.txt:15`
   - policy, 109 passed and 1 skipped: `sts-2-policy.log.txt:11,15`

   The runner is `sts-2-gates.sh:6-30`. See referral R2 on how the styles exit is captured.

9. **CONFIRMED.** Scope and law hold.
   - **Scope:** `sts-2-status.txt:1-5` lists exactly the five named files. The plant log's `git diff --stat -- src` is empty (`:78-79`).
   - **Law:** the diff adds no `any`, no `as`, no `!`, and no suppression. The only functions it adds in a body are the anonymous producer and predicate passed straight to `retryUntil`, which the law permits. It adds no hidden helper, mock, or fake clock.
   - **TSDoc:** `readCentre`'s block (`setupBrowser.ts:258-277`) mirrors `readRegion`'s voice, parameters, and staging remark.
   - **Titles:** each title states what its case proves.
     - `:553` "reads a square at an off-centre subject centre, …" is accurate but awkwardly phrased.
     - `form-range.test.ts:301` names only the rendered half. The declaration half supports it, so the title undersells the case without being false.

## Findings outside the claims

**F1. The retry's refusal hides the readings that explain it.**
- **Where:** the producer at `form-range.test.ts:326-331` returns `{ frame, started, held }` with `frame` first.
- **Installed behaviour:** on exhaustion, `retryUntil` renders the last value with `JSON.stringify` and cuts it to 197 characters (`node_modules/@orkestrel/test/dist/src/core/index.js:357`, `:366`, `:149`). So the message's "last value" is only the start of a base64 PNG.
- **Why it matters:** the `started` and `held` readings would tell a reader whether the transition had not moved yet or had already ended. That is the distinction claim 5's repair exists to make, and the comment at `:318-319` presents the refusal as the diagnostic.
- **Fix:** return `{ started, held, frame }` so the two readings come before the frame and fit inside the cut. Nothing else changes.
- **Bound:** the refusal still fails the case and still names the operation through its description. Only the diagnostic is lost.

## Attacked and held

- **Claim 1:** I checked whether the plant's kill could come from the longhand filter rather than the new readings. The filter at `:380` passes `transition-*` names, so the plant's `box-shadow` twin passes it, and the kill lands at `:384`.
- **Claim 2:** I checked whether a completed transition could still be accepted. `held === 1` rejects any frame whose centre matches the held fill at even one pixel.
- **Claim 5:** I checked the page-frame form. `:569-574` adds the scroll offsets, the same as `readRegion`'s own proof at `:546-551`.
- **Claim 6:** I checked whether this is a duplicate that D52 excused. It is not: the integration read works on the decoded image's own dimensions, and `readCentre` works on the element's box. The two agree only on a staged pane with `frame` set to the subject.
- **Spelling:** `centre` in an exported name matches the installed `@orkestrel/test` prose ("the centre mapped through the tester iframe", `browser/index.d.ts:1075`) and the guide.
- **D45 (serialization):** `getPropertyValue('transition-duration')` reading `'0s'` is a declared longhand of `transition: none`, not a computed-value string from one build.

## Referrals to the objective lane (GPT-6 Astra)

- **R1:** `tests/setupBrowser.test.ts:566-574` compares `140 * ratio - 2` by `toStrictEqual` against `(130 * ratio) + (20 * ratio) / 2 - 2`, which `readCentre` computes through `readRegion`. At a non-integer `devicePixelRatio` the two floating-point results can differ in the last bit. Please confirm the host's ratio, and whether the proof needs to hold at any other ratio.
- **R2:** `sts-2-gates.sh:17-21` records `PIPESTATUS[0]` of a `{ build; vitest; }` group, which is the vitest exit alone. A failed `build:src:styles` would be hidden, and vitest would run against the previous `dist/`. Please rule on whether claim 8's styles reading is authoritative.

VERDICT: FAIL 7; outside the claims: F1
