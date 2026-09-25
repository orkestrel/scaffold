**E-ID-MOTION-FACTOR audit round 2: subjective lane (`reviewer` on Opus 5.5)**

I held the subjective lane. The same engine wrote this work, and round 1's subjective verdict (also Opus 5.5) prescribed the form under audit, so I attacked that recommendation as hard as the rest. I edited nothing and ran nothing. Any reading marked "derived" comes from reading the source, not from an executed run.

## Verdicts

**1. CONFIRMED.**
- **Evidence:**
  - A grep of `/home/user/veneer-mfac/src/styles` for `vn-factor-motion` returns only `_tokens.scss` (lines 317, 328, 448, and 449).
  - The label is written at `_form-floating.scss:51-56`, and the bar at `_progress.scss:28`, each on the release's curve.
  - `mfac-instruments/r2/mfac-2-probe-calc.log.txt:80` reads a declared `0.1s` and a running `99.99999999999999` ms for `/ 1.5`, and a declared `0.6s` and a running `600` ms for `* 4`.
- **Design fit:** the two forms are one decision. Each takes the token for the kind of motion and scales it by the release's ratio to that token. This mirrors the partial's own length convention (`calc(var(--vn-space-8) * 3.5 …)`, `_form-floating.scss:27`) and the design verdict's opening, which requires every value to read a `--vn-*` token.
- **Kind reasoning:** both comments now give the reason by the kind of motion, not by value. So a future `--vn-motion-slide` at 600ms gives the bar no reason to move tokens.

**2. CONFIRMED.**
- **Evidence:**
  - `mfac-2-red-final.log.txt:194-195` shows `AssertionError: expected 200 to be 100`, and lines 213-214 show `expected [ 600, 1200 ] to deeply equal [ 600, 600 ]`. Line 243 reads `restored=identical`.
  - The label plant fails at `mfac-2-plant-label.log.txt:47` and restores at line 73. The bar plant fails at `mfac-2-plant-bar.log.txt:45` and restores at line 74.
- **Mutation:** restore round 1's direct factor read on either site. The wrapped reading then doubles and the unwrapped one does not, so the assertions distinguish the mutation from the passing case.
- **Bound:**
  - The claim's wording is off for progress. The form-floating case uses `toBe` (`form-floating.test.ts` around line 417), but the progress case compares `toEqual([600, 600])` (`progress.test.ts` around line 239). Both comparisons are exact, with no tolerance, so the property holds.
  - The titles and comments of both cases name what they prove.

**3. UNRESOLVED.**
- **What holds (derived):**
  - `expect.closeTo(100, 6)` passes only within 5e-7 of 100. A doubled resting duration (200) fails it, and so does a duration off by 1 ms (101 or 99).
  - The subtree case compares exactly, so the tolerance cannot hide a doubled factor there.
  - The declared `'0.1s, 0.1s'` assertion is unchanged.
- **What is open — the zeroed clause:**
  - Take a label duration of `0s` at factor `1`. `sampleTransition` then returns `undefined`, as the passing `zeroed` readings show.
  - In that case `requireValue(resting, 'No transition at the resting factor')` (`form-floating.test.ts` around line 399) throws a plain `Error`. The installed `@orkestrel/test/dist/src/core/index.js:516` shows `throw new Error(message)`.
  - So the `closeTo` assertions never run on a zeroed duration. Under the claims file's kill rule, this case's failure is not an assertion failure.
  - The declared-duration case would still fail with an `AssertionError`, so the suite does not hide the mutation. The claim credits the kill to the wrong assertion.
- **What settles it:** the objective lane runs a zero-duration plant on the label. It then reads which case fails and whether that case's message names an assertion failure. See referral R1.

**4. CONFIRMED.**
- **Behaviour (`tests/setupBrowser.ts:1985-2000`):**
  - The reader sets the factor inline on `document.documentElement` in the order `1`, `2`, `0`.
  - Inside `finally`, it restores the element's own value and priority, or removes the factor when the element held none. It then calls `scene.clear()`.
  - It returns the readings in factor order.
