# Closure brief — U1-fix `d7-guide-readers-fix` (checker and verifier)

## Lanes

- **Checker** (`checker`, Sonnet): rule mechanically on the claims below from the actual diff and status; edit nothing, run nothing.
- **Verifier** (`verifier`, Sonnet): run the commands under Verifier commands in `/home/user/fleet/guide` exactly as written, read each exit code, fix nothing.

Each lane performs its assignment directly and spawns nothing.

## Evidence

`d7-guide-readers-fix-brief.md`, `d7-guide-readers-fix-report.md`, `d7-guide-readers-fix.diff.txt`, `d7-guide-readers-fix.status.txt` under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`; the tree at `/home/user/fleet/guide` (uncommitted U1-fix edits over `aee1477`); `d7-guide-readers-audit-verdict.md` round 1 for the findings each item closes.

## Claims (checker)

1. The diff touches `guides/guide.md`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/src/core/helpers.test.ts` and no other file, and every hunk is one of the brief's five items.
2. The EQ row reads `The block is an exported declaration head's own`.
3. The `extractExamples` doc clause reads `under every keyword that grammar admits at column zero`, wrapped under 100 columns, with the rest of the paragraph unchanged.
4. The `examples(name)` paragraph ends `belongs to the no-argument overload instead.` with no `axis` clause; the no-argument overload's paragraph is unchanged.
5. The untitled class-head control asserts with `toStrictEqual`.
6. § The extraction model carries the precedence sentence after the dedupe sentence, verbatim as the brief states it.
7. The report's gate readings name the commands and their last lines, and the report states no count in prose.

## Verifier commands, in order

1. `git rev-parse --short HEAD && git status --short`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:src:core`
6. `npm run test:guides`
7. `npm run test:policy`
8. `npm run build && npm run docs` — expected exit 1 with `rows read: 1, disagreements found: 139`

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with `file:line`, findings outside the claims, one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker`. Verifier: per command the exit code and its last lines, the per-project totals, anomalies; terminal line `GATES: GREEN` when commands 2 through 7 exit 0 and command 8 reads 139, else `GATES: RED <commands>`; open with `Lane held: verifier`.
