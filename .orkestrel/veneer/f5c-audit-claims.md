# Audit claims — F5c TOKENS-TRUTH in `@orkestrel/veneer` (worktree `/home/user/veneer-f5c` over `07fc3c3`, 2026-09-22)

## Subject

The F5c unit, written by `opus` on Opus 5.5 from `/home/user/veneer-f5c/tmp/units/f5c-brief.md` in its own
worktree from `07fc3c3`: `tests/setupStyles.ts` gains the § Reference map reader, `tests/src/styles/tokens.test.ts` gains the value gate that resolves every reference-map row in light and in a nested dark island against the guide's cell, the stale rows are corrected to measured values, the Links rows carry the `color-mix` the cascade declares with the `--vn-link-base` departure sentence, and the older highlight token pair is gone from `src/styles/_tokens.scss` and every mixin, theme, guide row, and proof (D7). The unit's report is
`/home/user/scaffold/tmp/audit/f5c-report.md`.

## What this round decides

Whether F5c lands as one commit. A BROKEN claim in code sends the unit to a fix round; a BROKEN claim in prose
alone is corrected by the Orchestrator at landing. The worktree integrates into the main checkout
after this round, so a finding about integration order is outside the claims.

## Already established — do not re-run

- The accounting terrain `/home/user/scaffold/tmp/audit/f5c-terrain.md` (§ B the guide tables and their readers, § C the token rows measured stale).
- The user's rulings D2, D6, D7 (`ROADMAP.md` § Rulings); the design verdict `/home/user/scaffold/tmp/audit/veneer-audit-verdict.md` claim 9 (the factor-override cases).

## Review evidence

`/home/user/scaffold/tmp/audit/f5c-audit-evidence.md`: the status output `f5c-status.txt`, the diff
`/home/user/scaffold/tmp/audit/f5c.diff` (against `07fc3c3`), the unit's report, the brief at
`/home/user/veneer-f5c/tmp/units/f5c-brief.md`, the terrain, and the Orchestrator's gate log
`/home/user/scaffold/tmp/audit/f5c-gates.log.txt` when present.

## Numbered falsifiable claims

Before confirming any claim about a proof, name the mutation that would make the proof fail and say
whether its assertions distinguish that mutation from the passing case.

1. **The reference-map reader parses every token table.** An exported `{verb}{Noun}` reader beside `collectTokenNames` in `tests/setupStyles.ts` parses every § Reference map table whose first column is `Token`, `Role`, or `Tier` into rows of `token`, `light`, `dark`, and `source`, fills both modes from a single `Value` cell, locates each table by heading text through the pattern `readDeferrals` fixes, and has an inventory row and a scratch-table case in `tests/setupStyles.test.ts` that binds (name the mutation the case catches).
2. **The value gate resolves every row on a real root.** The `tests/src/styles/tokens.test.ts` case resolves each row's token on a mounted root in light and in a nested `[data-bs-theme='dark']` island through the installed cascade readers and compares against the cell after the guide's stated normalization (percentages to six significant digits; `color-mix` compared as written or resolved, and the case doc says which); the report records the red run and every failing row before correction (mutation: a cell one unit off must fail).
3. **The rows are the measured values.** Every corrected row equals the measured value; the Links rows carry the `color-mix` the cascade declares per mode; the sentence under the Links table names `--vn-link-base` as a departure with a pointer to the F5b ledger row, and the report returns the ledger row as a patch where the ledger lacks it.
4. **The factor-override cases run green and are not duplicated.** The radius, elevation, and motion override cases the design verdict's claim 9 asked for exist by the titles the report lists, run green after the row changes, and a case was added only for a factor that lacked one.
5. **The highlight pair is gone with no consumer.** The search the report records (bound stated) found no consumer outside the pair's own declaration; the pair is deleted from `src/styles/_tokens.scss` and every mixin, theme, guide row, and proof; the report names the deleted set by symbol; `grep -rn '<TOKEN>' src app tests guides` prints nothing for each deleted name.
6. **No other cascade value moved.** Under `src/styles/**` the diff changes only the highlight pair's removal and, if the report records it as a departure row, the link value's declaration; no other token, value, selector, or layer changed.
7. **The gate chain is green.** Every `=== <gate> exit=` line in the Orchestrator's gate log reads `exit=0` (UNRESOLVED if the log is absent or lacks `=== gates done` when you read it).
8. **Scope is honest.** `git status --porcelain` lists only `src/styles/_tokens.scss`, `src/styles/_mixins.scss`, `src/styles/_theme.scss`, `tests/setupStyles.ts`, `tests/setupStyles.test.ts`, `tests/src/styles/tokens.test.ts`, and `guides/veneer.md`; the guide changes sit in § Tokens and § Reference map only; no probe remains under `tmp/probe/`; a `ROADMAP.md` or ledger change is a returned patch and not an edit.
9. **Prose holds.** No changed prose line contains a banned term in a banned sense (pattern `\b(?:should|simply|eas(?:y|ier|iest)|just|currently|via|utilize|leverage|robust|performant)\b|\b(?:e\.g\.|i\.e\.|etc\.)`, case-insensitive), and no count of a growable set is stated as a number.
10. **The unit is coherent.** The reader has one job and one home beside `collectTokenNames`; no helper duplicates an installed `@orkestrel/test` export or the cascade readers; the normalization lives in one place; § Tokens reads as one measured table set rather than prose plus numbers.

## Unknowns

- What the unit reported as a deviation or an unverified claim of its own; the report says, and a
  lane rules on each.

## The threshold

PASS when every claim is CONFIRMED, or every BROKEN claim is in prose and the Orchestrator corrects
it at landing. A BROKEN claim in code (1 to 6) opens a fix round. A lane that returns no verdicts
is a lane that did not run.
