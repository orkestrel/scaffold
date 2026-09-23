Verdict for TOGGLES (`tg`) audit round 1. I held the subjective lane: shape, naming, specimen and section ergonomics, guide voice, and design fit. The objective lane runs blind beside me on Astra.

Two claims break: 7 (guide prose) and 8 (doc block and report). Three findings sit outside the claims. The other claims held. Every mutation I cite as executed is in `tg-instruments/logs/`. Where a mutation is described as "by reading", I did not run it.

## Per-claim verdicts

**1. Delta and scope: CONFIRMED.**
- `tg-status.txt:1-6` lists exactly the six owned files, each `M`.
- The file headers in `tg-shared.patch` (lines 1, 104, 929, 988, 1114) name only `app/browser/constants.ts`, `guides/veneer.md`, `tests/setup.ts`, `tests/setupStyles.test.ts`, and `tests/setupStyles.ts`.
- Every removal falls in the claimed set:
  - the `Disclosure` rows (`tg-shared.patch:213-259`);
  - the `INPUT_GROUP_DEFERRED` constant and its uses (`:995`, `:1003`, `:1021-1042`, `:1062-1066`, `:1076`, `:1164-1168`);
  - the rewritten sentences;
  - the formatter's re-padding of `### Deferred selectors` (`:213-294`) and `#### btn` (hunk `@@ -2536,296 +2545,300 @@`).
- The patch adds no line to any vendored file, sibling file, or off-limits path.

**2. The partials and the cascade: CONFIRMED.**
- `_button-group.scss:59` adds the first-child reset.
- `_button-group.scss:78-101` writes the padding, the caret resets, and the `$sizes` loop.
- `_input-group.scss:90` and `:99` add the toggle counts.
- A search of `src/**` for `dropdown-toggle-split|\.dropdown-toggle:nth-last-child` finds those lines and nothing else.
- `built-rows.log.txt:1-40` reads every former `Disclosure` name under every recording key, with no `ABSENT`.
- The `$sizes` list follows the `_input-group.scss:3-9` precedent: a header comment, tuples, and the release's order.
- The resting `.dropdown-toggle-split` block and the loop block write the same declaration pair. I accept this: the resting selector has no size prefix to loop over, so it is not a repeated per-variant block.
- The objective lane owns the declaration-order check.

**3. The cascade proofs: CONFIRMED.**
- Each mutation the matrix names is red in its own log, on the quoted assertion:
  - `first-child-selector-dropped`: `expected [ 6, 6, 6, 6 ] to deeply equal [ 6, +0, +0, 6 ]` (`mutation-first-child-selector-dropped.log.txt:100`).
  - The padding forms each read the fallback value: `base-padding-omitted` reads 12 against 9; the small and large forms read 9 against 6 and 12 (their logs, around lines 94-108).
  - `padding-literal`: `expected 9 to be close to 18` (`mutation-padding-literal.log.txt:93`). The density case (`button-group.test.ts:304-319`) therefore separates a literal from the token.
  - Each caret mutation reads `expected 3.57 to be +0`.
  - `plain-toggle-count-left-out` and `validated-toggle-count-left-out` each read `1 failed`.
- Each assertion separates its mutation from the passing case:
  - the corners assertion compares exact arrays (`:371-376`);
  - the padding assertions compare against the adjacent button's own padding times 0.75 (`:290-291`), a second mechanism, and against the release values (`:300`);
  - the caret case pairs a plain toggle with a text-carrying split toggle (`:333`), so the `:empty` rule cannot mask it;
  - the input case's third group (`input-group.test.ts:264`, `:292-295`) is the control that shows the `has-validation` class is what keeps the corners.
- Controls:
  - green: `wt-styles.log.txt:146`, `gate-styles.log.txt:146` (`61 passed (61)`);
  - failing first: `wt-red-styles.log.txt:290` (`8 failed | 53 passed (61)`, at the final line numbers 268, 304, 330, and 350; the caret titles predate the retitle the report records);
  - baseline: `wt-base-styles.log.txt:216` (`99 passed (99)`).

