# Verdict — U5 generated-readers, audit round 1

Lanes that ran, each in a clean context on `u5-audit-brief.md` through Workflow `wf_4dda7037-306`: subjective (`reviewer`, Opus 5), objective (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), and `checker` (Sonnet). The `verifier` ran the scaffold chain (`u5-verify-report.md`, GATES: GREEN, `npm test` green in every project and `test:distribution` green under npm 11). Lane captures: `u5-audit-{subjective,objective,checker}.md`.

## Per-claim reconciliation

- 1, 4, 6, 7, 11: PASS on every lane.
- 2: PASS. Both the objective lane and the checker name the claim's parenthetical as overstated: `export default value` reports `syntax: 'ExportDefaultDeclaration'`, the wrapper's own type, which the interface documents (`tests/setupServer.ts:234-236`) and the test asserts. The code is right; the claim's phrasing was mine.
- 3: PASS on the code; the checker's FAIL is on the brief. The claim named `readDeclaredNames` and `stageDistributionClassification` as readers, and both are gone (`readDeclaredNames` replaced by `statement.declarations`; the `stage*` functions folded or renamed to `build*`), which claim 10 states correctly. A stale-name claim is not re-issued.
- 5: PASS on every structural conjunct on every lane; the behavioural conjunct (each drive returns the recorded answers) is the verifier's: `src:core` 385 passed and `guides` 17 passed on the independent run.
- 8: PASS on scope (every lane); the objective lane's FAIL on the report's accuracy is upheld on the record and needs no code change. The report's sentence that the lifted module carries the proof's "value imports whose specifier starts with `node:`" describes a value/type discrimination the filter does not perform: `extractDeclarations` (`tests/src/core/templates.test.ts:417-422`) carries every `node:` import declaration, the type-only `import type { SpawnSyncReturns } from 'node:child_process'` (`src/core/templates.ts:1031`) included, and `transformWithOxc` erases that one; the verifier's green load proves the erasure. The comment at `tests/src/core/templates.test.ts:411-414` is accurate. Correction recorded here; no `importKind` member is added, because no consumer discriminates by it.
- 9: PASS on the departure on every lane. The freshness ruling: the report's structural argument does not establish freshness (two lifts already land in different directories, so both answering is consistent with a path-keyed cache), but the property holds because `createScratch` allocates a `mkdtemp` directory per drive and `require` keys its cache on the resolved filename, so no drive resolves to a path a prior drive used, and the lifted classifier holds no module-level state, so a stale instance would answer identically. No freshness test is added; this paragraph is the record.
- 10: PASS on every checkable fact and on the design judgment (the subjective lane: `specifier` leaves the `node:` policy with the consumer).

## Findings outside the claims

Carried to U5-fix (`u5-fix-brief.md`), each to one edit:

- Subjective F2 (the non-vacuity guard before `findParameters(browser)` is a text scan in the file whose thesis is that a parser reads declarations) → edit 1: read the declaration through `readStatements`.
- Subjective F3 (the drive comments claim "nothing here is evaluated from a string" while the call list is still composed as text the loader evaluates) → edit 2: name the mechanism.
- Subjective F4 and the objective lane's reading of `structuredClone` (a same-realm deep clone with nothing left to buy) and the subjective referral on `Array.isArray` narrowing (`any[]` before the declared return type) → edit 3: `isCollection` narrows to `readonly unknown[]` and the clone goes.
- Subjective F5 (the reader test addresses its subject by position, `statements[4]`, and totals the bodies with `toHaveLength(1)`) → edit 4: select by declared name; assert the membership.
- Objective F1 (the reader's span unit is unmeasured on a non-ASCII source) → measured by the Orchestrator (`orchestrator-measurements.md` § M7: UTF-16 code units, every slice exact) and adopted as the reader's control → edit 5.

Recorded, carried to U6's ROADMAP rows: the drive harness is duplicated across `tests/guides.test.ts` and `tests/src/core/templates.test.ts` with differing scratch roots (subjective F1 and F4, objective F2 and F3); the duplication predates U5 and the brief fixed `extractDeclarations` in the test file, so consolidation into `tests/setupServer.ts` is a successor unit rather than a reopening.

Ruled, no carrier needed:

- Subjective F6 (placement of the host-independent `readStatements` in the Node-only setup module): it stays. `tests/setup.ts` loads under the browser projects too, and `vite`'s `parseSync` is a Node-side binding, so the reader's home is decided by its import rather than by its own purity; the file already holds `readErrorCode` and `readErrorMessage` on the same reasoning.
- The report's heading "Field added beyond the brief's list: `specifier`" under-claims `body`, which the report describes and flags elsewhere (subjective claim 8 note).
- The subjective lane's struck considerations (`readStatements` against `extract*`, `exported` as a past participle over the parser's `exportKind`, the `pending` stack) stand struck.

## Gate reading

`u5-verify-report.md`: GATES: GREEN over the whole chain. The fix round closes with a checker on its slice and a verifier over the gates that read the changed files.

VERDICT: PASS on the claims, with the round's findings carried to U5-fix; the fix-round closure decides acceptance
