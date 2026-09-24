# OFFCANVAS (`oc`) audit round 1: subjective-lane verdict

I held the subjective lane on Opus 5.5. I ran nothing and edited nothing. I ruled the gate and mutation claims from the code's assertions and the retained logs `oc-instruments/oc-mutations.log.txt`, `oc-gates.log.txt`, and `oc-cascade.log.txt`.

## Per-claim verdicts

**1. Scope and delta: CONFIRMED.**
- `oc-status.txt:1-6` lists the two modified owned tests and the four added offcanvas files, and nothing else.
- `oc.diff` carries exactly those six files.
- Every file `oc-shared.patch` touches is on the brief's Shared list (`b-modal-oc-brief.md:168-186`). None is vendored, off-limits, a sibling's, `src/browser/**`, `src/core/**`, `tests/setupServer.ts`, `tests/fixtures/**`, `package.json`, or `README.md`.
- The patch leaves the base's other entries in place: the toast and modal entries in `CLOSE_DEFERRED` (`oc-shared.patch:859-862`), only the drawer stack row changed (`:293-294`), one barrel line (`:433`), and one showcase line (`:17`).
- `oc-gates.log.txt:93` records `apply-check exit 0`.
- The § Compatibility rows (`oc-shared.patch:340-341`, `:349`) and the Alias cell (`:294`) close on the table's existing pipe columns.

**2. The partial against the oracle: CONFIRMED.**
- `_offcanvas.scss:78` binds `--bs-offcanvas-zindex: var(--vn-stack-drawer-base)` on every panel class.
- `_offcanvas.scss:154` passes `var(--vn-stack-drawer-backdrop)` and `var(--vn-palette-black-base)` through `overlay-backdrop`.
- Transitions go only through the `transition` mixin (`:105`, `:143`).
- Both important clear fills are kept (`:118`, `:129`).
- The only colour keyword is `transparent`, which the landed `_navbar.scss:193` precedent also uses.
- Mutation: `combinator-widened-to-offcanvas-btn-close` and `backdrop-without-mixin-no-states` each redden `writes the recorded offcanvas selectors and no other rule on their classes` (`oc-mutations.log.txt:105`, `:48`). That case's set equality separates a missing or extra selector from the passing case.
- Referral R3 covers the probe's missing control.

**3. The two emission sites: BROKEN.**
- **Why:** "The only way" is false, and the shape does not read as plainly as a declared rule set.
- **The release writes one site.** It uses `media-breakpoint-down($next)`, which emits its content unwrapped when `$next` is null (`node_modules/bootstrap/scss/_offcanvas.scss:29-34`; `mixins/_breakpoints.scss:43-45`, `:74-83`).
- **Veneer diverges only at the unbounded end.** Its `breakpoint-down` mixin emits nothing at zero (`_mixins.scss:168-180`).
- **The tree repeats this pattern in three partials, in three idioms:**
  - `_table.scss:132-144` (landed): the literal block written twice.
  - `/home/user/veneer-md/src/styles/components/_modal.scss:212-263` (MODAL): the literal block written twice.
  - `_offcanvas.scss`: the `$panel` and `$nested` maps of maps (`:9-60`), emitted by two verbatim 11-line loops (`:101-113` and `:139-151`).
- **The map form is the awkward machinery.** Selector strings sit as map keys, and plain declarations become `#{$property}: $value` loops.
- **The rule this breaks:** `.claude/rules/styles.md` ("If a pattern appears in at least two partials, move it to `_mixins.scss`").
- **The async-Sass refusal is irrelevant here.** `oc-sass-async-probe.mjs.txt` tests `meta.apply`. The tree's own `breakpoint-each` mixin already passes content arguments (`@content ($infix, $boundary)`, `_mixins.scss:155-166`) and builds under Vite.
- **Fix:** add the down-walk mirror of `breakpoint-each` to `_mixins.scss`.
  - At the zero name it yields the infix `''` and emits its content unwrapped (every width).
  - At each other name it yields `-{name}` and wraps the content in `(width < boundary)`, which is the release's `media-breakpoint-down` semantics.
  - `.offcanvas#{$infix}`, `.modal-fullscreen#{$postfix}`, and `.table-responsive#{$infix}` each become one site of plain declarations, and the maps retire.
  - The offcanvas `breakpoint-up` branch stays its own walk that skips zero, as the release guards it (`_offcanvas.scss:96` in bootstrap).
