# Closure brief — U2-fix `d7-guide-converge-fix` (both lanes on the judgment items, checker, verifier)

## Lanes

Four lanes, blind to each other, clean contexts, one brief. The dispatch names which you hold:

- **Subjective lane** (`reviewer`, Opus 5): items 4, 6, and 7 — whether each split description now reads as the summary a table scanner needs and its `@remarks` as reference a declaration's reader still meets, whether the opening paragraph reads in order, and whether the two `Shape` intro sentences tell a reader which notation each table uses.
- **Objective lane** (`reviewer`, Opus 5 — the recorded substitution for the dark Sol bench; the writer was Opus, and Sol is dark, so the substitution is recorded): items 1, 4, and 5 — whether the guard refuses exactly a body carrying `*/` and its test binds red-first, whether every sentence of each split block survives verbatim and in order across the description and the `@remarks`, whether the cells the seed rewrote equal the new descriptions, and whether the `exists` remark sits outside the compared paragraph.
- **Checker** (`checker`, Sonnet): the mechanical claims below.
- **Verifier** (`verifier`, Sonnet): the commands below, in order, each exit code read.

The reviewer lanes and the checker run no command and edit nothing. Every lane performs its assignment directly and spawns nothing.

## Evidence

`d7-guide-converge-fix-brief.md`, `d7-guide-converge-fix-report.md`, `d7-guide-converge-fix.diff.txt`, `d7-guide-converge-fix.status.txt` under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`; `d7-guide-converge-audit-verdict.md` round 1 and `rulings.md` § Ruling 7; the tree at `/home/user/fleet/guide` (uncommitted U2-fix edits over `1a32bb4`).

## Claims

1. The diff touches `src/core/helpers.ts`, `src/core/types.ts`, `src/core/constants.ts`, `tests/src/core/helpers.test.ts`, `guides/guide.md` and no other file; the only non-comment code line changed is the guard `if (example.code.includes('*/')) return undefined` beside the backtick guard.
2. The guard case `returns undefined for code carrying the comment terminator the block cannot hold` exists in the `replaceExample` suite, asserts `undefined` for a body carrying `*/`, and the report records it red before the guard and green after.
3. The `replaceExample` `@returns` line, the guide's refusal sentence (§ The renderers and the replacers), and § Tests each name the comment terminator beside the backtick run, wrapped under the print width.
4. `EXPORT_KEYWORDS`'s remark names the type, the guard, and the shape and states no count.
5. For `extractExports`, `extractHidden`, `extractSourceComments`, and `SourceInterface.exports`, every sentence of the block before the unit appears verbatim, in order, in the description or the `@remarks` after it, and the `@remarks` sits after the description and before `@param`; the guide cells equal the new descriptions.
6. `SourceInterface.exists` carries an `@remarks` stating that a directory counts so a guide's link to a directory resolves, and its description paragraph and cell are unchanged.
7. The guide's opening paragraph ends with the packaging sentence and is wrapped to its neighbours' width; the Types and Shapers intros each carry one sentence naming their `Shape` notation.
8. The report names each item's hunk or split point and each rewritten cell's width before and after, and states no count in prose.

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

Reviewer lanes and checker: per claim PASS, FAIL, or CANNOT RULE with `file:line`, findings outside the claims, one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: <lane>` as the very first line. Verifier: per command the exit code and its last lines, the per-project totals, anomalies; terminal line `GATES: GREEN` when commands 2 through 9 read as expected, else `GATES: RED <commands>`; open with `Lane held: verifier`.
