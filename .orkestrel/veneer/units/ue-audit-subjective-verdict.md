1. **Scope and delta: UNRESOLVED.**
   - **What holds.** The file sets match the brief. `ue-status.txt:1-12` lists the 12 owned paths and nothing else, and `ue.diff` carries exactly those files. Every file header in `ue-shared.patch` is on the brief's Shared list (`b-utilities-ue-brief.md:102-116`). The patch touches no vendored file, and nothing under `src/browser/**` or `src/core/**`. It also leaves `package.json`, `README.md`, `_mixins.scss`, and every sibling unit's file alone.
   - **What is unsettled.** Nothing in `ue-instruments/` records a `git apply --check` run: a search for `apply` there returns nothing. `ue-gates.sh:2-3` only says the patch was applied, so the "applies cleanly" part rests on the writer's report alone.
   - **What settles it.** Run `git apply --check` with `ue-shared.patch` against a fresh `2a3f223` extract. This is referral R1.

2. **Cascade against the oracle: CONFIRMED.**
   - The partials match the release's own rules. `_shadow.scss` matches `node_modules/bootstrap/scss/_utilities.scss:76-85` byte for byte, and `_opacity.scss` matches `:41-50`. `_focus-ring.scss:9-13` matches `bootstrap/scss/helpers/_focus-ring.scss:1-5`. The roles go through the `utility-variable` mixin over `tokens.$aliased` (`_tokens.scss:10`).
   - The binding case ties the tables to the inventory (`ue-shared.patch:196-244`).
   - `ue-cascade-keys.log.txt` reports 18 recorded selectors, 18 emitted, and none missing or extra, plus one conditioned `outline` rule. Conformance reads 22 of 22 (`ue-gates.log.txt:8`).
   - Removing the Additions row reddens the addition cases (`ue-control-conformance-addition.log.txt:25,46`).
   - The instrument itself was never run against a control. See R2.

3. **Proofs distinguish their mutations: CONFIRMED.**
   - `ue-mutations.log.txt` holds an entry for every named mutation. Each entry gives the site file, the before and after text, the command, both exits, the summary line, and the failing cases.
   - **Literal shadow** (8 red, `:1-15`): the boundary case compares against a reference box that paints `var(--vn-shadow-*)`.
   - **lg alias swap** (7 red): red on the reference box and on the distinct-set check.
   - **Reversed shadow, opacity, and role orders** (1 red each): red at the order cases.
   - **Dropped `!important` on `.shadow-none` and `.opacity-50`** (10 and 8 red): the inline resting value wins once the declaration is normal.
   - **Responsive writes** (6 and 5 red).
   - **Mis-valued step** (7 red).
   - **Helper without `:focus`** (2 red): the resting `none` read.
   - **Helper with a literal colour** (5 red), **without the offset variables** (1 red), or **written important** (1 red): the consumer-wins read.
   - **`forced-ring` omitted** (1 red): `outline-style` reads `solid`.
   - **Primary role omitted** (2 red).
   - **Role variable written important** (1 red): the consumer colour read.
   - **The `.shadow-sm` swap with no run of its own.** Point `.shadow-sm` at `var(--bs-box-shadow)` or `var(--bs-box-shadow-lg)`. It then resolves `--vn-shadow-2` or `--vn-shadow-3`. That breaks the `toBe(expected)` check against the `--vn-shadow-1` reference box (`shadow.test.ts:58-65`) and the distinct-set check (`:76-82`). So the case does distinguish that swap. This one is confirmed by reading, not by a run.

