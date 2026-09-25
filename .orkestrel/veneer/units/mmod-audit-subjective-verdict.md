# E-ID-MOTION-MODAL audit: subjective lane verdict

I held the **subjective** lane as `reviewer` on Opus 5.5, in a clean context. The dispatch has no defect: it supplied the diff (`mmod.diff`) and the status (`mmod-status.txt`). All evidence paths are under `/home/user/scaffold/.orkestrel/veneer/units/`, and worktree line numbers refer to `/home/user/veneer-mmod`.

## Per-claim verdicts

1. **CONFIRMED — The dialog motion.**
   - **Rule:** `_modal.scss` (diff lines 267–272) writes `scale(0.96)` and `transition(transform var(--vn-motion-panel) var(--vn-ease-panel))`.
   - **Token:** `_tokens.scss:449` resolves the panel duration to `calc(250ms * var(--vn-factor-motion))`, and `:452` resolves the curve to `cubic-bezier(0.32, 0.72, 0, 1)`.
   - **Proofs:**
     - The entrance case (`modal.test.ts:484`) and the bounce case (`:523`) compare the running transition with a specimen that resolves the same tokens.
     - The factor case (`:606`) reads `[undefined, value]` for the dialog under reduced motion.
   - **Runs:** `mmod-red.log.txt:350` and `:366` fail, and `mmod-green.log.txt:316` shows 111 passed.
   - **Design fit:** the design verdict's Modal dialog row asks for `scale(0.96)` to `none` over panel on the panel curve, with the static `1.02` bounce on the same timing. The change delivers exactly that.

