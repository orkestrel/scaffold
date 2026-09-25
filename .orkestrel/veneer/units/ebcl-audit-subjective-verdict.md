# E-ID-BUTTON-CLASSES audit: subjective-lane verdict

**Lane:** subjective, held by `reviewer` on Opus 5.5. Opus 5.5 also wrote the work under audit, so this lane attacked it on those terms.

**Evidence read:**
- the claims file, the diff, and the status file;
- the unit's instruments and logs under `/home/user/scaffold/.orkestrel/veneer/units/`;
- the worktree `/home/user/veneer-ebcl`, read only.

## Numbered verdicts

1. **CONFIRMED.**
   - `BUTTON_REBOOT_CASES` (`/home/user/veneer-ebcl/tests/setupStyles.ts`, following `BUTTON_REBOOT_SELECTORS`, around line 3281) holds the ten names the design verdict lists.
   - `button.test.ts:365-409` reads both forms in both cascades in the rest, hovered, pressed, focused, and disabled states.
   - The mutation logs show all ten cases collected and run (`ebcl-mutation-close.log.txt:355-365`).
   - Mutation: delete one entry from `BUTTON_REBOOT_CASES`. Nothing turns red, because the matrix has no membership guard against `BUTTON_REBOOT_SELECTORS`. The claim is about today's coverage, and today's coverage holds. The missing guard goes to R3.

2. **CONFIRMED.**
   - `button.test.ts:413-431` keeps, per state, each longhand where the button form differs from its counterpart, with the button's value. It then asserts that the Veneer map equals the release map.
   - Mutation: remove `_close.scss`'s include. The Veneer map gains the holder's retuned values: `font-family: fantasy`, `font-size: 17px`, `font-weight: 700`, `padding-*: 4.25px`, the retuned shadow, and the transition longhands (`ebcl-mutation-close.log.txt:432-579`). The release map does not gain them, so the equality separates the mutation from the passing tree.
   - The `appearance` guard at `:429-430` fails if the reading cannot tell the two forms apart.
   - **Design fit.** Comparing the difference between the two forms, instead of a class value against the release's number, is the right way to say "reads as the release does". Veneer keeps its Elements-calibrated class values, and the button form may add nothing to the class beyond what the release's button form adds. That matches the tenets at `ROADMAP.md:20-21` and `:32-33`.

3. **UNRESOLVED.**
   - The cited evidence file `ebcl-probe-shadow-readings.log.txt` is empty.
   - The raw run (`ebcl-probe-shadow-raw.log.txt:29-30`) records only `10 passed`, with no comparison output.
   - The report states that the check ran while the stylesheet was a `?raw` import, not the shipped `commands.readFile` form.
   - **To settle:** record a diff of the ten `logs/shadow-*.json` files against `ebcl-probe/pages.json` on the shipped instrument. Pair it with a control that must report a difference, for example the shadow root without the `data-bs-theme="light"` wrapper.

4. **CONFIRMED.**
   - Drives are at `button.test.ts:382-389`. The `matches` check runs before each reading (`:398`) and is asserted at `:410`.
   - `releasePointer` runs after each reading (`:407`), and `releaseMedia` runs in `afterEach` (`:37-41`).
   - Mutation: delete `await userEvent.hover(element)`. The element no longer matches `:hover`, `missed` is not empty, and `:410` fails. The assertion separates the mutation from the passing case.
   - The drive mechanics follow the recorded oracle at `tests/setupBrowser.ts:1374-1379`.
   - The disabled state has no such check (F2, R1). The claim does not cover it.

5. **CONFIRMED.**
   - `bootstrap.css` names `:disabled` beside `.disabled` only for these rules:
     - `.dropdown-item` (`:3656`)
     - `.nav-link` (`:3834`)
     - `.list-group-item` (`:5044`)
     - `.btn-close` (`:5365`)
   - No `:disabled` rule exists for the accordion, navbar toggler, page link, carousel controls, or indicators.
   - The `paired` values in `BUTTON_REBOOT_CASES` match exactly.

6. **BROKEN.**
   - **Failing input:** the `--vn-button-highlight` token.
     - `_button.scss:57` reads it through `focus-ring` → `forced-ring` (`_mixins.scss:374-376`).
     - `BUTTON_RETUNED_HOLDER_STYLE` (`setupStyles.ts:3259`) does not retune it.
     - That constant's own doc comment admits the exception: "The forced colors highlight is left alone".
   - So "retunes every custom property … read" is false by one token.
   - The token is inert for the proof, because no proof runs under forced colors.
   - **Smallest fix:** no code change. The claim, and the prose that repeats it (claim 10 and F2), say "every token the surface reads outside forced colors".
   - **What holds:** extending the base holder instead of widening it is right.
     - The pin at `tests/service/tailwind/consumer.test.ts:320-324` is a real reading of the unretuned space tokens.
     - Building the second holder from the first by interpolation means the tokens they share cannot drift apart.
   - **One concept or a drifting synonym?** Mechanically it is one concept. The name is the problem; see F1.

