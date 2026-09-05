# Unit ts7-probe-fix-4 — round-4 edits for the bridge loader in probe (exact transcriptions)

Successor of `tmp/units/ts7-probe-fix-2-brief.md` and `ts7-probe-fix-3-brief.md`. What changed: round 3 (`tmp/units/ts7-audit-probe-fix-2-{subjective,objective,checker}.md`) confirmed the loader shape, the gates on the bridged rows, and the errors fixture, and refuted the doc vocabulary: the `Toolchain` account is spelled three ways, one guide sentence names the workspace's `package.json` as the source of tool versions, and the `isToolchain` guard keeps the retired "resolved tool version" wording. Every edit below transcribes a lane's prescription.

## Role and engine

`builder` on Sonnet, a native Claude Code subagent, the sole writer in `/home/user/fleet/probe`. Perform the assignment directly and spawn nothing. Never write in `/home/user/scaffold`.

## Objective

The edits below land verbatim and the scoped gates are green.

## Context

**Law.** `AGENTS.md` § Writing, `.claude/rules/writing.md`, `.claude/rules/documentation.md` (guide parity: a guard's row mirrors its TSDoc), `.claude/rules/tests.md`. Skill: none. Guide: `guides/probe.md`.

**Host.** Node v22.22.2, four CPUs. The working tree carries the earlier units' uncommitted edits; keep them. The whole `npm test` reds on this host on the Oxlint `initialize` deadline under the full worker load; run only the scoped commands below and no whole-suite run. Line numbers below were read at 17:22.

## Edits

1. `src/core/types.ts:231` — replace "Names the tool versions the target workspace's own manifests publish." with "Names the version each tool's own installed manifest publishes in the target workspace."
2. `src/core/types.ts:248`, `:250`, `:252` — replace "Names the `typescript` version the target workspace's own manifest publishes." with "Names the `typescript` version that tool's own installed manifest publishes in the target workspace.", and the `oxlint` and `vitest` lines in the same form.
3. `src/core/validators.ts:198` — replace "Checks whether a value names every resolved tool version." with "Checks whether a value names every tool version the target workspace's installed manifests publish."
4. `guides/probe.md:110`, the `isToolchain` row — replace "Admits a record carrying every resolved tool version." with "Admits a record carrying every tool version the target workspace's installed manifests publish."; keep the table's column alignment (run `npm run format` after the edit).
5. `guides/probe.md:455-456` — replace "probe reads each of them from the target workspace's `package.json`, never from its own dependencies, and reports the versions those manifests publish on `Verdict.toolchain`." with "probe resolves each of them from the target workspace, never from its own dependencies, and reports the version each tool's own installed manifest publishes on `Verdict.toolchain`." Then rewrap that bullet (`:454-457`) at word boundaries to at most 100 columns, changing no word.
6. `guides/probe.md:663` — replace "Each version is the one the target workspace's manifest publishes," with "Each version is the one that tool's own installed manifest publishes in the target workspace,". Rewrap the bullet to at most 100 columns.
7. `tests/setupServer.ts:193-194` — replace "A row passing it runs under `DIRECTORY_LINKS`, because the link is a directory link." with "A row passing `bridged` is gated with `it.runIf(DIRECTORY_LINKS)`, because the link is a directory link."
8. `tests/setupServer.test.ts:49-87` — split the gated row so the fixture's default shape is proved on every host. The first row, ungated, named `writes a version-only TypeScript 7 workspace and nothing beside it by default`, keeps the scratch, the `bare` fixture call, and the assertions through `expect(published).toStrictEqual({ version: '7.0.2' })`, with the `finally { scratch.destroy() }`. The second row, gated with `it.runIf(DIRECTORY_LINKS)` and named `links the bridge and writes the tools beside the compiler a caller selects`, keeps its own scratch, the `equipped` fixture call, and the assertions from `expect(equipped).toBe(...)` to the `vitest` manifest, with its own `finally`. Keep both comments where their code went.
9. Run `npm run format` to converge, then the gates.

## Scope

**Owned.** `src/core/types.ts` (the `Toolchain` doc block only), `src/core/validators.ts` (the `isToolchain` TSDoc only), `guides/probe.md`, `tests/setupServer.ts` (edit 7 only), `tests/setupServer.test.ts` (edit 8 only). **Off-limits.** everything else; no commit, no push, no publish, no discarding git command.

## Gates

`npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, then `npm run test:setup`, `npm run test:guides`, `npm run test:policy`, reading each exit code. Where `test:guides` reds on the Oxlint `initialize` deadline (the row named for the receipt the guide documents), re-run it once alone and record both readings; do not diagnose it.

## Output

A report at `/home/user/fleet/probe/tmp/units/ts7-probe-fix-4-report.md`: one row per edit naming the file and the line, each gate's command and exit code, `git status --short`, deviations. Make your final message that report's text.

## Deviation contract

Stop and report on a gate red you cannot attribute to your own edit that is not the named timing failure, on any need to edit a file outside the owned set, and on an edit whose "replace" text is absent at the cited line.

## Acceptance criteria

1. Every edit reads at its site as written here.
2. `npm run format:check`, `npm run lint:check`, `npm run check`, `npm run build`, `npm run test:setup`, and `npm run test:policy` exit 0; `npm run test:guides` exits 0 or reds only on the named timing row and passes alone.
3. `git status --short` lists the earlier units' files plus `src/core/validators.ts` and nothing else.
