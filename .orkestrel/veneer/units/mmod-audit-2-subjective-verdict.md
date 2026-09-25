# E-ID-MOTION-MODAL audit round 2: subjective lane verdict

I held the **subjective** lane as `reviewer` on Opus 5.5, in a clean context. The dispatch has no defect: it supplied the full diff (`mmod-2.diff`), this round's own diff (`mmod-instruments/r2/mmod-2-delta.diff`), and the status (`mmod-2-status.txt`).

Paths:
- Evidence paths are under `/home/user/scaffold/.orkestrel/veneer/units/`.
- Worktree paths are under `/home/user/veneer-mmod`.

Opus 5.5 wrote this work, and the R1 wording it adopted is my own round-1 proposal. I attacked that wording harder for both reasons.

## Per-claim verdicts

1. **BROKEN — The prose.** One rewritten sentence fails "true of the built cascade and reads once": the sentence about a modal without the `fade` class.
   - **Where:**
     - `guides/veneer.md:5559-5560`: "On a modal without the `fade` class, an engine writes no opacity, so no transition runs as the engine shows or hides that modal."
     - The same claim in `src/styles/components/_modal.scss:53-54`.
   - **What is wrong:** an engine writes no opacity on *any* modal.
     - A search for `opacity` in `src/browser/` returns no match. The engine writes classes (`constants.ts:402-404`) and the inline `display` style (`guides/veneer.md:5494-5495`).
     - On a modal with `fade`, the opacity moves only because the `.fade` hidden-state rule stops applying when `show` joins. § Fade classes says so at `guides/veneer.md:4614-4617`: "no rule writes an opacity for the shown state".
     - The opening clause "On a modal without the `fade` class" implies a contrast, namely that an engine does write opacity on a fading modal. That is false.
     - The "so" draws the no-transition conclusion from a premise that is equally true of the fading host, and the host transitions two sentences earlier (`:5555-5557`). A first read either takes in the false contrast or has to reconcile the two sentences.
     - The host case's comment states the cascade reason correctly: `modal.test.ts` (the plain-modal control in the host case, around line 596) says the modal "holds its opacity as the `show` class joins". The guide and the partial now explain one fact two different ways.
   - **Why it matters:** the sentence exists to scope R1, the transition that runs on every `.modal`. Its explanation is about the engine rather than the cascade, so it teaches the wrong mechanism to the consumer R1 was about.
   - **What right looks like:**
     - Guide: "A modal without the `fade` class keeps its opacity as an engine adds and removes the `show` class, so no transition runs as the engine shows or hides it."
     - `_modal.scss`: "A modal without that class keeps its opacity as an engine adds and removes the `show` class, so no transition runs as the engine shows or hides it."
     - Both keep R1's engine-case scope.
   - **What held in claim 1:**
     - (a) `:5536-5539`: the backdrop's `.fade` compound, then a separate sentence saying the offcanvas backdrop includes the same mixin. The causal link is true.
     - (b) No "host" appears before `:5555` ("The modal host"). § Modal classes opens at `:5486`, and I read it through to that line.
     - (c) "factor" keeps one sense: the density factor at `:5518`, the motion factor at `:5552-5553`, and the scale at `:5549` and `:5554`.
     - (d) `:5557-5559` states the tie and the load order as two facts, in the house form of § Card (`:5018`). `_modal.scss:51-53` does the same.
     - (e) The offcanvas Reason cell (`:10599`) and the mixin comment (`_mixins.scss:625-628`) name `--vn-motion-panel` and `--vn-ease-out`.

2. **CONFIRMED — The wraps.** I compared the delta word by word:
   - The `## Engine` hunk (`delta:3-10`, now `guides/veneer.md:2599-2602`) moves the break before "a microtask" and changes no word.
   - The § Offcanvas classes proof paragraph (`delta:58-71`, now around `:5982-5987`) keeps the same words in the same order.
   - `:2601` measures 95 columns. `:5531` fills 100 columns exactly, and in each paragraph the next word would overflow. The oxfmt `--check` run over the owned files passes (`r2/mmod-2-oxfmt-check.log.txt:4-6`).

3. **CONFIRMED — The offcanvas backdrop case.**
   - **Title:** the title at `offcanvas.test.ts:143` has three parts, and each maps to an assertion:
     - "over the panel duration on the ease-out curve" is `:197` plus the midpoint band at `:198-200`.
     - "doubles it at a doubled motion factor" is `:201-202`.
     - "runs none at a zero factor or under the reduced-motion preference" is `:203-208` plus the media condition at `:210-212`.
   - **Absence:** a reading with no transition carries `undefined` in the duration, easing, and midpoint slots (`:183-185`, `:206-207`).
   - **Opacity and filters:** the hidden and settled opacities sit in their own fields and are asserted for every condition (`:194-196`). The filters sit in their own collection (`:188`, `:209`). No sentinel remains.
   - **Mutation:** the backdrop-feedback plant fails this case at `:197` with `AssertionError: expected [ 150, 'ease-out' ] to deeply equal [ 250, 'ease-out' ]` (`r2/mmod-2-plant-backdrop-feedback.log.txt:396-408`). Its assertion separates the feedback timing from the panel timing, so it distinguishes the mutation.
   - **Comparison with round 1:** the reshape keeps every check round 1's shape made. It adds a direct `hidden` check and the doubled easing.

