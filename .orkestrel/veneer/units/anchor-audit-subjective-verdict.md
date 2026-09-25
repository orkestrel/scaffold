E-ID-ANCHOR audit: subjective lane (`reviewer` on Opus 5.5, clean context, read-only)

I held the subjective lane. The writer (`opus`) runs on my engine, so I attacked this work harder. I executed nothing: every reading here comes from the retained logs and the worktree source.

## Verdicts

1. **CONFIRMED.** The rendered value holds on this host.
   - The base run fails each new case at the open-state assertion with `expected 'always' to be 'anchors-visible'` (`anchor-instruments/anchor-red.log.txt:233-266`). A closed-state initial value of `always` rules out Chromium 153, whose initial value is `anchors-visible` (`/home/user/scaffold/.orkestrel/veneer/engine/decisions.md:258`).
   - The green run exits 0 (`anchor-green.log.txt:231`). The assertions are at `dropdown.test.ts:91-97`, with twins in the tooltip and popover files.
   - Mutation, declaration deleted: each case fails (`anchor-mutation-styles.log.txt:596-679`), so the case distinguishes it.
   - Mutation, declaration written `!important`: the unlayered `.vn-consumer-visibility` twin reads `anchors-visible`, not `always`, so the case distinguishes it.
   - This confirms the computed value only. The paint claim is ruled under claim 7.

2. **CONFIRMED.** One rule per partial through one mixin is the right shape.
   - The probe's control, run on the final tree, reports no drift. The ledger records separate `dropdown`, `tooltip`, and `popover` rows, so each per-partial rule is attributed to its own key.
   - The combined plant reports as unrecorded rows under `dropdown` alone (`anchor-attribution-probe.log.txt:9-10`). The control therefore distinguishes the plant from the shipped state.
   - Each partial styles only its own class.
   - The three callers share one decision (E29 and D47), where a divergence is a defect. That meets `.claude/rules/styles.md` § Prohibitions (two or more partials, one shared decision).
   - `anchor-visibility` follows the house's noun-noun mixin names: `overlay-backdrop` (`_mixins.scss:626`), `focus-ring` (:381), and `heading-text` (:19). It describes what the rule does, per names.md § General vocabulary.
   - The mixin comment's truth is carried in F1.

3. **CONFIRMED.** The ledger rows hold.
   - Every `selector` row carries `—` and every `declaration` row carries `anchors-visible` (`anchor.diff:90-91, 99-102`).
   - The conformance gate exits 0.
   - Deleting the declaration fails `names no addition the compiled cascade no longer emits` and lists all six stale rows by name (`anchor-mutation-conformance.log.txt:12-25`). The gate distinguishes the mutation.

4. **BROKEN.** The dropdown enumeration comment contradicts itself.
   - At `/home/user/veneer-anchor/tests/src/styles/components/dropdown.test.ts:51-53` the comment says "The reading is the set of components-layer selectors", then "an extra selector and a second rule on a recorded selector leave the reading unchanged".
   - Failing state: add an extra selector such as `.dropdown-menu:popover-open` to the components layer. The `selected` set gains a member, so the reading changes. The case still passes, because it filters only `[...DROPDOWN_SELECTORS, ':where(.dropdown-menu):popover-open']` for absence.
   - This is the seam ruling's own defect class: the comment names an object the assertion does not read (`ebc-audit-3-verdict.md:29-38`).
   - Fix: "…so a missing selector reports here, and an extra selector or a second rule on a recorded selector passes unreported."
   - What held:
     - The dropdown title claims presence only, which is what the case asserts.
     - The tooltip and popover titles and comments follow the invariant ("no other components-layer selector"; a missing selector and an extra selector each report there).
     - Those titles name the admitted selector by its origin and its state, the same form as the carousel precedent (`carousel.test.ts:52`).

