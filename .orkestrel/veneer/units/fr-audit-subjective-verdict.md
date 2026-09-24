<!-- Subjective lane: reviewer on Opus 5.5, workflow wf_c341c6ea-3e3, brief fr-audit-reviewer-brief.md. -->

1. **Scope — CONFIRMED.** Subjective lane, held by Opus 5.5. The Orchestrator's rulings on scope hold.
   - `fr-status.txt:1-11` lists only files the brief owns, plus `tests/setupStyles.ts` and the narrowed `declared` lines.
   - `fr-shared.patch` changes `guides/veneer.md` alone. No off-limits path appears in the status output.
   - The `tests/setupStyles.ts` edit (`fr.diff:1556-1577`) is in scope. P10 makes those rows false, and the kept-rule case reddens on them (`fr-mutations.log.txt:11`).
   - The narrowed filters (`fr.diff:336-340`, `fr.diff:352-356`) are in scope. Without them, the text-control loops would page-frame this unit's select, check, and textarea rows.
   - The `*_COPY` paragraph edits in `app/browser/constants.ts` are unowned constants inside an owned file. Each changed specimen table makes its paragraph false, so the edits are consequential and in scope.

2. **P10 — CONFIRMED.**
   - The partial paints `var(--vn-palette-white-base)` (`fr.diff:309`).
   - The readings go from dark `oklch(0.21 0.013 256)` to `rgb(255, 255, 255)` (`fr-p10-readings.log.txt:3,5`).
   - The ledger rows keep `tokenized` over a token that resolves to `#fff` (`fr-shared.patch:125-126`), and that status is earned.
   - Mutation: restore the body surface. The hairline case returns `[true, false]` (`fr-p10-red.log.txt:82`). Only the dark reading can separate the two trees, and it does.

3. **Driven states — CONFIRMED.**
   - Every focus and pointer state in P15 has a `DRIVEN_KEYS` row (`fr.diff:1540-1552`).
   - Each case calls `FRAMES.place(scenario, control, lifted)` on a `p-2` wrapper. This matches the `nav-underline-focus` pattern (`integration.test.ts:2467`).
   - Each case checks its state after the shot: `:focus-visible`, `:active`, `:hover`, the label transform, or `z-index`.
   - Each focus case computes the five-edge `inside` reading. The hover case (`fr.diff:551`) and the pressed case (`fr.diff:488`) carry the `main` guard.
   - Mutations:
     - The wrapper without `p-2` gives `[true, false, true, true, true]` (`fr-mutations.log.txt:226`).
     - The resting knob, grouped `z-index: 2`, the filled-only backdrop, the resting file fill, and the ringless state rule each redden their own case (`fr-mutations.log.txt:160,185,172,149,203`).
   - Each of these assertions separates its mutation from the passing tree.

4. **Pressed states — CONFIRMED.**
   - The case uses `driveHold` (`fr.diff:486`) and reads the centre pixel focused and then held.
   - Mutations: "no `:active` filter" (`fr-mutations.log.txt:125`) and "mix at 100%" (`:136`) each redden only the pressed case, so the readings separate held paint from focused paint.
   - The mix declaration gives `#b6d4fe`: 30% of `#0d6efd` over white is 182.4, 211.5, 254.4. The `range-active` frames show that pale tint at both variants.
   - No assertion pins that value, so a 35% mix would pass. This is an observation, not a break.

5. **Resting states — BROKEN.**
   - **Plaintext rows.** The `form-control-plaintext-small` and `-large` rows (`fr.diff:1496-1507`) read `padding-left`. That value is `0` on the base plaintext (`_form-control.scss:121`, `padding: var(--vn-space-3) 0`) and `0` on the sized forms (`:144-147`). So the key cannot tell either state from its base specimen.
     - Fix: key those rows on `min-height`, which `.form-control-#{$size}` writes (`:150`) and the base plaintext does not.
   - **Validation proof.** `ValidationSection.test.ts:23-101` does not key its expectations by specimen outside the scoped forms. Suppose a new `host: 'select'` or `host: 'feedback'` row with a unique label is appended to `VALIDATION_SPECIMENS`. It passes every assertion: the derived name and `innerHTML` lists, the class census, the scoped filter, the textarea and color query, the inline query, and label uniqueness.
     - Fix: add a keyed `[name, tag, className]` expectation over every rendered specimen, as `FormControlSection.test.ts:911-947` does.
   - **Held.** The other resting rows address their elements correctly. The FormControl, FormFloating, and InputGroup proofs are keyed by specimen.

6. **Recorded, not framed — CONFIRMED.**
   - `:-moz-focusring` is recorded at `fr-shared.patch:20-22` and autofill at `:71-73`.
   - The held-thumb sentence at `guides/veneer.md:3335-3337` is replaced (`fr-shared.patch:53-61`). No other guide line still claims the thumb cannot be driven (searched `guides/veneer.md` for `no drive|not reachable|cannot be driven|unreachable`).

7. **Red first and mutations — UNRESOLVED.**
   - The per-case reds and the instrument control are in the log.
   - "No other case reddens" was measured only under `-t "lifted specimen"`, which selects the unit's cases plus one other (`fr-mutations.log.txt:106` and every later run).
   - The validated-select mutation removes the ring from the state focus rule shared by every host (`:188-197`). The text-control validation ring case sits outside that filter and was never run against it.
   - The P10 mutation reddens three cases (`:9-11`). The report still says "Each mutation reddens exactly the case it targets" (`b-forms-frames-report.md:146`).
   - Settle by running the journey without the name filter under each P15 mutation.

