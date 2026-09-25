E-ID-MOTION-REDUCED audit, reviewer on Opus 5.5, subjective lane. Every file cited below is in the worktree `/home/user/veneer-mred`, uncommitted over `21c821a`, unless another path is given. Unit logs are under `/home/user/scaffold/.orkestrel/veneer/units/mred-instruments/`.

**1. CONFIRMED.** The release readings are correct.
- `node_modules/bootstrap/package.json:4` reads `5.3.8`.
- `node_modules/bootstrap/dist/css/bootstrap.css:6269-6274` sets `--bs-spinner-animation-speed: 1.5s` on `.spinner-border, .spinner-grow` under reduce.
- `bootstrap.css:4987-4991` stops `.progress-bar-animated` with `animation: none`.
- The full list of `prefers-reduced-motion: reduce` blocks in `bootstrap.css` has no `.placeholder-glow` or `.placeholder-wave` rule.
- So the four stops are departures, and the stripes are parity.

**2. CONFIRMED.** The rules are as claimed.
- `dist/src/styles/index.css` writes these four rules under reduce: `.spinner-grow,.spinner-border{animation:none}`, `.spinner-grow{opacity:1}`, `.placeholder-glow .placeholder{animation:none}`, and `.placeholder-wave{animation:none}`.
- A search for `spinner-animation-speed:1\.5s` in `dist/src/styles` returns 0 matches.
- Each rule goes through the mixin (`src/styles/_mixins.scss:351-355`; `_spinner.scss:20-22` and `:74-76`; `_placeholder.scss:39-41` and `:65-67`).
- "No `transform` needed" holds. The only scale is in the keyframe (`_spinner.scss:51-60`). The `spinner-slow` plant shows the `transform` reading fails while an animation runs (`mred-plant-spinner-slow.log.txt:175`, `matrix(0.0223347…)`).
- Design fit: each include sits in the rule that declares the animation, the same shape as `_progress.scss:75-77`. Removing the trailing `1.5s` block removes a second place that decided spinner motion. The change fits the architecture.
- Weighing "does a stopped spinner still read as pending": a still border ring with its open right edge still reads as a loading glyph. A still grow spinner is a solid, opaque disc of `currentcolor`, which on screen reads as a dot, not as a wait. The design verdict fixes opacity `1` and no scale (`/home/user/scaffold/.orkestrel/veneer/e-id-motion-design-verdict.md:30`), and the unit followed it. So this is a referral (R1), not a break.

**3. CONFIRMED.** The proofs read the rendered result.
- The mutations each reading catches, and whether it tells them apart:
  - **`getAnimations()` equals `[]`** (`spinner.test.ts:168`, `placeholder.test.ts:184`). Catches a spinner left running at any speed; `spinner-slow` fails it.
  - **Timelines read before and after the preference** (`spinner.test.ts:161-165`, `:171-175`; `placeholder.test.ts:176-182`, `:192-198`). Catches a rule that never started the animation. The empty reading between them is therefore the preference's.
  - **`opacity` `1`** (`spinner.test.ts:192`). `grow-opacity` fails it with `'0'` (`mred-plant-grow-opacity.log.txt:152`).
  - **Glow `opacity` `0.5` and wave `mask-position` `0% 0%`** (`placeholder.test.ts:188`, `:190`). Each catches a stop that parks the glow at its dim or the mask partway across. Neither catches a running animation at t≈0; the `getAnimations()` line catches that.
  - **`isRendered(label)`** (`spinner.test.ts:196`). Catches `display: none` or `visibility: hidden` under the preference. `node_modules/@orkestrel/test/dist/src/browser/index.js:319-325` calls `checkVisibility()` and reads `visibility`. No plant exercised this.
  - **`readText`** (`:197`). No cascade mutation can make it fail (R2).

