1. **Scope — CONFIRMED.** `fr-2-status.txt` lists only files that brief 1 owns (`b-forms-frames-brief.md` Scope section, around lines 71–77), plus `tests/setupStyles.ts`, which brief 2 grants, plus `tests/setupStyles.test.ts`, which the Orchestrator ruled in. `fr-shared-2.patch` touches `guides/veneer.md` alone. Its form-range ledger rows (patch lines 140–143) match the round-1 `fr-shared.patch` rows (lines 123–126) exactly.

2. **Resting keys — CONFIRMED.**
   - The keys: `tests/setup.ts` in `CASCADE_KEYS`, at the `form-control-plaintext-small` and `-large` rows (`fr-2.diff` around lines 1902–1913), reads `min-height`. `fr2-plaintext-keys.log.txt` line 2 records `["0px","31px","48px"]` for `min-height` against `0px` padding on every size, so the key tells each size from its base.
   - The proof: `ValidationSection.test.ts` (diff around lines 1568–1586) compares the whole rendered list against `VALIDATION_HOST_CASES` with a strict equality.
   - The mutation: an added `Valid additional control` specimen with no host row. The strict list equality separates it from the passing tree: `fr-mutations-2.log.txt` lines 29–59 record `1 failed | 1 passed (2)` and `expected [ …(19) ] to strictly equal [ …(18) ]`.

3. **Mutations — CONFIRMED.**
   - Hairline alone: `fr-mutations-2.log.txt` lines 1–11 record `1 failed | 7 skipped (8)`, and only the hairline case fails.
   - Whole range file: lines 13–27 record three failing cases, and the report names all three.
   - Unfiltered journey, validated-select mutation (lines 61–78): `1 failed | 53 passed (54)`. Only the validated select-and-check case fails, on `[2,2]` vs `[1,1]`, so the ring-colour set assertion separates the mutation from the passing tree.
   - Unfiltered journey, pressed-check mutation (lines 80–93): `1 failed | 53 passed (54)`. Only the pressed case fails, on two scenarios, and `range-active` stays green. The report's table (lines 202–212) names every case that goes red.

4. **Specimens — BROKEN.**
   - These parts hold:
     - The validated checks sit in `<div class="form-check">` (diff line 138), and their rings clear the labels in `valid-check-focus--light-1280.png`, `invalid-check-focus--light-1280.png`, `valid-check-focus--dark-390.png`, and `invalid-check-focus--dark-390.png`.
     - The grouped floating label rests in `input-group-floating--light-1280.png` and `input-group-floating--dark-390.png`, and the three texts now say it rests: `constants.ts` around line 1916, `InputGroupSection.test.ts` around line 1401 of the diff, and patch line 107.
   - This part breaks: the plaintext rename did not reach the sized specimens.
     - `app/browser/constants.ts` line 1386 renames the base to `Reader email`.
     - Lines 1391 and 1396 still read `Small account email` and `Large account email`.
     - Every other size family in the same table prefixes the base name: `Message`/`Small message`, `Attachment`/`Small attachment`, `Accent color`/`Small accent color`. The table's own TSDoc (diff lines 183–187) calls each sized specimen its base control's markup with a size class.
     - After the rename, the sized plaintext names point back to a base name that no longer exists, and `Account email` is the name the `Form floating plaintext` specimen uses (line 2088).
   - Fix: rename the sized plaintext labels to `Small reader email` and `Large reader email` at `constants.ts` lines 1391 and 1396. No test asserts those names; the uniqueness check in `FormControlSection.test.ts` still holds after the rename.

5. **Added critic states — UNRESOLVED.**
   - These parts hold:
     - The plaintext case calls `releasePointer` before its Tab traversal (diff line 951).
     - The focused disabled range is recorded as unreachable, with readings in `fr2-probe-readings.log.txt` lines 9–11 and guide prose at patch lines 67–69.
     - The grouped-lift and plaintext cases each have an executed mutation run (log lines 95–149).
   - This part cannot be decided: the mutations that the section case `squares both inline corners … sets a toolbar group beside its buttons` names in its own comment (`InputGroupSection.test.ts` around lines 166–168) were never run.
     - Those mutations are: the group's corner squaring removed; the `.input-group-lg`/`-sm > .form-select` end room removed; the `.btn-toolbar .input-group` width back to 100%.
     - By reading, the assertions would separate each one: radius `0` against the default radius, `48` against `36`, and `toBeLessThan` the toolbar width. That is a reading, not a run. The only red run the report gives for this case (`fr2-sections-red.log.txt`) failed on missing specimens, not on the cascade.
   - To settle it: run `InputGroupSection.test.ts` under each of the three mutations in a scratch copy and keep the logs.