- **Constraint:** the bare offcanvas rule would move ahead of the ramp; the release writes it after. The bare and infixed classes select different elements, so no resolution should move. Rerun the order, ledger, and priority gates to prove it.
- **Carrier:** this is outside OFFCANVAS's M11 `_mixins.scss` grant, and the unit flagged it (`b-modal-oc-report.md:394-401`). It needs a unit that owns `_mixins.scss`, `tests/src/styles/mixins.test.ts`, `_table.scss`, `_modal.scss`, and `_offcanvas.scss`, after MODAL and OFFCANVAS land. That is the Orchestrator's assignment.

**4. The priority gate refinement: CONFIRMED.**
- The set comparison is at `oc-shared.patch:531-561`.
- The old case reported the release's own shape as a mismatch: `.offcanvas-sm … -xxl { background-color }: release normal, cascade important` (`oc-mutations.log.txt:234-238`).
- **Mutations:**
  - A dropped `!important` (`body-fill-important-dropped`) reddens the refined case (`:177-183`); the sets `{important}` and `{normal}` differ.
  - An added `!important` gives `{normal}` against `{important}`, or `{normal, important}` against `{important}`. Both differ. This is a derivation; no logged run backs it.
  - For a pair the release writes at one priority, the refined case is strictly stronger than the old one. The old case ORed the shipped priorities, so it missed a normal declaration beside an important one.
- **No priority mutation the old case caught escapes the refined one.** The mixed-priority pairs never passed under the old case.
- **Does it belong in this unit?** Yes. The unit's result makes the old case false, the file is Shared and report-only, and the change narrows the comparison rather than widening the gate's scope.
- **Remaining gap:** the principled shape keys by condition, which needs `SheetReader` in the off-limits `tests/setupServer.ts`. Referral R2 carries the gap this leaves.

**5. The proofs distinguish their mutations: CONFIRMED.** Each named run has its site, command, build and test exits, summary, and failing case in `oc-mutations.log.txt`, and each named case's assertions separate the mutation from the passing case:

| Mutation | Log lines | What distinguishes it |
| --- | --- | --- |
| `literal-rungs` | :34-40 | The stacking case's retune to `7` and `6` fails against the literal `1045` |
| `backdrop-without-mixin-no-states` | :42-49 | The fading backdrop reads `0.5`, not `0`, and the selector set loses `.fade` and `.show` |
| `backdrop-without-mixin-full-copy` | :51-57 | The duplication gate catches it; the browser proof cannot separate a full copy from the include |
| `placements-start-end-transforms-swapped` | :59-74 | The `m41` sign against the `sign` field |
| `show-rule-dropped` | :76-88 | Visibility reads hidden |
| `md-down-and-up-names-shifted-apart` | :90-96 | The reading at the boundary |
| `literal-colours` | :107-114 | The island retune in both modes |
| `transition-without-mixin` | :116-128 | The condition list, and `none` under reduced motion |
| `insets-literal` | :130-136 | The density retune |
| `title-margin-reset-dropped` | :300-306 | Against the probed-margin control heading |
| `ramp-nested-rules-dropped` | :308-313 | The ramp cases |
| Navbar width, transform, and border flags | :138-175 | The slot width `OFFCANVAS_GEOMETRY.width + 200`, the resting slide, and the border reading |
| Table bindings | :202-224 | The `offcanvas case tables` binding case |
| Section mutations | :248-289 | The section and navbar section proofs |

**6. The section, the specimens, and the navbar: CONFIRMED.**
- `OffcanvasSection.ts` (diff :322-329) matches the landed `AccordionSection.ts:12-20` shape exactly.
- The specimens (`oc-shared.patch:56-74`):
  - Names put the modifier first and end the ramp on its infix, per M14.
  - No `style` attribute appears, and the backdrop sits in `Start offcanvas` alone.
  - Panels carry `role="dialog"` and no `aria-modal`.
