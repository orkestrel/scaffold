# Unit conform-lsp fix round 1 — the blueprint audit: `vite.config.ts` and the `tests/setup.ts` proof

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/lsp`. Perform the assignment directly and spawn nothing.

## Objective

Bring `npx scaffold audit --offline` in `/home/user/fleet/lsp` to its single zero-drift line on the uncommitted conform-lsp unit, so the landing's blueprint gate passes: `vite.config.ts` carries the planned bytes, and `tests/setup.test.ts` proves `tests/setup.ts`.

## Context

**Law.** `/home/user/scaffold/AGENTS.md`; `/home/user/scaffold/.claude/rules/tests.md` § Shared test infrastructure; `/home/user/scaffold/.claude/rules/writing.md`.

**The readings.** The unit's report (`/home/user/scaffold/tmp/units/conform/conform-lsp-report.md` § Gates and § Deviations) records `npx scaffold audit --offline` exit 1 with a `vite.config.ts` `stale` row in group `configs` and the advisory "The target at . carries a test setup module that no proof covers: tests/setup.ts. Add tests/setup.test.ts to cover it." The Orchestrator ran `scaffold repair --groups configs` on a scratch copy of the tree at 19:48 UTC and diffed the result against `/home/user/fleet/lsp/vite.config.ts`: the plan generates the `integration` project itself from `tests/integration.test.ts`, placed after `distribution` in both the factory order and the `projects` array, without the three-line comment the unit wrote and without `browser: { enabled: false }`. Nothing else in the file differs. The same repair rewrites `package.json`'s development-dependency floors (`@types/node`, `oxfmt`, `oxlint`, `vite-plugin-dts`) without the lockfile; those floors wait for the fleet-wide manifest unit and are restored after the repair.

`tests/setup.ts` exports one symbol, `WORKSPACE_ROOT`, resolved by `resolveRoot(import.meta)` from `@orkestrel/test`. The `setup` project in `vite.config.ts:122-131` includes `tests/setup*.test.ts`, so a `tests/setup.test.ts` runs under `npm run test:setup` with no config change. `/home/user/fleet/abort/tests/setup.test.ts` is the fleet's shape for a setup proof (`import * as setup from './setup.js'`, one `describe('setup', …)`); lsp's module is not export-free, so its proof asserts the export it has.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit and Write; Bash only for `cp /home/user/fleet/lsp/package.json /home/user/fleet/lsp/package.json.orig`, `cd /home/user/fleet/lsp && npx scaffold repair --groups configs`, `cp /home/user/fleet/lsp/package.json.orig /home/user/fleet/lsp/package.json`, `rm /home/user/fleet/lsp/package.json.orig`, `git -C /home/user/fleet/lsp diff --stat`, `git -C /home/user/fleet/lsp diff -- package.json`, `git -C /home/user/fleet/lsp status --short`, `npm --prefix /home/user/fleet/lsp run <script>`, `npm --prefix /home/user/fleet/lsp test`, `cd /home/user/fleet/lsp && npx scaffold audit --offline`, `cd /home/user/fleet/lsp && npx oxfmt --config .oxfmtrc.json <file>`, and `node /home/user/scaffold/tmp/work/evidence.mjs lsp`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-lsp unit's uncommitted edits, `tests/src/server/integration.test.ts` renamed to `tests/integration.test.ts` in the index. Leave every edit outside the rows as it is. `package.json` is the unit's own edit (the `description`, `keywords`, `test:integration`, and the `test` chain) and must come back byte-identical after the repair.

## Scope

**Owned.** `vite.config.ts`, `tests/setup.test.ts` (new), `/home/user/scaffold/tmp/units/conform/conform-lsp-report.md`.

**Off-limits.** Everything else, every other fleet checkout included. Never edit a vendored file. `package.json` is touched only by the repair and restored from its copy in the same row.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage, push, or run a discarding git command (`git checkout`, `git restore`, `git stash`, `git reset`, `git clean`).

## Rows

1. **`vite.config.ts`.** Copy `package.json` to `package.json.orig`; run `npx scaffold repair --groups configs`; copy `package.json.orig` back over `package.json`; remove `package.json.orig`; confirm with `git -C /home/user/fleet/lsp diff -- package.json` that the manifest diff is the unit's own hunks and carries no floor bump. Read the repaired `vite.config.ts` and confirm the `integration` project sits after `distribution` with `include: ['tests/integration.test.ts']`. Run `npm --prefix /home/user/fleet/lsp run test:integration` and record its reading.
2. **`tests/setup.test.ts`.** Write the proof: import `* as setup from './setup.js'`, one `describe('setup', …)` with a case asserting `Object.keys(setup)` equals `['WORKSPACE_ROOT']` and a case asserting `setup.WORKSPACE_ROOT` is the checkout root — the directory holding this package's `package.json` whose `name` field reads `@orkestrel/lsp` (read it with `node:fs` `readFileSync` and `JSON.parse`, then narrow with a guard; never `as`, never `!`). Run `npm --prefix /home/user/fleet/lsp run test:setup` and record its reading, then plant the proof red once by asserting a wrong name and record the red reading, then restore.
3. **Gates.** `format:check`, `lint:check`, `check`, `build`, `test`, one plain command each; then `npx scaffold audit --offline`, which must print its single zero-drift line and no advisory; then `node /home/user/scaffold/tmp/work/evidence.mjs lsp`.
4. **Report.** Append a `## Fix round 1` section to the report: the repair's diff against the unit's `vite.config.ts` in words, the manifest restore, the new proof with its red and green readings, each gate with its exit code, and the audit line. State no count in authored prose.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when the repair writes any path other than `vite.config.ts` and `package.json`, when the restored `package.json` differs from the unit's bytes, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. `npx scaffold audit --offline` exits 0 with the single zero-drift line and no `setup:` advisory.
2. `git -C /home/user/fleet/lsp diff -- package.json` carries no development-dependency floor change.
3. Every gate exits 0; `git status --short` lists the unit's paths plus `tests/setup.test.ts`.
