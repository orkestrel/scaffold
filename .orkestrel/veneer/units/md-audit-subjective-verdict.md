**Lane: subjective**, run as `reviewer` on Opus 5.5. The `opus` role on Opus 5.5 wrote the subject, which is the same engine as this lane, so I attacked its choices harder rather than deferring to them. I read the evidence and ran nothing. Rulings on proofs rest on the case assertions in `md.diff`, the retained logs `md-mutations.log.txt`, `md-failfirst.log.txt`, and `md-gates.txt`, and the patch.

## Verdicts

**1. Scope and delta: UNRESOLVED**
- **Held:**
  - `md-status.txt:1-4` lists exactly the four owned paths.
  - `md.diff` carries only those four files (its `diff --git` headers at lines 1, 271, 845, and 871).
  - `md-shared.patch` touches only the Shared files plus `tests/src/styles/fixtures/mixins.scss`.
  - `CLOSE_DEFERRED` keeps the toast and offcanvas entries (patch:1210-1214), and so does § Deferred selectors (patch:263-265).
  - The barrel and the showcase add only modal lines (patch:828, 16, 133, 847).
  - The § Compatibility hunk is −216/+219, which is the three modal rows over the re-pad.
- **Unresolved:**
  - No retained log shows `git apply --check` against a fresh extract of `2a3f223`. Only the report asserts it (`b-modal-md-report.md:5-6`).
  - To settle it, the Orchestrator runs `git apply --check md-shared.patch` on `git archive 2a3f223`.
  - Referred to the objective lane.

**2. The partial against the oracle: BROKEN** (design fit of the fullscreen shape)
- **What is wrong:**
  - The fullscreen rule set is written twice: `_modal.scss:214-234` (unconditioned) and `_modal.scss:239-263` (the walk).
  - The report's reason for this is false. `b-modal-md-report.md:355-358` says "a one-caller mixin is refused". But the tree already has a second caller of the same shape at `2a3f223`. `src/styles/components/_table.scss:132-144` writes `.table-responsive` unconditioned and again inside `@each … breakpoint-down`.
  - The release writes both classes once. It walks `media-breakpoint-down` with `breakpoint-infix` (`node_modules/bootstrap/scss/_modal.scss:212-217`, `_tables.scss:162-166`). Its `media-breakpoint-down` emits the content unconditioned at zero (`mixins/_breakpoints.scss:43-46, 74-83`).
  - Bootstrap's `_offcanvas.scss:29-34` uses the same down-walk with the unsuffixed class at the open end. OFFCANVAS is therefore a likely third caller; I have not checked its partial.
  - Two rules in `.claude/rules/styles.md` fire: "If a pattern appears in at least two partials, move it to `_mixins.scss`" and "drive shared structure with one `@each`".
- **The shape that writes it once:** add a down-direction twin of the `breakpoint-each` mixin to `src/styles/_mixins.scss` (`breakpoint-each` is at `:156-166`).
  - The twin walks `breakpoints()`. At the zero entry it emits `@content ('', $boundary)` with no media wrapper. Elsewhere it emits under `(width < boundary)` with `-#{$name}`.
  - `_modal.scss` then writes `.modal-fullscreen#{$postfix}` once, where `$postfix` is `''` or `'#{$infix}-down'`.
  - `_table.scss` writes `.table-responsive#{$infix}` once.
  - The output order is unchanged, because the unsuffixed rule still comes first.
- **Scope:** this needs `_mixins.scss` beyond the fixed block, plus `_table.scss`. The unit was not granted either, so it was right not to widen its scope. Carry this as a successor unit, and state the one-caller premise as false in the record.
- **Rest of the claim, held:**
  - Rung bindings: `_modal.scss:17` and `:117`.
  - The backdrop goes through the mixin: `:120-124`.
  - No literal colour: `:37` is an empty interpolation.
  - The transition goes through the mixin: `:66`.
  - No `!important`, and every rule is in the components layer.
  - The conformance duplication gate is green (`md-gates.txt:8`).

**3. The proofs distinguish their mutations: CONFIRMED**

Source: the case assertions plus `md-mutations.log.txt`. Each mutation below reddens its named case, and each case's assertions tell the mutation apart from the passing case.