- **Mutation (restore skipped):** `mfac-2-plant-restore.log.txt:45` reads `expected '0' to be ''` and line 63 reads `expected [ '0', '' ] to deeply equal [ '3', 'important' ]`. The run exits 1 and the file restores identically. The assertions distinguish this mutation.
- **Mutation (priority dropped, derived):** the second case asserts `'important'` after both sweeps, so it also catches a restore that drops the priority.
- **Mutation (restore moved out of `finally`, derived):** the throwing drive leaves `'1'` behind and its host connected. Both are asserted.
- **Name:** `sweepMotionFactor` is `{verb}{Noun}`. It takes no fixed prefix: `read*` returns one host value, `sample*` belongs to the transition reader, and `scan*` walks a structure. No other `sweep*` name exists under `tests/`.
- **Home:** beside `sampleTransition` and `scene`, which it composes.
- **Signature:** `readonly T[]` reads well at the call sites. The `= []` destructuring defaults in the accordion, nav, and pagination cases predate the reader (round 1's `mfac.diff:620`, `751`, and `862`), so the reader added no noise. A `readonly [T, T, T]` return would need a second exported per-factor helper, and the brief asked for one reader.

**5. CONFIRMED.**
- **Call sites:** a grep for `sweepMotionFactor(` returns the six new cases plus `fade.test.ts:201`.
- **Assertions:** the round-1 assertions (`mfac.diff:620-638`, `691-696`, `751-761`, `805-810`, `862-872`, and `922-927`) match round 2 line for line. The one change is the label's `closeTo`.
- **Unrouted fade case:** the case at `fade.test.ts:148-155` sets only `2` and reads the declared `transition-duration` on one mounted element, before and after. Routing it would add a zero reading and a fresh element per factor, so it would change what the case asserts.

**6. CONFIRMED.**
- **Exception list:** a grep of `src/styles` for literal transition durations returns only these sites:
  - `_collapse.scss:20,29`
  - `_modal.scss:66`
  - `_offcanvas.scss:88`
  - `_carousel.scss:42`, plus line 81, the fade variant's `0s` duration delayed `0.6s` as part of the slide
  - `_carousel.scss:194`, the indicator
  - `_accordion.scss:34`, the chevron

  The list at `guides/veneer.md:7106-7108` names exactly these. Every other transition reads `--vn-motion-feedback`, including `form-control`, `form-select`, `form-range`, `form-check`, `button`, `elements/_button`, `fade`, `icon-link`, and the carousel controls.
- **Doubling and zero:** these hold for any fixed ratio of a token.
- **Equality at factor `1`:**
  - It holds for every site that keeps a release timing. The label's declared value is exactly `0.1s`.
  - The `.icon-link` transform (release `0.2s`) resolves to the token's `150ms`, as stated.

**7. BROKEN.**
- **What holds:**
  - The accordion comment (`_accordion.scss:50-52`) reads once.
  - Both guide sentences now read "which no `--vn-ease-*` token resolves to" (`guides/veneer.md:4888`, `5219`).
- **Failing sentences:**
  - **Progress comment (`_progress.scss:25-27`):** "…and keeps the release's curve; the motion factor reaches it only through that token." Here "it" binds first to "the release's curve", which the factor never reaches. `.claude/rules/writing.md` § Sentence and paragraph order requires the noun wherever a pronoun can attach to another referent.
    - Write: "The fill's width change is feedback to the value the bar reports, so its transition reads four times the feedback token on the release's curve, and the motion factor reaches the transition only through that token."
  - **Form-floating comment (`_form-floating.scss:9-12`):** "…scaled by the release's own ratio to it, the way the height reads a multiple of a space token, and the motion factor reaches it only through that token." The two uses of "it" have different referents, and the second follows "a space token".
    - Write: "…so its transition reads the feedback token scaled by the release's own ratio to that token, the way the height reads a multiple of a space token; the motion factor reaches the transition only through the feedback token."
  - **§ Factors (`guides/veneer.md:7110-7112`):** "…and one § Departures records against the release, such as the `.icon-link` transform's, resolves to its token's value." This clause has three first-read hazards:
    - the pronoun "one" directly before "§ Departures" reads as a count phrase;
    - the relative pronoun is elided;
    - the possessive "transform's" has no noun after it.

    Also, "or a multiple of one" (line 7109) covers the label's two-thirds only in the scalar sense.
    - Write: "A scaled duration reads a `--vn-motion-*` token, alone or scaled by a fixed ratio, so it doubles from its own resting value at a factor of `2` and starts no transition at a factor of `0`. At a factor of `1`, a scaled duration that keeps the release's timing resolves to the release's value. A scaled duration that § Departures records as a departure from the release, such as the `.icon-link` transform, resolves to its token's value."
  - **Pagination partial (`_pagination.scss:59-60`):** it gives the easing fact a second way: "because `--vn-ease-standard` resolves to `ease`". Round 2 aligned `_nav.scss:35-36` and both guide sentences on "which no `--vn-ease-*` token resolves to", so pagination is the one site left in F2's class.
    - Write: "The curve stays the release's `ease-in-out`, which no `--vn-ease-*` token resolves to."
- **Why it matters:** the guide and the partial comments are the package's one current voice. Each of these sentences fails the first-read standard of `AGENTS.md` § Writing, and the last one writes one fact two ways.

**8. CONFIRMED.**
- **Veneer cells:** `mfac-2-conformance-probe.log.txt:55-57` prints the form-floating and progress Veneer cells byte for byte as the diff writes them (`mfac-2.diff:253`, `411`, and `414`). `mfac-2-conformance.log.txt:13,17` shows 26 passed and `exit=0`.
- **`tokenized`:** under the legend (`guides/veneer.md:7589`), a `tokenized` row routes the release value through a Veneer token. Each row does so, the same way the form-floating height rows route `3.5rem` through `--vn-space-8`.

**9. CONFIRMED.**
- **Status:** `mfac-2-status.txt` lists 16 paths, each owned by `e-id-motion-factor-brief-2.md` § Scope.
- **Shared-file hunks:** `mfac-2.diff:572-600` and `680-745` hold the reader, its `TOKEN_NAMES` import, its proof, and its import-list and export-list entries, and nothing else.
- **Gates:** the logs read `exit=0` for format (line 7), check (31), lint (7), conformance (17), guides (17), policy (17), styles (673), and setup-browser (39).

## Findings outside the claims

**F3. The reader's `@throws` text promises a restored scene, but the code clears the scene.**
- **Where:** `tests/setupBrowser.ts:1960-1961` says the error propagates "after the factor and the scene are restored".
- **What the code and its own records say:** the code calls `scene.clear()`. The `@remarks` at lines 1971-1972 say clearing removes every node the scene recorded, including nodes mounted before the call. The proof's title says "clears the scene".
- **Failing state (derived):** mount a node through `scene`, then call `sweepMotionFactor` with a drive that throws. The node mounted before the call is disconnected afterwards, so the scene is not restored.
- **Why it matters:** this is the exported helper's contract. `.claude/rules/documentation.md` treats a false sentence about behaviour as a defect of the same kind as a wrong return value.
- **Fix:** "@throws Thrown when the drive throws, with the drive's own error, after the factor is restored and the scene is cleared."

## Attacked and held

- **`feedback * 4` against a future `--vn-motion-slide`:** it held. The comment reasons by kind, so the bar stays on feedback when the slide token lands. After this change a consumer who retunes `--vn-motion-feedback` also moves the label and the bar. That coupling is the intended single dial for feedback-kind motion.
- **`/ 1.5` against `* 2 / 3` and `- 50ms`:** the probe reads the same running value for all three (`mfac-2-probe-calc.log.txt:80`). `/ 1.5` is an exact expression of the ratio, so the choice costs nothing.
- **The accordion duration fact:** it appears twice in the partial, at lines 16-17 and 50-51. Both statements are true, and one is at the property and one at the rule, so I raise no finding.
- **Direct factor writes in other test files:** `form-range`, `form-select`, `form-check`, `icon-link`, `carousel`, `form-control`, and `tokens` tests set one factor on a declared value. None of them is a sweep, and none is in the owned set.
- **The subtree paragraph under § Factors:** `guides/veneer.md:7114-7118` says a subtree "keeps the root's lengths", which predates this unit. Round 2 made the paragraph's mechanism true for durations, but the word still names only lengths. The Orchestrator can name a carrier; the text is outside this unit's owned § Factors text.

## Referrals to the objective lane (`analyst` on Astra)

- **R1 (claim 3):** plant a `0s` label duration at factor `1`. Report which case fails, and whether the motion-factor case's failure is the plain `Error` from `requireValue` rather than an assertion.
- **R2 (claim 2 wording):** the progress subtree case compares with `toEqual([600, 600])`, not `toBe`. Rule whether the claim's letter matters.
- **R3 (adverse ordering):** `sweepMotionFactor<T>` admits `T = Promise<…>`. An async drive then has its factor restored and its scene cleared before the awaited reading. The TSDoc says "It runs synchronously", but the type does not refuse an async drive. Rule whether this can happen through the documented seam.
- **R4 (timing):** the first proof case imports the whole cascade and ran for 7036 ms and 9378 ms alone under load, against the 15000 ms browser default (report, § The sweep reader).
- **R5 (scope honesty):** `mfac-instruments/r2/mfac-2-subtree-green.log.txt` exits 1 with 2 failures. This is the interim run that motivated the rounding tolerance, and the report never names it. It is not one of the gates in `mfac-2-gates.sh`.

VERDICT: FAIL 3, 7; outside the claims: F3
