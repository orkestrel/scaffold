# Unit ts7-probe-fix — report

Every finding in the brief is closed, the bridge's compiler is proven to drive one real type
inspection, and every scoped gate exits 0. The whole suite also ran green on this host.

## Items

| Item | File | Edit |
| ---- | ---- | ---- |
| 1 | `src/core/types.ts` | Rewrote the `Toolchain` `@remarks` so its premise holds for a bridged workspace: each member names the version that tool's own manifest publishes in the target workspace, and a bridged workspace's type stage runs the 6.x compiler `@typescript/typescript6` republishes, so its type verdict predicts that workspace's gate only where the two compilers agree. Replaced the `typescript` property doc with "Names the `typescript` version the target workspace's own manifest publishes." The `@example` stands. |
| 2 | `guides/probe.md` | The `Toolchain` Surface row reads "read from those manifests rather than from the module a stage loaded". |
| 3 | `guides/probe.md` | Added the bridged-compiler and `skipLibCheck` sentences after the `npm install -D @typescript/typescript6` sentence; replaced the refusal sentence with the new message and named the antecedent; added the `missing` refusal sentence; replaced "never the bridge's `6.0.3`" with "never the 6.x compiler the bridge republishes". |
| 4 | `guides/probe.md` | The `loadWorkspaceModule` row names each overload's own return — `typeof import('@typescript/typescript6')` and `typeof import('vitest/node')` — and describes the bridge as a fallback. |
| 5 | `src/server/Probe.ts` | Deleted the `#support` comment's last sentence, which restated `collectRangeMajors`'s own `@remarks`. |
| 6 | `src/server/helpers.ts` | The bridge's value now answers the same `isRecord`/`isFunction(createProgram)` reading the workspace's compiler answers; otherwise one `ProbeError` carries the message "The workspace's typescript carries no in-process compiler API, and the workspace's @typescript/typescript6 cannot serve one", `origin: 'workspace'`, `code: 'malformed'`, `context: { name: specifier }`, and `cause` spread in only for a bridge that raised. `@throws` restated. Message assertions moved in `tests/src/server/Probe.test.ts` (verbatim) — see the deviation on the second site. |
| 7 | `src/server/helpers.ts` | Anchored the term pattern to `/^\^(\d+)\.\d+\.\d+$/u` and restated the `@remarks` as "Each term is read whole", naming a caret version a second comparator narrows among the skipped forms. Guide Surface row aligned to "skipping a term that is not one caret version". |
| 8 | `tests/src/server/helpers.test.ts` | Added `expect(loadWorkspaceModule(ROOT, 'typescript').createProgram).toBeTypeOf('function')` beside the version assertion, which is the member the documented `@example` claims. |
| 9 | `tests/src/server/stages/TypeStage.test.ts` | Added `inspects through the bridge where the workspace compiler carries no API`: a scratch with a version-only `typescript` at 7.0.2, the linked bridge, a root `tsconfig.json` and `configs/src/tsconfig.core.json`, and the candidate `src/core/value.ts`. It reads `Type 'string' is not assignable to type 'number'` for `export const VALUE: number = 'text'` and no issue for `export const VALUE = 1`. |
| 10 | `tests/setupServer.ts`, three test files | Extracted `writeWorkspaceFixture` and routed all six sites through it. |
| Ancillary | `guides/probe.md` | The `workspace`/`malformed` Failures row now reads "with no `@typescript/typescript6` able to serve one beside it", because item 6 makes a resolvable bridge refusable. |
| Ancillary | `tests/src/server/helpers.test.ts` | Added `refuses a workspace that installs no typescript at all`, asserting the `missing` refusal and the message `The workspace cannot load typescript` that item 3's new guide sentence states. Under `.claude/rules/documentation.md` a prose claim about behaviour under no fence needs the executed assertion that would break if it went false, and no test read that message. |

## Red then green

Item 6, `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts -t 'refuses a bridge that resolves and carries no in-process API'`:

- before the loader change: `Tests 1 failed | 45 skipped (46)` — `expect(isProbeError(refused)).toBe(true)` received `false`, because the unchecked `bridged.value` was returned;
- after: the row passes inside `Tests 47 passed (47)` for the whole file.

Item 7, `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts -t 'reads every caret term a range names and skips a term that names no major'`:

- before the anchoring: `Tests 1 failed | 45 skipped (46)` — `collectRangeMajors('^6.0.3 <6.5.0')` returned `['6']` against the expected `[]`. The sibling assertion `collectRangeMajors('>=6.0.0 <8.0.0')` was already green, so the anchoring is what the second one binds to;
- after: `Tests 46 passed (46)` for the whole file, and `Tests 47 passed (47)` after the ancillary row landed.

Item 9, `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/stages/TypeStage.test.ts -t 'inspects through the bridge where the workspace compiler carries no API'`:

- the row is green as written: `Tests 1 passed | 24 skipped (25)`;
- the control removes what the row is about. With `bridged: true` struck from the fixture call, the same command reports `Tests 1 failed | 24 skipped (25)` and `Cannot find module '@typescript/typescript6'` raised from `new TypeStage` at `src/server/helpers.ts:437`. The bridge is restored and the row is green again. Nothing but the bridge's compiler can produce the diagnostic the row reads, because the workspace's own entry publishes the version alone.

## The factory