5. **CONFIRMED.** The mixins case narrowing holds.
   - The narrowed reboot population is still compared for equality against the unchanged `BUTTON_REBOOT_SELECTORS` (`mixins.test.ts:214-221`), and the gate is green. It therefore keeps exactly the rules it read before.
   - The mid-run log shows the old `startsWith(':where(')` population failing once the new rules exist (`anchor-mid.log.txt`).
   - Mutation: rewrite a reboot as `:where(button.nav-link):not(.x)`. That rule leaves the population, the recorded selector goes missing, and the equality fails. The case distinguishes it.
   - The `position-visibility` case walks every declaration in the shipped text (:267). It fails under the deletion (`anchor-mutation-styles.log.txt:540-541`).

6. **CONFIRMED on this host, Chromium 141.** Per case:
   - **Anchored-visibility cases (dropdown, tooltip, popover):**
     - Declaration deleted: red on 141 in the logs; distinguishes.
     - Rule written on the closed state: the closed reading is `anchors-visible` against an initial `always`; distinguishes on 141.
     - Written `!important`: distinguishes on every build.
     - `:where()` removed: does not distinguish, because an unlayered consumer wins at any specificity. Only the mixins case pins that form, through the selector text.
     - Wrong class passed to the include: distinguishes on 141.
   - **Enumeration cases:** the deletion fails each one (`anchor-mutation-styles.log.txt:575-576, 612-613, 653-654`). Tooltip and popover also distinguish an extra selector; dropdown does not (see claim 4).
   - **Mixins case:** the deletion, a changed selector, and an important flag each fail it, on any build.
   - No base-red reading exists for the mixins case. The mutated cascade holds no `position-visibility` declaration, as the base cascade holds none, so the mutation's red stands in for the base red.
   - How each comment describes these catches on Chromium 153 is F2.

7. **BROKEN.** Three separate defects, in `/home/user/veneer-anchor/guides/veneer.md` around lines 4715-4723 (§ Dropdown), 5641-5648 (§ Tooltip), and 5722-5729 (§ Popover), and in the Reason cells around lines 10487-10488 and 10584-10587.
   - **(a) The lead sentence overclaims on both builds.** "shows only while its toggle is visible" (and "trigger" in the tooltip and popover paragraphs) is false.
     - Failing state: rows `V.viewport` and `V.partial`. A viewport scroll or a partial clip suppresses nothing under `anchors-visible`, and the overlay stays hit-testable (`native141/j-native-probe-3-141.log.txt:118-120`; `engine/units/j-native-probe-3-153.log.txt:125-127`; `engine/decisions.md:260`).
     - Fix: "is not painted while a scroll container clips its toggle entirely." Delete the lead sentence, or merge it into the existing "under which" clause. The paragraph states the same thing twice, so it does not read once.
   - **(b) The dropdown paint claim is false on Chromium 141.**
     - The guide says "the rule gives both builds the same menu", and the Reason cell says "a promoted menu whose toggle is clipped out of view is not painted on either build".
     - Failing state: `V.clip.dropdown` on Chromium 141.0.7390.37 reads `"differs":false`. With the candidate rule applied, the clipped menu reads `hitIsOverlay: true` with `hit: "a.dropdown-item"` (`native141/j-native-probe-3-141.log.txt:114`). On 141 the engine never anchors the menu (`engine/units/j-placement-141-diagnosis-verdict.md:11, 29, 40`), and J-PLACEMENT-141-FIX has not landed.
     - D47 itself records suppression for the tooltip and popover only (`decisions-round-2.md:558`).
     - Fix: state only what is proven on both builds (the computed value), and put the paint outcome for the dropdown on 141 behind the placement fix, or state that limit. The tooltip and popover paint claims hold on both builds (`V.tooltip` and `V.popover` read `"differs":true` on each).
   - **(c) The override reason is wrong.** "The class sits inside `:where()`, so a consumer class … overrides the rule without `!important`" gives the wrong mechanism.
     - The proof's consumer is unlayered, and an unlayered rule outranks the `components` layer at any specificity. With `:where()` removed, the case stays green.
     - A consumer class in an earlier layer does not override the rule, `:where()` or not.
     - The guide already states the true mechanism at `veneer.md:3407-3408` ("a class of your own in a later layer, or in none, overrides … without a specificity contest"). Use that reason.
   - Voice: the paragraphs say "starts the property at", the mixin says "initial value", and the tests say "starting at". Use "initial value" everywhere.

