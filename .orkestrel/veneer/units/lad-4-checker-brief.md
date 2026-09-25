# LEDGER-ADDITIONS round 4 — checker read

## Role and engine

`checker` on Sonnet, a native Claude subagent, read-only. Perform the read directly and spawn nothing. Read
`/home/user/scaffold/AGENTS.md` and `/home/user/scaffold/.claude/rules/{names,typescript,tests}.md`. No skill applies.

## Objective

Rule whether round 4 applied Items 1 and 2 of `/home/user/scaffold/.orkestrel/veneer/units/ledger-additions-brief-4.md`
exactly, and nothing else.

## Evidence

All under `/home/user/scaffold/.orkestrel/veneer/units/`: the brief `ledger-additions-brief-4.md`; the report
`ledger-additions-report-4.md`; the round-4 diff `lad-4.diff` (`git diff 2376710` in `/home/user/veneer-lad`) and
`lad-4-status.txt`; the round-3 diff `lad-3.diff`; and the logs under `lad-instruments/r4/`. The worktree
`/home/user/veneer-lad` holds the change uncommitted; read its files and never edit them.

## Claims

1. **Item 1.** `collectAttributionClasses` replaces `collectMatchingClasses` at every site `lad-3.diff` carried it, and
   `grep -rn collectMatchingClasses tests guides src` in the worktree returns nothing. The export-list case lists the
   names in sorted order.
2. **Item 2.** The reader's summary reads "Collects every class a selector writes at its own level or inside an `:is()`
   or a `:where()` argument." and the rest of its TSDoc is unchanged from round 3.
3. **Scope.** Between `lad-3.diff` and `lad-4.diff`, only `tests/setupServer.ts` and `tests/setupServer.test.ts` change,
   and only at the Items' sites.
4. **Gates.** The logs under `lad-instruments/r4/` read exit 0 for oxfmt, check, lint, the setup file (118 passed), and
   policy, and the conformance log shows the timed-out first run and the passing re-run the report describes.

## Output

A numbered verdict per claim (CONFIRMED, BROKEN, or NOT-EVIDENCED) with the `file:line` or log line behind it, findings
outside the claims to the same standard, and one terminal line `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
