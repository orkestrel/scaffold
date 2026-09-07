# Audit brief — D2-fix-2 (round 3 of D2 guide-render)

## Lanes

The objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench) on claims 1 to 3, and a `checker` (Sonnet) on every claim's mechanical part. The dispatch names which you hold. Read only this brief and the evidence it names; run no command; edit nothing; perform the assignment directly and spawn nothing. Rule on every claim from your lane, and write CANNOT RULE with what is missing where the claim is another lane's.

## Subject

The third round (`d2-fix-2-brief.md`, edits H1 to H7) over `@orkestrel/guide` at `/home/user/fleet/guide`, base commit `37d6cf8`, on the uncommitted tree D2 and D2-fix left. The round-2 verdict: `d2-audit-verdict.md` § Round 2; the round-2 lanes: `d2-fix-audit-subjective.md` (claim 10, F1 to F5), `d2-fix-audit-objective.md` (claim 9, findings 1 to 3). The report: `d2-fix-2-report.md`. The evidence: `d2-fix-2.diff.txt` and `d2-fix-2.status.txt` (the whole uncommitted tree against `37d6cf8`), `d2-fix.diff.txt` for the state the round started from, and the changed files at their new state under `/home/user/fleet/guide`; the rules `/home/user/scaffold/AGENTS.md`, `.claude/rules/names.md`, `.claude/rules/typescript.md`, `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/writing.md`.

## Claims (verdict per claim: PASS, FAIL with `file:line` evidence, or CANNOT RULE with what is missing)

1. **H1, one grammar.** The export-head pattern, the member pattern, and the owner-close rule each exist once in `src/core/helpers.ts`; `collectKeys(lines)` is exported beside `collectSummaries` and maps every column-zero export head to its `computeSymbolKey` key and every one-tab callable member inside an owner closed at the first column-zero `}` to its `Owner.member` key; `extractExports`, `extractMemberMethods`, and `locateComment` run through it, and `extractExports` derives its keyword from the same match; the tip's cases for the two readers are unchanged and green; `locateComment`'s TSDoc describes what the code does.
2. **H1, the controls.** `collectKeys` has cases over the D1 control fixtures and a member fixture; a corpus-scale member control requires, for every `Owner.member` key `extractDeclaration` with `extractMemberMethods` reports over this package's `src/`, that `locateComment`'s located block carries that member's summary; both controls are discriminating (a planted divergence in the member or owner rule reddens the corpus control — the report shows the reading).
3. **H2, H3, H6, prose accuracy.** `spliceSpan`'s `@param span` names both producers; the sentence at `src/core/helpers.ts:1688-1690` reads as the brief quotes; the `normalizeSummary` TSDoc states the delimiter set on its own terms with no `buildCell` appositive or a requalified one, and the guide's clause list agrees.
4. **H4, H5.** No `below` or `above` pointer remains in the owned files; `extractBlocks` and `extractSummary` replace `readBlocks` and `readSummary` at every site.
5. **H7 and scope.** The report cites `src/core/helpers.ts:1721-1723` for the over-length token sentence and `tests/guides.test.ts:401` for the transcription guard; the cache sentence is backed by a named search with its result or dropped; the status file lists only the owned set; every `file:line` the report cites matches the files at their new state; no count appears in the report's prose; the `collectKeys` guide row exists.

## Output

Per claim, the verdict and its evidence. Then findings outside the claims, each with `file:line` and what right looks like. Then one terminal line: `VERDICT: PASS` or `VERDICT: FAIL <claim numbers>`. No process diary.
