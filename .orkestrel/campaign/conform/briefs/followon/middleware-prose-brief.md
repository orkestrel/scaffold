# Unit middleware-prose — the directional references that predate the conformance unit

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/middleware`. Perform the assignment directly and spawn nothing. Dispatch after the conformance landing of middleware, from the landed tip.

## Objective

Close the document-reference `above` and `below` hits middleware's fix round 2 recorded outside its rows (`units/l2b/middleware-fix2-result.md` § F-1): `tests/guides.test.ts:2` and `:40`, `tests/src/server/middlewares.test.ts:1182`, and `tests/src/core/middlewares.test.ts:1905` read as `.claude/rules/writing.md` § Code tokens, references, and links fixes, with the gate chain green.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`; never `above` or `below`) and `/home/user/scaffold/AGENTS.md` § Writing (never state a count; never name a list item by its position).

**Evidence.** The fix-round-2 sweep table in `reports/conform-middleware-report.md` § Fix round 2: the four document-reference sites, and the numeric-comparison hits at `tests/src/core/helpers.test.ts:358,381,460,497`, `tests/src/server/middlewares.test.ts:1159`, `tests/src/server/MultipartParser.test.ts:110`, and `tests/src/core/stores/MemorySessionStore.test.ts:130`, which the sweep ruled permitted and which stay.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/middleware run <script>`, `npm --prefix /home/user/fleet/middleware test`, `cd /home/user/fleet/middleware && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/middleware status --short`, `git -C /home/user/fleet/middleware diff`, `node /home/user/scaffold/tmp/work/evidence.mjs middleware`, `cd /home/user/fleet/middleware && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/guides.test.ts`, `tests/src/server/middlewares.test.ts`, `tests/src/core/middlewares.test.ts` (the named comment sites and any count or ordinal the same comments carry).

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`).

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage beyond `git add -N`, push, delete a file, or run a discarding git command.

## Rows

1. Read each of the four sites whole (the line numbers are from the landed tip and can have moved) and rewrite the sentence with the rule's form fitted to it; where the same comment states a count or names an item by its position, remove that too.
2. Re-run the case-insensitive sweep `\b(above|below)\b` over `tests/**` (excluding `node_modules` and the vendored files) and rule every remaining hit by sense; record the sweep with its pattern and paths.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs middleware`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Write `/home/user/scaffold/tmp/units/followon/middleware-prose-report.md`: per site the old and new text, the sweep with its rulings, each gate with its exit code, the audit line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted sentence is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The sweep reads empty of document-reference senses in `tests/**`.
2. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only Owned paths.