8. **CONFIRMED.**
   - `anchor-status.txt` lists only files the brief owns. The brief grants the mixin and its test under D46 (`e-id-anchor-brief.md:57-58`).
   - Each of the seven gate logs ends `exit=0` (`anchor-gates-summary.log.txt:1-7`). The driver runs each gate bare, with no pipeline stage after it (`anchor-gates.sh:8-9`).

## Findings outside the claims

- **F1. The code comments carry the same overclaim as claim 7(a).**
  - Sites:
    - `src/styles/components/_dropdown.scss:273-274`
    - `_tooltip.scss`, the comment above `@include anchor-visibility(tooltip)`
    - `_popover.scss`, the comment above `@include anchor-visibility(popover)`
    - `src/styles/_mixins.scss:644-645`
  - Each says the overlay "shows only while its anchor/toggle/trigger is visible".
  - Failing state: `V.viewport` and `V.partial` on both builds. The dropdown comment's "so a menu whose toggle scrolls out of a scroller's clip is not painted" is also false on 141 (`V.clip.dropdown`, as in 7(b)).
  - The mixin comment's override clause has the same wrong reason as 7(c).
  - Fix: "is not painted while a scroll container clips its anchor entirely". Give the override reason as the layer and the absence of `!important`.
- **F2. The anatomy comments of the anchored-visibility cases claim catches they cannot make on Chromium 153.**
  - Sites: `dropdown.test.ts:68-72`, plus the `tooltip anchored visibility` and `popover anchored visibility` comments.
  - Each says "The mutation this catches is the open-state rule dropped, written on the closed menu, or written important."
  - State: Chromium 153.0.8010.12, where the initial value is `anchors-visible` (`engine/decisions.md:258`), and the engine session runs this suite on that host (D45). With the declaration deleted, the closed, open, and after-hide readings all equal `anchors-visible`, and the pinned twin reads `always`, so the case passes.
  - This is derived from that measured initial value, not executed. The settling run: the three cases on the engine session's Chromium 153 host, with the declaration deleted.
  - Fix: scope the dropped and closed-state catches to a build whose initial value is `always`. State that the `!important` catch holds on every build, and that the mixins case holds the rule's text everywhere.

## Referrals

- **R1, to the objective lane:**
  - `mixins.test.ts:269` uses `''` as the selector for a declaration whose parent is not a `Rule`, against the rule "Absence is `undefined`" in `AGENTS.md`.
  - The adjacent revert case (:247) still scopes its population with `startsWith(':where(')`, while the reboot case (:215) uses the whole-group pattern. One population now has two definitions.
- **R2, to the Orchestrator:** D47 (`decisions-round-2.md:560`) and E29 (`engine/decisions.md:229`) still name the combined `:where(.dropdown-menu, .tooltip, .popover)` rule. The shipped shape is one rule per partial, on the attribution evidence. Record that ruling in the owning decision.
- **R3, to the Orchestrator:** the corrected dropdown paint sentence and Reason cell (7(b)) depend on J-PLACEMENT-141-FIX and J-ANCHOR-VISIBLE. Name one carrier, and say whether the sentence states the Chromium 141 limit now or lands with the fix.

## Attacked and held

- Each of the three classes paragraphs repeats the same content in its own section. Each section is self-contained for a reader who lands there, so the repetition is correct.
- In the popover title, "open popover state" beside "popover class" reads as two uses of one word. It stays clear because the selector names `:popover-open`.
- `:popover-open` also matches the tooltip engine's `popover="hint"`, so the cases driving `popover="manual"` still reach the shipped path.

VERDICT: FAIL 4, 7; outside the claims: F1, F2
