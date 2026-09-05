# Unit ts7-audit-probe — falsify the two probe units in `/home/user/fleet/probe` (uncommitted, on `b331d93`)

## Role and lane

Three blind lanes read this one brief:

- Subjective lane, `reviewer` on Opus 5: the loader's shape and naming (`loadWorkspaceModule`, `collectRangeMajors`), the error message and code, the TSDoc and `@example`, the guide's Prerequisites and `Toolchain` prose, one convention across the two units.
- Objective lane, `reviewer` on Opus 5 holding the objective lane, the recorded substitution for the dark Sol bench: the resolution order's correctness, the error contract, the range parser's boundary behaviour, `#support()`, the test fixtures (real modules, no mocks), the peers and the devDependency, the lockfile churn.
- `checker` on Sonnet, in addition: acceptance criteria against the diff, scope honesty, the writing rules over the guide hunks, guide parity rows.

Each lane performs the assignment directly, spawns nothing, writes no file, and runs no command. The gates are the Orchestrator's deciding run (`tmp/units/decide-*.log.txt` under the probe checkout), not a lane's.

## Subject and review evidence

The diff `/home/user/scaffold/tmp/units/ts7-probe.diff.txt` (`git diff b331d93` in the probe checkout, `tmp/` excluded) and the status `/home/user/scaffold/tmp/units/ts7-probe.status.txt`; the reports `/home/user/fleet/probe/tmp/units/ts7-probe-report.md` and `ts7-probe-2-report.md`; the briefs `/home/user/scaffold/tmp/units/ts7-probe-brief.md` and `ts7-probe-2-brief.md`; the rulings `/home/user/scaffold/tmp/units/ts7-reconciliation.md` R6; the measurements `/home/user/scaffold/.orkestrel/campaign/ts7/orchestrator-measurements.md`. The Orchestrator applied one more edit after the units: `guides/probe.md`'s receipt fence `oxlint@1.80.0` → `oxlint@1.81.0` (baseline drift at `b331d93` against the installed 1.81.0).

## Already established

The first unit recorded red-then-green for the loader's tests; the successor recorded red-then-green for the support check; `format:check`, `lint:check`, `check`, `build` exit 0 after each; the remaining reds were a grandchild-process failure in `tests/src/bin/main.test.ts` that moved between runs under a contended host and the receipt fence now fixed.

## Claims

1. `loadWorkspaceModule(workspace, 'typescript')` returns the workspace's `typescript` when its `createProgram` is a function, otherwise the workspace's `@typescript/typescript6`, through one require path with no duplication; the TSDoc and `@example` state that order; `resolveWorkspaceModule` or any sibling helper keeps its meaning.
2. When neither resolves, the existing `missing` error; when `typescript` resolves without the API and no bridge is installed, a `ProbeError` with code `malformed`, `origin` `workspace`, `context.name` `typescript`, a message naming the bridge, and the bridge's own fault on `cause`; the code fits the union's documented meaning in `src/core/types.ts`.
3. `collectRangeMajors` reads each `||`-separated caret term and returns its major once in range order, skips a term it does not write (a bare version, a tilde term, a comparator, a caret without a minor), is exported through the server barrel, has a Surface row, and is tested at those boundaries; `#support()` accepts a major the collection names and refuses every other with the unchanged error.
4. The tests pin each branch with real temporary workspaces and real modules (a version-only `typescript` stub, the installed bridge linked or copied), with no mocks, spies, or module replacement; the positive row proves a bridged TypeScript 7 workspace passes the support check and `toolchain.typescript` reads the workspace manifest's `7.0.2`.
5. `TypeStage.ts` and `helpers.ts` import types from `@typescript/typescript6` and nothing from `'typescript'` at runtime; `tests/setupPolicy.ts` and `tests/distribution.test.ts` are untouched.
6. `package.json`: the bridge in `devDependencies` `^6.0.2`; `peerDependencies.typescript` `^6.0.3 || ^7.0.0` optional; `@typescript/typescript6` `^6.0.2` optional peer; `package-lock.json` carries the bridge and its alias, and its other churn is host normalization (`libc` arrays) rather than a range change.
7. `guides/probe.md` parity holds, the `loadWorkspaceModule` and `collectRangeMajors` rows are true, the Prerequisites sentences state the resolution and the widened support, the `Toolchain` sentence states what `toolchain.typescript` reports, the receipt fence names `oxlint@1.81.0`, and every hunk obeys the writing rules.
8. No file outside the two briefs' owned sets changed except the Orchestrator's fence fix; nothing was committed or reverted.

## Threshold

The probe change is accepted for probe's `main` when claims 1 to 8 hold and the Orchestrator's deciding gate run is green (or red only on a timing failure that passes alone, recorded); a failing claim is a fix-round item with the lane's exact prescription.

## Output

Per-claim verdicts with evidence (a quote and its line in the diff or the file, and the pointer checked), then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`.

## Execution

A native subagent: perform the assignment directly and spawn nothing.
