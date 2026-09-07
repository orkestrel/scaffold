# Closure brief — A.2-fix `d7n-abort-converge-fix` and G1 `d7n-guide-pitch-row` (checkers and verifiers, two checkouts)

## Lanes

- **Checker, abort** (`checker`, Sonnet): the abort claims below from the actual diff and status; edit nothing, run nothing.
- **Checker, guide** (`checker`, Sonnet): the guide claims below.
- **Verifier, abort** (`verifier`, Sonnet): the abort commands, in `/home/user/fleet/abort`.
- **Verifier, guide** (`verifier`, Sonnet): the guide commands, in `/home/user/fleet/guide`.

Each lane performs its assignment directly and spawns nothing; verifiers fix nothing, edit nothing, install nothing.

## Evidence

Under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-abort-converge-fix-brief.md`, `d7n-abort-converge-fix-report.md`, `d7n-abort-converge-fix.diff.txt`, `d7n-abort-converge-fix.status.txt`; `d7n-guide-pitch-row-brief.md`, `d7n-guide-pitch-row-report.md`, `d7n-guide-pitch-row.diff.txt`, `d7n-guide-pitch-row.status.txt`; `d7n-abort-audit-verdict.md` for the findings each item closes. The trees: `/home/user/fleet/abort` (uncommitted A.2-fix edits over `41f893b`) and `/home/user/fleet/guide` (uncommitted G1 edits over `c25c689`).

## Abort claims (checker)

1. The diff touches only `guides/abort.md`, `README.md`, `src/core/factories.ts`, `src/core/Abort.ts`, `src/core/types.ts`, `src/core/helpers.ts`, `src/core/validators.ts` (doc blocks alone), and `tests/guides.test.ts`.
2. The guide's opening paragraph carries none of the tagline's three clauses verbatim and keeps the facts the brief's item 1 lists; the README's opening paragraph does not restate the tagline's triple and keeps the `@orkestrel` line sentence.
3. `createAbort`, `Abort`, and `AbortInterface` carry three distinct description paragraphs, verb-first, and the guide cells equal them.
4. `AbortInterface`'s `Shape` cell reads `{ id, signal, aborted, abort }` and the Types intro states the convention.
5. `tests/guides.test.ts` binds the name mapping once per `describe` and once in the examples loop; no `isTitle` predicate remains; the pin uses the inline `title !== undefined` form with the both-sides failure line.
6. The three `@remarks` no longer repeat their descriptions and keep their distinct conditions; `(Surface rows, earlier)` replaced `above`.
7. The report names each item's hunk and states no count in prose.

## Guide claims (checker)

8. The diff touches `guides/guide.md` and, if item 3 applied, `README.md`, and no other file.
9. The RQ bullet sits after the EQ bullet in § The check catalog in the catalog's shape, states the pair is outside `findDrift`, and names the drop-in's README case as the gate with its guard; § Tests names `RQ` after `EQ`.
10. The report names each item's hunk and states no count in prose.

## Abort verifier commands, in order

1. `git rev-parse --short HEAD && git status --short`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run check`
5. `npm run docs` — expected exit 0 at `rows read: 1, disagreements found: 0`; then `npm run docs -- --to guide` and `npm run docs -- --to source`, each expected `written: 0`
6. `npm run test:guides`
7. `PATH=/opt/npm11/bin:$PATH npm test` — every project's totals

## Guide verifier commands, in order

1. `git rev-parse --short HEAD && git status --short`
2. `npm run format:check`
3. `npm run lint:check`
4. `npm run build && npm run docs` — expected exit 0 at `rows read: 1, disagreements found: 0`
5. `npm run test:guides`
6. `npm run test:policy`

## Output

Checkers: per claim PASS, FAIL, or CANNOT RULE with `file:line`, findings outside the claims, one terminal line `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker abort` or `Lane held: checker guide` as the very first line. Verifiers: per command the exit code and its last lines, the per-project totals, anomalies; terminal line `GATES: GREEN` when every command reads as expected, else `GATES: RED <commands>`; open with `Lane held: verifier abort` or `Lane held: verifier guide`.