**4. The specimens and the section proofs: CONFIRMED.**
- Specimens: `tg-shared.patch:37-60` and `:91-100` match the claim, including the `btn-toolbar gap-2` wrapper and the sized pair derived from one list. `.gap-2` ships at the base (`src/styles/utilities/_gap.scss:24`).
- Empty-toggle ruling: upheld. It matches the DROPDOWN precedent at `constants.ts:1725-1727` and `:1753` (caret-only toggles named through `aria-label`). The names are unique descriptive action names ("More save options"), and the `announces one name` case (`ButtonGroupSection.test.ts:225-253`) still holds.
- Section proofs:
  - `dropstart-toggle-after-action` fails the selector-presence assertion (`mutation-dropstart-toggle-after-action.log.txt:11`).
  - `dropstart-action-removed` reads `undefined` (`:11` of its log).
  - `group-size-on-buttons` finds the `.btn-group-lg .btn-lg` element (`:10` of its log).
  - `trailing-toggle-kept-count-broken` reads `[ true, true ]`.
  - By reading: removing an `aria-label` fails `readName(toggle)` at `ButtonGroupSection.test.ts:201`; adding toggle text fails `:200`; adding `show` fails `:206`.
  - Green: `gate-sections.log.txt:9` (`9 passed (9)`). Red: `wt-red-sections.log.txt:114`.
- Doc blocks: they describe the specimens, but one sentence misnames its actor; see claim 8.
- Two parts of the dispatch's focus have no evidence in the supplied set. Neither changes the claim's value; both are referrals.
  - No Bootstrap documentation page is in the evidence or the tree.
  - No capture portfolio was supplied.

**5. The capture rows: CONFIRMED.**
- `tg-shared.patch:936-941` adds the members after `'Horizontal collapse hidden'`.
- `tg-shared.patch:949-984` adds the rows after the `horizontal-collapse-hidden` row.
- The patch adds no `DRIVEN_KEYS` row and no `CaptureState` member.
- Each row's selector resolves in its named specimen, on a property that rule writes:
  - the leading input toggle sits at `nth-last-child(5)` and `(6)`;
  - the trailing validated toggle sits at `(3)` and is correctly excluded.
- By reading, the proof mutation is removing `btn-sm` from the small specimen's toggle. It makes `integration.test.ts:638-641` throw. The journey observation was green (`journey-light-390.log.txt:77`, `journey-dark-1280.log.txt:77`).

**6. The tables, the ledger, and the deferrals: CONFIRMED.**
- Ruling on the deletion: the capability ceases, and the symbol was not removed for convenience.
  - `INPUT_GROUP_DEFERRED` was defined as the rules "the Disclosure dropdown toggle still owes" (`setupStyles.ts:4478`). It now owes nothing.
  - The invariant it served moves to the general assertion at `tg-shared.patch:1043-1045`.
  - By reading, the mutation is restoring a deferral row for `.input-group:not(.has-validation) > .dropdown-toggle:nth-last-child(n+3)`. It turns that assertion red.
- Split population: derived from the inventory (`:1090-1094`). By reading, adding a split name to `DROPDOWN_SELECTORS` turns it red.
- Table additions: `tg-shared.patch:1121-1127` and `:1152`, `:1156`.
- Ledger: `ledger-drift.log.txt:1-10` has empty `unrecorded` and `stale` lists. `gate-conformance.log.txt:12` reads `22 passed (22)`.

**7. The guide content: BROKEN.** R17 holds: each section points at the Dropdown `plugin` row, matching the precedent at `guides/veneer.md:1354`. Four sentences fail on truth or the writing rules.

- (a) **The button group corners sentence overgeneralizes** (`tg-shared.patch:167-168`, guide around line 1425).
  - The patch says: "A child carrying the `.dropdown-toggle` class keeps its trailing corners, because its hidden menu follows it and the toggle is the group's visible end."
  - This is false for the region's own `Horizontal group` specimen. That specimen leads with a `.dropdown-toggle` that has no menu and sits before plain buttons (`constants.ts:903`; the patched doc block at `tg-shared.patch:19` says "It carries no menu"). It keeps its corners without being the visible end.
  - The partial itself says "often" (`_button-group.scss:56`).
  - Right: "…keeps its trailing corners, because the release expects its hidden menu to follow it, which often leaves the toggle as the group's visible end while it is not the last child."
- (b) **The input group sentence overgeneralizes the same way** (`tg-shared.patch:130-132`).
  - "so the toggle is the row's visible end while it is not the last child" is false for the leading toggle of the `Input group dropdown` specimen (`:94`).
  - The unit's own proof comment says "often" (`input-group.test.ts:252`).
  - Right: "so the toggle can be the row's visible end while it is not the last child."
