Lane held: checker

# Per-claim verdicts

**1. M1 — PASS.**
`scripts/docs.ts:169` declares `function collectCells(guide: GuideInterface): ReadonlySet<string> {` and `scripts/docs.ts:396` calls `summaries: collectCells(guide),` (confirmed by counting the new-file hunk `+++ b/scripts/docs.ts @@ -0,0 +1,454 @@` in `d5-fix-3.diff.txt:1633` against the file's own line offsets, landing exactly on those two lines). No `collectSummaries` token appears anywhere in the 454-line new file (`d5-fix-3.diff.txt:1633-2088`, full text inspected). The doc block above the declaration still reads "Collects the compared keys a guide's Surface and Methods tables carry." — unchanged, names no old word.

**2. M2 — PASS.**
`tests/src/core/compilers.test.ts:2101` carries the third `SEED_OVERLAP_CHILD` Surface row `| \`frame\` | function | Frames a widget for the panel. |`, byte-identical to the parent row's cell (`d5-fix-3.diff.txt:1052`, same text "Frames a widget for the panel."). The overlap case's `reported.lines` (`tests/src/core/compilers.test.ts:2439-2444`) closes `rows read: 2, disagreements found: 3`, and `written.lines` (`:2445-2449`) closes `rows read: 2, disagreements found: 3, written: 2, reported: 0` — `written:` is one less than `disagreements found:` (3 → 2) — with exactly one `wrote src/core/panels/panel.ts` line. The whole-file assertion `expect(source).toBe(SEED_OVERLAP_WRITTEN)` and the clean re-report `expect(runSeed(scratch, []).lines).toEqual(['rows read: 2, disagreements found: 0'])` both remain (`:2453`, `:2455` region). The report records the measured closing line verbatim (`d5-fix-3-report.md:13`).

**3. M3 — PASS.**
Two cases exist beside the existing pitch case (`tests/src/core/compilers.test.ts:2380` "carries no pitch line for a manifest declaring no name", over `SEED_NAMELESS`; `:2396` "carries no pitch line for a manifest naming a guide the index does not index under its own spec", over `SEED_UNOWNED`, whose index row's spec is `guides/component.md` rather than `guides/widget.md`). Each asserts the exact line array with no `pitch` line and `run.status` `1` (`d5-fix-3-report.md:19-20`, corroborated by the fixture text in `d5-fix-3.diff.txt:994-1023`). Each name states what it proves.

**4. M4 — FAIL.**
`guides/scaffold.md:1056` reads: "A write run's closing line names two further values beside the row and disagreement counts: `written:` counts the rewrites the run carried across, and `reported:` counts the disagreements it left standing with a reason." The phrase "names two further values" states a count of a growable set (the closing line's own field count, which a future field could enlarge) — the exact form `AGENTS.md` § Writing bans: "NEVER state a count. A number answering 'how many' about a set anyone can add to is a count." This directly falsifies the claim's own assertion of "no count of a growable set."

**5. Scope honesty — PASS.**
`d5-fix-3.status.txt` and `d5-fix-2.status.txt` list the identical seventeen-path set (both files, verbatim). `scripts/docs.ts`'s only substantive change from the pre-fix state is the rename at `:169`/`:396`, corroborated by `d5-fix-2-audit-objective.md:19,21` citing `collectSummaries` at those same two line numbers pre-fix. `guides/scaffold.md`'s only change attributable to this round is the `:1056-1058` sentence; every other hunk (the `DOCS_SEED_PATH` row, `blueprintToHostArtifacts` rename, the equality-gate and own-specifiers paragraphs) is independently quoted as already present by `d5-fix-2-audit-objective.md` (for example its F4 finding names the pre-fix write-run paragraph ending at `:1056-1057` with the exit-code sentence and no `written`/`reported` sentence). `tests/src/core/compilers.test.ts`'s new content beyond the pre-existing seed scaffolding is limited to the M2 third row/assertions and the M3 fixtures/cases; `host.json`'s diff is digest-value changes plus the regenerated `scripts/docs.ts` entry, consistent with the M1 content change, and criterion 4's matched before/after `sha256sum` shows the regeneration is deterministic.

**6. Report honesty — FAIL.**
The report's `file:line` citations for the file's new state are stale by tens of lines:
- `d5-fix-3-report.md:10` cites `tests/src/core/compilers.test.ts:2053-2071` for `SEED_OVERLAP_CHILD`; it is actually at `:2091-2107`.
- `d5-fix-3-report.md:11` cites `:2374-2379` for the no-direction run's `reported.lines`; it is actually at `:2439-2444`.
- `d5-fix-3-report.md:12` cites `:2395-2399` for the `--to source` run's `written.lines`; it is actually at `:2445-2449`.
- `d5-fix-3-report.md:19` cites `:2358-2372` for the nameless-manifest case; the `it(...)` is actually at `:2380`.
- `d5-fix-3-report.md:20` cites `:2374-2388` for the unowned-guide case; the `it(...)` is actually at `:2396` (this range also collides with the preceding citation's `:2374-2379`, an internal inconsistency).

The described content and measured values at each cited claim are otherwise accurate (verified directly against the file), so this is a citation-staleness defect, not a substance defect. The remaining limbs hold: every acceptance criterion carries an exit code and last lines (`d5-fix-3-report.md:29-41`), the observation records `disagreements found: 316` (`:41`), and the report's own prose states no count of a growable set outside its quotation of the M4 guide sentence already ruled under claim 4.

# Findings outside the claims

**F1.** `guides/scaffold.md:1056` — see claim 4; the count violation is in the shipped guide text, not only in the report's quotation of it.

**F2.** `tests/src/core/compilers.test.ts` — the ~38-line offset between the report's M2 citations and the file's actual state is explained by the M3 fixtures (`SEED_NAMELESS_MANIFEST`, `SEED_NAMELESS`, `SEED_UNOWNED_INDEX`, `SEED_UNOWNED`, `:2021-2044` region) sitting textually before the M2 `SEED_OVERLAP_CHILD` edit, which the report's citations do not reflect. This confirms claim 6's citations are stale rather than pointing at out-of-scope content.

VERDICT: FAIL 4 6
