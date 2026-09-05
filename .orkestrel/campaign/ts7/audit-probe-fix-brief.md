# Audit brief — ts7-probe-fix (round 2 over the bridge loader in probe)

## Role and lane

A read-only lane over one brief. The dispatch names which lane you hold: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), or the checker (`checker`, Sonnet). Read `/home/user/fleet/probe/AGENTS.md` § Writing and § Non-negotiable rules, `/home/user/fleet/probe/.claude/rules/writing.md`, `tests.md`, `patterns.md`, and `documentation.md` first. You run no command and edit nothing. Every path you cite is inside `/home/user/fleet/probe` unless it names `/home/user/scaffold/tmp/units/`.

## Subject and review evidence

The whole uncommitted working tree of `/home/user/fleet/probe` over `b331d93`: the two landing units, the Orchestrator's receipt-fence fix, the fix round (`ts7-probe-fix`), and the Orchestrator's npm 11 lockfile pass. The diff: `/home/user/scaffold/tmp/units/ts7-probe-fix.diff.txt` (1198 lines, `git diff b331d93`). The status: `/home/user/scaffold/tmp/units/ts7-probe-fix.status.txt`. The fix unit's brief and report: `/home/user/scaffold/tmp/units/ts7-probe-fix-brief.md`, `/home/user/fleet/probe/tmp/units/ts7-probe-fix-report.md`. Round 1's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-probe-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line; a report is a claim, never evidence.

## Already established

Round 1 confirmed the resolution order, the `missing`/`malformed` split, the type imports, the peers and the bridge's lockfile rows, and the scope of the two landing units; do not re-rule them. The lockfile's `libc` rows: npm 11.19.1 leaves an existing entry as it is and writes `libc` only on a fresh resolution, which moves transitive versions this change does not own (the Orchestrator's own reading, recorded in the campaign measurements), so the rows' absence is accepted and recorded, not a finding. The whole-suite timing failure on the Oxlint `initialize` deadline is the Orchestrator's deciding run, not a lane's subject.

## Claims

1. `loadWorkspaceModule` (`src/server/helpers.ts`) returns the bridge's value only when it is a record whose `createProgram` is a function, and otherwise throws one `ProbeError` with the message `The workspace's typescript carries no in-process compiler API, and the workspace's @typescript/typescript6 cannot serve one`, `origin: 'workspace'`, `code: 'malformed'`, `context: { name: 'typescript' }`, and `cause` present only when the bridge raised; the `@throws` sentence states it; a resolvable API-less bridge and an absent bridge are each pinned by a test with a real module or a real absence.
2. `collectRangeMajors` reads a term whole (`/^\^(\d+)\.\d+\.\d+$/u`), its `@remarks` and the guide's Surface row say so, and the tests pin `'>=6.0.0 <8.0.0'` and `'^6.0.3 <6.5.0'` as empty beside the existing boundaries; `#support()` is unchanged apart from its comment.
3. The `Toolchain` doc block in `src/core/types.ts` names the version each tool's manifest publishes in the target workspace, its `@remarks` premise holds for a bridged workspace, and the guide's `Toolchain` row, the bridge bullet (the consequence sentence, the `skipLibCheck` sentence, the refusal sentence with its antecedent, the `missing` sentence, the "6.x compiler the bridge republishes" wording), and the `loadWorkspaceModule` and `collectRangeMajors` rows read as the fix brief prescribes and are true of the code; every amended sentence obeys the writing rules.
4. The bridged inspection row in `tests/src/server/stages/TypeStage.test.ts` drives `TypeStage.inspect` on a scratch whose `typescript` publishes the version alone and whose `@typescript/typescript6` is this checkout's installed bridge, reads `Type 'string' is not assignable to type 'number'` for the broken candidate and no issue for the clean one, and can fail only if the bridge did not serve.
5. `writeWorkspaceFixture` (`tests/setupServer.ts`) is the one fixture home: every scratch-workspace site in `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts`, and `tests/src/server/stages/TypeStage.test.ts` calls it, no inline `node_modules/typescript` stub remains at those sites, its options are booleans for binary switches and no sentinel, its TSDoc states each option, and `tests/setupServer.test.ts` pins it by loading the written entry rather than reading its text.
6. `tests/src/server/helpers.test.ts` asserts `createProgram` is a function on this checkout's own `typescript` beside the version assertion, and the added `missing`-refusal row asserts the message `The workspace cannot load typescript`.
7. No mock, spy, fake clock, or module replacement enters any changed test; every fixture is a real temporary workspace, a real linked bridge, or an inert stub.
8. No file outside the union of the three units' owned sets changed (`package.json`, `package-lock.json`, `src/core/types.ts`, `src/server/helpers.ts`, `src/server/Probe.ts`, `src/server/stages/TypeStage.ts`, `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/core/errors.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/stages/TypeStage.test.ts`, `guides/probe.md`); `tests/setupPolicy.ts`, `tests/distribution.test.ts`, and `tests/guides.test.ts` are untouched.

## Threshold

Default to refuting where the evidence is thin. A claim is CONFIRMED only from the cited file; a claim you cannot settle from your evidence is UNRESOLVED with the reason. Findings outside the claims are welcome, each with file, line, what is wrong, why it matters, and what right looks like.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary.

## Execution

Perform the assignment directly and spawn nothing.
