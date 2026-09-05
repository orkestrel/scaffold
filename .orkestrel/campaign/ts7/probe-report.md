# Unit ts7-probe — report

**Deviation: the unit stops here.** Every owned edit landed and every owned gate is green, and
`npm test` is red on `tests/src/server/Probe.test.ts`, a file § Scope puts off-limits. The red is
caused by this change, the cause is understood, and the repair needs a file this unit does not own.
The patch is in § Shared-file patch, report-only.

## Deviation

**Expected.** `npm test` exits 0 after the change.

**Found.** `npm test` exits 1. The deterministic failure is
`tests/src/server/Probe.test.ts > probe > names an unsupported TypeScript installation before entering the compiler`.

**Evidence.** The fixture that row builds writes a `node_modules/typescript` at `7.0.2` whose entry
exports the version alone, and writes no `@typescript/typescript6` beside it. `Probe`'s constructor
builds `TypeStage` at `src/server/Probe.ts:100`, and `TypeStage`'s constructor loads the compiler at
`src/server/stages/TypeStage.ts:75`, so the new refusal now raises out of `new Probe(...)` at
`tests/src/server/Probe.test.ts:549` before the row reaches `probe.prove(...)`:

```text
FAIL  |src:server| tests/src/server/Probe.test.ts > probe > names an unsupported TypeScript installation before entering the compiler
ProbeError: The workspace's typescript carries no in-process compiler API, and the workspace does not install @typescript/typescript6
 ❯ loadWorkspaceModule src/server/helpers.ts:438:8
 ❯ new TypeStage src/server/stages/TypeStage.ts:75:22
 ❯ new Probe src/server/Probe.ts:100:16
 ❯ tests/src/server/Probe.test.ts:549:17
Caused by: Error: Cannot find module '@typescript/typescript6'
Require stack:
- /tmp/orkestrel-test-fcC8PP/package.json
```

**Done.** The compiler resolution, the widened and added peers, the bridge devDependency, the
type-import move, the new tests, and the guide. `format:check`, `lint:check`, `check`, and `build`
exit 0.

**Not done.** `npm test` exit 0. The row named earlier needs an owner for
`tests/src/server/Probe.test.ts`, and § Successor work states the design question behind it.

**Hypothesis.** `#support()` runs at the top of `prove` (`src/server/Probe.ts:139`) while the
compiler loads in the constructor, so the row's own name — "before entering the compiler" — was true
only while an API-less `typescript` loaded without complaint.

## Red then green

Run in `/home/user/fleet/probe`, before the source change and after it, with the tests already
written.

| Command                                                                                                                                              | Before             | After               |
| ---------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------ | ------------------- |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server --project src:core -t 'bridge'`                                | `Tests  2 failed`  | `Tests  2 passed`   |
| `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:core -t 'classifies every failure path a test can drive without a resident tool'` | `Tests  1 failed`  | `Tests  1 passed`   |

The tests that ran red first:

- `server path helpers > takes the workspace compiler where it carries the API and the bridge where it does not` — red on `expected '7.0.2' to be '6.0.3'`.
- `server path helpers > refuses a compiler carrying no in-process API where the workspace installs no bridge` — red on `isProbeError(refused)`, `expected false to be true`.
- `failure adoption > classifies every failure path a test can drive without a resident tool` — red on `a compiler carrying no in-process API beside no bridge raised nothing: expected undefined to be defined`.

## Gates

| Gate                   | Exit code |
| ---------------------- | --------- |
| `npm run format:check` | 0         |
| `npm run lint:check`   | 0         |
| `npm run check`        | 0         |
| `npm run build`        | 0         |
| `npm test`             | 1         |

`npm test` reported `Test Files  2 failed | 9 passed (11)` and `Tests  3 failed | 228 passed (231)`,
logged at `tmp/units/ts7-probe-test.log.txt`. One failure is the deviation. The rest are timing
failures under a contended full run, and each passed when its file ran alone:

- `tests/src/server/stages/RuntimeStage.test.ts > runtime stage > raises progress for the caller's run and lowers it before the stage's cleanup` — `Error: Test timed out in 60000ms`. Alone: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/stages/RuntimeStage.test.ts` → `Tests  40 passed (40)`, exit 0.
- `tests/src/server/Probe.test.ts > probe > mints receipts only when every stage executes cleanly, including for a control that shares no path with its case, and returns admitted path issues` — `LSPError: The LSP request 'initialize' exceeded its deadline`, seen on the first full run and not on the second. Alone: `npx vitest run --config vite.config.ts --no-cache --reporter=dot --project src:server tests/src/server/Probe.test.ts` → `Tests  1 failed | 25 passed (26)`, the one failure being the deviation.

