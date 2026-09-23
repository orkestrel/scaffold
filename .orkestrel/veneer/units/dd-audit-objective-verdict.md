# DROPDOWN (`dd`) audit round 1: objective lane verdict

Lane: OBJECTIVE, held by `reviewer` on Opus 5.5 in place of `analyst` on Astra (Codex bench dark on quota). Opus 5 wrote the unit, so this lane ran on the writer's model family. I attacked the Opus-written half harder for that reason. Evidence read: the claims file, both briefs, the report, `dd.diff`, `dd-status.txt`, both shared patches, the design verdict, the worktree, and main at `/home/user/veneer`. I also read the executed logs the unit left in `/tmp/claude-0/-home-user/a00e22e1-18d9-5489-8624-ccf383fdf277/scratchpad/dd/`: `mutations.log.txt`, `mutate.py`, `gates2.log.txt`, `g2-*.log.txt`, `gate-conformance-2.log.txt`, `journey-light-1280.log.txt`, and `ledger.txt`. I ran nothing.

## Numbered verdicts

**1. Delta and scope — CONFIRMED.**
- `dd-status.txt:1-4` lists only the four owned files as untracked. `dd.diff` has four `new file mode` headers (lines 2, 29, 336, 551).
- `dd-shared.patch` and `dd-shared-post-bpo.patch` contain no `-` line, so every hunk is an addition.
- The patch touches `src/styles/index.scss`, `tests/conformance.test.ts`, `tests/setupServer.test.ts`, `tests/setup.ts`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/app/browser/{integration,Showcase,index}.test.ts`, `app/browser/{constants,Showcase,index}.ts`, and `guides/veneer.md`. Each file is in the Shared list of `b-collapse-dd-brief.md:95-105`, and none is off-limits.
- Attack that failed: I searched for a deletion or an off-limits path in either patch. There is none.

**2. The partial — CONFIRMED.**
- `_dropdown.scss:61-299` matches Bootstrap 5.3.8 rule for rule and in the release's order. Checked: the wrappers; the caret mixin reproduced through one `@each` at lines 77-120, including the `::after` hide and `::before` on dropstart and the trailing `vertical-align: 0` after `:empty`; the menu slots; `[data-bs-popper]`; the `breakpoint-each` ramp with `--bs-position` at lines 175-193; the direction placements; the items; and `.dropdown-menu-dark` after `.dropdown-menu`.
- The dark hover fill is `color-mix()` over the palette (line 294, R13).
- The post-BPO barrel puts `dropdown` before `button-group`. On main that is directly after `validation` (`/home/user/veneer/src/styles/index.scss:59-60`), which is Bootstrap's position.
- Built-cascade proof: `g2-8.log.txt` shows the order case, the presence gate, and the ledger gates at 22 passed on replica 2. `gate-conformance-2.log.txt` shows 21 passed on replica 1.
- Note for the subjective lane: `$carets` is a list of tuples, not a map. `.claude/rules/styles.md:44` asks for "one `@each` over a shared list", so R6's substance holds.

**3. The cascade proof — BROKEN.**
- The claim says each named mutation is "recorded red in the report's mutation table". `mutations.log.txt:1-111` and `mutate.py:32-46` hold 13 runs. None of them covers:
  - the centering limit (R9);
  - the item `.active`, `:active`, `.disabled`, or `:disabled` paints;
  - the header, divider, or item-text rules;
  - a `-{bp}-end` boundary mutation. The one boundary run moved the whole `sm` block;
  - a `--bs-position` misread (start and end swapped). Only "omitted" ran.
- The report says so itself at `b-collapse-dd-report.md:185-186`: "the other mutations this table names … did not run."
- Reading the assertions, each unrun mutation would be distinguished:
  - `dropdown.test.ts:205-211`: a centering rule makes `box.left - wrapper.left ≠ 0`.
  - `:291-317`: dropping the active or disabled rule moves the `rgb(11, 22, 33)` and `rgb(77, 88, 99)` readings.
  - `:358-389`: header, divider, and text.
  - `:213-214` and `:238`: the swap.
- A proof that never ran red does not bind (AGENTS.md § TTTDD).
- Fix: add these mutations to `mutate.py` and run each one:
  - `centering-added`: append `.dropdown-center .dropdown-menu[data-bs-popper]{left:50%;transform:translateX(-50%)}`;
  - `active-rule-dropped`;
  - `disabled-rule-dropped`;
  - `header-rule-dropped`;
  - `divider-rule-dropped`;
  - `item-text-rule-dropped`;
  - `position-swapped`;
  - `sm-end-boundary`, moving `.dropdown-menu-sm-end` alone.
  Record each failing case in the report's table.

**4. The section and the specimens — BROKEN.**
- Holds:
  - `DropdownSection.ts:12-19` subclasses `SpecimenSection` with `DROPDOWN_COPY` and `DROPDOWN_SPECIMENS`.
  - Every shown menu sits in a `.container-fluid > .row.row-gap-5` grid with no inline style (`DropdownSection.test.ts:22`).
  - The toolbar of empty toggles and their `aria-label` names hold (`:115-132`).
  - The specimen names hold (`:26-41`).
- Falsified: "the section proof holds the containment … at 390 and 1280".
  - The containment case (`DropdownSection.test.ts:145-189`) never sets a viewport. There is no `visitBreakpoint` call.
  - The `app:browser` project declares no viewport (`/home/user/veneer-dd/vite.config.ts:182-195`), so the case runs only at the runner's default width.
  - The 390 and 1280 readings came from a probe the unit deleted (report lines 61-63).
  - Failing state: change the `Dropend` column to `col-lg-2 offset-lg-10`. At 1280 the toggle sits near the right edge and its menu runs past the specimen's right edge. At the default width the column is full-width, so the case stays green.
  - The case also asserts inclusion (≥0 px of room), not the 12 px the report cites.
- Fix: wrap the measurement loop in `await visitBreakpoint(390, …)` and `await visitBreakpoint(1280, …)`, the installed helper `dropdown.test.ts` already uses. Keep the mutation run (`room-dropped`) red at both widths.

**5. The capture rows — UNRESOLVED.**
- Holds:
  - The patch's `CASCADE_KEYS` rows (`dd-shared.patch:65-155`) all name a wrapper with `position`.
  - Rows resolve inside their own specimen (`integration.test.ts:633-637`), so the bare `.dropdown` on `dropdown-closed` is sound.
  - `DRIVEN_KEYS` gains `dropdown-menu-hover` and `dropdown-menu-focus`, and the patch adds no `CaptureState` member.
  - `journey-light-1280.log.txt:98` shows the driven case passing, and `:115-116` shows 39 passed on replica 1.
- Not evidenced: "the journey is green on the replicas". No journey ran on replica 2, the landing base (`gates2.log.txt` has none), and no dark-1280, light-390, or dark-390 run exists anywhere.
- To settle it, run all four journey variants on replica 2 and read the hung-key and lifted-frame cases.

**6. The tables, the ledger, and the deferrals — BROKEN.**
- Holds:
  - The ledger rows equal `ledger.txt:1-26`, and the bidirectional ledger gates are green on both replicas.
  - The owners `Navbar` and `Disclosure` hold.
  - `listed`, `setupServer.test.ts`, and the post-BPO order case gain `dropdown`.
- Falsified: the partition case in `tests/setupStyles.test.ts` (`dd-shared.patch` around lines 437-442) asserts:

  ```ts
  shared.every((selector) => selector.startsWith('.input-group') || selector.startsWith('.btn-group'))
  ```

  - The inventory records `.nav-tabs .dropdown-menu` under both `dropdown` (`inventory.json:42757`) and `nav` (`:48743`).
  - Under the Orchestrator's D4 ruling the `Nav` deferral row is dropped at landing. That selector then falls into `shared`, the assertion reads `false`, and the case reddens whichever of NAV and DROPDOWN lands first.
  - Fix: in the same landing that drops the row, extend the predicate with `|| selector.startsWith('.nav-tabs')`.
- Ordering constraint on D4: with the row dropped, the presence gate ("carries every shipped component selector…") requires `.nav-tabs .dropdown-menu` in the built cascade. The drop is safe only after NAV's `_nav.scss` has landed.

**7. The guide content — BROKEN.**
- The Dropdown `plugin` cell ends "J-ENGINE owns it." (`dd-shared.patch:974`; report line 1299), not "Owner: J-ENGINE.". COLLAPSE and NAV use "Owner: J-ENGINE." (`co-instruments/plugin-cell.txt:1`; `nv-instruments/edit1.py:30-31`).
- The patch carries no § Tests link. Main's § Tests lists every section proof and every component proof (`/home/user/veneer/guides/veneer.md:4047-4075` and `4138-4169`), and COLLAPSE added its own (`co-shared.patch:358`). DROPDOWN adds neither of these, and `test:guides` does not catch the omission:
  - `[dropdown specimens](../tests/app/browser/sections/DropdownSection.test.ts)`
  - `[the dropdown classes](../tests/src/styles/components/dropdown.test.ts)`
- The R8 sentence (`dd-shared.patch:976-977`) is worded differently from COLLAPSE's (`co-shared.patch:338`) and NAV's (`nv-shared.patch:268-269`). The report's "keep one copy" note (report lines 284-286) therefore cannot be applied mechanically, and R8 asks for one sentence.
- Holds: the R7 and R9 sentences, the proof sentence in CLOSE-GUIDE's form (patch line 892), the deferral rows, and the § Files row.
- Fix: end the cell with "Owner: J-ENGINE.". Add both § Tests links in alphabetical position. At integration, drop DROPDOWN's R8 sentence in favour of the single family sentence the Orchestrator picks.

**8. Law and report — BROKEN.**
- Holds:
  - No `any`, `as` assertion, `!`, suppression, mock, or nested function. Every function inside a body is a callback passed directly.
  - The SCSS follows `.claude/rules/styles.md`.
  - A case-insensitive sweep of the substitution table over `dd.diff` and `dd-shared.patch` finds only permitted senses: spatial `above` and `below`, the `new` operator, and `never`.
- Falsified under the campaign's reading (a symbol or attribute takes a noun):
  - `dd-shared.patch:237`: "`raised` is true".
  - `:325`: "`source` is the token".
  - `:666`: "through `aria-label`".
  - Fix: "the `raised` flag", "the `source` field", "through its `aria-label` attribute".

## Findings outside the claims

**F1 — a test case that cannot fail.**
- `dropdown.test.ts:537-582` runs `it.each(TEXT_MODES)`. Its light instance mounts `data-bs-theme="light"` for both the island and the reference, so every reading compares identical markup in identical scopes.
- `mutations.log.txt:1-47` shows it passing with the partial removed, the only survivor of 47, which report lines 157-158 confirm.
- No mutation can redden it.
- Fix: parameterize over the dark mode alone. Alternatively, read the plain menu in the light island against a dark reference and assert that they differ.

**For the record (counts the report states, as claim 8 asks):**
- Counts of a set, which break the count law: "on two replicas" (line 12), "lists exactly those four files" (line 90), and "one § Deferred selectors row" (line 50).
- Measurements tied to an executed run, which the law permits:
  - 109 passed and 1 skipped;
  - 21 and 22 passed;
  - 34 passed;
  - 252 passed;
  - "1 test failed and 12 were skipped";
  - 81 passed (47 and 34);
  - 29 files and 69 tests;
  - 18 passed;
  - 39 passed;
  - 46 failed out of 47;
  - the per-mutation failing counts (15, 1, 5, 1, 5, 1, 7, 1, 11, 1, 1, 2).
- Sizes and values, also permitted: the Lines column (300, 583, 20, 208), the row widths (240 and 443), 3rem, 48px, 12px, and 10 s.

## Attacked and held

- Specificity and order: `.dropup .dropdown-toggle::after` (0,2,1) follows the base `:empty` rule, so each direction needs its own `:empty` rule, and the loop emits one. The `empty-rule-dropped` run is red at 5.
- The dark class wins by source order at equal weight. Palette and gray tokens carry Bootstrap's literals (`_tokens.scss:200-222`) and are not retuned under the theme scope, so the guide's "both color modes" sentence holds.
- The `wrong-boundary` edit moved the whole `sm` media block in the built sheet, and the styles project reads `dist`. The one red reading is causal, not incidental.

## Referrals to the subjective lane

- One concept, two terms: `$centered` in `_dropdown.scss:77` and `raised` in `DROPDOWN_DIRECTION_CASES` name the same caret fact with inverse polarity. `$centered` also collides with the `.dropdown-center` wrappers in the same partial.
- The guide sentence beginning "The `.dropdown-menu-end` class aligns the menu to its wrapper's end" omits the `data-bs-popper` condition. Without the attribute, the class only publishes `--bs-position`.
- Under R17, rule whether "which is what a placement engine writes when it leaves a menu to the stylesheet" states script behaviour. R7 and R9 do not mandate it.

VERDICT: FAIL 3, 4, 5, 6, 7, 8; outside the claims: F1
