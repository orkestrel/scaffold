Verdict for TOGGLES (`tg`) audit round 2, the fix round. I held the **subjective** lane on Opus 5.5.

Opus wrote this round. The brief also carries wording my own lane prescribed in round 1. I attacked both of those harder. Paths are relative to `/home/user/scaffold/.orkestrel/veneer/units/` unless they are absolute. For the shared files at `a658879`, I read the worktree `/home/user/veneer-tg`. `tg-2-status.txt` lists only the owned files as modified, so the shared files there are the base.

## Per-claim verdicts

**1. Delta and scope: UNRESOLVED.** Every part I can check holds. The index-hash and apply clauses rest on the writer's report alone.
- `tg-2-status.txt:1-6` lists exactly the six owned files, each `M`. `tg-2.diff` has headers for those files only.
- `_input-group.scss` is byte-identical to round 1: the index line reads `3fe0e3c..37b2bcb` at both `tg.diff:67` and `tg-2.diff:67`.
- `tg-shared-2.patch` names exactly five files (lines 1, 106, 980, 1040, 1367), and each carries an `index` line.
- Round-1 content carries over unchanged where § Findings closed names no change. I compared:
  - the specimens (`tg-shared.patch:37-60` against `tg-shared-2.patch:38-61`);
  - `tests/setup.ts` (`:929-985` against `:980-1037`);
  - the compatibility cells (`:906-925` against `:957-976`);
  - the dropdown ledger rows, the `INPUT_GROUP_CASES` rows, and the partition hunks.
- No line lands in a vendored, sibling, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, `README.md`, or `ROADMAP.md` file.
- To settle it: run `git -C /home/user/veneer-tg rev-parse a658879:<path>` for each of the five paths and `git apply --check`. The report pastes neither output (`b-collapse-tg-report-2.md:291-296`). Referred to the objective lane.

**2. The guide: CONFIRMED.** Each of the brief's items 1 to 6 reads exactly as ruled.
- Item 1 is at `tg-shared-2.patch:216-220`, with the split-toggle exception sentence kept.
- Item 2 is at `:134`. Item 3 is at `:222-225`, where every `calc(...)` token takes the noun `value`. Item 4 is at `:167-168`. Item 5 is at `:196-198`. Item 6 is at `:208`.
- The re-wrapped proof paragraph (`:167-186`) matches the base text word for word, apart from the inserted clause. The remaining guide hunks match round 1.
- Presentation drift that does not force the verdict: `:209` is a 125-column line left unreflowed after item 6. The report does not name that re-wrap. It changes no sentence, and the formatter preserves prose wrap (`.oxfmtrc.json` has no `proseWrap`).
- Wording defects in the ruled sentences are ruled under claim 7.

**3. The doc blocks and comments: CONFIRMED.**
- The doc blocks read as the claim states: `tg-shared-2.patch:23-24` and `:85`.
- The loop comment names the forms: `tg-2.diff:52-54`.
- The caret comment states the narrowed limit (`tg-2.diff:396-401`). The source corroborates it:
  - the `:empty` rule clears only `::after` `margin-left` (`/home/user/veneer-tg/src/styles/components/_dropdown.scss:111-112`);
  - the `::before` caret keeps `margin-right: 0.255em` (`:100-102`);
  - the split rule clears it (`tg-2.diff:48-49`).
- The exclusion comment reads "a split toggle further in" (`tg-2.diff:332`).
- Both trailing menus carry `dropdown-menu-end` (`tg-shared-2.patch:96`, `:101`), and the doc block gives the reason (`:82-83`).
- The report's § Not closed states the narrowed limit (`b-collapse-tg-report-2.md:345-350`).
- The probe numbers exist only in the report, because the probe was deleted. The comment's claim rests on the source reading, so this does not change the verdict. See the referral about the unadopted probe.