- (c) **Three code tokens lack a noun** (`tg-shared.patch:174-176`). "`calc(var(--vn-space-6) * 0.75)` at rest" and its small and large siblings break the token-noun rule that ruling 12 and this claim name. Right: "the `calc(var(--vn-space-6) * 0.75)` value at rest, the `calc(var(--vn-space-4) * 0.75)` value after a small button or inside a small group, and the `calc(var(--vn-space-8) * 0.75)` value after a large button or inside a large group."
- (d) **A pronoun has no referent** (`tg-shared.patch:146-147`). "…kept with and without that class" names no class anywhere in its sentence. Right: "with and without the `has-validation` class".
- Advisory, not required:
  - The Dropdown rewrite (`:157-159`) joins two ideas with an ambiguous "which". Split it after "them".
  - The Button group section's opening list (guide around line 1399) still omits the split toggle the partial now writes.
- The split-toggle paragraph's voice otherwise holds. The departure bullet (`:201-205`) matches the input group bullet's form and explains the ledger placement.

**8. Law and report: BROKEN.** The law checks hold:
- A search of `tg.diff` and the added lines of `tg-shared.patch` for the substitution terms, case-insensitive, finds only permitted senses: "once" meaning one time, and "above" and "below" as data values.
- The diff adds no `any`, no `as` beyond `as const`, no `!`, no suppression, and no exported helper.
- The report's § Not closed names the inline rows and the caret-margin frames (`b-collapse-tg-report.md:491-494`).

Two items fail:
- (a) **The Button group doc block misnames its actor** (`tg-shared.patch:22-23`). "Every class is set in markup and announces `aria-expanded="false"`" makes the class the thing that announces. The Input group twin has the right form (`:82-83`). Right: "Every class is set in markup, and each toggle announces `aria-expanded="false"`: …"
- (b) **The retained report names the shared patch at a path that resolves to nothing** (`b-collapse-tg-report.md:68`): `/home/user/veneer-tg//home/user/scaffold/.orkestrel/veneer/units/tg-shared.patch`. Lines 4-5 compare the brief to itself for the same reason. This is damage from the retention rewrite, so the carrier is the Orchestrator. Right: the patch path is `/home/user/scaffold/.orkestrel/veneer/units/tg-shared.patch`, and the brief comparison names the launch copy.

The rows the fix round moves to `tests/setupStyles.ts`, each frozen, documented, and added to the export-list and freeze cases in `tests/setupStyles.test.ts`:

- **`BUTTON_GROUP_SPLIT_CASES`**
  - Shape: `{ label, group, button, pixels }`, where `group` and `button` are complete class lists.
  - Rows:
    - `Base`: `btn-group` / `btn btn-outline-secondary`, 9;
    - `Small`: `btn-group` / `… btn-sm`, 6;
    - `Small group`: `btn-group btn-group-sm` / `btn btn-outline-secondary`, 6;
    - `Large`: `btn-group` / `… btn-lg`, 12;
    - `Large group`: `btn-group btn-group-lg` / `btn btn-outline-secondary`, 12.
  - It replaces the inline table at `button-group.test.ts:270-281`, including its `''` absence sentinel and leading-space concatenation. It also replaces `toHaveLength(5)` (`:284`), the `?? ''` label (`:289`), and the parallel literal `[9, 6, 6, 12, 12]` (`:300`).
  - The density case (`:304-310`) reads the `Base` row instead of restating its markup and `9`.
- **`BUTTON_GROUP_CARET_CASES`**
  - Shape: `{ group, pseudo, side }`.
  - Derive it from `DROPDOWN_DIRECTION_CASES` (`setupStyles.ts:5700`): `group` is `btn-group` for the `dropdown` wrapper and `btn-group <wrapper>` otherwise, and `side` is `margin-right` where `pseudo` is `::before`, else `margin-left`. The wrapper-to-pseudo pairing then has one home. A literal table is the fallback if the derivation reads worse.
  - It replaces the `it.each` rows at `button-group.test.ts:324-329`.
- **`INPUT_GROUP_TOGGLE_CASES`**
  - Shape: the `INPUT_GROUP_FLOATING_CASES` shape (`setupStyles.ts:4433`), `{ group, markup, corners }` with 1/0 corners, one corner row per toggle.
  - Rows: plain, `has-validation`, and the unvalidated group that carries feedback.
  - It replaces `input-group.test.ts:257-266` and `:277-296`.
- The section tables are covered under finding `inline-tables-beyond-ruling`.

