<!-- journal: tmp/codex/bsw-audit-analyst.jsonl (swept at acceptance); codex thread 01a0cb58-3f33-7232-b753-a05704dfdef6; retained from tmp/codex/bsw-audit-analyst-last.md -->
1. **CONFIRMED** — `tests/setupServer.ts:681` implements the exact amended predicate with readonly input and output. Direct execution passed the stated boundaries and valid cardinalities through 20. The scanner body at `tests/setupServer.ts:570` is byte-identical to `aca0423`; a comparison control changing its intersection threshold failed. The documentation at `tests/setupServer.ts:563` and `tests/setupServer.ts:662` carries the required examples and remarks. AST inspection found no prohibited nested declaration, assertion, or non-null assertion.

2. **CONFIRMED** — `tests/setupPolicy.ts:2361` checks setup exports against hosted ownership without grandfathering them. The actual checker returned `[]`. Parsing the renamed declaration back to `findDuplicates` identified the conflicting name at `tests/setupServer.ts:681`; `node_modules/@orkestrel/scaffold/dist/host/guides/reason.md:151` claims it. Parsed hosted and local guide surfaces claim no `findDuplication`. This independently supports the reported collision and rename.

3. **UNRESOLVED** — The fixtures, assertions, real scanner calls, and `finally` cleanup appear as claimed at `tests/setupServer.test.ts:279`. The actual exported names match the sorted inventory at `tests/setupServer.test.ts:499`; removing the leaf from that inventory makes the comparison fail.

   Direct leaf controls reproduced the named mutation distinctions:
   - Floor 4→3 breaks the whole-three refusal.
   - Floor 4→5 breaks the whole-four, four-of-six, and four-of-seven reports.
   - `>`→`>=` breaks the four-of-eight tie refusal.
   - Absolute 6→5 breaks the five-shared refusal; dropping that arm breaks the six-shared report.
   - Returning nothing breaks the positive cases; returning everything breaks the refusal cases.

   These executions used inert overlaps, not the original scratch-tree tests. `createScratch()` failed with `EROFS` at `/tmp/orkestrel-test-XXXXXX`, so the recorded Vitest mutation results at `/home/user/scaffold/tmp/audit/bsw-report-2.md:54` remain independently unverified. Settle with `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project setup tests/setupServer.test.ts`, unmutated and under each named mutation, on the writable host.

4. **CONFIRMED** — `tests/setupStyles.test.ts:366` has the required title, retained file/folder assertions, and filtered empty-result assertion. Direct execution of the real scanner returned `shared: []` and the leaf returned `[]`. The scanner and `src/styles` are unchanged from `aca0423`, supporting the baseline reading. This empty population alone does not distinguish a broken predicate; the planted cases carry that obligation.

5. **CONFIRMED** — Live status matches `/home/user/scaffold/tmp/audit/bsw-status.txt:1`, listing only the owned files. The live diff exactly matches the supplied audit diff. The excluded source, guide, setup, policy, and vendored files are unchanged; `tmp/probe` does not exist.

6. **UNRESOLVED** — Independently ran `npm run check` from `package.json:53` with the supplied npm 11 path: exit 0. The remaining gate readings at `/home/user/scaffold/tmp/audit/bsw-report-2.md:77` require the Orchestrator’s independent chain: `npm run format:check && npm run lint:check && npm run check && npm run test:setup && npm run test:policy`.

Outside the claims: none substantiated.

Attacked and held: `tests/setupServer.ts:681` preserved overlap identity and order, accepted frozen inputs without mutation, and returned `[]` for empty input. Whole copies below the documented floor are permitted behavior, not missed violations of the amended design.

VERDICT: FAIL 3, 6; outside the claims: none