| Mutation | Case that reddens | How the assertion tells it apart |
| --- | --- | --- |
| rung literal `1055` or `1050` | `modal.test.ts:100` | the retuned wrapper expects `'7'`/`'3'` (`:117-120`); log `:3-12` |
| mixin `&.show` block dropped | `modal.test.ts:538`, `mixins.test.ts:118` | `fade show` backdrop reads `'0'`, expected `0.5`/`0.25`; log `:13-19` |
| mixin declaration dropped | mixin case | exact `Array.from(rule.style)` list (patch:1400-1408); log `:20-24` |
| boundary shifted | `modal.test.ts:310` | reads one pixel below and at each boundary; log `:25-39` |
| fullscreen ramp gated up | `modal.test.ts:363` | `filled` below the boundary; log `:40-49` |
| centered alignment dropped | `modal.test.ts:416` | `center` against `middle`; log `:50-54` |
| scrollable height dropped | `modal.test.ts:451` | `frame.height`; log `:55-60` |
| transition written without the mixin | `modal.test.ts:478` | reduced-motion row expects `0s`; log `:61-65` |
| static rule dropped | `modal.test.ts:522` | log `:66-71` |
| combinator written on the modal | `modal.test.ts:262` | body control expects margin 0; log `:72-77` |
| literal content colour | `modal.test.ts:226` | light and dark runs; log `:78-83` |
| density literal | `modal.test.ts:126`, `:143` | `doubled` row; log `:84-89` |
| section mutations | `ModalSection.test.ts` | log `:91-131`, each reddening its named case |

The failing-first run exits 1 with `30 failed | 16 passed (46)` (`md-failfirst.log.txt:7`). That is the 29 modal cases plus the close case that reads `CLOSE_DEFERRED`.

The mixin failing-first result is a compile failure (`Tests no tests`, `:44`), not an assertion. The declaration-dropped mutation closes that gap.

**4. The mixin and the close combinator: CONFIRMED**
- The `overlay-backdrop` block (patch:801-820) matches the brief's block byte for byte (`b-modal-md-brief.md:54-73`). It is appended at the end of the file, after the `utility-variable` mixin (`_mixins.scss:419`).
- Its case reads the declaration list, the box, `position`, `z-index`, the fill, and opacity across `''`, `fade`, `fade show`, and `show` (patch:1393-1433).
- The patch moves the combinator from `CLOSE_DEFERRED` to `CLOSE_SELECTORS` (patch:1206, 1212).
- The `Overlays` row is deleted (patch:264), and the close partition case has no hunk.
- The header control's proof reads the header inset and a body control reading margin 0 (`modal.test.ts:262-286`).

**5. The section and its specimens: BROKEN** (specimen names)
- **What is wrong:**
  - The specimens `Fullscreen modal sm` through `xxl` render the `modal-fullscreen-{infix}-down` classes, but the names drop the direction word.
  - Sources: the `MODAL_SPECIMENS` map (patch:87-93, `app/browser/constants.ts` around line 1650), the `CaptureSubject` union (patch:934-938), and the `CASCADE_KEYS` rows (patch:1006-1032).
  - In this showcase, a trailing infix means "from that boundary up". The sibling specimens `List group horizontal sm`, `Dropdown align sm`, and `Navbar expand sm` (`constants.ts:1422`, `:1942`, `:2524`) each mirror an up-direction class.
  - So `Fullscreen modal sm` reads as the opposite of what the class does. The guide's own term is "`{infix}-down`" (patch:219).
- **Why it matters:** the capture registry addresses frames by specimen name. A misleading name persists into every scenario id.
- **Right look:**
  - Names `Fullscreen modal sm down` through `Fullscreen modal xxl down`.
  - Scenario ids `fullscreen-modal-sm-down` through `-xxl-down`.
  - Update `constants.ts`, the `CaptureSubject` union, and the `CASCADE_KEYS` rows in `tests/setup.ts` together.
- **Optional tidy-up:** the scrollable body is chosen by `id === 'scrollable'` inside the generic template (patch:98). The `CLOSE_SPECIMENS` precedent branches on a data field instead (`constants.ts:1582`), so a `body` field is the tidier form. This is not required.
- **Held:**
  - `ModalSection.ts:1-20` mirrors `AlertSection.ts:1-20` exactly.
  - The markup has no inline style, and `d-block` is explained in one guide sentence (patch:239-240).
  - The backdrop appears only in `Shown modal`.
  - Every dialog has `role="dialog"` and no `aria-modal`, and the `resolveAccessible` refusal reading pins that (`ModalSection.test.ts:171-181`).
  - Every close control has `aria-label="Close"`, and no specimen has `modal-open`.
  - Every specimen sits inside the `.viewport` frame, with fit proved at each width in `VIEWPORT_WIDTHS`, including the 390 and 1280 variants in the log (`:97-98`).
  - The non-modal classes are `d-block`, `btn`, `btn-primary`, `btn-secondary`, and `viewport`. All of them are in the `2a3f223` tree.