```ts
export interface WorkspaceFixtureOptions {
	readonly version: string
	readonly carried?: boolean
	readonly bridged?: boolean
	readonly tooled?: boolean
	readonly root?: string
}

export function writeWorkspaceFixture(
	scratch: ScratchInterface,
	options: WorkspaceFixtureOptions,
): string
```

`version` names what the `typescript` manifest and entry both publish. `carried` writes `createProgram`
on the entry. `bridged` links this checkout's own `@typescript/typescript6`. `tooled` writes the
`oxlint` and `vitest` installations a `Probe` constructor resolves, with the `oxlint` binary that
exits at once. `root` names the workspace's directory inside the scratch, so one scratch carries
several. The return is the workspace root's absolute path.

Call sites: `tests/src/server/helpers.test.ts:653`, `:659`, `:677`, `:699`;
`tests/src/server/Probe.test.ts:540`, `:563`, `:610`;
`tests/src/server/stages/TypeStage.test.ts:272`; `tests/setupServer.test.ts:52`, `:62`.
`tests/setupServer.test.ts` gains `writes one workspace publishing the compiler installation a
caller selected`, which loads each written entry through `createRequire` rather than reading its
text.

Two ancillary choices are mine and recorded here. The name is `writeWorkspaceFixture` rather than
`createWorkspaceFixture`, because the call writes into a scratch the caller owns and returns a path
rather than a fixture object. The unified entry is CommonJS under a `main` manifest, replacing the
ESM-plus-exports-map shape three `Probe.test.ts` sites used; `loadWorkspaceModule` reaches it through
`createRequire`, and that shape needs no exports map to keep `typescript/package.json` resolvable.

## Gates

| Command | Exit |
| ------- | ---- |
| `npm run lint` (converge) | 0 |
| `npm run format` (converge) | 0 |
| `npm run format:check` | 0 |
| `npm run lint:check` | 0 |
| `npm run check` | 0 |
| `npm run build` | 0 |

## Scoped readings

| Command | Result |
| ------- | ------ |
| `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/core/errors.test.ts tests/src/server/stages/TypeStage.test.ts` | exit 0, `Test Files 2 passed (2)`, `Tests 72 passed (72)` |
| `npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/errors.test.ts` | exit 0, `Tests 8 passed (8)` |
| `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts` | exit 0, `Tests 28 passed (28)`, 96.58 s |
| `npm run test:setup` | exit 0, `Tests 10 passed (10)` |
| `npm run test:guides` | exit 0, `Tests 13 passed (13)` |
| `npm run test:policy` | exit 0, `Tests 111 passed (111)` |

The three-file scoped command collects two files: `tests/src/core/errors.test.ts` belongs to the
`src:core` project, so `--project src:server` filters it out. Its own project run is the row above.

## Whole suite, as an observation

`npm test` exited 0 at 12:58 on 2026-09-05: `test:src` `Test Files 11 passed (11)`, `Tests 236
passed (236)`; `test:policy` 111; `test:config` 46; `test:setup` 10; `test:guides` 13. The standing
Oxlint `initialize` deadline flake did not fire on this run, so no file needed a solo re-run. The
authoritative reading is the Orchestrator's after this unit exits.

## Tree

```text
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

Beyond the earlier units' nine, this unit adds `src/core/types.ts`, `tests/setupServer.ts`,
`tests/setupServer.test.ts`, and `tests/src/server/stages/TypeStage.test.ts` — all owned. Nothing
was committed, and no discarding git command ran. `package.json`, `package-lock.json`,
`src/server/stages/TypeStage.ts`, and `tests/src/core/errors.test.ts` carry the earlier units' edits
untouched.

`git diff --stat`:

```text
 guides/probe.md                           |  83 +++++++++++++-------
 package-lock.json                         |  83 ++++++++------------
 package.json                              |   7 +-
 src/core/types.ts                         |  10 ++-
 src/server/Probe.ts                       |   8 +-
 src/server/helpers.ts                     | 103 +++++++++++++++++++-----
 src/server/stages/TypeStage.ts            |   4 +-
 tests/setupServer.test.ts                 |  43 ++++++++++
 tests/setupServer.ts                      |  76 ++++++++++++++++++
 tests/src/core/errors.test.ts             |  19 +++++
 tests/src/server/Probe.test.ts            | 115 ++++++++++++++++++++++-----
 tests/src/server/helpers.test.ts          | 126 ++++++++++++++++++++++++++++++
 tests/src/server/stages/TypeStage.test.ts |  48 ++++++++++
 13 files changed, 600 insertions(+), 125 deletions(-)
```

The `guides/probe.md` and `package-lock.json` counts carry the earlier units' edits and, for the
guide, the formatter's table realignment.

## Deviations

One, and it stopped nothing.

**Item 6 names two verbatim message assertions; there is one.**
`tests/src/server/Probe.test.ts:562` asserted the old message verbatim and moved with it.
`tests/src/server/helpers.test.ts:677-701` asserts `expect(describeUnknown(refused)).toContain('@typescript/typescript6')`,
which is not verbatim and stays true under the new message, so that row needed no message edit. It
moved for item 10 only. `grep -rn "does not install @typescript/typescript6" tests/ src/ guides/`
found the literal in `src/server/helpers.ts`, `tests/src/server/Probe.test.ts`, and
`guides/probe.md` and nowhere else; `tests/src/core/errors.test.ts` never carried it. Nothing in the
brief's objective turns on the count, so the unit carried on.

No gate red was left unattributed, `ProbeErrorContext` and the error union are unchanged, and no
finding's prescribed text contradicted the code it cited.
