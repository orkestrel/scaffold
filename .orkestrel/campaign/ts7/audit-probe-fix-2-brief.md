# Audit brief — ts7-probe-fix-2 (round 3 over the bridge loader in probe)

## Role and lane

A read-only lane over one brief. The dispatch names which lane you hold: the subjective lane (`reviewer`, Opus 5), the objective lane (`reviewer`, Opus 5, the recorded substitution for the dark Sol bench), or the checker (`checker`, Sonnet). Read `/home/user/fleet/probe/AGENTS.md` § Writing and § Non-negotiable rules, `/home/user/fleet/probe/.claude/rules/writing.md`, `.claude/rules/tests.md`, and `.claude/rules/typescript.md` there first. You run no command and edit nothing.

## Subject and review evidence

The uncommitted working tree of `/home/user/fleet/probe` over `b331d93`, carrying the two landing units, the round-2 fix unit, the Orchestrator's lockfile pass, and the round-3 builder unit. The diff: `/home/user/scaffold/tmp/units/ts7-probe-fix-2.diff.txt` (`git diff b331d93`). The status: `/home/user/scaffold/tmp/units/ts7-probe-fix-2.status.txt`. The round-3 brief: `/home/user/scaffold/tmp/units/ts7-probe-fix-2-brief.md`; its report: `/home/user/fleet/probe/tmp/units/ts7-probe-fix-2-report.md`. Round 2's lane reports: `/home/user/scaffold/tmp/units/ts7-audit-probe-fix-{subjective,objective,checker}.md`. Resolve every pointer by reading the cited file at the cited line inside `/home/user/fleet/probe`; a report is a claim, never evidence.

## Already established

Round 2 confirmed the loader's branches and message, the anchored parser and its boundaries, the bridged inspection row, the factory at the brief's sites, the `@example` assertion, the `missing` row, the no-mock law, and the scope; do not re-rule them. The lockfile's missing `libc` rows are accepted and recorded (the campaign measurements). The published declarations importing the bridge's types is the recorded pre-existing shape. `carried` as the option name and the two-expression signature cell are recorded as not adopted.

## Claims

1. Each of the nine edits the round-3 brief prescribes reads at its site as written there, and every amended sentence obeys `AGENTS.md` § Writing and `.claude/rules/writing.md`.
2. `src/core/types.ts`'s `Toolchain` doc block — the summary line, the `@remarks`, and the three member docs — states one account: every member names the version the target workspace's own manifest publishes, which `Probe.#version` (`src/server/Probe.ts`) makes true for all three tools.
3. `guides/probe.md` states that same account at the `Toolchain` Surface row, the prerequisite bullet on resolved files, the bridge bullet, and the receipt grammar bullet, with no sentence left in the "resolved versions the stage ran" vocabulary; the `loadWorkspaceModule` row's `cause` clause is true for the bridge that loads and cannot serve.
4. `src/server/helpers.ts`'s bridge branch reads the bridge's value through the same guard as the workspace branch and returns the binding it guarded, with no `unknown` annotation and no `as`.
5. Every `it` row whose fixture call passes `bridged: true` is gated with `it.runIf(DIRECTORY_LINKS)`, `DIRECTORY_LINKS` is imported where it is used, the `bridged` option's TSDoc names the gate, and no row that passes no `bridged` gained the gate.
6. `tests/src/core/errors.test.ts`'s bridgeless workspace is built by `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })` with the inline writes removed, and the adoption-table row that reads it still names `workspace`/`malformed`.
7. No file outside the units' owned sets changed; `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/distribution.test.ts`, and `tests/guides.test.ts` carry only what the landing units and the Orchestrator's lockfile pass account for.

## Threshold

Default to refuting where the evidence is thin. A claim is CONFIRMED only from the cited file; a claim you cannot settle from your evidence is UNRESOLVED with the reason. Findings outside the claims are welcome, each with file, line, what is wrong, why it matters, and what right looks like.

## Output

Per-claim verdicts with evidence, then findings outside the claims, then exactly one terminal line: `VERDICT: PASS|FAIL <failed claim ids>; outside the claims: <ids or none>`. No process diary.

## Execution

Perform the assignment directly and spawn nothing.
