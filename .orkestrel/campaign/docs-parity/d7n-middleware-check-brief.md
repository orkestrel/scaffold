# Closure brief — middleware: the checker over the fix round (carrying the closing items)

## Lane

`checker` (Sonnet), blind and clean, over middleware's fix round, landed as `5747e3f` on middleware's branch. Evidence under `/home/user/scaffold/.orkestrel/campaign/docs-parity/`: `d7n-middleware-converge-fix-brief.md`, `-report.md`, `.diff.txt`, `.status.txt`; `d7n-middleware-audit-verdict.md` (items MF1 to MF11); `d7n-middleware-close-brief.md`; Rulings 13, 18, 20, 21, 22, 24, 25, 26, 27, and 28 in `rulings.md`; the pilot `/home/user/fleet/abort/tests/guides.test.ts` and `/home/user/fleet/abort/guides/abort.md`; `/home/user/fleet/middleware` at its tip.

## Standing conditions

- The fix brief's criterion `grep -c 'SessionCursors plus' guides/middleware.md` reads `2`, not `1`: `SessionRow` and `SessionEntry<S>` both extend `SessionCursors`, the brief's `^export interface \w+ extends` sweep missed the generic declaration, and Ruling 21 binds both rows. The Orchestrator rules the reading correct; do not report it as a failure.
- The node-face `createCompression` row (`guides/middleware.md`, the `### Batteries — node` table) is outside the reader's comparison because the reader keys the surface by name and the core-face row takes the key; the unit read it by hand as equal. Rule the row on the tree, not on the gate.

## Claims

1. Every item the fix brief names landed in the diff as the brief states it, and nothing else changed (scope honesty against the status file: `README.md`, `guides/middleware.md`, the doc blocks under `src/**` with no code line moved, and `tests/guides.test.ts`, and no other path).
2. The report's citations match the tree the unit left; the report states no count in prose.
3. Each named correction is present as the audit's finding asked: `isBufferingIneligible`'s description states the skip and the guide cell equals it (MF1); no line-end hyphen remains in a doc block under `src` and `reserved- ` is gone from the guide (MF2, Ruling 22); a lead-in sits under `### Mount a battery` (MF3); every extended interface's cell names its parent before `plus` with the added members after, under the added convention sentence (MF4, Ruling 21); the `### Shapers` table heads `Shape` under the constants sentence with `sessionColumns`'s declared type in bare-member form (MF5, Ruling 25); the drop-in's lines 1 to 3 equal the pilot's and the region from `const root = ` through the manifest loop's closing brace equals the pilot's with the package's own block after it (MF6, Rulings 13, 20, 21); an executed section transcribes the titled `### Mount a battery` fence and asserts what the fence builds, with a probe recorded red first (MF7, Ruling 20); no all-caps emphasis remains under `src` outside the data tokens the report rules, and the `ForwardedOptions` count is gone (MF8); `DEFAULT_LIMITER_MESSAGE`, `DEFAULT_PERMISSIONS_POLICY`, and `DEFAULT_CSP` name their literals first (MF9, Ruling 18); the README's second battery enumeration is gone and its `## Install` and `## Usage` fences sit directly under their headings (MF10, Ruling 24); the `### Validators — core` guard table heads `Shape` with the narrowed types under the guard sentence alone, every fence directly under a heading has a lead-in, and no `Shape` cell is empty (MF11, Rulings 20, 26, 27, 28).

## Output

Per claim PASS, FAIL, or CANNOT RULE with evidence; findings outside the claims; one terminal `VERDICT: PASS` or `VERDICT: FAIL <claims>`; open with `Lane held: checker middleware`. No process diary. Perform the assignment directly and spawn nothing; run no command, edit nothing.
