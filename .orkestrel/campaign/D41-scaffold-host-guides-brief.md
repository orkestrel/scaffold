# Unit D4-1 — `@orkestrel/scaffold`: host every package guide for reading (`REFERENCE_PATHS`)

## Role and engine

`sol` route: GPT-6 Astra (`gpt-6-astra`, the objective engine of this campaign, in the Sol seat),
reached as a `workspace-write` `codex exec` rooted at `C:/Users/mikes/WebstormProjects/scaffold`.
You are the bench engine reading this brief inside your own CLI: perform the assignment directly
and spawn nothing. You are the sole writer in this checkout while this unit runs.

## Objective

Stage the whole `guides/` mirror set into scaffold's published host (`dist/host/guides/<bare>.md`)
through a third staging list, `REFERENCE_PATHS`, so a target's installed scaffold carries every
package guide for offline reading; keep the two guides `repair` plants today planted; make
`stageHost` refuse a stage in which a fleet catalog row has no staged guide; regenerate the
committed inventory.

## Context

**Design record (binding).** `.orkestrel/campaign/plan.md` § Re-baseline 3, D4 table, row
"Hosting": a third list `REFERENCE_PATHS` carrying `guides` — shipped for reading, never planted,
never treated as canon; `CANON_PATHS` refused because `listCanonPaths` (`src/server/helpers.ts:864`)
enumerates canon members held inside a target and feeds the foreign-file and `overwrite` logic;
`HOST_PATHS` refused because it would plant the whole fleet's documentation in every target.
`guides/guide.md` and `guides/scaffold.md` leave `HOST_PATHS` (the prefix rule refuses a member
beneath another list's member) and keep their target presence claims explicitly in
`blueprintToHostArtifacts` (`src/core/compilers.ts:1602-1609`), the way the catalog agent is
claimed although `CANON_PATHS` stages it (`:1583`); `selectHostPaths` (`src/core/helpers.ts:458`)
stays, still excluding the target's own guide. `stageHost` refuses when a catalog row in
`.claude/agents/orkestrel.md` names a package with no `guides/<bare>.md` under the staged root
(`README.md` is not a package). The lanes' full reports: `.orkestrel/campaign/D4-design-planner.md`
§ 1 and `D4-design-astra.md` § 1 (read both; the ruling above picks between them).

**The code today.** `src/core/constants.ts:133-151` (`HOST_PATHS`), `:154-199` (`CANON_PATHS`,
the disjointness doc), `:169-172` (the twice-discovered refusal), `:202` (`HOST_INVENTORY_PATH`);
`src/server/helpers.ts:1496-1648` (`stageHost`: the walk over both lists, containment, storage
names, byte verification, `manifest.json`), `:1211-1238` (`readHostFloor`), `:1676` (`stageInventory`),
`:864` (`listCanonPaths`); `src/core/compilers.ts:1583`, `:1602-1609` (`blueprintToHostArtifacts`);
`src/core/helpers.ts:191-193` (`isDeferredPath`), `:221` (`isCanonPath`), `:274`, `:306`
(`inferGroup`), `:383` (`nameToGuide`), `:458` (`selectHostPaths`); `src/server/types.ts:84`
(`HostManifest`), `:372` (`HostInventory`); `host.json` (the committed inventory: `entries[]` of
`{ storage, destination, executable, digest }` plus `roots`); `package.json:85-92` (`build` runs
`build:src`, `build:host`, `build:inventory`; `build:host` calls `stageHost(cwd, 'dist/host')`).
The catalog table: `.claude/agents/orkestrel.md` (`readPolicyCatalog` in `tests/setupPolicy.ts:1415`
already parses its package cells; reuse that reading or its server-side twin). `guides/README.md:32-37`
states the mirror contract. Tests: `tests/src/core/constants.test.ts`, `tests/src/core/compilers.test.ts`,
`tests/src/core/helpers.test.ts`, `tests/src/server/helpers.test.ts` (stage tests against fixture
checkouts), `tests/src/server/types.test.ts` if a manifest type moves.

**Installed primitives you must reuse.** `@orkestrel/test` 0.0.14 (`createScratch` and
`createLoopback` from `@orkestrel/test/server`, `createRecorder`, `requireValue`, `captureError`,
the wait family) and `@orkestrel/contract` 0.0.17 (guards, combinators, `attempt`): read
`guides/test.md` § Surface and `guides/contract.md` § Surface in this checkout before declaring
any helper. A helper whose job an installed export does is a defect.

**Law.** `AGENTS.md`; `.claude/rules/{names,typescript,architecture,patterns,tests,workspace,
documentation,writing,quality}.md`; `.agents/orchestration.md` § "Publishing the fleet" (a
vendored-set change bumps and propagates; you do not bump); the skill
`.agents/skills/orkestrel-harden-package/SKILL.md` (capability lane).

**Host and bench.** Windows 11; your exec shell is PowerShell: `npm.cmd run <script>`. The `prove`
MCP tool is unreachable; record such claims as observations with exact commands. Network denied;
nothing you need is on the network. Vitest runs in this sandbox; `npm.cmd run build` runs Vite and
Node in-process (`build:host`, `build:inventory` use `node -e`) — attempt it; if the sandbox refuses
a child, record the exact refusal and stop at the point the inventory would regenerate (the
Orchestrator regenerates `host.json` on the host in that case).

**Measurements.** Before editing: `npm.cmd run check` and `npm.cmd run test:src:server` (record).

**Standing conditions.** The checkout is dirty with two Orchestrator edits that ride this release:
`.claude/rules/tests.md` (§ Condition) and `.agents/templates/brief.md` (Installed primitives);
`.orkestrel/` is untracked campaign state. Do not touch any of them. `guides/supervisor.md` is
present as a mirror copied from the supervisor checkout (D4-S) — the Orchestrator placed it
before this launch; if it is absent, stop and report. Do not bump `version`; add no package.

## Unknowns

- Whether the manifest entry needs to say which list staged it (a reader that plants must never
  plant a reference entry). If `HostManifest` entries today carry nothing that distinguishes host
  from canon, decide the named axis (`names.md`: name the axis that varies, never `kind`) in
  `src/server/types.ts` first, and report it; if the plan's own claims already keep planting
  correct without it, say so with the reading.

## Scope

**Owned.** `src/core/constants.ts`, `src/core/helpers.ts`, `src/core/compilers.ts`,
`src/core/index.ts` (only if a new export needs it), `src/server/types.ts`, `src/server/helpers.ts`,
`src/server/index.ts` (only if needed), `host.json` (regenerated, never hand-edited),
`tests/src/core/**`, `tests/src/server/**`, `guides/scaffold.md` (only the `## Surface` rows for
declarations you add or remove — D4-4 writes the prose). **Off-limits.** `tests/setupPolicy.ts`,
`tests/policy.test.ts`, `tests/config.test.ts`, `configs/**`, `.claude/**`, `.agents/**`,
`AGENTS.md`, `CLAUDE.md`, `.orkestrel/**`, `guides/*.md` other than `scaffold.md`,
`src/bin/**`, `src/server/Upstream.ts`, `src/server/Materializer.ts` (D4-2 owns the fallback),
`package.json`, `package-lock.json`.

## Execution

TTTDD: types first (`REFERENCE_PATHS` beside the other lists with the disjointness doc extended;
any manifest axis), then the failing tests, then the implementation, then the Surface rows.

The behaviours to pin, each with a test named for what it proves:

- `REFERENCE_PATHS` holds `guides`; the three lists are disjoint by prefix in every direction
  (extend the existing disjointness proof).
- `stageHost` stages every `guides/*.md` file into `dist/host/guides/` with the same containment,
  storage-name collision refusal, byte verification, and manifest entries the other lists get.
- `stageHost` refuses when a catalog row has no `guides/<bare>.md` under the checkout, naming the
  row (negative control: a fixture checkout whose catalog table names a package whose guide file
  is removed; positive control: the same fixture with the guide present).
- `blueprintToHostArtifacts` still claims `guides/guide.md` and `guides/scaffold.md` for a
  target (presence-owned), and claims no other guide; `selectHostPaths` still drops the target's
  own guide.
- `isCanonPath('guides/router.md')` stays `false`; `listCanonPaths` is unchanged.
- `readHostFloor` reads the regenerated inventory; the installed-host reader sees the reference
  entries and plants none of them.

## Output

Final message: touched files with one-line summaries; `git diff --stat`; `git status --porcelain`;
the baseline readings; for each behaviour the test title and its red-then-green command with
counts; the Unknown's reading; `npm.cmd run build`'s reading (or the refusal); the acceptance
commands with exit codes; deviation state. No process diary.

## Deviation contract

Stop and report on: `guides/supervisor.md` absent; a manifest reader outside your scope
(`Materializer`, `Upstream`, `src/bin`) that must change; the sandbox refusing the build. Decide,
record, carry on for the manifest axis name, test placement, and the Surface row wording.

## Acceptance criteria

1. `npm.cmd run lint:check`, `npm.cmd run check` exit 0.
2. `npm.cmd run test:src:core`, `npm.cmd run test:src:server` exit 0 with the new tests red before
   and green after (recorded).
3. `npm.cmd run test:guides` exit 0 (Surface rows for new declarations).
4. `npm.cmd run format:check` exit 0.
5. `host.json` regenerated by `build:inventory` and containing one entry per `guides/*.md`
   (or the exact refusal recorded for the Orchestrator).
6. Only owned files changed.

## Review evidence

The Orchestrator captures `git diff` and `git status --porcelain` after you exit and runs the
authoritative gates, including `build`, on the host.
