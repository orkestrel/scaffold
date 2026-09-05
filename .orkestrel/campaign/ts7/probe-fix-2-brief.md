# Unit ts7-probe-fix-2 — round-3 fixes for the bridge loader in probe (fully specified)

Successor of `tmp/units/ts7-probe-fix-brief.md` (report `/home/user/fleet/probe/tmp/units/ts7-probe-fix-report.md`). What changed: round 2 (`tmp/units/ts7-audit-probe-fix-{subjective,objective,checker}.md`) confirmed the loader, the parser, the bridged inspection, and the factory, and named residual sentences the previous round left behind and one fixture the previous brief kept off-limits. Every edit below is exact.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe`. Perform the assignment directly and spawn nothing. Never write in `/home/user/scaffold`.

## Objective

The edits below land verbatim and the scoped gates are green.

## Context

**Law.** `AGENTS.md` § Writing and § Non-negotiable rules, `.claude/rules/writing.md`, `.claude/rules/typescript.md`, `.claude/rules/tests.md`. Skill: none. Guide: `guides/probe.md`.

**Host.** Node v22.22.2, four CPUs. The working tree carries three earlier units' uncommitted edits; keep them. The whole `npm test` reds on this host on the Oxlint `initialize` deadline under the full worker load and each file passes alone; run the scoped commands below and report the whole suite only as an observation. Line numbers below were read at 16:52. `DIRECTORY_LINKS` is exported at `tests/setupServer.ts:422` and is `true` on this host, so the gated rows still run here.

## Edits

1. `src/core/types.ts:231` — replace the summary line "Names the tool versions a verdict was produced with." with "Names the tool versions the target workspace's own manifests publish."
2. `guides/probe.md:456` — replace "and reports the resolved versions on `Verdict.toolchain`." with "and reports the versions those manifests publish on `Verdict.toolchain`."
3. `src/server/Probe.ts:687` — replace "is the case the second term admits." with "is the case the `^7.0.0` term admits."
4. `tests/src/core/errors.test.ts:186-196` — replace the inline bridgeless workspace (the `package.json`, the `node_modules/typescript/package.json`, and the `node_modules/typescript/index.js` writes, with their comment) with one call `writeWorkspaceFixture(bridgeless, { version: '7.0.2' })`, importing `writeWorkspaceFixture` from `../../setupServer.js` in sorted import position, and keep the comment's first sentence ("A workspace on TypeScript 7 with no bridge beside it: the compiler resolves and the in-process API it is loaded for is not there.") above the call.
5. `src/core/types.ts:250` and `:252` — replace "Names the resolved `oxlint` version the lint stage ran." with "Names the `oxlint` version the target workspace's own manifest publishes." and "Names the resolved `vitest` version the runtime stage ran." with "Names the `vitest` version the target workspace's own manifest publishes."
6. `guides/probe.md:212`, the `loadWorkspaceModule` Surface row — replace "or throws a `workspace` failure carrying the native fault as `cause`." with "or throws a `workspace` failure carrying the native fault as `cause` where one was raised."
7. `guides/probe.md:661-662`, the receipt grammar bullet — replace "A tool field per resolved tool follows, spelled `<name>@<version>`, in the order `typescript`, `oxlint`, `vitest`." with "A tool field per tool follows, spelled `<name>@<version>`, in the order `typescript`, `oxlint`, `vitest`. Each version is the one the target workspace's manifest publishes, so a bridged workspace's token names its `typescript` 7.x while the 6.x compiler the bridge republishes judged the code." Rewrap the bullet at word boundaries to at most 100 columns.
8. `src/server/helpers.ts:437-444` — give the bridge branch the same shape as the workspace branch: replace
   ```ts
   		const served: unknown = bridged.value
   		if (isRecord(served) && isFunction(served.createProgram)) return bridged.value
   ```
   with
   ```ts
   		const served = bridged.value
   		if (isRecord(served) && isFunction(served.createProgram)) return served
   ```
   The `unknown` annotation is dropped because the guard narrows a binding to a record carrying `createProgram`, not to the module type the overloads return, so the returned binding must be the one `require` produced, exactly as `loaded` is at `:431-435`.
9. Every `it` row whose `writeWorkspaceFixture` call passes `bridged: true` — `tests/src/server/stages/TypeStage.test.ts:272`, `tests/src/server/helpers.test.ts:657` and `:662`, `tests/src/server/Probe.test.ts:612`, `tests/setupServer.test.ts:66` — becomes `it.runIf(DIRECTORY_LINKS)(...)`, the gate `tests/src/server/stages/RuntimeStage.test.ts:223` uses, importing `DIRECTORY_LINKS` from `tests/setupServer.ts` (`../../../setupServer.js` or the file's own relative path) in sorted import position where the file does not import it yet. Where one `it` carries two fixture calls (`helpers.test.ts:657` and `:662`), gate that one `it` once. Add one sentence to the `bridged` option's TSDoc in `tests/setupServer.ts:193-196`: "A row passing it runs under `DIRECTORY_LINKS`, because the link is a directory link."
10. Run `npm run format` to converge the edited files, then the gates.

## Scope

**Owned.** `src/core/types.ts` (the `Toolchain` doc block only), `src/server/Probe.ts` (the comment only), `src/server/helpers.ts` (edit 8 only), `guides/probe.md`, `tests/src/core/errors.test.ts`, `tests/setupServer.ts` (edit 9's TSDoc sentence only), `tests/setupServer.test.ts`, `tests/src/server/helpers.test.ts`, `tests/src/server/Probe.test.ts`, `tests/src/server/stages/TypeStage.test.ts` (edit 9 only in each test file). **Off-limits.** `package.json`, `package-lock.json`, `tests/setupPolicy.ts`, `tests/distribution.test.ts`, `tests/guides.test.ts`, everything else; no commit, no push, no publish, no `git checkout`, `git restore`, `git stash`, `git reset`, or `git clean`.

## Gates

`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, then `npx vitest run --config vite.config.ts --no-cache --project src:core tests/src/core/errors.test.ts`, `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/helpers.test.ts tests/src/server/stages/TypeStage.test.ts`, `npx vitest run --config vite.config.ts --no-cache --project src:server tests/src/server/Probe.test.ts`, `npm run test:setup`, `npm run test:guides`, `npm run test:policy`, reading each exit code; then `npm test` once as an observation with any red file's solo re-run.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-fix-2-report.md`: one row per edit naming the file and the line, each gate's command and exit code, the observation, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit that is not a timing failure passing alone, on any need to edit a file outside the owned set, and on an edit whose "replace" text is absent at the cited line.

## Acceptance criteria

1. Every edit reads at its site as written here.
2. The gates and the scoped runs exit 0.
3. `git status --short` lists only the earlier units' files plus the files the edits above name.
