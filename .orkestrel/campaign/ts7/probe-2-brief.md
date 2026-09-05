# Unit ts7-probe-2 — successor of ts7-probe: the support check reads every major the peer range names, and the off-limits row splits

Successor of `tmp/units/ts7-probe-brief.md` (report: `/home/user/fleet/probe/tmp/units/ts7-probe-report.md`). What changed: the first unit landed the loader's resolution order, the peers, the bridge devDependency, the type imports, the tests, and the guide, and stopped on two findings it did not own — `tests/src/server/Probe.test.ts`'s row "names an unsupported TypeScript installation before entering the compiler" now trips the new refusal in the constructor (the returned patch splits the row), and `Probe.#support()` (`src/server/Probe.ts:684-696`) reads the supported major with `/^\^(\d+)\./u` over `peerDependencies.typescript`, which returns `6` from `^6.0.3 || ^7.0.0`, so a TypeScript 7 workspace the bridge serves is still refused at `prove`. This unit owns both.

## Role and engine

`implementer` on Opus 5, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe` (a checkout disjoint from `/home/user/scaffold`, where another writer is live). Perform the assignment directly and spawn nothing.

## Objective

`Probe` accepts a workspace whose `typescript` major is any major the peer range names, refuses every other major with the existing error, and the test file pins the pair the first unit separated: the constructor refuses a workspace whose `typescript` carries no in-process API and no bridge, and `#support()` refuses a workspace whose compiler carries the API but a major outside the range.

## Context

**Evidence.** The first unit's report, § Deviation, § Shared-file patch, and § Successor work items 1 and 2; its measurement `node -e …` printing `refused true` for `7.0.2` under the widened range. The current `#support()`:

```ts
	#support(): void {
		const version = this.#toolchain.typescript
		const range = peerDependencies.typescript
		const supported = /^\^(\d+)\./u.exec(range)?.[1]
		const found = /^(\d+)\./u.exec(version)?.[1]
		if (supported === undefined || found !== supported) {
			throw new ProbeError(`The supported TypeScript range is ${range}; found ${version}`, { origin: 'workspace', code: 'malformed', context: { name: 'typescript', value: version } })
		}
	}
```

`this.#toolchain.typescript` is the workspace manifest's declared `typescript` version (`#version('typescript')` at `:96`, `:641`), so on a bridged workspace it reads `7.0.2` while the bridge's engine serves the stage; the guide's Prerequisites bullet (`guides/probe.md:457-464`) states the resolution.

**Law.** `AGENTS.md` (§ Design laws: export and test reusable logic; a pure leaf lives in the centralized helpers file and is tested; no nested functions), `.claude/rules/names.md` (a module-scope helper is `{verb}{Noun}`), `.claude/rules/architecture.md`, `.claude/rules/tests.md`, `.claude/rules/documentation.md`, `.claude/rules/writing.md`; skill: none; guide: `guides/probe.md`.

**Host.** `/home/user/fleet/probe`, the first unit's edits in the working tree (uncommitted, do not revert), `node_modules` installed with the bridge. Node v22.22.2.

**Standing conditions.** The first unit saw two timing failures under the contended full run (`RuntimeStage.test.ts` "raises progress…" timed out; `Probe.test.ts` "mints receipts…" hit the LSP deadline once) and each passed alone; the deciding re-run belongs to the Orchestrator after this unit exits, so report a timing failure with its solo re-run and do not diagnose it.

## Scope

**Owned.** `src/server/Probe.ts` (`#support()` only), the centralized helper file the range parser belongs in per the architecture rules (`src/core/helpers.ts` or `src/server/helpers.ts`, with its TSDoc and its export through the barrel), its test file, `tests/src/server/Probe.test.ts` (the split rows per the returned patch, plus the `captureError` import), `guides/probe.md` (the Prerequisites bullet: a TypeScript 7 workspace with the bridge is supported; the Surface row for the new helper; the `Toolchain` sentence stating that `toolchain.typescript` is the workspace manifest's version whatever engine served the stage). **Off-limits.** everything else; no commit, no push, no publish, no discarding git command.

## Steps

1. Extract a pure helper that reads every major a caret range names (`^6.0.3 || ^7.0.0` → the majors `6` and `7`), exported and tested with a boundary case (a single term, whitespace around `||`, an unrecognised term yields no major).
2. `#support()` accepts `found` when it is among those majors; the error message and shape stay.
3. Apply the returned patch to `tests/src/server/Probe.test.ts`: the constructor-refusal row (bridgeless, API-less `typescript` 7.0.2) and the support-refusal row (a compiler carrying `createProgram` at major `5.9.3`), with `captureError` from `@orkestrel/test` in sorted import position. Add one positive row: a workspace whose `typescript` manifest says `7.0.2`, whose entry exports the version alone, and whose `@typescript/typescript6` is the installed bridge (link or copy from this checkout's `node_modules`) — construction succeeds and `#support()` does not refuse (drive `prove` far enough to pass the support check, or assert through the same seam the existing rows use).
4. Record the red run before the `#support()` change (the positive row red on the range refusal) and the green run after, with commands.
5. Guide parity; gates: `npm run format:check && npm run lint:check && npm run check && npm run build && npm test`; on a timing failure, the solo re-run of that file.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-2-report.md`: the red-then-green commands with counts, each gate's exit code, `git status --short` and `git diff --stat` over the whole tree (both units' edits), the helper's name and home, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red outside the owned files that is not a timing failure passing alone, and on any need to change the error union or `ProbeErrorContext`.

## Acceptance criteria

1. The positive row fails before the `#support()` change and passes after; the two refusal rows pass.
2. `npm run format:check`, `lint:check`, `check`, `build` exit 0; `npm test` exit 0 or red only on a timing failure that passes alone (recorded).
3. `guides/probe.md` parity green and the three sentences present.
