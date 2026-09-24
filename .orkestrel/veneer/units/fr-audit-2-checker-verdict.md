# Checker verdict — FORMS-FRAMES round 2, claims 1, 3, 7

**Claim 1 — Scope: CONFIRMED**

- `fr-2-status.txt:1-12` lists: `app/browser/constants.ts`, `src/styles/components/_form-range.scss`, `tests/app/browser/integration.test.ts`, `tests/app/browser/sections/{FormControlSection,FormFloatingSection,InputGroupSection,ValidationSection}.test.ts`, `tests/setup.test.ts`, `tests/setup.ts`, `tests/setupStyles.test.ts`, `tests/setupStyles.ts`, `tests/src/styles/components/form-range.test.ts`.
- Every file resolves to brief 1's owned set (`b-forms-frames-brief.md:71-77`) plus `tests/setupStyles.ts` (owned by brief 2, `b-forms-frames-brief-2.md:55`, the verdict's scope ruling), plus the named exception `tests/setupStyles.test.ts` (report explains the export-list edit follows from the added tables, `b-forms-frames-report-2.md:79-80`).
- `fr-shared-2.patch:1-156` touches only `guides/veneer.md` (every hunk header reads `--- a/guides/veneer.md` / `+++ b/guides/veneer.md`).
- Ledger rows: `fr-shared-2.patch:140-143` carries the `--vn-palette-white-base` box-shadow rows; `fr-shared.patch:123-126` (round 1) already carries the identical rows against the same `e4a6d7c` baseline, so round 2 carries what round 1 carried rather than reverting it.

**Claim 3 — The mutations (claims-file item 3, brief's claim 7): CONFIRMED**

- `fr-instruments/fr-mutations-2.log.txt:1-11`: the filtered hairline run (`-t hairline`) gives `Tests 1 failed | 7 skipped (8)`, failing case `paints the focused thumb hairline white...` alone — matches "the hairline-only P10 run reddens the hairline case alone."
- `fr-mutations-2.log.txt:61-78`: the unfiltered validated-select mutation gives `Tests 1 failed | 53 passed (54)`, failing case `rings each validated select and check...` alone.
- `fr-mutations-2.log.txt:80-93`: the unfiltered pressed-check mutation gives `Tests 1 failed | 53 passed (54)`, failing case `holds each pressed form control...` alone.
- `b-forms-frames-report-2.md:48-71,202-212` names every case each mutation reddens, matching the log's failing-case lines one for one, and explicitly disclaims the P10 whole-file run reddening 3 cases (`report:53-61`) rather than folding it into the "alone" claim — this is the correction of round 1's BROKEN claim 7 (`fr-audit-verdict.md:23,31-34`).

**Claim 7 — Law and report: CONFIRMED**

- `fr-2.diff`: no added line matches `any`, `as <Type>` (only prose "as" uses found at lines 24, 389, 464, 2036, 2056, 2078, 2186 of the diff, none a type assertion), `!` assertion forms, `@ts-ignore`/`@ts-nocheck`/`@ts-expect-error`, `eslint-disable`, or a mock/spy/fake-clock call (`vi.fn`, `vi.mock`, `jest.fn`, `sinon`, fake timers) — grep swept the whole diff, zero matches.
- No added top-level `function` or brace-bodied arrow declaration outside a class/module scope was found by a targeted grep; this is a sampled sweep of the diff's literal patterns, not a structural parse — flagged as a bound rather than exhaustive proof.
- Moved populations: `fr-2.diff:2049` (`FORM_RANGE_HAIRLINE_CASES`) and `fr-2.diff:2083` (`VALIDATION_HOST_CASES`) are both `export const ... = Object.freeze([...])` in the setup file, and `fr-2.diff:1524,1586,1591,2197,2209,2216` show the test files importing and reading from them rather than carrying a local literal.
- Gate logs open with command and close with exit: `fr-instruments/fr2-gate-format.log.txt:1,6` and `fr-instruments/fr2-gate-guides.log.txt:1,16` (sampled) both do; the report quotes each command and result line at `b-forms-frames-report-2.md:224-233` matching the sampled logs verbatim.
- `b-forms-frames-report-2.md`: no temporal-word hit (`now|currently|new|latest|once|since|soon`, case-insensitive) and no tally-of-a-growable-set phrasing found on inspection of the Findings, Added states, and Mutation-log sections.

## Counts the report states

- Mutation-log table (`b-forms-frames-report-2.md:202-212`): 9 mutation rows.
- Gate table (`b-forms-frames-report-2.md:222-233`): 12 gate rows; gate-log list (`234-246`): 10 named logs.
- Added-states section (`107-172`): 4 driven states, 5 resting states, 1 unreachable state.

These are run/table counts (rows in a table the report itself renders), not counts of a growable population the writing rules ban; noted here only to satisfy the brief's "counts the report states, listed" requirement.

## Not run / outside my tools

- No apply check, no command execution, no build — read-only per role.
- The "no nested function" sweep is pattern-based, not an AST parse; a nested arrow/function whose brace sits on a following line would not be caught by this grep. Named as a bound, not a finding.

VERDICT: PASS
