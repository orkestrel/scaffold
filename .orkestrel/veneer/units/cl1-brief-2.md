# Unit CL1 — fix round brief 2: the audit's implementation findings

## What changed and why

This brief supersedes `cl1-brief.md`; that brief stands, and `cl1-report.md`
is the baseline. The audit round on the brief-1 tree (claims `../cl1-audit-claims.md`)
confirmed the exclusion contract, the property-free admission, the root-scoped oracle drive,
and the breakpoint helper, and found the implementation defects below. Audits cover
implementation only by the user's ruling: make no wording, comment, or guide-prose change
beyond what a code change requires.

## Findings carried

1. (analyst 5) `tests/setupBrowser.ts` (about line 282): `resolveOracleButton` reads a live DOM
   target under a root and throws when it is absent or unreachable, which is the `read*`
   contract in `.claude/rules/names.md` § Fixed helper prefixes (`resolve*` picks the effective
   value from options and defaults). Rename it `readOracleButton`; update its two callers in the
   same file (the key press and the pointer hold helpers), the import and the export-set
   assertion in `tests/setupBrowser.test.ts`, and its cases.

Recorded, not carried: the earlier `resolveButton(root, name)` helper from U7c has the same
shape; it is used by the journey and the section proof, which this unit does not own, so its
rename is a bound for CL11 (the journey unit), recorded in the report.

## Role, engine, law, context, host, deviation contract

As in `cl1-brief.md`, verbatim. `HEAD` is `060ce02`; the working tree carries the
complete brief-1 result, uncommitted. Continue from it; do not restore or reset anything.
Perform the assignment directly and spawn nothing.

## Scope

Owned: `tests/setupBrowser.ts`, `tests/setupBrowser.test.ts`, `cl1-report-2.md`.
Every other file is off-limits this round.

## Execution

1. Rename and update the callers, the import, the export-set assertion, and the cases; no
   behaviour changes.
2. Run and record: `npm.cmd run format:check`, `npm.cmd run lint:check`, `npm.cmd run check`,
   `npm.cmd run test:setup:browser`, `npm.cmd run test:app:browser`, `npm.cmd run test:journey`,
   then `PLAYWRIGHT_CHANNEL=msedge npm.cmd run test:setup:browser`.

## Output

Write `cl1-report-2.md` in the Veneer checkout and return it: the rename as landed
with every site, each gate's exit code and final lines on both engines, the actual
`git diff --stat` and `git status --porcelain --untracked-files=all`. Do not repeat report 1.

## Acceptance criteria

1. `grep -c resolveOracleButton tests/setupBrowser.ts tests/setupBrowser.test.ts` reads 0 in
   both; `readOracleButton` is exported, cased, and in the export-set assertion.
2. Every gate in item 2 exits 0 on managed Chromium and Edge.
3. The status shows brief 1's owned files and the reports.