4. **Specimen rename and the role classes' layer: CONFIRMED.**
   - **The refusal is real.** `readSubject` (`tests/setupBrowser.ts:402-417`) refuses a name that both a region `aria-label` and a `data-specimen` attribute carry. The retained run failed on exactly that (`ue-journey-name-collision.log.txt:115-118`).
   - **Renaming the specimen is the better of the two options.**
     - Renaming the region instead would break R12: the release page is titled "Focus ring". It would also move the `### Focus ring utilities` heading and `FOCUS_RING_COPY.region`.
     - `Default focus ring` matches the guide's "default ring" wording and pairs with `Focus ring roles`.
     - The stems `default-focus-ring` and `default-focus-ring-focus` follow the `DRIVEN_KEYS` stem rule.
   - **The layer moves no resolution.**
     - The only other declarations of `--bs-focus-ring-color` are in the `theme-tokens` mixin (`_mixins.scss:347`). That mixin emits in the theme layer.
     - The role classes set the property on the element itself, so they win over any inherited value in every layer.
     - I attacked the one same-element case: an element carrying both `data-bs-theme` and `.focus-ring-danger`. The components-layer rule wins, as a utilities-layer rule would and as the release's source order does.
   - The guide states this at around line 3016 of the patched guide.

5. **Tailwind shared names: CONFIRMED.**
   - `ue-tailwind-longhands.log.txt:2-32` shows `opacity` alone for the opacity names, and `--tw-shadow` plus `box-shadow` for all four shadow names.
   - The line, its copies, both guide fences, and `markup.html` carry exactly that change (`ue-shared.patch:652-694,719-729`).
   - Writing `opacity-50` onto the line reddens 2 cases (`ue-control-service-line.log.txt:12,41`). Dropping its importance reddens the same 2 (`ue-control-service-important.log.txt:12,41`).
   - **The `focus-ring*` names.** The longhand instrument compiled only `focus-ring` and `focus-ring-primary` (`ue-tailwind-longhands.mjs:6`). The consumer proof still covers the rest. It derives `shared` from the whole cascade (`consumer.test.ts:40`), then requires every shared name to be mounted from `markup.html` (`:136-140`). `markup.html` carries no `focus-ring` name, so if any role name produced a Tailwind rule, that check would redden. The green run (`ue-gate-service.log.txt`, 18 of 18) therefore distinguishes that case.

6. **Sections, specimens, and registries: BROKEN.**
   - **Failing state.** The resting `CASCADE_KEYS` row for `default-focus-ring` (subject `Default focus ring`, selector `.focus-ring`, property `box-shadow`) is at `ue-shared.patch:52-57`, around line 1667 of the patched `tests/setup.ts`. It reads a property that no rule sets at rest.
     - The key's only rule is `.focus-ring:focus` (`_focus-ring.scss:9`).
     - No element rule sets `box-shadow` on `a`; the only hits under `src/styles/elements` are in `_button.scss`.
     - So the journey's comparison (`integration.test.ts:672-673,710`) reads `none` against `none` in both modes. It would stay green with the whole `_focus-ring.scss` partial deleted.
   - **Why it matters.** It breaks the table's own contract, "Each property is one the key's own rule sets" (`tests/setup.ts:407,420`). It also registers a resting frame that shows nothing the key paints, under a name that claims it does.
   - **What right looks like.**
     - Drop the `default-focus-ring` resting row.
     - Keep `'Default focus ring'` in `CaptureSubject` for its `default-focus-ring-focus` driven row. `DRIVEN_KEYS` already allows a specimen with no resting frame (`tests/setup.ts:1660-1661`).
     - Record the reason in the `CASCADE_KEYS` remarks beside the grow-spinner reason: the helper paints only under focus, so its frame is the driven row. R13 and the exit criterion both allow a decline with a reason.
     - Update the report's coverage matrix and its `CAPTURE` list to match.
   - **What holds.**
     - Regions, order, and barrel: the three `SpecimenSection` subclasses are constructed after `VisibilitySection` and before `NavbarSection` (`ue-shared.patch:450-452`). `listed`, the order case, the dash-proof set, `index.ts`, and both enumeration tests agree, and the sorted key list is in code-point order.
     - Markup: every specimen uses only classes shipped at `2a3f223`, and none writes an inline style.
     - Derived populations: the section proofs derive from rendered specimens, and the journey derives from `DRIVEN_KEYS` over `FOCUS_RING_SPECIMENS` (`ue-shared.patch:590-591`).
     - Setup tables: `SHADOW_CASES`, `OPACITY_STEPS`, and `FOCUS_RING_ROLES` are frozen and exported, and they are bound by derivation (the token binding reads `_tokens.scss`).
     - The other resting rows: `shadows`, `opacity-steps`, and `focus-ring-roles` each read a property their rule sets.