**4. The case tables: CONFIRMED on the claim's letter.** The `side` field name is ruled wrong outside the claims.
- Shapes, rows, and placement:
  - `BUTTON_GROUP_SPLIT_CASES` follows `BUTTON_GROUP_CHECK_MARKUP` (`tg-shared-2.patch:1386-1432`).
  - `BUTTON_GROUP_SPLIT_FORMS` follows it (`:1434-1471`).
  - `INPUT_GROUP_TOGGLE_CASES` follows `INPUT_GROUP_FLOATING_CASES` (`:1505-1545`).
  - `BUTTON_GROUP_CARET_CASES` follows `DROPDOWN_DIRECTION_CASES` (`:1552-1571`).
- Each table is frozen at every level and carries TSDoc. The freeze assertions are at `:1108-1123` and `:1261`, `:1269-1273`.
- The new case titles are at `:1125` and `:1280`. The proofs import the tables and restate no row (`tg-2.diff:350-371`, `:376-379`, `:402`, `:502-520`, `:177`).
- The input-group section case filters `CASCADE_KEYS` by subject and requires the filtered subjects to equal the collected ones (`tg-2.diff:262-267`).
- The derived caret table's placement is right. Its initializer calls `DROPDOWN_DIRECTION_CASES.map` at module evaluation, so it must follow its source. The breakpoint table derived from `GRID_BREAKPOINT_CASES` sets the same precedent (`:1573-1575`).
- The gate reads `114 passed (114)` (`tg-instruments-2/logs/gate-setup.log.txt:8`).
- Mutations, and whether the assertions tell them from the passing case:
  - `split-cases-reordered` diffs the class lists against the inventory's order (`mutation-split-cases-reordered.log.txt:20-30`).
  - `caret-cases-reordered` diffs the selectors (`mutation-caret-cases-reordered.log.txt:15-57`).
  - `toggle-cases-reordered` reddens the derivation case (`mutation-toggle-cases-reordered.log.txt:9`).
  - Each `-unfrozen` control reddens its freeze case (`mutation-*-unfrozen.log.txt:9`).
  - Each reads `1 failed | 113 passed (114)` (`mutate-run.log.txt:19-26`).
  - Reading only, not run: changing any `corners` value makes the derived row differ at `:1320-1327`, so that case tells it apart.
  - Every control distinguishes its mutation.

**5. The guard and the proofs' readings: CONFIRMED.**
- The guard indexes the list, then calls `requireValue(groups[0]…)` and `requireValue(groups[1]…)` (`tg-2.diff:434-436`).
- Each round-1 mutation reddens on the reading the matrix states:
  - `Base leading: expected 12 to be close to 9` (`mutation-base-padding-omitted.log.txt:99`);
  - the `Small`, `Small group`, `Large`, and `Large group` readings (their logs, lines 93-113);
  - `shared: 1` for `Split button small` (`mutation-group-size-on-buttons.log.txt:84-88`);
  - `[ true, true ]` against `[ true, false ]` with the updated anchor (`mutation-trailing-toggle-kept-count-broken.log.txt:10`; `mutate.py:43`).
- Each log reads `1 failed` (`mutate-run.log.txt:1-18`).
- The mutation logs' line numbers match the final bytes, which corroborates that later edits did not move any assertion:
  - `button-group.test.ts:270`, `:297`, and `:345`;
  - `input-group.test.ts:258`;
  - `setupStyles.test.ts:1127` and `:1139`.
- The unmutated controls:
  - `gate-styles.log.txt:147` reads `61 passed (61)`, which equals the 41 + 20 totals in `mutate-run.log.txt`;
  - `gate-sections.log.txt:78` reads `9 passed (9)`;
  - the case titles equal round 1's (`tg.diff` against `tg-2.diff`).
- Ruling on the `group-size-on-buttons` gap: the given ruling stands, and no recorded selector is left unproved.
  - The styles `Small group` row proves `.btn-group-sm > .btn + .dropdown-toggle-split` on unsized buttons (`mutation-small-group-form-omitted.log.txt:105`).
  - A size class on the sized group's toggle alone leaves `.btn-sm + .dropdown-toggle-split` unmatched on that toggle, because its previous sibling is unsized.
  - That class also changes nothing in the render: the `.btn-group-sm > .btn` twin already applies the same size properties to every button in the group.

