# Guide heading fix check

1. H1 — CONFIRMED

Evidence: `tmp/pass/d7n-guide-heading-fix.status.txt` lists only `guides/guide.md`, `src/core/helpers.ts`, `src/core/types.ts`, `tests/setup.ts`, `tests/src/core/helpers.test.ts`, and `tests/src/core/Guide.test.ts`. The supplied diff changes no manifest, lockfile, barrel, vendored path, or `Guide.ts`; the `src/core/types.ts` hunk is documentation only. The only production statement change is the H3 admission condition at `src/core/helpers.ts:1535-1538`.

2. H2 — CONFIRMED

Evidence: `src/core/helpers.ts:1535-1538` compares `extractCellText(block.children).trim()` to the raw backticked `rawName` before `normalizeIdentifier`. The surrounding loop and helpers at `src/core/helpers.ts:1524-1551` preserve section blocks, encounter order, keyword-sensitive keys, deduplication, and first-seen behavior. The condition refuses visible prose, extra code, and whitespace-only code while retaining the accepted heading forms shown in `tests/src/core/helpers.test.ts:1071-1087`.

3. H3 — CONFIRMED

Evidence: `tests/src/core/helpers.test.ts:1071-1155` covers accepted heading forms, negative headings, section exclusion, keyword separation, table-before-heading summary retention, and heading-before-table behavior. `tests/src/core/Guide.test.ts:30-37` covers the cached public surface and repeated accessor identity. The recorded `red.log.txt` shows the focused tests failed before the repair, while `green.log.txt` and `focused-final.log.txt` show the repaired focused run exited 0. The diff adds no mock, assertion suppression, skipped test, TODO, or speculative helper.

4. H4 — CONFIRMED

Evidence: `src/core/helpers.ts:968-974,1489-1514`, `src/core/types.ts:193-211`, and the paired `guides/guide.md` rows and narrative in the supplied diff express the same exact-content heading boundary, encounter order, and first-seen behavior while retaining the documented facts. `tests/setup.ts:14-25` defines the shared fixture consumed by the direct extractor and cached public tests. The prior writer report's tally prose is report-only and does not alter the implementation scope.

Syntax evidence: the prior retained writer evidence records focused red and green runs, scoped formatting, lint, type, guide, and diff checks. Root's separate configured-policy red result is a host-verification issue and is not attributed to this heading change. No package command or script body ran in this check.

VERDICT: PASS