**4. CONFIRMED.** Red first, and each plant kills.
- The red reading and the `base` plant each read `8 failed | 25 passed` (`mred-red.log.txt:156`, `mred-plant-base.log.txt:174`).
- `spinner-slow` fails the four stop rows with `expected [ CSSAnimation{} ] to deeply equal []`, and both grow rows on `transform` (`mred-plant-spinner-slow.log.txt:154`, `:175`, `:191`).
- `glow-drop` fails `placeholder.test.ts:184` with `[ [ CSSAnimation{} ], [] ]` (`mred-plant-glow-drop.log.txt:149`).
- `grow-opacity` fails `spinner.test.ts:192` (`mred-plant-grow-opacity.log.txt:152`).
- Every failure is an `AssertionError`, and every log ends `restore=byte-identical`.
- I read "each assertion distinguishes its plant" as each plant's failing assertion. On that reading it holds.

**5. CONFIRMED.** The ledger rows are recorded and gated.
- The two `dropped` rows sit in a `#### \`spinner\`` table at `guides/veneer.md:9534-9539`, between `row-gap` and `sticky`, in the sorted run.
- Five `declaration` rows are in § Additions at `guides/veneer.md:10230-10234`.
- The first conformance run failed the ledger cases (`mred-conformance-first.log.txt:45`, `:67`, `:92`). The final run reads `26 passed`, exit 0 (`mred-conformance.log.txt:12`, `:16`). So the gate reads the rows.

**6. BROKEN.** The spinner prose says more than the cascade and the proofs do.
- **(a) The grow spinner does not turn.**
  - `guides/veneer.md:5723` says "each spinner turns without the reduced-motion preference". `guides/veneer.md:5712` says the release "keeps it turning".
  - Input: the `spinner-grow` keyframe (`_spinner.scss:51-60`, pinned at `spinner.test.ts:211-221` as `['0%','scale(0)','']`, `['50%','none','1']`) scales and fades and never rotates.
  - The guide's own words elsewhere contradict it: "scales from nothing" (`:5708`), "the ring turns" (`:5719`), and "its dot keeps pulsing" (`:6784`).
- **(b) The wait-report sentence names no audience.**
  - `guides/veneer.md:5713-5714`: "A spinner's status role and its label are what report the wait, so a still spinner still reports that work is running."
  - Input: `<div class="spinner-grow" role="status"><span class="visually-hidden">Loading...</span></div>` under reduce, seen by a sighted reader with no assistive technology. The proof's own readings show a whole, opaque, still disc (`spinner.test.ts:192-195`). The label is visually hidden and paints nothing, so nothing on screen reports the wait.
  - The role and label report the wait only through the accessibility tree. The case comment says this correctly: "through the text a reader hears" (`spinner.test.ts:181-182`). The guide states it without that limit, so it hides the departure's visual cost. The same claim appears in `_spinner.scss:18-19` ("keeps saying that work is running").
- **Also:** the `spinner-grow` cell at `guides/veneer.md:6784` calls one shape "the disc" and then "its dot".
- **What right looks like:**
  - At `:5712`, write "keeps each one moving". At `:5723`, write "each spinner runs its animation without the reduced-motion preference and stands still under it".
  - Replace `:5713-5714` with: "A spinner's status role and its label report the wait to assistive technology, so there a still spinner loses only its motion; on screen the border spinner rests as an open ring and the grow spinner as a whole disc."
  - Word `_spinner.scss:18-19` the same way.
  - Write "disc" for both sides of the `:6784` cell.
- The placeholder bullet (`:5860-5863`), the Keyframes introduction and rows (`:6773-6786`), and both § Compatibility rows are true, and each names the release's treatment plainly.

**7. UNRESOLVED.** No run has checked the app journeys.
- My source reading supports the claim:
  - `tests/src/browser/**` has no match for `spinner|placeholder-(glow|wave)`.
  - The grow-spinner journey stages no media (`tests/app/browser/integration.test.ts:1571-1637`).
  - The cascade-keys journey compares the specimen and its lifted copy under the same media, with no media staged (`:723-769`).
  - `afterEach` releases media (`:221-233`).