7. **CONFIRMED.**
   - Each partial's log shows its own case failing with an `AssertionError`:
     - close: `:426-427`
     - navbar: `:424`
     - accordion: `:424`
     - dropdown: `:428`
     - nav: `:457`
     - list-group: `:428`
     - pagination: `:422`
     - both carousel controls: `:429`, `:547`
     - the indicators: `:422`
   - Each log's restore line reads `IDENTICAL`. The two carousel logs share one digest because they mutate the same partial.
   - Mutation named: remove the include. The Veneer map gains leaked longhands the release map lacks (close log `:436-461`), so the assertion separates the mutation from the passing tree.

8. **CONFIRMED,** reading the claim as the case title does: every reset declaration *that names* `revert`. The claim as written drops that qualifier; the mixin also writes `inherit` and `0` values.
   - The plant compiles to `transition:revert 0s 1s` (`ebcl-mutation-minifier.log.txt:8`) and fails with an `AssertionError` listing each `transition: revert 0s 1s` (`:409-449`).
   - The `endsWith(': revert')` check at `mixins.test.ts:256` separates the plant from the passing tree.
   - The selector-set assertion at `:253-255` makes an empty population fail.
   - **Limit:** a fold after an `inherit` shorthand would pass the guard. The mixin writes `inherit` only on longhands (`_mixins.scss:136-139`), so shipped source cannot reach that case.

9. **CONFIRMED.**
   - The gate exists to keep Bootstrap out of the runtime import graph:
     - `FORBIDDEN_RUNTIME` (`tests/setupServer.ts:361-368`)
     - the import-specifier scan at `tests/conformance.test.ts:793-811`
   - The tenets allow external packages "for tooling, testing, reference behavior, parity, and conformance" (`ROADMAP.md:27`).
   - A file read enters no import graph. The same file is already read as data at `setupServer.ts:1024-1026` and `:3339`.
   - The path literal is referred as R2; it does not affect the gate's purpose.

10. **BROKEN.**
    - These parts hold:
      - The `setupStyles.ts` hunk adds exactly the two constants.
      - `setupStyles.test.ts:377-379` lists both names in sorted order.
    - The guide overstates. `/home/user/veneer-ebcl/guides/veneer.md:10264-10265` says the proof runs "under a holder that retunes every token the button surface reads". It does not retune `--vn-button-highlight` (see claim 6).
    - This is prose written with more confidence than the code earns (`.claude/rules/documentation.md` § Parity, the "Re-read the prose last" rule).
    - **Fix:** "under a holder that retunes every token the button surface reads outside forced colors".
    - The rest of the paragraph reads as the package's current human guide and matches what the proofs run. That covers the two forms, the states, both cascades, the disabled pairing, and the nav-link case.

11. **BROKEN.** The placement itself fits the design; the claim's reason for it is false.
    - **Why the placement fits:**
      - The subject is the surface on the `button` element (`_button.scss:12-18`).
      - The `.btn` form proof (`button.test.ts:203`) and the nav-link reboot case (`:306`) already live in this file.
      - The case matrix sits beside `BUTTON_REBOOT_SELECTORS`.
    - **Why the reason is false:**
      - `.claude/rules/tests.md:183-186` does not require a placement. It requires extracting a routine that "could serve another test" into a setup module.
      - With the routine extracted, one case per component file would duplicate nothing.
      - The defect the claim says this placement avoids is present inside the placement. The case at `:374-409` near-duplicates the `.btn` proof's routine at `:235-289`:
        - both drive each element into hover, press, and keyboard focus with a `matches` check;
        - both read every computed longhand into a record per state (`:246-276` against `:401-405`);
        - both filter the longhands where the two forms differ (`:285-287` against `:421`).
      - The unit's report states that the routine belongs in `tests/setupBrowser.ts`, which the brief placed off-limits. That is a brief defect, not a writer defect.
    - **What right looks like:**
      - A successor unit is granted `tests/setupBrowser.ts`. It extracts one state-reading helper that both the `.btn` proof and the reboot proof call.
      - The reboot cases stay in `button.test.ts`.
      - The Orchestrator records that the brief's per-component placement is superseded.

12. **UNRESOLVED.**
    - Every named gate log ends `exit=0`:
      - `ebcl-gate-check`
      - `ebcl-gate-format-scoped`
      - `ebcl-gate-lint-scoped`
      - `ebcl-gate-build-src`
      - `ebcl-gate-owned` (`70 passed`)
      - `ebcl-gate-test-src-styles:8198` (`1516 passed`)
      - `ebcl-gate-test-conformance`
      - `ebcl-gate-test-guides`
      - `ebcl-gate-test-policy`
    - The one red in `test:setup` is the timeout at `tests/setupServer.test.ts:672` (`ebcl-gate-test-setup.log.txt:33-34`), a file the unit did not touch.
    - The re-run log (`ebcl-orchestrator-setup-rerun.log.txt`) shows `1 passed | 112 skipped (113)` and `exit=0`. The total of 113 matches the registrations in `setupServer.test.ts`. The log names neither the command nor the case, so "that case alone" cannot be read from it.
    - **To settle:** the retained re-run script, or a verbose reporter line naming the case.