**6. The gates: UNRESOLVED.**
- Each log exits 0 with the count the claim names:
  - `gate-format.log.txt:8-10`, `gate-lint.log.txt:6`, `gate-setup.log.txt:8`, `gate-styles.log.txt:147`, `gate-sections.log.txt:78`;
  - `gate-conformance.log.txt:12`, `gate-guides.log.txt:12`, `gate-policy.log.txt:12`.
- Only the report supports "taken after the last edit" (`b-collapse-tg-report-2.md:245-248`). The gates ran from 18:11:06 and the mutations from 18:05.
- To settle it: check that the six owned files' mtimes in `/home/user/veneer-tg` do not postdate 18:11:06 UTC, or rely on the verifier's authoritative run. Referred to the objective lane.

**7. Law and report: BROKEN.**
- The code-law checks hold:
  - the delta has no `any`, no `as`, no `!` assertion, and no suppression;
  - its only nested functions are callbacks passed directly;
  - it exports no new helper, only tables.
- These writing defects break the claim:
  - (a) **A cross-reference uses `above`.** `b-collapse-tg-report-2.md:229` reads "Every run above read…". The writing rule's substitution table bans `above` as a cross-reference. Right: "Every run in the preceding table read…".
  - (b) **A list item is named by its position.** `tg-shared-2.patch:1522`, in the `INPUT_GROUP_TOGGLE_CASES` TSDoc, reads "The last row carries the validated row's children…". `AGENTS.md` forbids naming a list item by its position. Right: "The unvalidated row with feedback carries the validated row's children in a group without that class, so its trailing toggle…".
  - (c) **An ambiguous "which" misleads on the first read.** `tg-shared-2.patch:1397-1399` reads "`pixels` is … three quarters of the inline step the action button pads by, which reads 12 pixels at rest, 8 in a small form, and 16 in a large form." That sentence sits beside rows whose `pixels` values read 9, 6, and 12. Round 1 ruled out the same ambiguous "which" in the guide. Right: "`pixels` is the release's own padding for the form, three quarters of the action button's inline step: that step reads 12 pixels at rest, 8 in a small form, and 16 in a large form."
  - (d) **A clause attaches to the wrong verb.** `tg-2.diff:52-54` reads "…because a sized split can sit in either position, as the release's own extend of the group twin does." The rewrite moved the "as … does" clause onto "sit". Right: "Each size writes the form after a button carrying the size class and the form inside a group carrying it, as the release's own extend of the group twin does, because a sized split can sit in either position."
  - (e) **The given ruling's wording gives software a human faculty.** `tg-shared-2.patch:218` reads "because the release expects its hidden menu to follow it". The writing rule gives software no human faculties. My lane's round-1 prescription introduced this word, so the ruling is wrong here. Right: "because the release's markup puts its hidden menu after it, which often leaves the toggle as the group's visible end while it is not the last child."
  - (f) **The given ruling's wording leaves a code token with no noun.** `tg-shared-2.patch:23-24` and `:85` read "each toggle announces `aria-expanded="false"`". The guide's own form is "the `aria-expanded` attribute" (`/home/user/veneer-tg/guides/veneer.md:4398`). Right: "each toggle announces the `aria-expanded="false"` state", in both blocks.
- Counts the report states, for the record:
  - `:13` "One reading moved" names its member after the colon in the same sentence.
  - `:31-37` is the diffstat as `git` output: 42, 7, 82, 57, 142, 31, and `6 files changed, 347 insertions(+), 14 deletions(-)`.
  - `:131` quotes code: `toHaveLength(5)` and `[9, 6, 6, 12, 12]`.
  - `:120-122` gives probe readings `0` and `3.57`.
  - `:211-227` quotes the assertion values in the matrix.
  - `:229` reads `Tests  1 failed`.
  - `:236-243` reads `1 failed | 113 passed (114)` for each table control.
  - `:264-269` gives `114 passed (114)`, `61 passed (61)`, `9 passed (9)`, `22 passed (22)`, `19 passed (19)`, and `109 passed | 1 skipped (110)`.
  - `:275` says `1575 lines`, with a SHA-256 hash.
  - `:283-288` is `git apply --stat` output: 59, 772, 42, 192, 156, and `5 files changed, 801 insertions(+), 420 deletions(-)`.
  - `:71` "100 columns" is a limit, not a count.
  - Every test count matches its log. `1575 lines` matches the patch's final line. The `_input-group.scss | 7` figure matches `tg-2.diff:66-92`. I did not recompute the other diffstat figures.