- The last clause, "leaves their readings as they were", is a behavioural claim. The unit states it did not run the app project (`e-id-motion-reduced-report.md:185-187`). A host run of the app browser project settles it (R3).

**8. CONFIRMED.** The gates exited 0.
- The format, lint, check, conformance, guides, and policy logs each end `exit=0` (`mred-format.log.txt:6`, `mred-lint.log.txt:6`, `mred-check.log.txt:30`, `mred-conformance.log.txt:16`, `mred-guides.log.txt:16`, `mred-policy.log.txt:16`).
- The styles project reads `Tests  1507 passed (1507)` with exit 0 (`mred-styles.log.txt:8201`, `:8205`).

**9. BROKEN.** Three case titles do not state what the case proves. Scope and law otherwise hold.
- **The placeholder "gates" title claims both animations are gated.**
  - `placeholder.test.ts:250` is titled "gates its animations on the reduced-motion preference and nothing on a width boundary".
  - Input: the `glow-drop` plant, which leaves the glow's animation ungated. This case passed under it; only the stop case failed (`mred-plant-glow-drop.log.txt:144`, `:174`, `1 failed`).
  - The set comparison at `:264` proves only that every condition this family writes is the reduced-motion query.
- **The spinner "gates" title states half its proof.**
  - `spinner.test.ts:282` is titled "gates nothing on a width boundary". The comment the diff edited (`:279-281`) and the assertion at `:298` also catch a partial that writes no reduced-motion rule.
  - Removing every reduced-motion include would fail a case whose title names a property that was never broken.
- **The spinner stop title says "turns" for the grow rows.**
  - `spinner.test.ts:152` reads "stops $name … and turns it again without it", which runs for the `spinner-grow` rows. That spinner never turns, as in 6(a).
- **What right looks like:**
  - Give both gates cases one title: "gates this family on the reduced-motion preference alone".
  - Retitle `:152` to "stops $name under the reduced-motion preference and runs it again without it".
- **The rest of the claim holds:**
  - `mred-status.txt` lists only the five owned files.
  - `mred-build-entries.log.txt:10`, `:16`, `:35` write only relative `dist/src/**` paths.
  - The diff adds no `any`, `as`, non-null assertion, suppression, nested declaration, hidden helper, mock, or fake.

**Findings outside the claims:** none.

**Attacked and held:**
- A running glow or wave at t≈0 reads opacity near `0.5` and mask position near `0% 0%`, which looks like a weak proof. It is correct: the `getAnimations()` assertion beside those readings is what catches a running animation, and the `glow-drop` log shows it.
- The spinner gates comment (`spinner.test.ts:283-284`) credits the release for the grouped selector list. The cascade now writes its own grouped list, `.spinner-grow,.spinner-border{animation:none}`, so walking the list is still needed and the reading is correct.
- `_placeholder.scss` gains `@use '../mixins' as *`, the loading form `.claude/rules/styles.md` prescribes.
- The whole-disc rest state matches the showcase's photographed grow frame, which is held at the keyframe where opacity is `1` and there is no transform (`tests/app/browser/integration.test.ts:1603-1633`). The verdict's choice agrees with the captured specimen.

**Referrals:**
- **R1, to the Orchestrator (design).** The verdict fixes a whole, opaque disc as the grow spinner's reduced-motion state. On screen that reads as a dot rather than a wait. The alternative is to rest the disc at the placeholder family's half strength, which already reads as a stand-in in this cascade (`placeholder.test.ts:188`). That would need a verdict amendment, and I give no verdict on it.
- **R2, to the objective lane.** `expect(readText(spinner)).toBe('Loading...')` (`spinner.test.ts:197`) cannot fail under any cascade change. `readText` walks DOM text nodes and checks only the `aria-hidden` attribute (`node_modules/@orkestrel/test/dist/src/browser/index.js:1029-1038`). No plant has exercised `isRendered(label)` at `:196`.
- **R3, to the objective lane.** Run the app browser project on the host to settle claim 7.

VERDICT: FAIL 6, 7, 9; outside the claims: none