- The navbar toggler (`:111`) carries no `aria-expanded` attribute and no `collapsed` class, which matches `offcanvas.js` (it writes neither). The proof asserts it (diff :66-74).
- The navbar case keeps its name, and its reading moves to `fixed` and `flex` (diff :100-109).
- Populations derive from the tables (diff :906, :974-975; `NAVBAR_SELECTORS` filter at diff :37).
- Two minor observations, not findings:
  - The section proof parses a specimen's display name positionally (`const [modifier, , step] = name.toLowerCase().split(' ')`, `OffcanvasSection.test.ts` around line 75), which ties labels to class names by word position.
  - The `OFFCANVAS_SPECIMENS` remarks say "at a wider one" where the ramp begins at the breakpoint itself (`oc-shared.patch:50-51`).

**7. Registries and orders: CONFIRMED.**
- `CaptureSubject` (`oc-shared.patch:587-596`), the resting `CASCADE_KEYS` rows (`:619-678`), no `DRIVEN_KEYS` row, and the decline paragraph (`:604-610`) are all present.
- `listed` (`:507`), the order case (`:567`, `:575`), the dash-proof component set (`:690`), `Showcase.ts` (`:17`), `index.ts` (`:122`), `Showcase.test.ts`, and `index.test.ts` agree with each other and with M14.
- The tables are frozen, exported, and derived (`:726-842`).
- Observation: the four placement rows read `transform` on `.offcanvas-{placement}`. Every shown specimen resolves that to the `show` rule's `none`, so the four rows read one identical value that no placement decides. Unlike the landed rows (for example `.accordion-flush > .accordion-item` read through `border-left-width`, `tests/setup.ts:1383-1385`), the property here is not one the placement rule decides. An edge offset or `border-{side}-width` would represent the key.

**8. The guide: BROKEN.**

(a) **The plugin row omits obligations in `offcanvas.js`** (`oc-shared.patch:349`).
- **Omitted:**
  - Showing each `.offcanvas.show` panel on `load` (`offcanvas.js:260-264`).
  - Hiding a shown panel on `resize` once its computed `position` stops being `fixed` (`:266-272`).
  - The `[data-bs-dismiss="offcanvas"]` trigger (`:274`).
  - Returning focus to a visible trigger after `hidden` (`:243-248`).
  - Hiding another open panel before toggling (`:250-254`).
- **Evidence the row must carry them:**
  - The first terrain lists the load and resize behaviours (`b-modal-terrain-report.md:29`).
  - The landed Carousel row names its on-load behaviour (`oc-shared.patch:348`).
  - The engine surface names "the resize listener" (`guides/veneer.md:331`).
- **Why the resize omission matters:** that behaviour is the engine reading the ramp this unit ships.
- **A second defect:** "then the `shown`, `hidden`, and `hidePrevented` events" misorders `hidePrevented`. It fires in place of `hide`, for a static backdrop or for the Escape key when `keyboard` is false (`:169-171`, `:206`).
- **Fix:** add the load, resize, dismiss, and focus-return obligations in the Carousel row's form, and state `hidePrevented` as the event that fires in place of `hide`.

(b) **The navbar paragraph misattributes what the flags do** (`oc-shared.patch:146-148`).
- **The sentence:** "the release's `!important` flags … win over the fixed, hidden, and sliding state …, although the offcanvas partial loads after this one."
- **Why it is wrong:**
  - `position: static` carries no flag (`_navbar.scss:187`). The fixed state yields because `.navbar-expand-lg .offcanvas` (0,2,0) outranks `.offcanvas` (0,1,0).
  - The unit's own proof comment says the visibility and fill flags "outrank no shipped rule here" (diff :773-775).
  - Only the width, height, border, and transform flags beat the placement rules that load later at equal specificity.
- **Fix:** say that the bar's higher-specificity rule unfixes and shows the panel. Say that the width, height, border, and transform flags win over the placement rules the offcanvas partial writes later at the same specificity.

(c) **"A scope retuning either rung … and the panel stays over its backdrop"** (`oc-shared.patch:214-215`) overclaims.
- A retune that sets the drawer base rung at or below the drawer backdrop rung puts the panel under its backdrop.
- **Fix:** bound the claim to retunes that keep the base rung above the backdrop rung, or drop the clause.

(d) **Minor vocabulary drift.** "the large step" (`:166-167`) sits beside "the large breakpoint" (`:95`) for one concept.

The other added sentences hold against the partial and the proofs.