4. **CONFIRMED — The kills.**
   - **Dialog transition deleted** (`r2/mmod-2-plant-no-transition.log.txt:1-3`): it fails the entrance case (`:326-327`) and the bounce case (`:338-339`) with "expected undefined to be defined". It fails the factor case with "expected [ 250, undefined, 250 ] to not include undefined" (`:350-351`).
   - **Static rule deleted** (`r2/mmod-2-plant-no-static.log.txt:1-5`): it fails the selector case (`:328-329`) and the bounce case (`:354-355`), each with an `AssertionError`.
   - **Before rows:** they throw a plain `Error` at round 1's line numbers, `modal.test.ts` 484, 523, and 606 (`r2/mmod-2-plant-before-no-transition.log.txt:325-352`, `before-no-static:353-354`).
   - **Final file:** the translate and backdrop-feedback plants name the final lines 485, 618, 723, and offcanvas 143. They match the final `it(` sites.
   - **Restores:** every log records `restored=identical`, and the before rows also record `test-restored=identical`.
   - **Why the kills distinguish:** each presence assertion (`expect(sample).toBeDefined()`) separates a missing sample from a defined one. A missing sample is exactly the deleted-rule case.

5. **CONFIRMED — Nothing else moved.**
   - The delta touches only comments in `_mixins.scss` (`delta:86-95`) and `_modal.scss` (`delta:101-108`), so it changes no declaration.
   - Every hunk maps to a brief Item or a named ancillary choice:
     - Items 1 and 2: the backdrop paragraph.
     - Items 3, 4, and 5: the dialog paragraph.
     - Item 6: the Reason cell, the mixin comment, and the wraps.
     - Item 7: the offcanvas case and the entrance comment.
     - Item 8: the presence assertions.
     - Ancillary choices: the `_modal.scss` comment, the host-case comment, and the factor-case assertions (report § Ancillary choices).

6. **CONFIRMED — Scope and gates.**
   - `mmod-2-status.txt` lists the six owned files and nothing else.
   - Each gate log echoes its command and ends `exit=0`:
     - oxfmt `--check`, lint-check, and check.
     - Styles: 111 passed after `build=0`.
     - Conformance: 29 passed.
     - Guides.
     - Policy: 109 passed, 1 skipped.

## Round-1 findings: closure

The round-1 findings are ruled as follows:
- **7(a)–(d):** closed.
- **7(e):** closed for the offcanvas cell and the mixin comment.
- **The wraps:** closed.
- **F2 and F3:** closed (claim 3).
- **R2 and R3:** closed (claim 4).
- **R1:** not closed. The scope qualifier landed, but its stated reason is false by implication (claim 1). The engine-writes wording was my round-1 proposal and is withdrawn.
- **F1:** carried by E-ID-MOTION-FACTOR round 2, and not ruled here.
- **R4 and R5:** settled by the Orchestrator.
- **The round-1 comment note at `modal.test.ts:481`:** closed. The clause with no antecedent is gone. The new wording has a smaller issue, listed as a note under Referrals.

## Findings outside the claims

None.

## Referrals

- **To the Orchestrator: a carrier is needed.**
  - The modal backdrop's Reason cell (`guides/veneer.md:10597`) still reads "on the panel timing the modal host fades on".
  - The offcanvas row two lines later names the same `opacity var(--vn-motion-panel) var(--vn-ease-out)` value by its tokens, so adjacent rows use two terms for one timing.
  - The cell is true, so this is not a finding. The report left it for "the next unit that touches § Additions", which § Carry every finding forbids as a carrier.
  - Recommendation: fold it into the claim-1 fix unit, which already owns `guides/veneer.md`.
- **Non-blocking notes:**
  - At `modal.test.ts` around line 481, "resolves from the tokens apart from the dialog's rule" can read as "tokens other than the dialog's rule". "independently of the dialog's rule" reads once.
  - The mixin comment's "the compound outranks that rule" (`_mixins.scss:627`) has no antecedent inside the comment. "the backdrop's `.fade` compound" matches the guide.

## Attacked and held

- **Pronoun in the offcanvas title.** I tested whether "doubles it" could attach to the backdrop or the curve. Only the duration can be doubled, and the sibling modal title uses the same form.
- **"still" in the mixins case title.** In "leaves a backdrop without the fade class still" (`mixins.test.ts:208`), "still" follows its object as an adjective. It does not repeat F2's adverb misreading.
- **The offcanvas backdrop in § Modal classes.** I tested whether "The offcanvas backdrop includes the same mixin" is a forward reference. It is a full noun phrase that names another component, so no term is left unintroduced.

VERDICT: FAIL 1; outside the claims: none