The deciding re-run of a timing failure belongs to the Orchestrator on an idle host, not to this
unit inside its own exec.

## Touched files

| File                               | Change                                                                                                                                        |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------- |
| `package.json`                     | `@typescript/typescript6` `^6.0.2` in `devDependencies`; `typescript` peer widened to `^6.0.3 \|\| ^7.0.0`; `@typescript/typescript6` added as an optional peer |
| `package-lock.json`                | The bridge and its aliased `@typescript/old` compiler, plus the manifest changes                                                              |
| `src/server/helpers.ts`            | `loadWorkspaceModule` resolves the bridge for a `typescript` carrying no in-process API; type import moved to the bridge; TSDoc and `@example` restated |
| `src/server/stages/TypeStage.ts`   | Type-only imports moved to `@typescript/typescript6`; no runtime import                                                                       |
| `tests/src/server/helpers.test.ts` | Rows over real scratch workspaces: the compiler kept where it carries the API, the bridge taken where it does not, and the bridgeless refusal |
| `tests/src/core/errors.test.ts`    | A drive row for the bridgeless refusal, on its own scratch workspace                                                                          |
| `guides/probe.md`                  | The `loadWorkspaceModule` row, a Prerequisites bullet on the resolution and its limit, and the `workspace`/`malformed` failure row            |

```text
 guides/probe.md                  | 16 +++++++-
 package-lock.json                | 83 ++++++++++++++++------------------------
 package.json                     |  7 +++-
 src/server/helpers.ts            | 65 ++++++++++++++++++++++---------
 src/server/stages/TypeStage.ts   |  4 +-
 tests/src/core/errors.test.ts    | 19 +++++++++
 tests/src/server/helpers.test.ts | 62 ++++++++++++++++++++++++++++++
 7 files changed, 184 insertions(+), 72 deletions(-)
```

```text
 M guides/probe.md
 M package-lock.json
 M package.json
 M src/server/helpers.ts
 M src/server/stages/TypeStage.ts
 M tests/src/core/errors.test.ts
 M tests/src/server/helpers.test.ts
```

`src/server/types.ts` names no `typescript` type, so it is unchanged. `tests/setupServer.ts` holds
no fixture-workspace helper the new rows needed, so it is unchanged. `tests/setupPolicy.ts` and
`tests/distribution.test.ts` are untouched, and `grep -rn "from 'typescript'" src` returns nothing.

## The error code

`malformed`, with `context: { name: 'typescript' }` and the bridge's own `MODULE_NOT_FOUND` fault on
`cause`.

`src/core/types.ts` documents the repairs the union names: "`missing` creates or installs the named
thing. `malformed` repairs the value read against a contract." The module resolved; what it does not
carry is the in-process compiler API that `loadWorkspaceModule` loads it for, so the value read
against a contract is the thing at fault. `loadWorkspaceModule` and `resolveWorkspaceModule` already
split their translations that way — `missing` when the host reports `MODULE_NOT_FOUND` for the
requested specifier, `malformed` for everything the specifier resolved to and could not serve — and
this condition joins the second branch, so a caller's existing branch keeps its meaning: `missing`
says the workspace installs no `typescript`, `malformed` says it installs one that cannot serve.
`PROBE_ERROR_CODES` needs no new member.

`context` names `typescript` alone rather than both specifiers, because `ProbeErrorContext` declares
one `name` member and `src/core/types.ts` is off-limits to this unit. Every other throw in these two
helpers sets `name` to the specifier the caller passed, so that reading stays consistent, and the
message names the bridge in full.

## Shared-file patch — `tests/src/server/Probe.test.ts`

Report-only. The row's fixture proves a property this change has separated into a pair: that a
workspace carrying no usable compiler is refused, and that `#support()` names an unsupported
installation. Split them.