13. **CONFIRMED.**
    - The status lists only the owned and shared files.
    - `ebcl-restore-check.log.txt` records an empty `src` diff.
    - The diff contains none of the forbidden constructs. Its `as const` uses are permitted by `.claude/rules/typescript.md:29-35`, and the only nested functions are callbacks passed directly as arguments.
    - Both new case titles state what each case proves.
    - The asserted literals are longhand names and a syntax check (`'appearance'`, `': revert'`), not invented values.

## Findings outside the claims

- **F1: vocabulary.**
  - **The holder name.** `BUTTON_RETUNED_HOLDER_STYLE` (`setupStyles.ts:3259`) is qualified by something both holders share.
    - The base holder's doc says "The holder retunes the body weight and the button shadow" (`setupStyles.ts:3068`), and so do the comments at `button.test.ts:90` and `consumer.test.ts:308`.
    - So the name reads as if the base holder were not retuned, against `AGENTS.md` § Design laws "One concept, one term" and `.claude/rules/names.md:111` "Describe what a thing is".
    - **Fix:** `BUTTON_REBOOT_HOLDER_STYLE`. Its doc already calls it "the holder the button reboot proofs mount each class's forms in", and the name joins `BUTTON_REBOOT_CASES` and `BUTTON_REBOOT_SELECTORS`. Update the import, the use at `button.test.ts:341`, and the sorted list in `setupStyles.test.ts`.
  - **A synonym for `counterpart`.** `button.test.ts:417` names the counterpart's reading `twin`, while the case field is `counterpart`.
    - **Fix:** `buttonReading` and `counterpartReading`. The destructured markup strings already take the bare names.

- **F2: comment truth in the case.**
  - `button.test.ts:363-364` says "the universal selector stands for a state no drive enters". The disabled state is entered by a drive (`:390-396`), and nothing checks that drive (see R1).
  - `:375-377` says "Every state is read with motion reduced". It then states that the rest reading comes before motion is reduced, which contradicts the first clause.
  - `:331` repeats "retunes every token the surface reads" (see claim 6).
  - **Fix:**
    - Name `disabled` as a drive whose entry is checked through the per-form selectors R1 describes.
    - Write "Every state after rest is read with motion reduced".
    - Add "outside forced colors" to the holder sentence.

## Attacked and held

- **The oracle against class-written values.** A value the class writes applies to both forms, so it drops out of the comparison.
- **The oracle against unequal counterparts.** The focusable `div` counterpart is not a documented release form. It is compared the same way in both cascades, so its box model and inherited weight cancel out.
- **The minifier plant turns only three per-class cases red.** The plant reddens `btn-close`, `dropdown-item`, and `list-group-item` (`ebcl-mutation-minifier.log.txt:464-581`). The other seven classes write their own transition in the `components` layer, so the dropped reset has nothing to leak. That is correct behavior.
- **The `paired` field name** collides in the same file with the `.btn` proof's local `paired` at `:281`, which means the anchor's reading. The field's doc disambiguates it. `disabled` is taken by `BUTTON_FORM_CASES` with a different meaning, so no rename is required.
- **The two carousel mutation logs share a digest.** Both edit `_carousel.scss`. This is not a restore fault.

## Referrals to the objective lane

- **R1.**
  - Replace the disabled branch body at `button.test.ts:391-396` with `element.blur()` alone.
  - Expected: all ten cases stay green. Each cascade would read the motion-reduced rest values into the disabled slot, and `'*'` checks nothing.
  - If that holds, the entry check needs a selector per form: `:disabled` for the button, `.disabled` for a paired counterpart, and `*` only for an unpaired counterpart.
- **R2.**
  - `button.test.ts:346` reads a hard-coded `node_modules/bootstrap/dist/css/bootstrap.css`. The digest pin `BOOTSTRAP_CSS_DIGEST` (`setupServer.ts:353`) covers the file resolved through `BOOTSTRAP_MANIFEST_PATH` (`:397`).
  - Question: under a hoisted or nested install, can the browser read a file the pin does not cover?
  - Pre-existing drift: `setupServer.ts:1021` says a path the browser can read lives in `tests/setupStyles.ts`, which holds none.
- **R3.**
  - No assertion ties `BUTTON_REBOOT_CASES` to `BUTTON_REBOOT_SELECTORS`. A tenth reset selector added with no case, or a case entry deleted, passes every gate.
  - Decide whether claim 1's coverage needs a membership guard.

VERDICT: FAIL 3, 6, 10, 11, 12; outside the claims: F1, F2
