<!-- workflow wf_771a9101-0fb (resumed), agent ac1942a6af44e9873, captured from journal.jsonl -->

## Per-claim verdicts

**Claim 3 — CONFIRMED.**
`src/core/types.ts:230-249` (diff) carries the rewritten `@remarks` — "Every member names the version that tool's own manifest publishes in the target workspace... A bridged workspace is the case that reading has to be held against: its type stage runs the 6.x compiler `@typescript/typescript6` republishes rather than the 7.x the workspace's own manifest names, so its type verdict predicts that workspace's gate only where the two compilers agree" — and the `typescript` property doc reads "Names the `typescript` version the target workspace's own manifest publishes." verbatim as `ts7-probe-fix-brief.md` item 1 prescribes.

The premise holds of the code: `Probe.#version()` (`/home/user/fleet/probe/src/server/Probe.ts:642-652`) reads `readWorkspaceManifest(...).contents.version`, never the resolved module, so `toolchain.typescript` is the manifest version whatever engine served the type stage — matching the test `serves a workspace at every major its own peer range names` (`Probe.test.ts:928-931`), which asserts `probe.toolchain.typescript` is `'7.0.2'` on a bridged workspace.

The guide's `Toolchain` Surface row reads "read from those manifests rather than from the module a stage loaded" (diff line 10), matching brief item 2 verbatim. The bridge bullet (diff lines 87-110) carries the consequence sentence, the `skipLibCheck` sentence, the refusal sentence with its antecedent, the `missing` sentence, and "never the 6.x compiler the bridge republishes" — each matching brief item 3's prescribed text verbatim. The `loadWorkspaceModule` row's description (diff line 55) matches brief item 4's prescribed sentence verbatim, and its signature column names `typeof import('@typescript/typescript6')` for the `typescript` overload, matching the actual return type in `helpers.ts` (`import type * as TypeScript from '@typescript/typescript6'`). The `collectRangeMajors` row (diff line 62) is present and accurate against the implementation at `helpers.ts:570-577`.

Writing-rules sweep of every amended sentence in these hunks (types.ts remarks/property doc, guide bullet, `loadWorkspaceModule`/`collectRangeMajors` TSDoc, `#support()` comment) against the `.claude/rules/writing.md` substitution table, case-insensitive and across inflections, found no unpermitted hit: matches of "once" (`ts7-probe-fix.diff.txt:561,637,1120`) are the quantifier sense ("one time"), not the banned temporal sense meaning "after," and matches of "new"/"now" are all inside `new Probe(...)`/`new Set(...)`/`new TypeStage(...)` code identifiers, exempt as literal code. No hit falls in a banned sense.

**Claim 6 — CONFIRMED.**
`tests/src/server/helpers.test.ts` (diff lines 997-1002) asserts `loadWorkspaceModule(ROOT, 'typescript').createProgram` is `toBeTypeOf('function')` in the same `it` block and beside `loadWorkspaceModule(ROOT, 'typescript').version` — `ROOT` is `fileURLToPath(WORKSPACE_ROOT)`, this checkout's own root. The added `missing`-refusal row `refuses a workspace that installs no typescript at all` (diff lines 1088-1104) asserts `message: 'The workspace cannot load typescript'`, `code: 'missing'`.

**Claim 7 — CONFIRMED.**
A sweep of the diff for `vi.mock`, `vi.fn`, `vi.spyOn`, `useFakeTimers`, `jest.`, `sinon`, `mockImplementation`, `mockReturnValue`, and `vi.stubGlobal` returned no matches. Every fixture in the changed tests is a real `createScratch` temporary workspace, a real `scratch.link` to this checkout's installed `@typescript/typescript6` bridge (`tests/setupServer.ts:745-750`), or an inert data stub of a foreign package's shape (`typescript`/`oxlint`/`vitest` manifest and entry text, `tests/setupServer.ts:739-759`), consistent with `AGENTS.md` § Non-negotiable rules.

**Claim 8 — CONFIRMED.**
`ts7-probe-fix.status.txt` lists exactly 13 modified paths — `guides/probe.md`, `package-lock.json`, `package.json`, `src/core/types.ts`, `src/server/Probe.ts`, `src/server/helpers.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.test.ts`, `tests/setupServer.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/stages/TypeStage.test.ts` — an exact match to the claimed 13-file union, with no other row (no `??` untracked entries). `tests/setupPolicy.ts`, `tests/distribution.test.ts`, and `tests/guides.test.ts` do not appear in the status output.

## Findings outside the claims

None. The remaining fix-brief items (1, 2, 4, 5, 9, 10) checked incidentally while resolving claim 3 read consistent with their prescribed text and the final diff state; item 5's comment (`Probe.ts:420-422`) carries no restated `collectRangeMajors` remarks sentence in the final state. Scope honesty (claim 8) covers the diff as a whole; no shared or off-limits file was touched.

VERDICT: PASS none; outside the claims: none