## Findings outside the claims

- **`caret-side-name`.** In `BUTTON_GROUP_CARET_CASES`, the field `side` holds a margin property name (`tg-shared-2.patch:1568`), and its TSDoc calls it "the margin … property" (`:1559-1561`).
  - The code uses it as a property: the binding case writes `{ property: side, value: '0' }` (`:1167`), and the proof calls `readPixels(plain, side, pseudo)` (`tg-2.diff:414-415`).
  - The source table, derived one line above, uses `sides` for the caret's border sides `top`, `right`, `bottom`, and `left` (`/home/user/veneer-tg/tests/setupStyles.ts:5706`).
  - The DROPDOWN case in the same test file uses "caret side" in that border sense: `derives each caret side …` builds `border-${side}` (`/home/user/veneer-tg/tests/setupStyles.test.ts:3019`, `:3033`). The new title `binds the split toggle padding forms, caret sides, …` (`:1125`) uses the phrase for a margin.
  - One term now names two concepts in one file (`AGENTS.md` one concept, one term; `names.md` "Describe what a thing is").
  - The shape came from my lane's round-1 prescription, carried by the brief, so that ruling is wrong.
  - Right: rename the field to `margin` in the table, its TSDoc, the `it.each` placeholder, and the binding case, and title the binding case `… caret margins …`. The styles case titles do not change, because they interpolate the values.

## Attacked and held

- **The density case restating the element template.** The given ruling stands on scope, because finding 10 named the set of tables. If the Orchestrator wants the duplicate gone later, derive a `markup` field on the rows; that fix needs no unnamed export.
- **The padding case's removed `slice(1)` filter.** Every sized row's `pixels` value differs from the `Base` row's, and each fall-back reddens the per-row comparison.
- **`BUTTON_GROUP_SPLIT_FORMS` placed in `tests/setupStyles.ts`.** It is a selector table, and the UTIL-DISPLAY fix round sets the precedent. The browser proof's `externalized` warnings fail nothing.
- **Field tokens as sentence subjects in the new TSDoc.** They match the file's own convention (`setupStyles.ts:4412`, `:4426`).
- **The doc-block rewordings beyond finding 7.** Each one drops a tally.
- **The round-2 matrix omits the round-1 Specimen and Capture columns (R19).** No specimen or capture row moved, so the round-1 matrix (`b-collapse-tg-report.md:381-394`) still carries both columns.

## Referrals

- **Objective lane:** the index-hash and apply clauses of claim 1, and the edit-ordering clause of claim 6, with the settling commands given there.
- **Objective lane:** the probe that settled the `.dropstart` empty-toggle limit was deleted rather than adopted (`b-collapse-tg-report-2.md:117-123`, `:365-366`). `quality.md` § Instruments requires adopting an instrument that settled a claim as a test. No committed proof reads an empty split toggle under `.dropstart`.
- **Orchestrator (retention):** the retained report names `tmp/units/` launch paths:
  - `:11` names `tmp/units/tg-shared.patch`;
  - `:373` names `../../units/tg-shared-2.patch`;
  - `:9-10` repeats the retained patch path, which is residue of the retention rewrite.
- **Orchestrator:** no capture portfolio was supplied, so the report's statement that the `Split dropstart` frame shows the rule is NOT-EVIDENCED. No numbered claim rests on it.
- **Orchestrator:** the report says the case titles match round 1 "(`vitest list`)" but retains no list log. I checked the titles against the two diffs instead.

VERDICT: FAIL 1, 6, 7; outside the claims: caret-side-name
