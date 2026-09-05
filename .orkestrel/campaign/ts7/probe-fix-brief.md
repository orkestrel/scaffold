# Unit ts7-probe-fix — fix round for the bridge loader in probe

Successor of `tmp/units/ts7-probe-brief.md` and `tmp/units/ts7-probe-2-brief.md` (reports under `/home/user/fleet/probe/tmp/units/ts7-probe-report.md` and `ts7-probe-2-report.md`; both units' edits sit uncommitted in the working tree). What changed: the audit round (`/home/user/scaffold/tmp/units/ts7-audit-probe-{subjective,objective,checker}.md`) confirmed the resolution order, the error contract, the peers, the type imports, and the scope, and refuted the guide claim and one parser boundary, and named a message the ordering can falsify, an unchecked bridge value, an unproven bridged inspection, and duplicated fixtures. This unit carries every finding below, each with its source lane.

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe` (a checkout disjoint from `/home/user/scaffold`, where another writer is live; never write there). Perform the assignment directly and spawn nothing.

## Objective

Every finding below is closed in the file it names, the bridge's compiler is proven to drive one real type inspection, and the scoped gates are green.

## Context

**Evidence.** The three lane reports named above; the diff under audit at `/home/user/scaffold/tmp/units/ts7-probe.diff.txt`. Read each finding's cited lines yourself before editing; the line numbers below were read in the working tree at 12:40.

**Law.** `AGENTS.md` (§ Non-negotiable rules — no mocks, spies, fakes, or module replacement; real temporary workspaces and inert stubs — § Design laws, § Writing), `.claude/rules/tests.md` (shared fixtures live in the setup module as soon as they serve a second test), `.claude/rules/typescript.md`, `.claude/rules/patterns.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`; skill: none; guide: `guides/probe.md`.

**Host.** Node v22.22.2, four CPUs. `node_modules` installs `typescript` 6.0.3, `@typescript/typescript6` 6.0.2 (re-exporting `typescript` 6.0.3 through `@typescript/old`), `oxlint` 1.81.0, `vitest` 4.1.11. `createScratch` from `@orkestrel/test/server` gives `write`, `link`, and `destroy`; `captureError` and `createTeardown` from `@orkestrel/test`.

**Standing conditions.** The whole `npm test` reds on this host on the Oxlint language server missing its `initialize` deadline under the full worker load (`tests/src/bin/main.test.ts` and one `Probe.test.ts` row), and each file passes alone; the authoritative whole-suite reading belongs to the Orchestrator after you exit, so run the scoped commands below and report the whole suite only as an observation. `package-lock.json` is off-limits: the Orchestrator regenerates it with npm 11 after you exit (the tree's copy lost its `libc` rows to npm 10.9.7). `helpers.test.ts:677-701` and `Probe.test.ts:538-567` assert the current refusal message verbatim; item 6 changes it, so both rows move with it.

## Findings and the change each needs

Contract and prose (subjective lane P1 to P5, objective lane F3):

1. `src/core/types.ts:244` — `/** Names the resolved `typescript` version the type stage ran. */` is false for a bridged workspace (`Probe.#version` reads the workspace manifest, `src/server/Probe.ts:642-652`). Write `/** Names the `typescript` version the target workspace's own manifest publishes. */`. Rewrite the interface `@remarks` at `:230-236` so its premise holds for a bridged workspace: the verdict carries the versions each tool's own manifest publishes in the target workspace, the gate runs against those installs, and a bridged workspace's type stage runs the 6.x compiler `@typescript/typescript6` republishes rather than the workspace's own 7.x, so its type verdict predicts the gate only where the two compilers agree. Keep the `@example`.
2. `guides/probe.md:43` — "read whatever engine served a stage" garden-paths. Write "read from those manifests rather than from the module a stage loaded".
3. `guides/probe.md:458-472`, the bridge bullet — add, after the `npm install -D @typescript/typescript6` sentence, "A bridged workspace's type stage runs the 6.x compiler the bridge republishes rather than the workspace's own 7.x, so a type verdict predicts that workspace's gate only where the two compilers agree. probe's own declarations import the bridge's types, so a consumer that typechecks against them with `skipLibCheck` off installs the bridge too." At `:472` replace "never the bridge's `6.0.3`" with "never the 6.x compiler the bridge republishes". Replace the refusal sentence at `:464-465` per item 6, and name the antecedent: "A workspace whose `typescript` carries no in-process compiler API and whose `@typescript/typescript6` cannot serve one is refused with `origin: 'workspace'` and `code: 'malformed'`: `<the new message>`. A workspace installing no `typescript` at all keeps the `missing` refusal, `The workspace cannot load typescript`."
4. `guides/probe.md:212` — the `loadWorkspaceModule` row. Description: "Loads one installed tool module, falling back to the workspace's `@typescript/typescript6` for a `typescript` that carries no in-process compiler API, or throws a `workspace` failure carrying the native fault as `cause`." Signature column: name the bridge's module type for the `typescript` overload and `vitest/node` for the other, in the form the parity suite accepts (run `npm run test:guides` to settle it).
5. `src/server/Probe.ts:685-688` — the comment restates the helper's `@remarks`. Delete its last sentence ("A range naming no caret term at all leaves the collection empty, which refuses every version.").

Loader (objective lane F1, F2):

6. `src/server/helpers.ts:438-446` — "the workspace does not install @typescript/typescript6" is false for a bridge that is installed and fails to load for another reason, and the bridge's value is returned unchecked at `:436-437`. After `const bridged = attempt(() => require('@typescript/typescript6'))`, return `bridged.value` only when it is a record whose `createProgram` is a function (the same reading `:433` applies to the workspace's compiler); otherwise throw one `ProbeError` with the message `The workspace's typescript carries no in-process compiler API, and the workspace's @typescript/typescript6 cannot serve one`, `origin: 'workspace'`, `code: 'malformed'`, `context: { name: specifier }`, and `cause` set to the bridge's fault only when there is one (spread the property; `exactOptionalPropertyTypes` refuses an explicit `undefined`). Update the `@throws` sentence and the two verbatim message assertions (`tests/src/server/helpers.test.ts:677-701`, `tests/src/server/Probe.test.ts:538-567`). Add one row to `helpers.test.ts`: a scratch root whose `@typescript/typescript6` is a real module publishing the version alone (`module.exports = { version: '6.0.2' }`) beside a version-only `typescript` — refused with that message and no `cause`.

