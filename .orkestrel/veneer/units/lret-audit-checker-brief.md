# LEDGER-RETUNE audit — checker

## Role and engine

`checker` on Sonnet, read-only, in a clean context. Perform the assignment directly and spawn nothing; edit nothing.

## Objective

Rule claim 3 of `/home/user/scaffold/.orkestrel/veneer/units/lret-audit-claims.md` mechanically: every § Departures row's
`Departure` cell in `/home/user/veneer-lret/guides/veneer.md` equals the member the gate prints, and no `declared` member
remains anywhere in the guide, the ledger code, or its tests.

## Context

- The gate's drift output before the rows were updated: `/home/user/scaffold/.orkestrel/veneer/units/lret-instruments/lret-conformance-drift4.log.txt`, and the extracted pairs `lret-instruments/lret-drift-members.txt` (`row | old -> new`).
- The final gate run: `lret-instruments/lret-conformance.log.txt` (exit 0).
- The diff: `/home/user/scaffold/.orkestrel/veneer/units/lret.diff`; the report: `ledger-retune-report.md`.
- Law: `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/documentation.md` § Parity.

## Output

Per-check verdicts (CONFIRMED or BROKEN) with `file:line` evidence:
1. Each pair in `lret-drift-members.txt` appears in the guide with its new member.
2. No `| declared |` cell and no prose `declared` member remains in `guides/veneer.md`, `tests/setupServer.ts`,
   `tests/setupServer.test.ts`, or `tests/conformance.test.ts` (search each; name each hit you rule a permitted sense).
3. The three verdict rows (`.btn` `--bs-btn-font-size`, `.accordion` `--bs-accordion-btn-padding-y`, `theme`
   `--bs-primary`) read `retuned`, `tokenized`, and `retuned`.
4. The legend in § Departures names every member of the `Departure` union in `tests/setupServer.ts`, and no other.

End with one line: `VERDICT: PASS` or `VERDICT: FAIL <numbers>`.
