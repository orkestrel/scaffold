# Unit conform-router fix round 3 — the temporal `once` and the `below` pointers the widened sweep found

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/router`. Perform the assignment directly and spawn nothing.

## Objective

Every banned-sense hit fix round 2's widened substitution sweep recorded (`reports/conform-router-report.md:139`) is rewritten: the temporal `once` reads `after`, and each document-pointer `below` reads `following`, with the gate chain green and the sweep row re-run clean.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Substitutions (`once` temporal → `after`; rule every hit by the sense its row bans) and § Code tokens, references, and links (`following`, never `below`); `/home/user/scaffold/AGENTS.md` § Writing.

**Sites, as fix round 2 recorded them at 20:1x UTC.** Line numbers can have moved; read each site and the whole sentence before changing it.

- Temporal `once` → `after`: `src/server/handlers.ts:68`, `src/server/helpers.ts:121`, `src/core/helpers.ts:401`, `src/core/types.ts:164`, `guides/router.md:361`. Where the sentence's `once` is a frequency ("once per request"), leave it and record it as permitted.
- Document-pointer `below` → `following` (or name the thing pointed at): `tests/guides.test.ts:54`, `tests/src/browser/Navigator.test.ts:643`, `tests/src/core/Dispatcher.test.ts:318`, `:333`, `tests/src/core/Router.test.ts:69`.
- `guides/router.md:361` may be a fence comment or a sentence a presence guard in `tests/guides.test.ts` quotes: after the edit run `npm --prefix /home/user/fleet/router run test:guides` and repair any guard that quoted the old text.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/router run <script>`, `npm --prefix /home/user/fleet/router test`, `cd /home/user/fleet/router && npx oxfmt --config .oxfmtrc.json <file>`, `git -C /home/user/fleet/router status --short`, `git -C /home/user/fleet/router diff`, `node /home/user/scaffold/tmp/work/evidence.mjs router`, `cd /home/user/fleet/router && npx scaffold audit --offline`, and `grep -rniE '<pattern>' <paths>`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing conditions.** The tree carries the conform-router unit's uncommitted edits and fix rounds 1 and 2; leave every edit outside the Sites as it is. The offline audit reports one drift row, `configs/browsers.ts` stale — the vendored baseline the landing repairs; record it and do not repair it.

## Scope

**Owned.** The ten sites named, `tests/guides.test.ts` for a presence guard the guide edit invalidates, and `/home/user/scaffold/tmp/units/conform/conform-router-report.md`.

**Off-limits.** Everything else, every other fleet checkout included. Never edit a vendored file or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. The ten edits; `test:guides` green.
2. Re-run `grep -rniE '\bvia\b|e\.g\.|\bsimply\b|\babove\b|\bbelow\b|\bonce\b'` over `src`, the non-vendored `tests` (exclude `tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`), `guides/router.md`, `guides/README.md`, and `README.md`; rewrite the report's § Sweeps substitutions row so its banned-sense list is empty and every remaining hit is listed as permitted by sense.
3. Append a `## Fix round 3` section: each site with the line now, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs router`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary. State no count in authored prose.

## Deviation contract

Stop and report — expected, found, exact evidence — when a named site carries no `once` or `below` within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep over the named population returns no banned-sense hit.
2. `test:guides` exits 0; every gate exits 0; the audit reports only the `configs/browsers.ts` baseline row; `git status --short` lists only the unit's paths.