2. **CONFIRMED — The host fade.**
   - **Mechanism:**
     - `.modal` and `.fade` tie on specificity in the `components` layer.
     - The barrel loads `components/fade` at `src/styles/index.scss:59` and `components/modal` at `:75`, the same order as the release's `_transitions` and `_modal` partials.
   - **Load-order reversal:** if the order were reversed, `.fade` would win and the host would read the feedback duration. That is the state the red run measured: `mmod-red.log.txt:389` shows `[150,'ease-out','0']` against `[250,…]`. The case asserts `expect(panel).not.toBe(feedback)`, so its control separates the two rules.
   - **Scope of the rule:** `transition` is not inherited, so only the host moves.
   - **Design ruling: the load-order form is the right shape here, not a fragile one.**
     - The obvious alternative, a `.modal.fade` compound, would add a selector outside the release record. `MODAL_SELECTORS` and the selector case at `modal.test.ts:52` refuse such a selector (report § Unknowns' answers).
     - The guide already documents the same order-based tie for fade and collapse (`guides/veneer.md:4629-4632`), so this is house style.
     - The host case pins the order with an assertion.
     - The backdrops use a compound, and the host does not. That asymmetry follows one principle: write only on a selector the release records. It is consistent, not incoherent.
   - One adjacent behaviour is carried as referral R1.

3. **CONFIRMED — The backdrop fade.**
   - **Rule:** the mixin writes the transition inside `&.fade` (`_mixins.scss`, diff lines 223–226).
   - **Built cascade:** both compounds appear in the gate output (`mmod-conformance-first.log.txt:77`, `:79`). Each compound's specificity is 0,2,0 against `.fade`'s 0,1,0.
   - **Plain backdrop:** the mixin case asserts `readDuration(still) === 0` and `still.getAnimations()` equal to `[]`.
   - **Opacity and blur:** the modal backdrop case asserts `0` to `MODAL_GEOMETRY.opacity` and `none none` for the filters. The offcanvas case asserts the same with `OFFCANVAS_GEOMETRY.opacity`.
   - **Offcanvas panel:** `_offcanvas.scss` is absent from `mmod-status.txt`.

4. **CONFIRMED — The proofs.** All seven failed with `AssertionError` at base (`mmod-red.log.txt:326-458`) and pass green. The factor cases assert ratios: the modal case divides by `base`, and the offcanvas case divides by `panel`. Both `afterEach` hooks remove `TOKEN_NAMES.factor.motion`. Both plants fail with `AssertionError` and log `restored=identical`. The mutations, per case:

   | Case | Mutation that kills it | Assertion that fails | Distinguishes it? |
   | --- | --- | --- | --- |
   | Entrance | The `translate(0, -50px)` plant | `mmod-plant-translate.log.txt:324`; an `ease-out` curve would fail the `[duration, easing, start]` tuple | Yes |
   | Bounce | A static bounce on its own `0.3s ease-out` | `[300,'ease-out']` against `[250,…]` (`mmod-red.log.txt:366`) | Yes |
   | Host | The `.modal` include removed, or the barrel order reversed | Reads 150 (`mmod-red.log.txt:389`) | Yes, because `panel !== feedback` is asserted |
   | Factor | A literal `250ms` on the dialog | `[2,1,2]` (`mmod-red.log.txt:412`) | Yes |
   | Factor | A transition written without the mixin | The media-condition assertion (`mmod-plant-backdrop-feedback.log.txt:351`) | Yes. The ratio alone does not catch this, because `.fade` is factor-scaled too |
   | Modal backdrop | The backdrop-feedback plant | `mmod-plant-backdrop-feedback.log.txt:372` | Yes |
   | Modal backdrop | A planted blur | The `['none','none']` assertion | Yes |
   | Offcanvas backdrop | The backdrop-feedback plant | `mmod-plant-backdrop-feedback.log.txt:395` | Yes |
   | Mixin | The backdrop-feedback plant | `mmod-plant-backdrop-feedback.log.txt:328` | Yes |
   | Mixin | The transition moved to the base rule | The `still` duration and animations assertions | Yes |

   Evidence caveats go to referrals R2 and R3.

5. **CONFIRMED — The ledger rows.**
   - **Gate equality:** the rows equal the gate's printout (`mmod-conformance-first.log.txt:53-54`, `:75-80` against diff lines 170–171 and 196–201), and the final run passed 29 (`mmod-conformance.log.txt:11`).
   - **Preamble:** it is true. `guides/veneer.md:10209` defines a `declaration` addition as one "the release omits at a site it writes". The release records `.modal`, `.modal-backdrop.fade`, and `.offcanvas-backdrop.fade` but writes no `transition` on them.
   - **One decision:** the additions/departures split reads as one decision. The ledger is keyed by selector, and the sentence at `:5586-5588` says so in one line beside the departure bullet.
   - **Category cells:**
     - The `transform` row's `declared` is true of its value under the legend at `:7575-7576`.
     - The `transition` row's `tokenized` is **not** true of its value under the legend at `:7573`, which says a `tokenized` row "routes the release value through a Veneer token". The row resolves to 250ms on the panel curve, not 0.3s `ease-out`.
     - That cell is the gate's textual classification (`:7565`), which the unit cannot choose. The ledger-values verdict, Ruling 2, already records the legend as false until LEDGER-RETUNE lands, so this is not the unit's defect.
   - **LEDGER-RETUNE:** its `retuned` member reclassifies both departure rows (`transform` and `transition`) to `retuned`. It touches none of the six Additions rows, which carry no `Departure` cell.

6. **CONFIRMED — Engine and showcase.**
   - `mmod-engine.log.txt:6` shows 136 passed, and `mmod-app.log.txt:1599` shows 223 passed, each with `exit=0`.
   - The pin search rests on the writer's report. The passing engine and app runs corroborate it independently.

7. **BROKEN — The guide prose.** The most important sentence fails "true, read once":
   - **(a) False causal link** at `guides/veneer.md:5535-5538`: "writes the fade's transition on the `.modal-backdrop.fade` compound through the `transition` mixin, so the offcanvas backdrop takes the same motion".
     - **What is wrong:** the mixin writes on its caller's `&.fade`. The offcanvas backdrop moves because `.offcanvas-backdrop` includes the same mixin, not because of the `.modal-backdrop.fade` compound. A first read either infers that the offcanvas backdrop matches the modal compound, which is false, or cannot follow the sentence.
     - **What right looks like:** "…writes the fade's transition on the backdrop's `.fade` compound through the `transition` mixin, so neither backdrop moves under the reduced-motion preference. The offcanvas backdrop includes the same mixin, so it takes the same motion."
   - **(b) Forward reference** at `:5534`: "the host's own timing". The term "host" and its timing first appear two paragraphs later (`:5554`).
     - **What right looks like:** "…on the `--vn-ease-out` curve, the timing the modal host fades on, which the dialog paragraph states," or drop the appositive.
   - **(c) One concept, two terms** at `:5552-5553`: "scales the dialog to a `1.02` factor".
     - **What is wrong:** it sits one sentence after "the `--vn-factor-motion` factor" and in the same paragraph as "rests at a `0.96` scale". "Factor" now carries two senses, and the scale has two names. The test title says "1.02 scale" (`modal.test.ts:523`).
     - **What right looks like:** "grows the dialog to a `1.02` scale on the same transition".
   - **(d) Misattached phrase** at `:5556-5557`: "because the barrel loads the modal partial after the fade partial at one specificity".
     - **What is wrong:** "at one specificity" attaches to the loading.
     - **What right looks like:** "because the two rules tie on specificity in the `components` layer and the barrel loads the modal partial after the fade partial". This matches the § Fade phrasing at `:4631`.
   - **(e) Reason cell** at `:10598`: the offcanvas row explains the offcanvas backdrop by "the panel timing the modal host fades on". The mixin comment at `src/styles/_mixins.scss:626` frames the shared mixin the same way.
     - **What right looks like:** name the timing by its tokens ("over the panel duration on the ease-out curve"), not by one caller's element.
   - **Non-blocking cleanup:** the rewrapped lines at `:2601` and `:5982-5983` break the paragraph wrap.
   - **What holds:** the departure bullet (`:5581-5584`), the additions sentence, the proof enumeration (`:5601-5609`), the § Offcanvas classes sentences (`:5905-5909`), and the `## Engine` offcanvas paragraph (`:2599-2602`) are true. The panel's 0.3s is still the longer wait, and the reduced-motion `none` sits on `.offcanvas-backdrop.fade`.

8. **CONFIRMED — The design verdict.** The change delivers the design verdict (`e-id-motion-design-verdict.md:21-22`, `:14`, and unit 4 at `:57`):
   - the `0.96` scale and the `1.02` bounce on one timing;
   - panel duration and panel curve on the dialog;
   - panel duration and `ease-out` on the host and both backdrops;
   - the backdrop fading `0` to `0.5` with no blur;
   - one `overlay-backdrop` mixin for both backdrops;
   - every value on a factor-scaled token, written through the `transition` mixin;
   - every declaration landing as a departure or addition row.

   The § Proof "plant restores Bootstrap's literal" obligation is met by the base-cascade red run plus the translate plant.

9. **CONFIRMED — The § Factors patch.** The report patch (`e-id-motion-modal-report.md:197-203`) removes exactly `modal dialog,` from the list in the `mfac.diff:179-183` paragraph. After this change the dialog's duration reads `--vn-motion-panel`, which is factor-scaled. The patched paragraph is still false; see F1.

10. **CONFIRMED — Scope and gates.**
    - **Status:** `mmod-status.txt` lists six modified files. Each is owned under the brief's Scope (`e-id-motion-modal-brief.md:69-73`): the guide edits are backdrop and modal motion prose and their ledger rows, and `offcanvas.test.ts` is "the backdrop's style proof".
    - **Gates:** each log records `exit=0`: check, lint-check, oxfmt-check, conformance, guides, policy, build-src, engine, and app.

## Findings outside the claims

- **F1 — The § Factors paragraph stays false after the patch.**
  - **Where:** `mfac.diff:181-183` as patched by `e-id-motion-modal-report.md:199`.
  - **What is wrong:** the paragraph's second sentence says every scaled duration "resolves to the release's value at a factor of `1`". After this unit, three durations resolve to 250ms: the modal dialog, whose release value is 0.3s, and the modal host and both backdrops, whose release value is 0.15s through `.fade`. The patch moves the dialog under that false sentence and "changes nothing else", so the § Factors paragraph ships false for four elements.
  - **Why it matters:** the guide is the package's contract. The later COLLAPSE, CAROUSEL, and OFFCANVAS units will hit the same sentence.
  - **What right looks like:** replace the second sentence at landing with: "A scaled duration either reads a `--vn-motion-*` token, which resolves to the value its section records at a factor of `1`, or multiplies the release's own duration by the factor, which resolves to the release's value at a factor of `1`; each doubles at a factor of `2` and starts no transition at a factor of `0`."

- **F2 — The offcanvas proof title can read as the opposite of what it proves.**
  - **Where:** `tests/src/styles/components/offcanvas.test.ts:140`, the title "…rescaled by the motion factor and still under the reduced-motion preference".
  - **What is wrong:** "still" reads first as "and continues to be rescaled under reduced motion". The case asserts the reverse: no transition (`[undefined, '0', '0']` at `:194` and `:196`).
  - **Why it matters:** the unit brief (`e-id-motion-modal-brief.md:55`) says "Name each test for what it proves".
  - **What right looks like:** use the sibling case's wording (`modal.test.ts:606`): "…fades the backdrop in over the panel duration on the ease-out curve, doubles it at a doubled motion factor, and runs none at a zero factor or under the reduced-motion preference".

- **F3 — The offcanvas proof uses the hidden opacity as a stand-in for a missing transition.**
  - **Where:** `offcanvas.test.ts:170`: `readings.push([sample?.duration, sample?.easing ?? hidden, sample?.midpoint ?? hidden])`.
  - **What is wrong:** the tuple's second and third slots hold an easing and a midpoint when a transition runs, the hidden opacity when none does, and the filters in alternate rows. The expected rows at `:190-197` can be read only through the comment at `:188-189`. `AGENTS.md` § Design laws says absence is `undefined` and forbids sentinels.
  - **What right looks like:** match the modal factor case's shape: push `[sample?.duration, readStyle(backdrop, 'opacity')]` after `finish()`, read the filters in their own assertion, and expect `[undefined, opacity]` at a zero factor and under reduced motion.

- **Non-blocking comment:** the clause "a second reading that could disagree with it" in `modal.test.ts:481` has no clear antecedent. Rewrite it when F2 and F3 are addressed. It is not a finding.

## Referrals

- **R1, to the objective lane.** The `.modal` rule declares its opacity transition on every modal, not only one carrying `fade`. A plain modal whose opacity a consumer changes, for example with an `opacity-*` utility from `utilities/opacity`, now animates over 250ms, while the release's plain modal changes instantly. The guide sentence at `:5557-5558` ("holds its opacity, so no transition runs on it") states the engine-driven case only. Rule whether this is reachable through a documented seam, and whether the sentence needs the qualifier "an engine writes no opacity on it".
- **R2, to the objective lane.** Deleting the `.modal.modal-static .modal-dialog` rule or the dialog's transition makes the bounce and entrance cases throw from `requireValue` ("No bounce transition", "No entering transition"). They throw a plain `Error`, not an `AssertionError`. By the claims file's kill standard, the conformance ledger, not these cases, catches that deletion. The removed case "scales a static dialog over the settled one" was an assertion kill. Rule whether the claim 4 set needs an assertion on that mutation.
- **R3, to the objective lane.** The plant logs name the factor case at `modal.test.ts:596` and the backdrop case at `:699`. The red log names `:599` and `:702`, and the final file has `:606` and `:709`. The plants therefore ran on an intermediate test file, before the no-`fade` control was added. The kills plausibly carry over, because the control only adds assertions to the host case. Confirm, or re-run the plants on the final file.
- **R4, to the objective lane.** E32 (`engine/decisions.md:321`) requires Modal's show to settle on both the host and the dialog. After this change they run for equal durations on different curves. The engine log passes, but confirm that the Modal engine settles on both rather than on the dialog alone.
- **R5, to the Orchestrator.** LEDGER-RETUNE rewrites the same § Departures table under the `toast` heading and renames `declared` to `restated`. Whichever of MMOD and RETUNE lands second must regenerate the two dialog rows; both will read `retuned`. F1's replacement sentence belongs in the E-ID-MOTION-FACTOR landing that applies the patch.

## Attacked and held

- **Two mechanisms in one change.** I tested whether the host's load-order form and the backdrops' compound form are two unrelated fixes. They are one rule: write only on a release-recorded selector. The host proof pins the order.
- **"Settle together".** I tested whether the host and the dialog "settle together" with different curves. Both run 250ms from the same class write, so they end together, and the sentence is true.
- **Engine paragraph after the change.** I tested whether the `## Engine` offcanvas paragraph turned false: 0.3s is longer than 250ms at factor 1, and at factor 2 the backdrop (500ms) is longer. "The longer of the two" holds either way.
- **§ Fade classes.** I tested whether § Fade classes (`:4608-4612`) is now stale for the modal. It routes the compounds to § Modal classes and § Offcanvas classes, and those sections state the override. That is adequate.
- **Reduced-motion reason cells.** I tested whether the reduced-motion Reason cells break house voice. They match the `reboot` precedent at `:10322`.

VERDICT: FAIL 7; outside the claims: F1, F2, F3
