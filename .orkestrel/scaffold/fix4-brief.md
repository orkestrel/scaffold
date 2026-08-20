# scaffold fix unit 4 — the audit's residue

## Role and engine

`builder`, native cheap tier. Fully specified from the fix2+3 audit verdict
(`tmp/codex/fix23-audit-last.md`).

## Objective

Close the audit's broken claims: the surviving temporal words, the stale derivation TSDoc, the
fixture's seam annotation, and the successor record for the fix2 report.

## Context

The tree is committed and clean at 183e8c7 plus the mcp-independent commits since; read each named
line before editing and rule the hit by its sense — every site below was ruled temporal by the
audit, but a line that reads differently than described stops the unit per the deviation contract.

1. Replace the banned temporal `now` and `today` uses at: src/bin/types.ts:208,
   src/server/types.ts:178, src/server/Materializer.ts:754-755, src/server/Materializer.ts:804-806,
   src/server/helpers.ts:1320, src/server/helpers.ts:1394, guides/scaffold.md:761,
   guides/scaffold.md:827, ROADMAP.md:19, ROADMAP.md:115, ROADMAP.md:124. Delete the word or give
   the date, whichever the sentence needs; `performance.now()` is a code token and stays.
2. src/server/helpers.ts:100-106: the TSDoc says the candidate set comes from the audit. Correct
   it to the landed contract: the candidate set is re-derived from the plan, and the audit must
   agree with the derivation. State the caller-authored-plan boundary the audit named: a plan the
   compiler emits never maps a protected root, and the protected-path skip guards the
   caller-authored plan a consumer can still supply.
3. tests/src/server/Materializer.test.ts:1041-1051: annotate the fixture with one comment naming
   it the caller-authored-plan seam — a plan shape no compiler emits that the public contract
   still admits, which is why the protected-path guard is exercised through it.
4. Write the `tmp/fix2-report-correction.md` file as a successor record (the original stays
   untouched): it withdraws the fix2 report's claim that every assigned row closed and its
   no-defect-row sentence, names the temporal sweep this unit completes, and points at this
   unit's report for the re-run sweep evidence.
5. Re-run the full sweep and record it in your report: case-insensitive `now`, `today`,
   `currently`, `should`, `simply`, `just`, `easy`, `via`, `newer`, temporal `once`, plus
   `e\.g\.` and `i\.e\.` without a trailing boundary, over src/, guides/scaffold.md,
   guides/README.md, README.md, and ROADMAP.md. Rule every remaining hit by sense and record the
   permitted ones; vendored dependency-guide mirrors are outside the population.

## Scope

- Owned: the named lines in src/bin/types.ts, src/server/types.ts, src/server/Materializer.ts,
  src/server/helpers.ts, guides/scaffold.md, ROADMAP.md, tests/src/server/Materializer.test.ts,
  plus tmp/fix2-report-correction.md and your own report.
- Off-limits: everything else; tmp/fix2-report.md stays untouched.
- No commit, no push, no install, no git state-mutating command.

## Execution

You perform this assignment directly and spawn nothing.

## Output

Write the `tmp/fix4-report.md` file: per site, the old and new sentence; the sweep patterns,
paths, and per-hit rulings; `git diff --stat`. No process diary.

## Deviation contract

A named line that does not read as described, or a hit whose sense you cannot rule, stops the unit
with the standard report.

## Acceptance criteria (in order)

1. `npm run format:check` exits 0 (run `npm run format` first if needed).
2. `npm run lint:check` exits 0.
3. `npm run check` exits 0.
4. The re-run sweep leaves no banned-sense hit in the named population, with every kept hit ruled.
5. `tmp/fix2-report-correction.md` exists with the withdrawals stated.
