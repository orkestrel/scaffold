1. **Scope and delta: UNRESOLVED.**
   - **What held.** `up-status.txt:1-8` lists only the brief's Owned paths (`b-utilities-up-brief.md:98-100`). `up.diff` carries exactly those files. Every file in `up-shared.patch` is on the brief's Shared list (`b-utilities-up-brief.md:102-116`). No hunk touches a vendored file, `src/browser/**`, `src/core/**`, `package.json`, `README.md`, `_mixins.scss`, or a sibling's file. The per-file guide patch matches its combined hunks (`up-shared--guides-veneer.md.patch:1-30` against `up-shared.patch:223-252`).
   - **What is unresolved.** The claim that `git apply --check` is clean on a fresh extract, and that the combined patch equals the union of the per-file patches, rests only on the writer's own sentence (`up-report-head.md:82`). No retained log records either result. The `tmp/probe/up-apply` gate logs show that some copy of the patches applied. They do not show that the retained bytes apply.
   - **What settles it.** Run `git apply --check up-shared.patch && git apply --check up-unscoped-profiles.patch` on `git archive 2a3f223`, and diff the concatenated `up-shared--*.patch` files against `up-shared.patch`. Referred to the checker and the objective lane.

2. **The cascade against the oracle: CONFIRMED.**
   - **Rounded entries beside the border entries.** In the release map, the entries between `border-opacity` and `rounded` run from width through padding, gap, font, text, color, link, background, `user-select`, and `pointer-events`. None of them sets `border-radius`, so writing the rounded entries early moves no resolution.
   - **The placement follows landed precedent.** `z-index` is written beside the position entries (`_position.scss:10-11`, `guides/veneer.md:2829-2831`). The guide sentence (`up-shared.patch:352-354`) and the Sass comment (`up.diff:194-195`) copy that precedent's voice. The order case maps the rounded entries to `utilities/border` (`up-shared.patch:548-552`).
   - **Guarded opacity entries.** Each opacity entry runs through `utility-variable` under `@if $infix == ''` (`up.diff:113-115`, `:213-215`). That shape is forced by family ruling 2's signature (`b-utilities-family.md:38-40`, `_mixins.scss:419`). The unit recorded the mixin gap rather than patching a file it does not own (report:36-40).
   - **Fills walk `tokens.$aliased`.** See `up.diff:74` and `:147`, against `_tokens.scss:10`.
   - **Selector count and importance.** The retained count log shows 111 against 111, with nothing extra, missing, duplicated, or unimportant (`up-cascade-count.log.txt:1-8`). That instrument has no recorded control. The same result is corroborated by `up-final-copy-conformance.log.txt:10-11` (green), and by the `rounded-circle-ledger` mutation, which made the ledger read these keys red (`up-mutations-tables-sections-ledger.log.txt:67-78`).

3. **The proofs distinguish their mutations: CONFIRMED.** Every named mutation has an entry recording site, command, exits, summary, and failing cases (`up-mutations-styles.log.txt`, `up-mutations-styles-summary.log.txt:1-17`, `up-mutations-tables-sections-ledger.log.txt:1-80`). For each mutation below, I checked that the shipped assertion distinguishes it:
   - **`tertiary-emitted`:** the `['.bg-tertiary', …].filter(has)` check turns non-empty (`up.diff:654-656`).
   - **`literal-role-fill` and `border-literal-role`:** the per-alias channel retune expects distinct triplets (`:627-643`, `:961-977`).
   - **`bg-opacity-before-fill`, `border-opacity-before-color`, and `local-important`:** the alpha reads 1 instead of 0.25 (`:670-683`, `:1003-1016`), and the unlayered local stops reaching the fill (`:837-838`, `:1245-1246`).
   - **The light literals:** the dark island stops matching its reference (`:738-742`, `:1058-1062`).
   - **`gradient-literal`:** the `--bs-gradient: none` retune (`:767-768`).
   - **`opacity-unguarded` and `fill-responsive`:** the duplicate-name and `CSSMediaRule` parent checks (`:806-807`).
   - **`sides-before-border` and `rounded-sides-before-rounded`:** a removed side reads 1px, and a squared side reads 8px (`:933-935`, `:1161-1165`).
   - **`border-width-literal` and `radius-literal`:** the 3px token retune and the ×2 factor (`:898-900`, `:1124`). A literal 0.375rem still matches its reference at factor 1, and only the factor read catches it.
   - **`properties-normal` and `partial-unlayered`:** the unlayered override wins (`:846`, `:1244`, `:1258`).
   - **Tables, specimen, caption, ledger:** the binding case derives every table from the inventory (`up-shared.patch:849-946`), and the caption filter and step count cover the section drifts (`up.diff:296-303`, `:358`).
   - Provenance caveat, referred to the objective lane: the logs were taken against earlier revisions of the proofs.

