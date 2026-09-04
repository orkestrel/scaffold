I'll read the brief and the scaffold contracts it depends on, then follow the brief exactly in read-only mode.Next I’ll load the audit brief, unit brief, writer report, and evidence so I can rule only the claims this lane holds.I’ll verify the held claims against the tree: row landings, old-name sweeps, guide parity, owned-file scope, and hidden residue.I’ll inspect the changed sources and run the remaining sweeps the brief requires.## 1
**CONFIRMED.** No row skipped. Applied: `src/server/Probe.ts:617-622` `#emitter.destroy()` in `finally` (brief 602-615); `helpers.ts:614` `buildRevisionPath`; `Probe.ts:78-81,179` `#closing` only (brief 78-79,176-181); `guides/probe.md:623-624` (brief 619-620); `src/bin/main.ts:8` `/\r\n|\n/u`; `LintStage.test.ts:6` `isRunning`; `setupServer.ts:72` `createLintFixture`, `:282` `readHostEnding`, `:314` `export function probeRefusedTargets`; `LintStage.test.ts:333,938,1088,1165,1302` named waits, `:1137` `waitForDelay(250)` kept (brief 1257); `RuntimeStage.ts:70-74` and `probe.md:188-193`. fleet-F1 noop: `tests/setup.ts:3`, `isBrowserVuePath` empty, no `src/browser`. fleet-F2 noop: `readonly id` only `src/core/types.ts:342`.

## 2
**not held**

## 3
**CONFIRMED.** Old names gone. Over `src`, `tests`, `guides/probe.md`, `guides/README.md`, `README.md` (`node_modules` excluded): `\bcreateRevisionFile` empty; case-insensitive `createRevisionFile(s|d|ing)?` empty; `\bisProcessLive` empty; case-insensitive `isProcessLive(s|d|ing)?` empty; `#destroyed` empty; case-insensitive `#destroyed(s|ed|ing)?` empty.

## 4
**not held**

## 5
**CONFIRMED.** `buildRevisionPath` at `guides/probe.md:218` matches `helpers.ts:614`, under `## Surface` (`probe.md:26`). `ProbeInterface` methods `prove`/`destroy` at `probe.md:232-237` match `src/core/types.ts:446`; `emitter`/`toolchain` stay Surface (`probe.md:48`). Fences: `probe.md:368` `@orkestrel/probe`, `:574` `@orkestrel/probe/server`; no `@src/` in `probe.md`. `guides/README.md:6-25` maps to `probe.md`. `tests/guides.test.ts:207` generic Surface vs barrels; CLAIM fence `:25-43` does not name the helper. `AGENTS §` empty in the touched files.

## 6
**not held**

## 7
**CONFIRMED.** `/home/user/work/evidence/conform-probe.status` and the diff list the same paths, all under Owned (`src/**`, `tests/**` except the vendored three, `guides/probe.md`). No `package-lock.json`, no `node_modules`, none of the off-limits names. No old-name alias; `src/server/index.ts:2` is `export * from './helpers.js'`.

## 8
**not held**

## 9
**CONFIRMED.** Added-line sweep of `/home/user/work/evidence/conform-probe.diff`: no `TODO`, `FIXME`, `.skip(`, `.only(`, `.todo(`, `debugger`, `console.log`; no commented-out statements. Disposition matches the diff: numbered rows applied in those owned files; fleet-F1/F2 noop (`tests/setup.ts` and class `id` fields absent from the diff).

## Findings outside the claims
none

## Referrals
Does the writer's Sweeps table satisfy claim 3's "names those paths"? It records `createRevisionFile` on `**/*.{ts,md,json,js,cjs}`, inflections on `**/*.{ts,md}`, `isProcessLive` on `**/*.{ts,md}`, and `#destroyed` on `src/` only — not `guides/probe.md`, `guides/README.md`, or `README.md`. The tree sweeps above were empty.

## VERDICT: PASS

## Journal
(leave for the driver)

## Deviation
none. Every named evidence file and cited tree path was readable. Containment showed no tree change.