**6. Registries and orders: CONFIRMED**
- There is one `CASCADE_KEYS` row per specimen, and each selector sits inside its own `.modal` (patch:958-1034). The section proof asserts exactly one row per specimen and that the specimen renders the row's selector (`ModalSection.test.ts:69-80`).
- There is no `DRIVEN_KEYS` hunk.
- The orders agree with each other and with M14 and M19:
  - Showcase and index after Accordion (patch:16, 133, 847).
  - `listed` in alphabetical order (patch:899).
  - The order cases after `'close'` (patch:907, 915).
  - The barrel after `components/close` (patch:828).
- The modal tables are frozen and exported (patch:1226-1364). They are bound to the inventory by derivation, and a freeze case checks them (patch:1091-1194).

**7. The guide: BROKEN**
- **(a) The variable row claims a value no rule applies.**
  - The row says "each one is read beside the property it drives" (md-shared.patch:690).
  - `--bs-modal-box-shadow` (`_modal.scss:26`, `:185`) drives no property, and `modal.test.ts` never reads it.
  - This breaks the claim's box-shadow clause and note 1, rule 4.
  - Right look: "…each one that a rule applies is read beside the property it drives; the `--bs-modal-box-shadow` property is declared and applied by no rule."
- **(b) The Modal `plugin` row (patch:741) omits release obligations.**
  - The `[data-bs-dismiss="modal"]` trigger: `enableDismissTrigger(Modal)` at `modal.js:370`.
  - The `dispose` method: `modal.js:143`, and first terrain § B lists it (`b-modal-terrain-report.md:31`).
  - Returning focus to the trigger after the dialog hides: `modal.js:352-355`, terrain `:35`.
  - It says the release sets `role` and `aria-modal` on show, but not that it removes them on hide (`modal.js:248-249`).
  - The Alert precedent row begins with its dismiss trigger.
  - Right look: add a clause for each of these to the row, and keep "Owner: J-ENGINE." at the end.
- **(c) The stacking sentence is false for two rungs.** This is the Orchestrator's given ruling, and I rule it wrong.
  - The sentence at patch:287-289 says "Bootstrap declares each rung as a variable on its component's rule".
  - `-sticky` and `-fixed` are literal `z-index: $zindex-sticky`/`$zindex-fixed` in `bootstrap/scss/helpers/_position.scss:8,16,27,33`. They have no variable.
  - The unit's own Alias cell ("no alias on the other rungs", patch:273) contradicts that paragraph.
  - Right look: "Bootstrap declares each rung except the sticky and fixed levels as a variable on its component's rule, and writes those levels as literals in its position helpers; a component Veneer ships binds that variable to its rung, and the Alias column names each binding."
- **Held:**
  - The § Files row is in barrel position (patch:144), and so is `### Modal classes`, between Close and Carousel.
  - The `#### modal` rows equal the report's measured rows (patch:301-310 against report:60-69).
  - The Alias cells are right.
  - Every sentence of the section prose I checked against `_modal.scss` is true (patch:154-255).
- **Minor:** patch:244-246 ("its frame would be the frame of the dialog without it") does not read on the first pass. Say that it renders the same frame as the dialog alone.

**8. Law and report: BROKEN**
- **Banned terms in the report:**
  - `b-modal-md-report.md:121`: "Every selector below" uses `below` as a cross-reference. Use "following".
  - `:173`: "the failing-first run above" uses `above` as a cross-reference. Use "preceding".
  - `:172`: "The case now also requires" is a temporal `now`. Delete the word.
- **False report statement:**
  - `:335` says "The literal `Shown modal` name remains once."
  - It appears four times: `ModalSection.test.ts:119`, `:120`, `:128`, and `:173`.
- **Counts of growable sets in added prose:**
  - The `MODAL_SELECTORS` TSDoc (patch:1239-1240): "several of these twice" and "each of its two boundaries".
  - `ModalSection.test.ts:23`: "both stylesheets" tallies without naming them.
  - Fix: name the members, or recast the sentence without the number.
- **Gate commands:** the gate table records two commands as paraphrase rather than as the command that ran (report:212, :218: "`<every touched file>`" and "the same project over…").
- **Held:**
  - The only `as` uses are const assertions: `modal.test.ts:86, 213, 247, 324` and patch:1102, 1162.
  - No `!`, no suppression, no mock, and no nested function outside a direct callback.
