<!-- returned by the builder agent a44a75b1d02304c2e; the unit wrote no report file, so this is the returned text -->

# Report: ts7-probe-fix-2

## Edits

1. `src/core/types.ts:231` — `Toolchain` summary line reads "Names the tool versions the target workspace's own manifests publish." Done.
2. `guides/probe.md` (Surface row prose) — reads "and reports the versions those manifests publish on `Verdict.toolchain`." Done.
3. `src/server/Probe.ts` (comment) — reads "is the case the `^7.0.0` term admits." Done.
4. `tests/src/core/errors.test.ts:186-196` — replaced with the single `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })` call, comment's first sentence kept above it, `writeWorkspaceFixture` imported from `../../setupServer.js` in sorted position. Done.
5. `src/core/types.ts:250,252` — `oxlint` and `vitest` doc lines both read "Names the `<tool>` version the target workspace's own manifest publishes." Done.
6. `guides/probe.md` (`loadWorkspaceModule` Surface row) — reads "...carrying the native fault as `cause` where one was raised." Done.
7. `guides/probe.md` (receipt grammar bullet) — reads "A tool field per tool follows..." with the added sentence on bridged-workspace token versions, rewrapped under 100 columns. Done.
8. `src/server/helpers.ts:437-444` — bridge branch changed to `const served = bridged.value` / `return served`, dropping the `unknown` annotation. Landed verbatim as specified, but see deviation below: `npm run check` reds on this exact edit.
9. Gated `it` rows on `DIRECTORY_LINKS`: `tests/src/server/stages/TypeStage.test.ts:267` (`it.runIf`), `tests/src/server/helpers.test.ts:650` (one `it.runIf` covering both `bridged: true` fixture calls at what were lines 657/662), `tests/src/server/Probe.test.ts:605` (`it.runIf`), `tests/setupServer.test.ts:49` (`it.runIf`). `DIRECTORY_LINKS` imported in each file in sorted position. Added the TSDoc sentence to `bridged` in `tests/setupServer.ts`. Done.
10. Ran `npm run format` to converge; it reformatted `guides/probe.md`, `tests/setupServer.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/helpers.test.ts` (wrapping the long `it.runIf` argument lists onto multiple lines).

## Gates

- `npm run format:check` — exit 0.
- `npm run lint:check` — exit 0.
- `npm run check` — **exit red**: `src/server/helpers.ts(443,61): error TS2322: Type 'Record<string, unknown>' is not assignable to type 'typeof ts | typeof import(".../vitest/dist/node")'.` See Deviation.
- `npm run build` — process exits 0, but the vite/`unplugin-dts` build step surfaces the identical `TS2322` diagnostic as a non-fatal warning at `src/server/helpers.ts:443:61` before completing.
- `npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/errors.test.ts` — exit 0, 8/8 passed.
- `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/server/stages/TypeStage.test.ts` — exit 0, 72/72 passed.
- `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts` — exit 0 (process), 1/28 failed, `ProbeError: The probe could not arm ... The LSP request 'initialize' exceeded its deadline`. Re-ran solo twice more; the same one test failed both times, not a flake. Unrelated to owned edits: it fails inside `LintStage`/Oxlint LSP handshake.
- `npm run test:setup` — exit 0, 10/10 passed.
- `npm run test:guides` — exit 0 (process), 1/13 failed on the same Oxlint `initialize` deadline. Re-ran once more; failed identically.
- `npm run test:policy` — exit 0, 111/111 passed.
- `npm test` (observation) — 227/237 passed; the 10 failures are all the same Oxlint `initialize` deadline signature, matching the host note in the brief's Context section that the whole suite reds this way under full worker load. On this host that signature reproduced even in solo re-runs of `Probe.test.ts` and `test:guides`, not only in the full-suite run.

`git status --short`:
```
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/core/types.ts
 M src/server/Probe.ts
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M tests/setupServer.test.ts
 M tests/setupServer.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/Probe.test.ts
 M tests/src/server/helpers.test.ts
 M tests/src/server/stages/TypeStage.test.ts
```
`package.json`, `package-lock.json`, and `src/server/stages/TypeStage.ts` are the earlier units' uncommitted edits named in the brief's Context, left untouched.

## Deviation

**Expected.** Edit 8's rationale states the bridge branch typechecks "exactly as `loaded` is at `:431-435`," so `return served` should type-check against `typeof TypeScript | typeof VitestNode`.

**Found.** `npm run check` reports `src/server/helpers.ts(443,61): error TS2322: Type 'Record<string, unknown>' is not assignable to type 'typeof ts | typeof import(".../vitest/dist/node")'.` The same diagnostic surfaces during `npm run build`'s declaration-bundling step (non-fatal there, but present).

**Evidence.**
```
src/server/helpers.ts(443,61): error TS2322: Type 'Record<string, unknown>' is not assignable to type 'typeof ts | typeof import("/home/user/fleet/probe/node_modules/vitest/dist/node")'.
  Type 'Record<string, unknown>' is missing the following properties from type 'typeof ts': tokenToString, getPositionOfLineAndCharacter, getLineAndCharacterOfPosition, isWhiteSpaceLike, and 553 more.
```
The `loaded` case at line 434-435 sits inside `if (specifier !== 'typescript' || (isRecord(loaded) && isFunction(loaded.createProgram)))` — the guard is inside an `||`, so control-flow narrowing does not apply to the `return loaded` statement, and `loaded`'s inferred type (`any`, from `attempt`'s callback return) survives unnarrowed. Edit 8's branch is a plain `if (isRecord(served) && isFunction(served.createProgram)) return served`, a bare `&&` guard with no such escape, so TypeScript does narrow `served` to `Record<string, unknown>` in that block, and that narrowed type is not assignable to the function's declared return type. The two sites are not the same shape the edit's rationale claims.

**Done or not done.** Edit 8 landed exactly as the brief specified (built to fail this way per the stop-and-report clause, not altered or worked around). Every other edit (1-7, 9, 10) is done, formatted, and green on its own scoped gate. `npm run check` and, by extension, the acceptance criterion "the gates and the scoped runs exit 0" are not met because of edit 8 alone.

**Hypothesis.** The edit needs an explicit return type narrowing step (for example reassigning through a locally-typed binding or an `as` alternative this project's non-negotiables forbid) that the brief did not specify, so the fix likely needs a design decision rather than a mechanical one.

Separately, as an observation rather than a deviation on my own edits: `tests/src/server/Probe.test.ts` and `test:guides` each red on this host from a repeatable `LintStage`/Oxlint LSP `initialize` deadline, in solo re-runs, not only under full-suite load. This is unrelated to any owned file and I made no change to `LintStage.ts` or the Oxlint fixture.