8. **The frames — CONFIRMED.**
   - Every frame listed for `light-1280` and `dark-390` shows its state on the lifted specimen, with the ring or the state paint whole inside the frame: the switch focus knob and ring, the dimmed box, the pale held thumb at mid-track, the file button at `#e9ecef` against the resting `#f8f9fa`, the floated empty-textarea label, the `Earlier order` ring over its neighbour, and the success and danger rings.
   - In `form-check-box-active--dark-390.png`, a 90% brightness dim on the dark fill cannot be seen; a pixel assertion carries it. This matches the release.
   - Findings F1 and F4 cover the prose and fit defects these frames expose.

9. **Law and report — UNRESOLVED.**
   - No `any`, `as`, non-null `!`, suppression, nested function, or mock appears in `fr.diff`.
   - Populations derive from the tables or sit in `tests/setup.ts`.
   - `fr-gate-lint.log.txt`, `fr-gate-check.log.txt`, and `fr-gate-build.log.txt` carry no exit line. The report's "exit 0, no diagnostics" for those gates rests on the writer alone.
   - For the record:
     - **Counts:** "11 files changed, 1044 insertions(+), 144 deletions(-)" (`:241`), "the one passing case" (`:141`), "failed one case" (`:197`), and "one final capture pair" (`:202`).
     - **Ordinals:** "The first final … run" (`:197`), "the first pressed-check mutation" (`:162`), and "the first Tab" (`:230`).
     - **Banned temporal words:** none.
     - **Code tokens left without a noun:** "holds `:active`" (`:53`), "holds `:hover`" (`:60`), "`z-index` `2`" (`:69`), "reads `5`" (`:70`), "on `Form check switch`" (`:44`), "not `none`" (`:45`), "The log is `fr-p10-readings.log.txt`" (`:21`), "in `fr-shared.patch`" (`:9`), "without `p-2`" and "`inside` reads" (`:156`), "in `finally`" (`:204`), "is `tests/setupBrowser.ts`" (`:206`), and the parenthesised selector and property pairs (`:85-100`).

**Findings outside the claims**

- **F1: the floating label in the group is not floated.**
  - The frames `input-group-floating--light-1280.png` and `input-group-floating--dark-390.png` show "Recipient handle" at rest, centred at full size. The input is empty with a placeholder (`fr.diff:239`).
  - Three texts say otherwise: `fr-shared.patch:95-96` ("the floating one with its floated label"), the TSDoc at `fr.diff:217-218`, and the section comment at `fr.diff:1128-1129`.
  - Fix: add `value="…"` to the grouped input so the label floats, or correct all three texts to describe a resting label.

- **F2: critic items dropped.**
  - `pv-forms-lenses.json:1368` names the grouped `.form-floating` `:focus-within` lift and the squared end corners. `pv-forms-lenses.json:1358` names a pressed radio.
  - None of these is framed, and none is in the report's carried list (`b-forms-frames-report.md:207-210`).
  - Fix: add them to the carried list for the Orchestrator.

- **F3: guide wording contradicts the code.**
  - `fr-shared.patch:60` says the range hold happens "on its lifted copy". In this tree, "lifted copy" means a clone (`integration.test.ts:722,1002,1731`), but the case moves the specimen itself (`fr.diff:465-467`).
  - `fr-shared.patch:11` says the journey "reads the button part's surface in that frame". The case reads the computed style (`fr.diff:560`), not the frame.
  - `fr-shared.patch:32` ("the resting checkbox held under the pointer") and the case title at `fr.diff:439` ("holds each resting form control pressed") set "resting" against "held".
  - Fix: write "lifted specimen", "reads the button part's computed surface", and drop "resting" from both texts.

- **F4: the validated check's focus ring runs into its label.**
  - In `valid-check-focus--light-1280.png` and `invalid-check-focus--light-1280.png`, and in the `dark-390` twins, the ring touches the label text.
  - Cause: the check host renders `<div><input class="form-check-input …">` with no `.form-check` wrapper (`app/browser/constants.ts:847`). The release's validation markup uses that wrapper, and this unit's own inline rows do too (`:877`).
  - Fix: render the check host inside `<div class="form-check">`. That table is owned by this unit.

**Attacked and held**

- The Orchestrator's rulings on `tests/setupStyles.ts` and the narrowed `declared` lines both hold.
- Near-identical names are adjacent but not defects: `Input group button` beside `Input group buttons` (`input-group-button-focus` beside `input-group-buttons-focus`), and `Form floating disabled` (a textarea) beside `Form floating disabled input`.
- The lift-and-reach block repeats in the five focus and pointer cases. The writer carried that correctly to `tests/setupBrowser.ts`, which is off-limits to this unit.

**Referrals**

- **To the objective lane:**
  - claim 7: whether the text-control validation ring case, and other cases outside the filter, redden under the select-ring mutation;
  - claim 9: the lint, check, and build exits.
- **To the checker:** the unwrapped guide line at `fr-shared.patch:33`.
- **To the Orchestrator:** the brief supplied the evidence as files, not a dispatch diff. No defect.

VERDICT: FAIL 5, 7, 9; outside the claims: F1, F2, F3, F4
