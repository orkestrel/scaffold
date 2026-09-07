# Closure brief — the guide's branch (U5 `45832d8`, the links fix `7c60ea1`, the U5 fix at the tip): the fix round under `checker`, the whole chain under `verifier`

## Lanes

Two lanes, blind, clean contexts: a **checker** (`checker`, Sonnet) over the U5 fix round, and a **verifier** (`verifier`, Sonnet) over the guide checkout's whole chain at its tip.

## Evidence (under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`)

- The fix round: `d7-guide-u5-fix-brief.md`, `d7-guide-u5-fix-report.md` (its resumed run over a partial tree; the Orchestrator's integration note at the end), `d7-guide-u5-fix.diff.txt`, `d7-guide-u5-fix.status.txt`; the audit's verdict `d7-guide-u5-links-audit-verdict.md` (items G1 to G8).
- The tree: `/home/user/fleet/guide` at its tip (`git log --oneline -4` reads the fix commit, `7c60ea1`, `45832d8`, `caa97b2`).
- The rules: `/home/user/scaffold/AGENTS.md`, `.claude/rules/tests.md` § Shared test infrastructure, `.claude/rules/writing.md`.
- The timing instrument: `instruments/d7/u5/timing.mjs` (reads `/home/user/fleet/contract` read-only and imports the guide checkout's built `dist`).

## Checker claims

1. Every item the fix brief names (G1 to G8) landed in the diff as the brief states it, and nothing else changed beyond the `tests/setup.test.ts` proof the report's patch names and the Orchestrator applied (scope honesty against the status file).
2. The report's citations match the tree the unit left; the report states no count in prose.
3. Each named correction is present as the audit's finding asked: the wrapper's reason in `extractDeclaration`'s remarks; the amortization sentence corrected in the guide and the block; no function assignment inside an `it` body in `Source.test.ts` (the builders exported from `tests/setup.ts` with doc blocks and their own proof); the member-reference bullet and the path form in the compared-form list; one memo sentence; the re-wrapped paragraphs; the `Declaration` references pointing at `collectDeclarations`; the test named for what it asserts.

## Verifier commands (from `/home/user/fleet/guide`, each exit code read from `$?`; `npm` under `PATH=/opt/npm11/bin:$PATH`)

1. `git rev-parse --short HEAD && git status --short`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run build`
6. `npm run docs` — expected exit 0 and `rows read: 1, disagreements found: 0`
7. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals
8. `PATH=/opt/npm11/bin:$PATH npm run test:distribution` if the manifest declares it, else record that it is absent
9. `node /home/user/scaffold/.orkestrel/campaign/docs-parity/instruments/d7/u5/timing.mjs 3` — record every line; the expected reading is `findDrift (cold source)` under 1000 ms best and `drift 0`

## Output

Checker: per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker guide`. Verifier: per command the exit code and last lines verbatim; totals per project; terminal `GATES: GREEN` when commands 2 through 7 exit 0 (and 8 where present) and command 9 reads as expected, else `GATES: RED <commands>`; open with `Lane held: verifier guide`. No process diary. Perform the assignment directly and spawn nothing. The verifier fixes nothing, edits nothing, installs nothing.