4. **The profiles proof (D1): BROKEN.**
   - **Where the red comes from.** The profiles do go red for the reason the report gives: the tailwind profile opens with `;properties` and then the order line (`up-profile-layers.log.txt:1-2`, `up-service-before-profiles-patch.log.txt`). With the patch applied, `test:service` is green.
   - **Case 2 keeps its intent.** A `tailwind` profile that composes the bare `tailwindcss` import still reads red: the filtered layers gain `base` and the theme block gains `--font-sans` (`up-unscoped-profiles.patch:44-65`).
   - **Case 1 is weakened.** The base asserted `statement` toEqual `ORDER` and the document order toEqual `ORDER` (`profiles.test.ts:44-46`). The patch asserts `statement` equals `['properties']`, `order.slice(-6)` equals `ORDER`, and the document order `.slice(0, 6)` equals `ORDER` (`up-unscoped-profiles.patch:17-20`). Nothing reads the order line as a declared statement any more.
   - **Failing mutation.** Plant `@layer vendor;` ahead of the order line in `tests/setup.css`:
     - The base case is red, because `statement` reads `['vendor']`.
     - The patched case is green: `statement` is still `['properties']`, `order` is `['properties', 'vendor', …ORDER]` so its tail is `ORDER`, and the document order is `[…ORDER, 'properties', 'vendor']` so its head is `ORDER`.
     - The patched comment also claims "the order line is declared unchanged behind it" (`:15-16`), which the assertions do not check.
   - **Fix.** For all three profiles, assert `new SheetReader(compiled).order` toEqual `['properties', ...ORDER]` and `new SheetReader(`${cascade}\n${compiled}`).order` toEqual `[...ORDER, 'properties']`. This is the exact form the same file already uses at `profiles.test.ts:118` and `:122`, and the evidence shows it holds for both profiles (`up-profile-layers.log.txt:1-2`; preflight's extra Tailwind statement adds no new name).

5. **Tailwind shared names: CONFIRMED.**
   - **The table matches the compiler.** Each name's measured status matches `up-tailwind-longhands.log.txt:11-56`:
     - `border` and `border-0` declare the style and width longhands, which Veneer's important `border` shorthand covers.
     - `border-1` to `border-5` declare the style longhand beside the width, and Veneer is important on the width alone, so they stay on the line.
     - The color, background, and `rounded` names declare the single longhand Veneer marks important.
   - **The copies agree.** The line extension is identical in `setup.css`, `consumer.css`, `preflight.css`, and both guide fences (`up-shared.patch:242`, `:251`, `:565`, `:596`, `:606`). `markup.html` gains one element per shared name (`:574-586`).
   - **Each control reads red.** Each negative control reads red on the consumer equality cases (`up-negative-controls-service.log.txt:11-69`).

6. **Sections, specimens, and registries: CONFIRMED.**
   - **Specimen names.** They match brief criterion 5 in order (`up.diff:283-289`, `:438-447`; `up-shared.patch:52-91`, `:127-194`).
   - **Captions.** Captions are built from the same `classes` string as the swatch, and a proof reddens on drift (`caption-drift`, ledger log `:41-52`).
   - **No inline style or unshipped class.** No inline style appears (`up.diff:323`, `:493`). Every composed class ships at the base: `.ratio-*` (`_ratio.scss:32`), `.row-cols*` (`_grid.scss:32`), `.figure-caption` (`_image.scss:25`), plus the landed `.w-100` and `g-2`.
   - **Region copy.** The copy is accurate, and "Switch the color mode" matches the shell's Dark mode control (`constants.ts:8-9`).
   - **Section proof populations.** They derive from setup tables. The literal name list mirrors the landed precedent at `DisplaySection.test.ts:28-33`.
   - **Registries and barrels.** Construction order, `index.ts`, `Showcase.test.ts`, `index.test.ts`, `listed`, entry paths, and the dash-proof component set all agree (`up-shared.patch:15-21`, `:212-222`, `:435-500`, `:503-553`, `:716-737`).
   - **Tables.** The tables are frozen, exported, and bound by derivation (`:828-970`, `:982-1096`).
   - **`CASCADE_KEYS`.** The opacity rows read `background-color` and `border-top-color` rather than the local each rule sets. `CascadeKey.property` names "the resolved property the journey reads the key's treatment from" (`tests/setup.ts:388-389`), and the swatch's fill alpha is that treatment, so these rows hold.

7. **The guide: BROKEN.**
   - **Where it holds.** Placement, the § Files rows, the compatibility rows, the § Tests links, and the Tailwind extension are present. The alias and token chains are true:
     - `_tokens.scss:418-426` backs `--vn-border-width` and `--vn-border-style`.
     - `--vn-radius-*` scale with the radius factor (`_tokens.scss:292-297`), with the pill step fixed at 50rem.
     - A factor of 2 does double `.rounded-2` from 6px to 12px.
   - **Failing input.** `up-shared.patch:300` reads "and the fill's own rule sets that local to `1`." That is a bare value token at the end of a clause with no noun, which is the exact defect mid-campaign note 1 names (`w2-w3-note-1.md:7-9`).
   - **Fix.** Rewrite it as "…and the fill's own rule writes the `1` value into that local."
   - **Also fix.** `:349` "a factor of `2` doubles" can read "the `2` factor doubles". It currently rests on the house "value of `N`" form (`guides/veneer.md:2797`).

8. **Law and report: BROKEN.**
   - **Code law holds.** There is no `any`, no non-const `as`, no `!`, no suppression, no mock, and no nested function beyond a direct callback. No new helper was added.
   - **Failing input: comments.** `up-shared.patch:847-848` has "the release's `rgba()` over one channel alias", and `:865` has "a bare `var()` over the role's subtle alias". Each code token is followed by a preposition, not a noun. Fix: "the `rgba()` function over…" and "a bare `var()` function over…".
   - **Failing input: report `now`.** `b-utilities-up-report.md:9` ("profiles now emit") and `:316` ("now emits") use a temporal `now`, which the writing rule bans. Fix: delete it.
   - **Failing input: report `below`.** `:23` ("read in the run below") uses `below` as a cross-reference. Fix: "following".
   - **Counts the report states, listed for the record:**
     - "10 cases" (`:23`) and "12 cases" (`:24`).
     - "111 selectors" (`:71`). This one is a measurement tied to its instrument.
     - "17 mutations" (`:118`).
     - "9 `rounded` rows" (`:149`, `:248`).
     - "13 `CaptureSubject` members" and "13 `CASCADE_KEYS` rows" (`:286-287`).
     - "13 lines after the `.invisible` line" (`:220`).
     - "3 cases failed" and "2 timeouts" (`:57`, `:105`).
     - "one stop-class finding … and one process deviation" (`:8`) and "the two red cases" (`:76`).
     - "twice" and "the five compatibility rows" (`:81-82`).
     - "two `### Files` rows" and "one Tailwind paragraph extension" (`:254-255`).
     - "two partials sharing the guard" (`:39`).
     - The `Lines` column values (`:21-28`).
     - "359 files" (`:68`). This one is a measurement tied to its run.

**Findings outside the claims**

- **F1: the swatch-grid builder is duplicated** (`up-shared.patch:93-103` and `:196-206`).
  - **What is wrong.** The two blocks are character-for-character identical (the `row row-cols-3 row-cols-md-5 g-2` grid wrapping a captioned `ratio ratio-4x3` figure per swatch). This breaks the `AGENTS.md` consolidation step: route repeated behavior through one shared implementation.
  - **Why it matters.** The next wave-3 paint regions, such as color and shadow swatches, will copy a third instance, and the caption and structure contract has no single home.
  - **What right looks like.** Put one exported, tested builder in an app/browser helpers module, for example a function that takes the class strings and returns the grid markup, and have both constants consume it. This needs a new file, so the Orchestrator must grant scope.
- **F2: the `BACKGROUND_SPECIMENS` remark names the wrong thing** (`up-shared.patch:44`).
  - **What is wrong.** It says each caption "names the class the swatch shows". The caption is the full class string, such as `bg-success bg-opacity-50` or `bg-body border` (`:81-91`, `:99`).
  - **What right looks like.** "names the classes the swatch carries", matching the `BORDER_SPECIMENS` remark at `:118`.

**Attacked and held**

- **Region name.** The name `Border` against the release page title "Borders" holds, because family record `b-utilities-family.md:16` names the region `Border`.
- **Captions carry supporting classes.** Captions include supporting classes such as `bg-body-tertiary`, `border-3`, and `bg-primary`. This is copyable markup, not drift.
- **`rounded-circle` on a 4:3 box renders an ellipse.** That is what `border-radius: 50%` does, and it is not a defect.
- **The literal theme-variable list.** The theme-variable literal in the profiles patch (`:60`) keeps the base's pinned-literal form (`profiles.test.ts:70`). It is not a regression.

**Referrals**

- **To the Orchestrator's capture run (NOT-EVIDENCED, no frame shot, report:350-351).**
  - Light-mode `background-roles` and `border-roles` frames must show a visible box for the `bg-white` swatch and a visible border for the `border-white` swatch.
  - Source shows the light canvas is white (`_tokens.scss:35`). The `Background roles` swatches carry no `border`, and the `Border roles` swatches carry no fill (`up-shared.patch:53-65`, `:143-156`).
  - The unit's own reasoning gives a border to swatches that match the page (`:45-47`) but does not apply it to these swatches.
- **To the Orchestrator (design).**
  - Family ruling 2 fixes `utility-variable` without an infix, so every css-var partial (paint here, and text and link opacities next) carries an `@if $infix == ''` guard inside a walk that has no responsive entry.
  - Decide whether UTIL-SPACER's mixin gains `$infix`, or whether a partial with no responsive entry may skip the walk.
- **To the objective lane (proof provenance).**
  - The mutation logs cite case lines that differ from the shipped proofs, so the proofs were edited after the mutations ran:
    - background: "sets the fill alpha" is `:72` in the log against file line 76, and "yields" is `:242` against 254;
    - border: "sets the border alpha" is `:130` against 134, and "yields" is `:381` against 393.
  - The cases that grew include the cases `tertiary-emitted`, `opacity-unguarded`, and `fill-responsive` target.
  - Decide whether to re-run `up-instrument-mutate-styles.py` against the shipped proofs.
  - Separately, `up-instrument-count-cascade.mjs` has no recorded negative control, and it does not check layer membership.
- **To the checker.** Settle claim 1's `git apply --check` result and the union equality.

VERDICT: FAIL 1, 4, 7, 8; outside the claims: F1, F2