Replace the row's name and its `typescript` fixture, and add a second row. In
`tests/src/server/Probe.test.ts`, in the row at line 532:

- Rename it to `'refuses a workspace whose typescript carries no in-process compiler API'`.
- Replace `const probe = new Probe({ workspace: scratch.path })` and the `await expect(probe.prove(...))` block with a construction assertion:

```ts
		const refused = captureError(() => new Probe({ workspace: scratch.path }))
		expect(refused).toMatchObject({
			name: 'ProbeError',
			message:
				"The workspace's typescript carries no in-process compiler API, and the workspace does not install @typescript/typescript6",
			origin: 'workspace',
			code: 'malformed',
			context: { name: 'typescript' },
		})
```

- Keep the `finally` block's `scratch.destroy()` and drop its `probe.destroy()`, because no probe was constructed.

Then add a second row that keeps the `#support()` proof, identical to the current one except that
its `typescript` fixture carries the compiler API and a major the peer range does not name:

```ts
		scratch.write(
			'node_modules/typescript/package.json',
			'{"name":"typescript","version":"5.9.3","type":"module","exports":{".":"./index.js","./package.json":"./package.json"}}\n',
		)
		scratch.write(
			'node_modules/typescript/index.js',
			"export const version = '5.9.3'\nexport const createProgram = () => undefined\n",
		)
```

with the existing rejection assertion, its `found` version read as `5.9.3`. That row keeps its
current name: `#support()` still answers before any stage inspects, and the compiler the constructor
loaded is never entered.

That file's `@orkestrel/test` import at line 19 names `createRecorder`, `createTeardown`, `waitForCondition`, and `waitForDelay`, so the patch adds `captureError` to it in sorted position.

## Successor work

Findings this unit did not own. Each names the file that owns it.

1. **`src/server/Probe.ts` — `Probe` still refuses a TypeScript 7 workspace.** `#support()` reads
   the supported major with `/^\^(\d+)\./u` over `peerDependencies.typescript`, which returns `6`
   from `^6.0.3 || ^7.0.0`, so `found !== supported` for `7.0.2` and `prove` rejects. Measured:
   `node -e "..."` over the widened range prints `refused true` for `7.0.2` and `refused false` for
   `6.0.3`. The manifest now declares a range the code refuses. Either `#support()` reads every term
   of the range, or the peer range stays at one major until the fleet visit moves it. The guide's
   Prerequisites bullet states this limit rather than claiming support the code refuses.
2. **The brief's receipt premise is false.** § Scope says the receipt "prints the loaded compiler's
   `version`, which is the bridge's `6.0.3` on a 7 workspace". `Probe` builds `Toolchain` from
   `#version('typescript')` (`src/server/Probe.ts:96`), which reads
   `readWorkspaceManifest(workspace, 'typescript').contents.version` — the workspace's own manifest,
   never the loaded module. So the receipt prints the workspace's `typescript` version whatever
   compiler served the stage. No receipt sentence needed changing; the Prerequisites bullet states
   what `Verdict.toolchain` reports, and the honesty gap it opens on a bridged workspace is the same
   ruling as finding 1.
3. **`package-lock.json` carries host normalization.** The authorized `npm install --no-audit
   --no-fund` on this host removed the `libc` arrays from the optional platform entries alongside
   adding the bridge (`git diff package-lock.json | grep -c '^-\s*"libc"'` prints `16`). No git
   command that discards a working-tree change is available to this unit, so the churn is reported
   rather than reverted.

## Observations

- The bridge is real and complete for every member `TypeStage` drives:
  `node -e "const ts=require('@typescript/typescript6'); ..."` prints `version 6.0.3` with
  `createProgram`, `createLanguageService`, `getDefaultLibFilePath`, `ScriptSnapshot.fromString`,
  `readConfigFile`, and `parseJsonConfigFileContent` all functions and `sys` an object.
- `dist/src/server/index.d.ts` now carries
  `import type * as TypeScript from '@typescript/typescript6';`, which is why the bridge is declared
  as an optional peer as well as a development dependency.
- The resolution reads `createProgram` through `isRecord` and `isFunction` from
  `@orkestrel/contract`. `isRecord` admits both a CommonJS `module.exports` object and the
  null-prototype namespace `require` returns for an ESM `typescript`, measured against the installed
  packages before the branch was written.