**9. Law and report: BROKEN.**
- **Code law holds.** There is no `any`, no `!`, and no suppression. The only `as` is a const assertion (`oc-shared.patch:920`, `:751`). There are no mocks, and every nested function is a callback passed directly. No new helper duplicates an installed export.
- **The report states counts of growable sets:**
  - "Two decisions need the Orchestrator's ruling" (`b-modal-oc-report.md:7`).
  - "the four variants" (`:244`).
  - "wider than both variants" (`:149`).
- **A comment drops its article.** "the priority case in `tests/conformance.test.ts` file" (`offcanvas.test.ts` around line 440) needs "the" before the code token.
- **Fix:** name the decisions and the variants, and restore the article.

Every count the report states:
- "Two decisions" (:7).
- The diffstat's "2 files changed, 36 insertions(+), 8 deletions(-)" and its per-file line counts: 186, 20, 500, and 174 (:69-72).
- The patch stat's per-file change counts (:78-91).
- "Tests 26 failed | 3 passed (29)" (:178).
- "Tests 7 passed (7)" (:184, :226).
- "6248 ms" (:192).
- The gate-table summaries: 269, 86, 5, 22, and "109 passed | 1 skipped (110)" (:224-230).
- The baselines "Tests 22 passed (22)" and "Tests 57 passed (57)" (:233-234).
- "one run … one of … one failed case" and "two reruns" (:237-239).
- "Tests 8 passed | 168 skipped (176)" and "the four variants" (:244-246).
- "Tests 1 failed | 39 passed (40)" and "Tests 86 passed (86)" (:255).
- "both variants" (:149).
- The versions "tailwindcss 4.3.3" and "sass 1.104.1" (:261, :398) are values, not counts.

## Findings outside the claims

- **F1: the navbar partial's comment is stale.** `/home/user/veneer-oc/src/styles/components/_navbar.scss:149-150` still says the offcanvas rules "ship ahead of the panel's own partial". This unit makes that false.
  - The file is off-limits to the unit, and neither the brief nor the report names this drift. The brief rewrote only the guide and the `NAVBAR_SPECIMENS` comment.
  - **Fix:** "The offcanvas rules turn a panel into part of the row; the offcanvas partial writes the panel itself."
  - **Carrier:** a unit that owns `_navbar.scss`. The Orchestrator assigns it.

## Referrals to the objective lane

- **R1: an unproved guide sentence** (`oc-shared.patch:221-223`, `_offcanvas.scss:93-95`). The sentence reads "The release marks … important, so a background utility … does not paint the inline panel."
  - No proof applies a background utility.
  - In the release, a later `.bg-*` `!important` utility at equal specificity wins.
  - In Veneer, the component's important fill can win only through layer order (`_tokens.scss:4`).
  - Run an important background utility in the `utilities` layer on `.offcanvas-lg` and its body at and above the boundary.
- **R2: a priority swap the gate cannot see.** The set comparison cannot distinguish a priority swapped between the conditions of one selector and property. The example is `.offcanvas-sm { background-color }` written important below the boundary and normal above it. No browser case separates it either. The case title "on every declaration" now describes per-pair sets.
- **R3: an uncontrolled probe.** `oc-cascade-probe.cjs.txt` runs no negative control, so treat "no missing and no extra site" as uncontrolled.

## Attacked and held

- **The `overlay-backdrop` block** matches M11 verbatim (`oc-shared.patch:405-424`).
- **The engine-written frames are declined, not rendered.** The declined `showing`, `hiding`, and fade-alone frames match M2. The fading backdrop paints `0` opacity, and a hiding panel keeps its slide (`OFFCANVAS_STATE_CASES`, `oc-shared.patch:982-988`).
- **The "no rule reads either variable at that width" sentence** (`:224-226`) is true. The height and border-width variables are read only by the placement rules, which apply below the breakpoint.
- **The `Navbar with offcanvas` toggler** carrying no `aria-expanded` attribute is correct, and it is not a missing state.
- **The copy voice and the "Each state is a class set in markup" opening** follow the landed Carousel and Accordion sentences (`constants.ts:2073`, `:2124`; `guides/veneer.md:2529-2532`).

VERDICT: FAIL 3, 8, 9; outside the claims: F1