6. **Frames — BROKEN.**
   - These frames show their state whole:
     - The grouped lifts: `input-group-select-focus--light-1280.png`, `input-group-select-focus--dark-390.png`, `input-group-floating-focus--light-1280.png`, and `input-group-floating-focus--dark-390.png`. The ring paints over the button's border, and the floating label is floated under focus.
     - The pressed radio: `form-check-radios-active--light-1280.png` shows the dimmed `Ship by post`. The press is faint in `form-check-radios-active--dark-390.png`, but that is the release's `brightness(90%)` on a dark fill.
     - Plaintext focus: `form-control-plaintext-focus--light-1280.png` and `form-control-plaintext-focus--dark-390.png` show no ring.
     - The rings of the checks, as listed under claim 4.
   - This frame fails: `form-floating-empty-plaintext-focus--light-1280.png` and `form-floating-empty-plaintext-focus--dark-390.png` look the same as their resting frames, `form-floating-empty-plaintext--light-1280.png` and `form-floating-empty-plaintext--dark-390.png`. Each shows only the `Unset email` label, moved only by the lifted wrapper's 8px padding.
     - The label on a plaintext control floats at rest as well.
     - The control is empty, its placeholder is transparent under `.form-floating`, and a readonly input paints no caret.
     - So the frame cannot show the 16px→26px inset move that the case measures.
     - The prose promises something the frame can't show: the guide patch (lines 94–96) and the `FORM_FLOATING_SPECIMENS` TSDoc (`constants.ts` line 2041) both say focus "moves its text down to the floated inset", and there is no text to see.
   - Fix: keep the driven reading as the evidence for this state and record the frame as unable to show the inset. In the guide and the TSDoc, say that focus moves the empty control's content box to the floated inset and paints nothing that shows the move. Do not describe text moving. Alternatively, drop the scenario's frame and keep the case's reading.

7. **Law and report — CONFIRMED** on the sample this lane could reach.
   - The diff hunks read show no `any`, no `as` cast, no `!`, no suppression, no nested declaration, and no mock.
   - The validation class list and the gauge population are now the setup constants `VALIDATION_HOST_CASES` and `FORM_RANGE_HAIRLINE_CASES`.
   - The sampled logs open with their command and close with their exit: `fr2-gate-sections.log.txt` lines 1 and 83, and `fr2-capture-dark-390-filtered.log.txt` line 1.
   - A case-insensitive sweep of the report for `now|new|currently|latest|soon|once|since|recently|both|two`–`nine` found one hit, `both`, at line 159, inside a quoted test title.
   - The full mechanical sweep belongs to the objective lane and the checker.

**Findings outside the claims**

- **F1: the toolbar prose contradicts the dark-390 frame.**
  - In `input-group-toolbar--dark-390.png`, the `#` group wraps onto a second row under `Refresh orders`.
  - Three texts say the group sits beside the buttons:
    - The TSDoc at `app/browser/constants.ts` line 1919: "The toolbar holds a button group beside a group".
    - The case title at `InputGroupSection.test.ts` line 169: "sets a toolbar group beside its buttons".
    - The comment at line 214: "so it sits on the button group's row rather than filling a row of its own".
  - At a phone width, the specimen shows the opposite of what these texts say.
  - What the rule actually guarantees is `width: auto`, and that holds at both widths. The guide patch (line 112, "taking its content's width inside a toolbar") is correct.
  - Fix: say the group takes its content's width rather than the toolbar's, and shares the button group's row where the row has room. Keep the title and the comment to that wording, or shorten the specimen so it fits one row at 390px.

**Attacked and held**

- The plaintext focus frames show the value highlighted as selected. That is correct: in Chromium, Tab traversal into a text input selects its value. It is not a stray selection.
- The mixed checkbox's "lifted copy" (patch line 30, baseline text) is accurate. That case really clones the specimen (`integration.test.ts` around line 1731), so F3's wording change does not apply there.
- The multiple-select frames (`valid-multiple-select--light-1280.png`, `invalid-multiple-select--dark-390.png`) show the state's border with no mark, which is what the guide says.

**Referrals, to the objective lane**

- R1: `app/browser/constants.ts` line 690 is the only inline `@remarks` tag in the file. The unit reflowed a baseline block into it, and every other `@remarks` sits on its own line. This is a conformance question.
- R2: `InputGroupSection.test.ts` asserts `group?.top` equals `buttons?.top`. That holds only at a viewport where both fit on one row, and the dark-390 frame shows they don't fit at that width. Rule whether the section proof's viewport is fixed and whether this assertion tests the `width` rule or the viewport.
- R3: `VALIDATION_HOST_CASES` (`tests/setupStyles.ts`, diff lines 2083–2141) builds each row from an untyped tuple coerced with `String()`. The compiler therefore never checks the table against `ValidationHostCase`: a misplaced column type-checks.

VERDICT: FAIL 4, 5, 6; outside the claims: F1
