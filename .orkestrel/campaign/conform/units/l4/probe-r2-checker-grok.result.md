I'll read the brief and the repository contracts first, then follow the brief exactly in read-only mode.Next I’ll load the audit brief, unit brief, writer’s report, evidence files, and the rules those rows cite.I’ll run the claim-1/3/5/7/9 checks against the tree: sweeps, owned-file scope, and guide parity, without relying on the writer’s report as evidence.I’ll read the landed sites at current lines and check guide tables, remaining waits, and added-line residue.## 1
**CONFIRMED.** No row skipped. Applied: `src/server/Probe.ts:617-622` `#emitter.destroy()` in `finally` (brief 602-615); `helpers.ts:614` `buildRevisionPath` (brief 613); `Probe.ts:78-81,178-181`, `TypeStage.ts:65`, `LintStage.ts:65`, `RuntimeStage.ts:121` `#closing` only (brief 78-79,176-181); `guides/probe.md:622-623` (brief 619-620); `src/bin/main.ts:8` `/\r\n|\n/u`; `LintStage.test.ts:6` `isRunning`; `setupServer.ts:73` `createLintFixture`, `:283` `readHostEnding`, `:315` `export function probeRefusedTargets`; `LintStage.test.ts:333,938,1088,1165,1303` named waits, `:1137` `waitForDelay(250)` kept (brief 1257); `RuntimeStage.ts:70-74` and `probe.md:188-193`. fleet-F1 noop: `tests/setup.ts:3` `WORKSPACE_ROOT` only, `isBrowserVuePath` empty, no `src/browser`. fleet-F2 noop: `readonly id` only `src/core/types.ts:342`.

## 2
**not held**

## 3
**CONFIRMED.** Old names gone. Over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md` (`node_modules` excluded): `\bcreateRevisionFile` empty; case-insensitive `createRevisionFile(s|d|ing)?` empty; `\bisProcessLive` empty; case-insensitive `isProcessLive(s|ed|ing)?` empty; `#destroyed` empty; case-insensitive `#destroyed(s|ed|ing)?` empty.

## 4
**not held**

## 5
**CONFIRMED.** `buildRevisionPath` at `guides/probe.md:218` matches `helpers.ts:614`, under `## Surface`. `ProbeInterface` methods `prove`/`destroy` at `probe.md:236-237` match `src/core/types.ts:471,477`; `emitter`/`toolchain` stay Surface (`probe.md:48`). `LintStageInterface` tables `inspect` alone (`probe.md:257`) matching `src/server/types.ts:240-251`; inherited `destroy` stays under `StageInterface` (`probe.md:244`). Fences: `probe.md:367` `@orkestrel/probe`, `:572-573` `@orkestrel/probe/server`; no `@src/` in `probe.md`. `guides/README.md:6-25` maps to `probe.md`. `tests/guides.test.ts:207` Surface vs barrels. `AGENTS §` empty in the touched files.

## 6
**not held**

## 7
**CONFIRMED.** `/home/user/work/evidence/conform-probe.status` lists the same 14 paths as the diff, all under Owned (`src/**`, `tests/**` except the vendored three, `guides/probe.md`). No `package-lock.json`, no `node_modules`, none of the off-limits names. No old-name alias; `src/server/index.ts:2` is `export * from './helpers.js'`.

## 8
**not held**

## 9
**CONFIRMED.** Added-line sweep of `/home/user/work/evidence/conform-probe.diff`: no `TODO`, `FIXME`, `.skip(`, `.only(`, `.todo(`, `debugger`, `console.log`; no commented-out statements. Disposition matches the diff: numbered rows applied in those owned files; fleet-F1/F2 noop (`tests/setup.ts` and class `id` fields absent from the diff).

## Findings outside the claims
none

## Referrals
Does the writer's Sweeps table satisfy claim 3's "names those paths"? `createRevisionFile` records `TREE`/`PROSE` (`src`, `tests`, `guides`, `README.md`, …) not `guides/probe.md` or `guides/README.md` by those names; `#destroyed` records `src` only. The `isProcessLive` inflection row does name the five paths. The tree sweeps above were empty.

## VERDICT: PASS

## Journal
(leave for the driver)

## Deviation
none. Every named evidence file and cited tree path was readable. Containment showed no tree change.