# Unit ts7-audit — falsify stage 2 in scaffold and the probe unit (draft; the evidence slots fill from the reports)

## Role and lane

Three blind lanes on scaffold's stage 2 and three on `probe`'s unit, one brief each subject, run as one Workflow:

- Subjective lane, `reviewer` on Opus 5: API shape, naming, the guide and proposal prose, the TSDoc voice, whether the change reads as one convention.
- Objective lane, `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench: correctness against the constraints, the override's placement in every config and template, the browser fork's tests, the range literals, the resolution order in `probe`, the error contract.
- `checker` on Sonnet, in addition: acceptance criteria against the diff, scope honesty (no file outside the owned set), the writing rules over the prose, guide parity rows.

A `verifier` on Sonnet runs the authoritative gates in each checkout beside the lanes. Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command.

## Subjects and review evidence

- **Scaffold stage 2**: the diff `git diff 47200d6c -- .` rendered to `tmp/units/ts7-seven.diff.txt`, the status to `tmp/units/ts7-seven.status.txt`, the report `tmp/units/ts7-seven-report.md`, the brief `tmp/units/ts7-seven-brief.md`.
- **Probe**: the diff `git -C /home/user/fleet/probe diff b331d93 -- .` rendered to `tmp/units/ts7-probe.diff.txt`, the status to `tmp/units/ts7-probe.status.txt`, the report `/home/user/fleet/probe/tmp/units/ts7-probe-report.md`, the brief `tmp/units/ts7-probe-brief.md`.
- The rulings: `tmp/units/ts7-reconciliation.md`; the measurements: `.orkestrel/campaign/ts7/orchestrator-measurements.md`; the objective lane's constraints: `.orkestrel/campaign/ts7/design-objective.md`.

## Already established

Stage 1 (`47200d6c`) landed with the full chain green and the release-mode distribution proof green; the bridge is a drop-in for every scaffold site. Rehearsal 2 measured the override landing the rollup and the core rollup equivalent to the 6.0.3 build.

## Claims — scaffold stage 2

1. `package.json` moves `typescript` to `^7.0.2` and nothing else in its ranges; `npx tsc --version` prints `Version 7.0.2`; `npm run check` runs on the native compiler with no tsconfig edit.
2. `bundleTypes.invokeOptions.typescriptCompilerFolder: undefined` sits in `configs/src/vite.core.config.ts`, `configs/src/vite.server.config.ts`, and every `dts({...})` template in `src/core/templates.ts` that seeds a `bundleTypes`, each with a one-line reason, and `tests/src/core/compilers.test.ts` "keeps this repository byte-identical to every configuration it generates" holds.
3. A blueprint that selects `app/browser` keeps `typescript` on the 6 major through a named constant beside `APP_BROWSER_DEV_DEPENDENCIES` and a fork in `blueprintToDevDependencies`, with a test that fails without the fork; every other blueprint receives `^7.0.2`; the guide names the limit and `vuejs/language-tools` issue 5381.
4. Every range literal the move makes false is updated and no other literal moved: `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts` and its snapshots, `tests/src/bin/CLI.test.ts`, `tests/src/bin/helpers.test.ts`, the three fixtures; the browser fixture `app-only-toolchain.txt` stays on `^6.0.3` by the fork, not by hand.
5. `host.json` carries the digests of every vendored file the stage changed and no other change.
6. The prose: `guides/scaffold.md` § Dependency floors states the 7.0.2 floor, the bridge's reason, and the browser limit; `README.md` names no stale range; `PROPOSAL.md`'s three sentences (the Option 3 dependency sentence, the Option 1 control path, the Option 3 fallback reader) are amended to the sync API and the bridge with the measured 61 ms reading; `ROADMAP.md` § 1 carries the retirement phases R1 to R3, the fleet visit, and the browser limit, each row with a close condition; every sentence obeys the writing rules (no count in prose, no substitution-table term, sentence-case headings).
7. No file outside the brief's owned set changed; no discarding git command ran; nothing committed.
8. The verifier's chain is green: `format:check`, `lint:check`, `check`, `build`, `test`, and the release-mode distribution proof under npm 11.

## Claims — probe

9. `loadWorkspaceModule(workspace, 'typescript')` returns the workspace's `typescript` when its `createProgram` is a function, otherwise the workspace's `@typescript/typescript6`, in one implementation with no duplicated require path, and its TSDoc and `@example` describe that order.
10. When neither resolves the existing `missing` `ProbeError` is thrown; when `typescript` resolves without the API and the bridge is absent, a `ProbeError` with a code that fits the documented union names both specifiers and the bridge in its message.
11. The tests pin each branch with real temporary workspaces and real modules (no mocks, no module replacement), and the report records the red run before the change and the green run after, with commands.
12. `TypeStage.ts` takes its types from `@typescript/typescript6` and imports nothing from `'typescript'` at runtime; `grep -rn "from 'typescript'" src` is empty; `tests/setupPolicy.ts` and `tests/distribution.test.ts` are untouched.
13. `package.json` carries the bridge in `devDependencies`, `peerDependencies.typescript` `^6.0.3 || ^7.0.0` optional, and `@typescript/typescript6` `^6.0.2` optional; `guides/probe.md` parity holds (`tests/guides.test.ts` green) and the `loadWorkspaceModule` row and the receipt paragraph state the resolution and the printed version.
14. The verifier's chain is green in `/home/user/fleet/probe`: `format:check`, `lint:check`, `check`, `build`, `test`.

## Threshold

Each subject lands when its claims hold; a failing claim is a fix-round item with the lane's exact prescription, applied by the writer's engine and confirmed by the checker.

## Output

Per-claim verdicts with evidence (a quote and its line in the diff or the file, and the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
