# Closure brief — U2-fix-2 `d7-guide-converge-fix-2` (checker and verifier)

## Lanes

- **Checker** (`checker`, Sonnet): rule mechanically on the claims below from the actual diff and status; edit nothing, run nothing.
- **Verifier** (`verifier`, Sonnet): run the commands under Verifier commands in `/home/user/fleet/guide` exactly as written, read each exit code, fix nothing.

Each lane performs its assignment directly and spawns nothing.

## Evidence

`d7-guide-converge-fix-2-brief.md`, `d7-guide-converge-fix-2-report.md`, `d7-guide-converge-fix-2.diff.txt`, `d7-guide-converge-fix-2.status.txt` under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`; the tree at `/home/user/fleet/guide` (uncommitted U2-fix-2 edits over `f7be620`); `d7-guide-converge-audit-verdict.md` round 2 for the findings each item closes.

## Claims (checker)

1. The diff touches `src/core/helpers.ts`, `tests/src/core/helpers.test.ts`, `guides/guide.md` and no other file; under `src/core/helpers.ts` the only non-comment change is the guard (the `spelled` array over the language and the code lines, and the one `some` test) replacing the two `includes` guards.
2. The `replaceExample` description paragraph, its `@remarks`, and its `@returns` each name a language or code the emitted fence cannot enclose or the doc block cannot hold, with the terminator named and never spelled inside the block, every line under 100 columns.
3. The case `returns undefined for a language the fence line cannot carry` exists beside the terminator case, asserts `undefined` for a language carrying `*/` and for a language carrying three backticks, and the report records it red before the guard change and green after.
4. `guides/guide.md`'s refusal sentence names a language or code and punctuates its apposition with an em dash; the `replaceExample` cell equals the new description paragraph in the compared form; no other cell changed.
5. The report names each item's hunk, quotes its gate readings from runs it names, and states no count in prose.

## Verifier commands, in order

1. `git rev-parse --short HEAD && git status --short`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run test:src:core`
6. `npm run test:guides`
7. `npm run test:policy`
8. `npm run build && npm run docs` — expected exit 0 and one line `rows read: 1, disagreements found: 0`
9. `npm run docs -- --to guide` and `npm run docs -- --to source` — each expected `written: 0, reported: 0`; then `git status --short` unchanged from command 1

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with `file:line`, findings outside the claims, one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker` as the very first line. Verifier: per command the exit code and its last lines, the per-project totals, anomalies; terminal line `GATES: GREEN` when commands 2 through 9 read as expected, else `GATES: RED <commands>`; open with `Lane held: verifier` as the very first line.
