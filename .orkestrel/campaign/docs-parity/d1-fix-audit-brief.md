# Audit brief — D1 guide-readers, round 2 (after D1-fix)

## Lanes

Three lanes over this one brief, blind to each other, each a fresh context: the subjective lane (`reviewer`, Opus 5: the shape of the new check and its name, the guide's transform and catalog prose, the Helpers table's order, the vocabulary), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench: whether each ruling is implemented as stated, whether the new drift semantics and the first-fence rule can produce a false green or a false red, whether the over-indented tag reading regresses any existing case, whether the controls are drawn from outside the membership), and `checker` (Sonnet: the fix brief's criteria as stated, scope honesty against the status file, the report's readings against the diff, no count stated in changed prose). Each lane reads only this brief and the evidence it names, runs no command, edits nothing, and returns per-claim verdicts. Perform the assignment directly and spawn nothing.

## Subject

Round 1 (`/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-audit-verdict.md`) broke claims 2, 3, and 8 and carried eight findings into `d1-fix-brief.md`. Unit D1-fix closed them; its report: `d1-fix-report.md`. The D1 brief and report (`d1-guide-readers-brief.md`, `d1-guide-readers-report.md`) and the plan (`plan.md` decisions 1 to 5, § Re-baseline) stay the subject's ground. Governing files as in round 1: `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/patterns.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`.

## Review evidence

The whole uncommitted tree against `HEAD`, carrying D1 and D1-fix together: `/home/user/scaffold/.orkestrel/campaign/docs-parity/d1-fix.diff.txt` and `d1-fix.status.txt`; round 1's evidence `d1-guide-readers.diff.txt` for what D1 alone changed. Read the changed files under `/home/user/fleet/guide` at their new state where a hunk is not enough.

## Claims to falsify (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. `findUnnamed` reports every `## Surface` and `## Methods` table row whose first cell carries no code span, as that row's cell text, and nothing else; it joins the `find*` family with a catalog row (id RN) naming the comparison and the guard; this checkout's `tests/guides.test.ts` asserts it empty; a positive control per section and a negative control from outside the membership (a code span inside emphasis) exist; `extractSurface`'s and `extractMethods`' TSDoc say the reader skips the row and RN reports it.
2. `computeDrift` reports `{ key }` when neither side carries text and agrees only when both carry the same text; the guide's SQ paragraph names the three states and keeps "never as agreement"; the TSDoc on `computeDrift`, `findDrift`, and `findColumnIndex` states the same rule; a case pins the both-absent drift for `findDrift` over a table with no `Summary` column.
3. The guide's § Tests states that this checkout wires RN, SB, MB, LI, TE, NV, FL, EX, and FI and not SQ, MQ, or EQ, and why, without a count and without `currently` or `now`.
4. The transform is stated once for both sides in § The extraction model with every clause the fix brief lists (link targets to code tokens, `{@link X | text}`, emphasis, link, image alternative text, `\|`, whitespace, trim, code span kept), the image descent is named in `extractCellText`'s TSDoc and Helpers row, and no code changed for this finding.
5. `collectTitled` is gone and `collectTitles` stands in code, tests, TSDoc, and the guide's Helpers row; the Helpers table is ordered by topic with `extractCellText` beside `findColumnIndex` and `extractCellLinks`.
6. A block tag indented past one space after the continuation marker ends the description paragraph and is read as `@example` by `collectSummaries`, `collectExamples`, and `extractExampleLines`, pinned by a fixture with ` *   @param` and ` *   @example`; the existing rejection cases (`@examples`, `@exampled`, a mid-line `@example`) still reject.
7. `findDrift` compares the first fence a title reaches and leaves a later fence under the same heading outside the comparison, stated in the example-pairing paragraph and the EQ row, pinned by the two fixtures the report names; a title with no `@example` block consumes its heading's one pairing, so a later fence reports nothing either way.
8. The report's readings match the diff (the failing-first reds, the RN wiring proof and its restore, the criteria exits and counts); nothing outside the owned files changed; the flagged claims are stated as limits rather than closed silently.

## Output

Per claim, the verdict and its evidence (`file:line`). Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
