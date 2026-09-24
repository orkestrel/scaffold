# Verdict — TIP (`tp`) audit round 1, checker (claims 1, 6, 8)

## Numbered verdicts

**Claim 1 (Scope and delta).** UNRESOLVED.

Confirmed by direct reading:
- `tp-status.txt` lists exactly 8 untracked owned paths (lines 1-8), matching the brief's Owned list at `/home/user/scaffold/.orkestrel/veneer/units/b-modal-tp-brief.md:124-127` exactly (2 SCSS partials, 2 sections, 4 tests).
- `tp.diff` carries exactly those 8 files and no other (`tp.diff:1-1252`).
- `tp-shared.patch` touches exactly: `app/browser/Showcase.ts`, `app/browser/constants.ts`, `app/browser/index.ts`, `guides/veneer.md`, `src/styles/_mixins.scss`, `src/styles/index.scss`, `tests/app/browser/{Showcase,index,integration}.test.ts`, `tests/conformance.test.ts`, `tests/setup.ts`, `tests/setupServer.test.ts`, `tests/setupStyles.{ts,test.ts}`, `tests/src/styles/fixtures/mixins.scss`, `tests/src/styles/mixins.test.ts` — every one is on the brief's Shared list (`b-modal-tp-brief.md:129-144`) or is the fixture file the claims file grants retroactively (`tp-audit-claims.md:17-19`). No vendored, off-limits, sibling-unit, `src/browser/**`, `src/core/**`, `tests/fixtures/**`, `package.json`, or `README.md` line appears (`tp-shared.patch` full file list, read start to end).
- The MODAL/OFFCANVAS/TOAST entries, the barrel, and the showcase are untouched beyond the tooltip/popover insertions (`tp-shared.patch:479-487` barrel; `tp-shared.patch:1-27` Showcase.ts). The stacking paragraph under the table is not touched by this patch (only the Alias cell at `tp-shared.patch:304-309`), consistent with "MODAL rewrites it."

Cannot be decided from reading alone: whether `tp-shared.patch` "applies with `git apply --check` to a fresh extract of `2a3f223`." The report's own claim that this exits 0 (`b-modal-tp-report.md:68`) is the writer's self-report and is not evidence per the Falsification law. **What would settle it:** run `git apply --check .orkestrel/veneer/units/tp-shared.patch` against a fresh `git archive 2a3f223` extract of the Veneer repository outside any working tree. The Orchestrator takes that reading.

**Claim 6 (Registries and orders).** CONFIRMED.

- `CaptureSubject` gains exactly the 8 named subjects (`tp-shared.patch:633-640`); `CASCADE_KEYS` gains 8 resting rows, each reading `background-color` on `.tooltip-inner` or `.popover-header`, never an arrow selector (`tp-shared.patch:667-713`).
- No `DRIVEN_KEYS` row added (confirmed by absence in the `tests/setup.ts` hunk, `tp-shared.patch:625-714`, and stated explicitly in the report at `b-modal-tp-report.md:109`).
- `'listed'` gains `'popover'`/`'tooltip'` in alphabetical position (`tp-shared.patch:591-604`); the order case inserts `tooltip`, `popover` after `close` (`tp-shared.patch:607-624`), matching barrel order M19; `tests/setupServer.test.ts` dash-proof set gains the same two names alphabetically (`tp-shared.patch:717-736`).
- `Showcase.ts` construction inserts `TooltipSection`, `PopoverSection` after `AccordionSection` (`tp-shared.patch:19-25`); `app/browser/index.ts` rows follow the same position (`tp-shared.patch:138-150`); `Showcase.test.ts` and `index.test.ts` lists agree with each other and with this order (`tp-shared.patch:488-558`). All agree with M14's stated order.
- The barrel's `@use` lines sit immediately after `components/close` (`tp-shared.patch:479-487`).
- `TOOLTIP_SELECTORS`, `POPOVER_SELECTORS`, `TIP_PLACEMENTS`, `TIP_ARROW_PROPERTIES`, `TIP_RESET_CASES` sit in `tests/setupStyles.ts` (`tp-shared.patch:874-1100`), are frozen (asserted at `tp-shared.patch:849-861`), and are bound to the inventory by derivation (equality against `oracle.components[key].selectors`) in `tests/setupStyles.test.ts` (`tp-shared.patch:776-861`).

**Claim 8 (Law and report).** CONFIRMED.

- Searched `tp.diff` and `tp-shared.patch` in full for `any`, non-const-assertion `as`, `!`, `@ts-`, `mock`, `spy`, `fake`, `jest.fn`: no hit in added (`+`) lines beyond `as const` (`tp-shared.patch:965`), Sass `as *` module aliases (`tp.diff:60,231`), and the prose word "any" inside a sentence (`tp-shared.patch:455`, not the TypeScript keyword). No suppression, mock, spy, or fake construct found.
- No nested function declaration beyond a callback passed directly was found in the read sites; every arrow function in the diff is either passed directly to `it`/`describe`/`map`/`filter`/`flatMap` or returned directly.
- No new helper duplicates an installed `@orkestrel/test` or `@orkestrel/contract` export; the new symbols (`TIP_PLACEMENTS`, `TIP_ARROW_PROPERTIES`, `TIP_RESET_CASES`, `TOOLTIP_SELECTORS`, `POPOVER_SELECTORS`) are data tables, not helpers.
- Writing-rule sweep of added lines in `tp.diff` and `tp-shared.patch` for the banned-term rows found no genuine hit: every `new` is the JavaScript operator (`new TooltipSection(...)`, `new Set(...)`, `new Map(...)`) or code data, and every `above`/`below` names a physical stacking or paint relationship (z-index rung order, header-strip position, triangle offsets), not a cross-reference to other prose — the permitted sense under `.claude/rules/writing.md` § Substitutions.
- The report records each gate's command with its result line in the `## Gates on the validation copy` table (`b-modal-tp-report.md:190-204`).

## Findings fitting no claim

None substantiated.

## Attacked and held

- Claim 1's file-set and off-limits sub-clauses: attacked by diffing the touched-file lists against the brief's Owned/Shared/Off-limits enumeration line by line; held.
- Claim 8's banned-syntax sub-clause: attacked with an exhaustive pattern sweep of both diff files rather than a sample; held.
- Claim 8's cross-reference sub-clause: attacked by checking every `above`/`below` hit for the cross-reference sense the rule bans; every hit read in the physical/positional sense, which the rule permits; held.

## Counts the report states, listed (§ Output requirement, claim 8)

`Tests 22 passed (22)` (test:conformance, stated three times including the pre-edit baseline); `Tests 31 passed (31)` (styles-project run); `Tests 8 passed (8)` (app:browser section tests); `Tests 19 passed (19)` (test:guides); `Tests 109 passed | 1 skipped (110)` (test:policy); `Tests 145 passed (145)` (setup project, setupStyles/setup); `Tests 101 passed (101)` (setupServer alone); `Tests 5 passed (5)` (Showcase/index tests, earlier run); `Tests 46 passed (46)` (forms tooltip neighbors, earlier run); `Tests 270 passed (270)` (whole setup project, earlier run) and `Tests 1 failed | 257 passed | 12 skipped (270)` (same project, twice, under load); diffstat line counts for the 8 owned files (`+120, +165, +246, +337, +20, +20, +144, +151`); the shared patch's 16-file, `777 insertions(+), 10 deletions(-)` stat; `359 files` for `format:check`; the 17-row ledger table; the 8-row resting-rows table.

## VERDICT: FAIL 1; outside the claims: none
