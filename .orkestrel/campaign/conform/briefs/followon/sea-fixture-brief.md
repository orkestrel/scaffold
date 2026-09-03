# Unit sea-fixture — the Mach-O fixture's option key

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/sea`. Perform the assignment directly and spawn nothing. Dispatch after the sea-skip landing, from the landed tip.

## Objective

`MachoFixtureOptions.tightHeaders` in `tests/setupServer.ts` becomes `tight`, matching the PE fixture's key the sea-skip unit added, with every call site updated and the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/patterns.md` § Options (a single-word option key); `/home/user/scaffold/AGENTS.md` § Design laws (single-word entity APIs; one concept, one term).

**Sites** (`units/followon/sea-skip-report.md` § Finding outside this unit's scope; line numbers can have moved, read each before changing it): `tests/setupServer.ts:713` `readonly tightHeaders?: boolean` → `readonly tight?: boolean`, keeping its doc comment; `tests/setupServer.ts:723` `options?.tightHeaders` → `options?.tight`; `tests/src/server/injectors/Injector.test.ts:301` `buildMachoFixture({ tightHeaders: true })` → `buildMachoFixture({ tight: true })`; `tests/setupServer.test.ts:354` the same substitution.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/sea run <script>`, `npm --prefix /home/user/fleet/sea test`, `git -C /home/user/fleet/sea status --short`, `git -C /home/user/fleet/sea diff`, `node /home/user/scaffold/tmp/work/evidence.mjs sea`, `cd /home/user/fleet/sea && npx scaffold audit --offline`, and `grep -rn tightHeaders /home/user/fleet/sea/src /home/user/fleet/sea/tests /home/user/fleet/sea/guides`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/setupServer.ts`, `tests/setupServer.test.ts`, `tests/src/server/injectors/Injector.test.ts`.

**Off-limits.** Everything else. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, install, delete a file, or run a discarding git command.

## Rows

1. The four edits; `npm --prefix /home/user/fleet/sea run test:setup` and the `src:server` project green.
2. Sweep `tightHeaders` over `src`, `tests`, and `guides`: empty.
3. Report: the sites with the line now, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs sea`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/sea-fixture-report.md` and return the same content as your final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a named site carries no `tightHeaders` within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty; `git status --short` lists only the Owned paths.
2. Every gate exits 0; the audit prints its single zero-drift line.