Parser (objective lane claim 3):

7. `src/server/helpers.ts:671-678` — the `@remarks` say a comparator pair is skipped, and `collectRangeMajors('^6.0.3 <6.5.0')` returns `['6']` because the pattern is anchored at the term's start only. Anchor the whole trimmed term: `/^\^(\d+)\.\d+\.\d+$/u`. Add to `tests/src/server/helpers.test.ts:768-777`: `expect(collectRangeMajors('>=6.0.0 <8.0.0')).toStrictEqual([])` and `expect(collectRangeMajors('^6.0.3 <6.5.0')).toStrictEqual([])`. Record the second assertion red before the anchoring and green after. Align the guide's Surface row (`guides/probe.md:219`) to "skipping a term that is not one caret version".

Tests (subjective lane F2, objective lane F5 and F8):

8. `tests/src/server/helpers.test.ts:637` — the `@example` claims `typeof typescript.createProgram // 'function'` and the row asserts only the version. Add `expect(loadWorkspaceModule(ROOT, 'typescript').createProgram).toBeTypeOf('function')` beside it.
9. Nothing proves the bridge's compiler drives a type inspection: this checkout installs `typescript` 6.0.3, so `TypeStage` always takes the workspace branch, and the bridged `Probe` row stops at `#admit`. Add one row to `tests/src/server/stages/TypeStage.test.ts`, shaped like the scratch-workspace row at `:220-260`: a scratch with `package.json`, a version-only `typescript` stub at 7.0.2, `node_modules/@typescript/typescript6` linked to `resolve(ROOT, 'node_modules/@typescript/typescript6')`, `configs/src/tsconfig.core.json`, and a candidate; `stage.inspect` reports the diagnostic `Type 'string' is not assignable to type 'number'` for `export const VALUE: number = 'text'` and no issue for `export const VALUE = 1`. That diagnostic is one the stub cannot produce, so the row can fail only if the bridge did not serve.
10. The scratch-workspace fixture — `package.json`, the `typescript` stub, the optional bridge link, the `oxlint` and `vitest` stubs — is written inline at `tests/src/server/Probe.test.ts:538`, `:572`, `:632` and in a second shape at `tests/src/server/helpers.test.ts:647` and `:677`, and item 9 adds a sixth. Extract one factory into `tests/setupServer.ts` beside `createLintFixture`, named in `{verb}{Noun}` form, taking the compiler version, whether the entry carries the API, and whether the bridge is linked (and whether the `oxlint`/`vitest` stubs are written, where the helpers rows do not need them), and call it from every site. Add one row for it to `tests/setupServer.test.ts`.

Recorded, not yours (for the report's context): the published declarations importing the bridge's types is the shape the package had at `b331d93` with the optional `typescript` peer (F4); the lockfile (F6) is the Orchestrator's; the major-versus-range comparison in `#support()` predates this change (F7).

## Scope

**Owned.** `src/core/types.ts` (the `Toolchain` doc block only), `src/server/helpers.ts`, `src/server/Probe.ts` (the comment only), `tests/src/server/helpers.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/stages/TypeStage.test.ts`, `tests/src/core/errors.test.ts` (only if the row name or message moves), `tests/setupServer.ts`, `tests/setupServer.test.ts`, `guides/probe.md`. **Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`, everything else; no commit, no push, no publish, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`; the earlier units' uncommitted edits stay.

## Steps

1. Items 1 to 5, then 6 and 7 with their red-then-green records, then 8 to 10.
2. `npm run lint` and `npm run format` only to converge, then `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, reading each exit code.
3. Scoped tests: `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/core/errors.test.ts tests/src/server/stages/TypeStage.test.ts`, then `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts` alone, then `npm run test:setup`, `npm run test:guides`, `npm run test:policy`.
4. `npm test` once, as an observation: record its result and, for any red file, that file's solo re-run; do not diagnose a timing failure.
5. `git status --short` and `git diff --stat`.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-fix-report.md` with: one row per item naming the file and the edit, the red-then-green commands with counts for items 6, 7, and 9, the factory's name and signature for item 10, each gate's command and exit code, the scoped and whole-suite readings, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit that is not a timing failure passing alone, on any need to change `ProbeErrorContext` or the error union, and on a finding whose prescribed text contradicts what the cited code does when you read it; an ancillary choice (the factory's option names, where a guide sentence sits) is yours to decide and record.

## Acceptance criteria

1. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build` exit 0.
2. The scoped runs in step 3 exit 0; the `Probe.test.ts` solo run exits 0.
3. Item 7's second assertion is recorded red before the anchoring and green after; item 9's row reports the `number`/`string` diagnostic through the linked bridge; item 6's added row refuses with the new message and no `cause`.
4. No inline scratch-workspace fixture remains at the five cited sites; every site calls the factory.
5. `git status --short` lists only owned files beyond the earlier units' nine.