**Counts the report states, listed for the record:**
- Diffstat and patch stat, as `git` output (`:31-37`, `:72-77`).
- `8 failed | 53 passed (61)` and `61 passed (61)` (`:346-347`, `:396`, `:410`, `:431`).
- `5 failed | 4 passed (9)` and `9 passed (9)` (`:365-366`, `:397`, `:432`).
- `Each run read 1 failed` (`:379`).
- `5 failed | 17 passed (22)` (`:411`).
- `22 passed (22)` (`:413`, `:433`).
- `99 passed (99)` and `7 passed (7)` (`:415`).
- `1 failed | 252 passed (253)`, `10100ms`, `1 passed | 96 skipped (97)`, and `253 passed (253)` (`:430`).
- `19 passed (19)`, `109 passed | 1 skipped (110)`, and `78 passed (78)` (`:434-436`).
- `40 passed (40)`, twice (`:445`).
- `grep -c … prints 0` (`:298`).
- "One timing case failed" (`:14`).
- "adds both toggle selectors" (`:210`). This `both` tallies members the sentence does not name.
- Every test-run count I checked matches its log: gate, worktree, mutation, journey, `setup-timing-alone`, and conformance. I did not recompute the diffstat figures.
- "criteria 1 to 4", "Ruling 1", and "Criteria 1 and 2" are identity numbers, not counts.

## Findings outside the claims

- **`inline-tables-beyond-ruling`.** The Orchestrator's ruling on the inline rows is under-scoped.
  - `.claude/rules/tests.md:187` ("Data tables and case matrices belong in a setup file at any size") also reaches:
    - the input group toggle case's three-group table (`input-group.test.ts:257-296`), which has the exact shape of the existing `INPUT_GROUP_FLOATING_CASES`;
    - the section tables at `ButtonGroupSection.test.ts:164-182` and `:217`;
    - the pairs at `InputGroupSection.test.ts:257-266`.
  - The `InputGroupSection.test.ts` pairs restate the two `CASCADE_KEYS` rows the patch adds (`tg-shared.patch:973-984`). That is a duplicate under `tests.md:184`.
  - Right:
    - the input group section case filters `CASCADE_KEYS` (from `tests/setup.ts`) by subject;
    - the `[name, selectors]` table moves to `tests/setupStyles.ts` as `BUTTON_GROUP_SPLIT_FORMS`, which the section proof imports, as the UTIL-DISPLAY fix did (`ud-audit-subjective-verdict.md:120-127`);
    - the fix round carries `INPUT_GROUP_TOGGLE_CASES` with the other tables.
- **`split-corners-guard`** (`button-group.test.ts:361-364`).
  - `.map((group) => requireValue(group, 'No group'))` guards elements that `querySelectorAll` never returns null. The `undefined` check after it is the guard that actually matters.
  - Right: `const groups = [...host.querySelectorAll('.btn-group')]` followed by `requireValue(groups[0], 'No leading group')` and `requireValue(groups[1], 'No trailing group')`. This is the file's own idiom at `:167-168`.
- **`stale-exclusion-comment`** (`button-group.test.ts:205-206`).
  - "The exclusion is why a split toggle keeps its trailing corners where every other non-last child loses them" is false now that a leading split toggle is squared (`_button-group.scss:59`).
  - Right: "…why a split toggle further in keeps its trailing corners…", or a pointer to the leading-split case at `:346-350`.

## Attacked and held

- **Leading split toggle squared.** Held on the inventory: `built-rows.log.txt:1-6` records 0 under `btn`, `btn-group`, and `dropdown`.
- **Split dropstart as a flat group.** Held. It is the one layout where the `:first-child` rule is the sole cause of the squaring, and the proof separates it from the nested-group rule.
- **Caret rules on empty toggles.** Held. The styles proof reads toggles that carry text (`:321-323`), and the frames' limit is recorded in § Not closed.
- **Ledger placement without a `#### btn-group` table.** Held. The departure bullet states the attribution.
- **Split-group markup duplicated in the specimen builders.** Held: the `...[].map` specimen pattern is the base precedent (`constants.ts:1562-1570`).
- **Advisory, not required:**
  - The `Input group dropdown` specimen's trailing menu omits the `dropdown-menu-end` class, which the unit's own fixture carries (`input-group.test.ts:260`).
  - The doc block says the menus follow "as the release's markup writes it" (`tg-shared.patch:78-79`). Confirming that needs the documentation page.

## Referrals to the Orchestrator

- The Bootstrap 5.3.8 button group, dropdown, and input group documentation pages are not in the evidence. Specimen fidelity against them is unruled.
- No capture portfolio was supplied, so the rendered split and input dropdown frames are not evidenced.
- Engine provenance disagrees. The brief says `opus` on Opus 5 (`b-collapse-tg-brief.md:5`); the report says Opus 5.5 (`report:3`).
- The retained `mutate.py` still names `tmp` launch paths (`mutate.py:7-8`).

VERDICT: FAIL 7, 8; outside the claims: inline-tables-beyond-ruling, split-corners-guard, stale-exclusion-comment
