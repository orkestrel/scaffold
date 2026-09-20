# U1-author audit — verdict

Round 1 of 2026-09-20 on `u1-audit-claims.md`, subject Veneer `ae0221d` (diff `a5de4c4..ae0221d`,
tree clean). Lanes, all blind on the one claims file with the Orchestrator-supplied diff, name list,
and status:

| Lane | Role and engine | Journal | Terminal line |
| --- | --- | --- | --- |
| objective | `reviewer`, native Opus 5 (Astra wrote the unit, so the lanes swap) | `native`; `units/u1-audit-reviewer-report.md` | `Verdict: fix round — claims 6 and 8, carrying findings F1 through F6` |
| subjective | `analyst` on Astra, `codex exec --sandbox read-only`, thread `01a0bdd9-c68a-7940-b578-3565d49f85bd` | `units/u1-audit-analyst.sh`; `units/u1-audit-analyst-report.md` | `Verdict: fix round — claims 6 and 8 are refuted; claim 13 remains undecidable; extra findings 14 and 15 require fixes` |
| checker | native Sonnet | `units/u1-audit-checker-report.md` | `Checker: findings` (every checked claim confirmed; no defect) |
| verifier | native Sonnet, U1-gate | `units/u1-gate-report.md` | every step exit 0 on managed Chromium; browser projects exit 0 on Edge; `audit` reports only the three registry-major advisories; tree clean |

## Per-claim reconciliation

| Claim | Ruling | Basis |
| --- | --- | --- |
| 1, 2, 3, 4, 5, 7, 9, 10, 11, 12 | CONFIRMED | both lanes and, where mechanical, the checker agree with sites |
| 6 | REFUTED | both lanes: `readEscapingImport` re-implements the installed `resolveContained` (`tests/setupConformance.ts:156-163`), and the reviewer finds the predicate restated at `tests/conformance.test.ts:79-82` |
| 8 | REFUTED | the analyst: `readSpecifiers` ignores `require()` while the sweep admits `.cjs` (a read-only probe read `[]` for `const dependency = require("vue")`); the reviewer: the digest constants have no rejecting control and the claim misplaces where they are proved |
| 13 | CONFIRMED by the verifier | both lanes could not run commands; U1-gate reproduced every reading green on the same commit |

## Findings carried into the fix round

| Finding | Source | Carrier |
| --- | --- | --- |
| containment through `resolveContained`, in the helper and the closure assertion | claim 6, reviewer F1 | `units/u1-fix-brief.md` step 1 |
| CommonJS `require()` specifiers with a red-first control | claim 8 (analyst) | step 2 |
| digest constants proved with a rejecting control; case names say where | claim 8 (reviewer) | step 3 |
| `expect(reading.layers).not.toStrictEqual(['utilities'])` cannot fail | reviewer F2 | step 4 |
| no guard fires when the byte-copied RTL cascade gains a physical declaration | reviewer F3 | step 5 |
| `app/browser/main.ts` dynamic-imports the TypeScript lib entry to dodge the unassigned-import rule | reviewer F4 | step 6 |
| `apply('light')` records ownership, so `destroy` can remove an attribute it did not write | reviewer F5 | step 7 |
| `main` and its child `section` share the accessible name `Showcase` | reviewer F6 | step 8 |
| the guides index has no Showcase column although a showcase exists | analyst 14 | step 9 |
| the listener-recording instrumentation is written twice | analyst 15 | step 10 |

Dropped, on the record: the reviewer's two observations (`guides/README.md` as a vendored
destination the briefs treat as owned — a terrain question the Orchestrator carries into the
next repair pass; `createTeardown` for the mount cleanup — not required, and the swap would make
the cleanup asynchronous for every caller).

## Ruling

Fix round. The fix unit runs on `builder` (native Sonnet) from `units/u1-fix-brief.md`, and round
2 audits its diff with the objective lane on Opus (`reviewer`) and the subjective lane on Astra
(`analyst`), engines that did not write the fix, plus the verifier. Acceptance of U1 waits on
round 2.