7. **The guide: BROKEN.**
   - **7a (primary): the opacity section names the wrong rule.**
     - Site: `### Opacity utilities`, around line 2977 of the patched guide.
     - The sentence: "The importance is also what lets a step override the opacity a component rests at, as each bar in the Opacity region overrides the `0.5` opacity of the `.placeholder` class."
     - Why it is false: `.placeholder` declares `opacity: 0.5` normally in the components layer (`_placeholder.scss:5,15`). The layer order puts utilities after components (`_tokens.scss:4`), and a normal declaration in a later layer wins. So with `!important` dropped, a `.placeholder.opacity-25` bar still resolves `0.25`. Importance is not what lets the step win; the layer order is. That breaks note 1's rule 4.
     - Right: "A step also overrides the opacity a component rests at, because the utilities layer follows the components layer: each bar in the Opacity region overrides the `0.5` opacity of the `.placeholder` class." Referral R3 carries the executed reading.
   - **7b: the shadow section leaves out where a retune takes effect.**
     - Site: `### Shadow utilities`, around lines 2949-2950.
     - The sentences: "a doubled elevation factor doubles every length of every shadow class, a retuned step moves the class that reads it".
     - Why it misleads: the `--bs-box-shadow*` aliases are declared on `:root` as `var(--vn-shadow-*)` (`_tokens.scss:428-430`), and a custom property inherits with its `var()` references already substituted. So a factor or step set on a subtree never moves a `.shadow*` class, even when you follow § Factors' own recipe (around line 3089: declare the factor and the scale on the subtree). Only the alias reaches an element.
     - Right: say "on the root element" for both effects, and state that a subtree moves a shadow class only by setting the alias. The report already words it as "the root-level step retune" (`b-utilities-ue-report.md:254`).
   - **7c: the shadow-none clause gives the wrong reason.**
     - Site: `### Focus ring utilities`, around lines 3013-3014.
     - The clause: "as it does in the release, where the utility follows the helper".
     - Why it is wrong: in the release, `.shadow-none`'s `!important` beats `.focus-ring:focus`'s normal declaration whatever the source order, so "follows" is not the rule that applies.
     - Right: "as it does in the release, where the utility's `!important` flag beats the helper's normal declaration."
   - **7d: two sentences say every shadow class reads an alias.**
     - Sites: "Each class reads the release's own alias byte for byte" around line 2945, and the § Compatibility `shadow` row, around line 5590 ("each reading its `--bs-box-shadow*` alias").
     - Why it is false: `.shadow-none` reads no alias.
     - Right: exclude `.shadow-none` in both places.
   - **What holds.** The § Files rows, the Additions row, the Tailwind sentence, the § Tests links, the tertiary sentence, and the focus-ring variable and forced-colours sentences are true of what ships. Every added code token is followed by a noun.

8. **Law and report: BROKEN.**
   - **Failing state.** `b-utilities-ue-report.md:14` reads "Three items need a decision from you. The first two are deviations; the third is a scratchpad write". That states a count and names list items by their position, which `AGENTS.md` § Writing forbids.
   - **Right.** Name the items instead: "These items need a decision from you: the specimen rename and the helper's priority are deviations, and the scratchpad writes predate note 2."
   - **What holds.**
     - The owned files and the patch add no `any`, no suppression, no `!`, no mock, and no nested function. The only `as` is the const assertion at `shadow.test.ts:939`. The helpers they use (`extractShadowLayers`, `mountTraversalStart`) already exist at the base.
     - The added comments follow the writing rule on banned terms and on code-token nouns.
     - The report gives each gate's command and reading (`ue-gates.log.txt:1-12`).
   - **Counts the report states, for the record:**
     - File line counts: 21, 20, and 26 for the partials; 97, 185, and 235 for the style proofs; 21 each for the sections; 67, 80, and 122 for the section proofs.
     - Patch size and the quoted `--stat` output: 909 lines; 17 files, 467 insertions, 15 deletions, and the per-file counts.
     - "Three items".
     - Baselines: 22 and 18 passed.
     - Cascade: 18 recorded and 18 emitted.
     - Gate readings: 29, 12, 22, 18, 19, "109 passed, 1 skipped", 45, 45, and 267 passed.
     - Load averages of 15 to 33 and of 28 to 33; "Two timeouts"; 22 of 22.
     - Matrix red counts: 8, 7, 6, 7, 5, 1, 8, 2, 5, 1, 1, 2, 1, 1, and 1.
     - 29 of 29 unmutated.
     - Negative controls: "2 failed", "the same 2", and 18 of 18.
     - The quoted "2 rendered subjects" and 45 of 45.
     - The addition control's log shows 3 failures, including the timing-sensitive Button oracle case (`ue-control-conformance-addition.log.txt:69`), while the report names only 2 cases.