- **Counts the report states, listed for the record:**
  - Owned-file lengths "264, 568, 20, and 253 lines" (:44).
  - `16 files changed, 895 insertions(+), 223 deletions(-)` (:46).
  - `Tests 30 failed | 16 passed (46)` (:157).
  - `Tests 57 passed (57)` (:160, :216).
  - `Tests no tests` (:163).
  - Mutation summaries (:179-199):
    - `1 failed | 28 passed (29)`
    - `3 failed | 37 passed (40)`
    - `1 failed | 10 passed (11)`
    - `2 failed | 27 passed (29)`
    - `5 failed | 24 passed (29)`
    - `6 failed | 23 passed (29)`
    - `4 failed | 2 passed (6)`
    - `1 failed | 5 passed (6)`
    - `3 failed | 3 passed (6)`
    - `2 failed | 4 passed (6)`
  - Gate results `6 passed (6)`, `5 passed (5)`, `22 passed (22)`, `19 passed (19)`, `109 passed | 1 skipped (110)`, and `227 passed (227)` (:217-222).
  - `118 passed (118)` (:229), the `10100 ms` timeout (:233), and `101 passed (101)` (:233).
  - Baseline `22 passed (22)` and `17 passed (17)` (:237-238).
  - Frame-fit measurements, including the 384px frame height and the pixel spans (:261-266).
  - "the two controls" (:278).
  - "remains once" (:335).
  - "written twice" and "once inside the walk" (:355, :358).

## Findings outside the claims

**F1. The partial's comment claims a value no rule applies.**
- `src/styles/components/_modal.scss:180-181` says that from the small boundary up "the dialog takes a wider margin and a deeper shadow".
- No rule applies `--bs-modal-box-shadow`: `.modal-content` at `:98-110` has no `box-shadow`.
- This breaks note 1, rule 4, the same defect class as claim 7(a).
- Right look: "From the small boundary up the dialog takes a wider margin, and it is capped at the width its size class names and centered in the modal."

**F2. "static dialog" names two different things.**
- The `MODAL_SPECIMENS` TSDoc (patch:45, `constants.ts` around line 1607) says "because a static dialog traps nothing". There it means a dialog rendered at rest.
- In the same file, `MODAL_COPY` (patch:31) uses "the bounce a static dialog gives" to mean `modal-static`. So does the case at `modal.test.ts:522`.
- This breaks the "One concept, one term" law.
- Right look: use the guide's own wording (patch:242), "because a dialog rendered at rest traps nothing".

**F3. The specimen TSDoc makes a false derivation claim.**
- It says "The size and fullscreen specimens are derived from one source list, so the steps cannot drift apart" (patch:46-47).
- The size specimens are written out one by one (patch:71-79). Only the fullscreen steps come from a list, and that list is a literal of its own (patch:87).
- Right look: "The fullscreen specimens are derived from one list of breakpoint names", or derive both from one list.

## Attacked and held
- **`d-block` stand-in.** Attacked as a foreign utility inside a component specimen. It held: Bootstrap's own documentation renders static modals the same way, and `.viewport` replaces its `position-static`.
- **Specimen table shape.** The leading-space `classes`/`dialog` fields and the list-then-map shape were attacked as ad hoc. They held: `CLOSE_SPECIMENS` (`constants.ts:1547-1587`) is the landed precedent.
- **`Shown modal` name.** It reads ambiguously, because every specimen carries `show`. It held as given: M4 and the brief fix that name.
- **`overlay-backdrop` mixin name.** Its noun-noun form sits loosely against the styles naming table. It held: M11 fixes the name.

## Referrals (to the objective lane)
- **Fixture literal colour.** `tests/src/styles/fixtures/mixins.scss` gains a literal `rgb(1, 2, 3)` (patch:1380). The styles rule "Never use literal colors" loads for `**/*.{scss,css}`, and no other fixture file carries a literal. Rule whether this fixture is exempt.
- **`visitBreakpoint` source.** The brief lists `visitBreakpoint` as an installed `@orkestrel/test` export (`b-modal-md-brief.md:107`). Both owned proofs import the tree's copy at `tests/setupBrowser.ts:210` instead. Rule whether the local copy duplicates the installed export. The helper predates this unit.
- **Patch application.** Claim 1's `git apply --check`.

VERDICT: FAIL 1, 2, 5, 7, 8; outside the claims: F1, F2, F3
