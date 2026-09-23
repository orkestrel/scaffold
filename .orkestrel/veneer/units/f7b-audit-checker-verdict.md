# f7b round, checker lane (`checker` on Sonnet) — verdict

Brief: `units/f7b-audit-checker-brief.md`.

### Claim 1 — Delta and scope
CONFIRMED. `units/f7b.diff` touches only `app/browser/constants.ts` (f7b.diff:1) and `tests/app/browser/sections/TableSection.test.ts` (f7b.diff:13). `units/f7b-status.txt:1-2` lists the same two files (` M app/browser/constants.ts`, ` M tests/app/browser/sections/TableSection.test.ts`) and no other.

### Claim 2 — The specimen (criterion 1)
CONFIRMED. `/home/user/veneer-f7b/app/browser/constants.ts:601-602` reads `{ name: 'Caption at top', classes: 'caption-top' },` followed immediately by `{ name: 'Caption at bottom', classes: 'caption-bottom' },`. The diff (f7b.diff:5-9) shows exactly this one added line and nothing else in the file. The markup template at `/home/user/veneer-f7b/app/browser/constants.ts:620` builds `<table class="table ${classes.startsWith('table-responsive') || classes === 'table-group-divider' ? '' : classes}">`; `'caption-bottom'` is neither a `table-responsive*` class nor `'table-group-divider'`, so the class lands on the `<table>` element and the caption inherits `caption-side` the way `caption-top` does.

### Claim 3 — The proof (criterion 2)
CONFIRMED. `/home/user/veneer-f7b/tests/app/browser/sections/TableSection.test.ts:29-30` carries `'Caption at top',` then `'Caption at bottom',` in the name array; lines 63-64 carry `'caption-top',` then `'caption-bottom',` in the class array. The diff (f7b.diff:13-33) shows exactly these two insertions and nothing else in the file.

### Claim 4 — Shared files
CONFIRMED by independent grep under `/home/user/veneer-f7b`:
- `guides/veneer.md`: hits at lines 359, 372 (Tailwind `@source not inline(...)` fences already listing both classes), 413 and 701 (opt-out prose already naming both classes), and 3755 (parity table row for the `.caption-top` family) — none enumerate or count the showcase specimens.
- `tests/setup.ts`: no hits.
- `tests/app/browser/integration.test.ts`: no hits.
- `ROADMAP.md`: no hits.
No enumeration of the table specimens sits in any of these files; the report's grep results (`f7b-caption-specimen-report.md:51-64`) match this reading. No patch owed.

### Claim 5 — Law and report
CONFIRMED. The delta (f7b.diff) adds only the one constants row and the two test literals, no other prose. The report (`f7b-caption-specimen-report.md`) records each criterion with its command and result line: criterion 1 at lines 20-25, criterion 2 at lines 27-33, criterion 3 (`oxfmt --check`, `format:check`, `lint:check`, `check`) at lines 35-44, criterion 4 (`npm run test:app`) at lines 46-47. The report states no count of a growable set in prose; the numerals present (`two insertions`, `28 passed (28)`, `65 passed (65)`, `289 files`) are each a measurement reported with the run that produced it, permitted under `AGENTS.md` § Writing's exception for a number the reader needs from an actual run.

### Findings outside the claims (BROKEN standard)
None found. Scope is honest: the worktree touches only the two files claim 1 names; the report's off-limits check (`f7b-caption-specimen-report.md:66-70`) states `Showcase.test.ts` stayed green under `npm run test:app` with no edit, consistent with the diff showing no change to that file.

VERDICT: PASS