**Findings outside the claims**

- **F1: a test comment gives a false cause.**
  - Site: `tests/src/styles/components/focus-ring.test.ts:230-231`.
  - The comment: "The important shadow utility sits in a later layer than the helper, so it clears the ring, as it does in the release, where the utility follows the helper in source order."
  - Why it is false: an important declaration beats a normal one in any layer, and for important declarations the layer order reverses. Neither the later layer nor the source order is why the ring clears.
  - Why it matters: a future editor who trusts the comment could move the helper and expect the result to change.
  - Right: "The important shadow utility beats the helper's normal declaration whatever layer each sits in, as it does in the release."

**Attacked and held**

- **Specimen choices.**
  - The Opacity specimen's placeholder bars copy the landed Sizing precedent, and `bg-*` was not shipped at the launch commit.
  - Labelling each specimen item with its full class name copies the `FLEX_SPECIMENS` remarks.
  - The section copy follows the "Compare…" and "Press Tab…" voice of the precedent sections.
- **Role classes in a components partial.** The brief's partial list fixes it, and the guide explains why.
- **`breakpoint-each` walk.** Walking it for a non-responsive entry matches the mixin's documented contract and the `vertical-align` precedent.
- **Adjacent, correct.** The default ring and the primary ring may look almost the same (`--vn-focus-color` is a 45% oklab mix), but they compute as different strings. The journey shoots the danger link for that reason (`ue-shared.patch:588-589`).
- **Adjacent, not false.** The opacity and shadow proof paragraphs say "at the md boundary", but the proofs read every infix through `GRID_BREAKPOINT_CASES` (`setupStyles.ts:1551-1568`). Every reading the guide names does happen. The Display section's wording, "every infix at its boundary", would describe the proof better.

**Referrals**

- **R1 (objective lane).** Run `git apply --check` with `ue-shared.patch` against a fresh `2a3f223` extract (claim 1).
- **R2 (objective lane).** `ue-cascade-keys.mjs` has never failed. Plant an extra `.shadow-xl` rule and drop one `!important`, then confirm the `extra` and `priorityMismatches` fields report each.
- **R3 (objective lane).** Drop `!important` from `.opacity-25` in the built cascade and read the Opacity region's `.opacity-25` bar. The expected reading is `0.25`, which would confirm 7a by a run.
- **R4 (Orchestrator).** The brief's region name `Shadow` departs from R12: the release page is titled "Shadows". If you align the region to R12, rename the `Shadows` specimen too (for example to `Shadow steps`, which matches `Opacity steps`), or `readSubject` refuses it the same way.
- **R5 (Orchestrator).** The brief's deviation contract says to stop on a disagreement between the brief and the tree. The unit resolved the name collision itself and reported it. You decide whether to accept that.
- **R6 (Orchestrator).** The `focus-ring-roles` resting row meets the table's contract, but its frame shows links with no ring. Decide whether to decline it alongside `default-focus-ring`.
- **Dispatch note.** My brief names no report path and assigns no command, so there is no dispatch defect to record.

This verdict was held on the subjective lane.

VERDICT: FAIL 1, 6, 7, 8; outside the claims: F1
