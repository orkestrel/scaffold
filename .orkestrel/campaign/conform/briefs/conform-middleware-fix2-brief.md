# Unit conform-middleware fix round 2 — the round-2 objective lane's findings outside the claims

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/middleware`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-2 objective lane's findings F-1 to F-3 (`units/l2b/middleware-objective-r2.md`) on the uncommitted conform-middleware unit: the two `above`/`below` pointers the unit added to test comments read in the rule's form, and the report reconciles its gate readings with its fix-round evidence and names the one control command it left out.

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Code tokens, references, and links (`preceding`, `following`, `earlier`, `later`; never `above` or `below`) and § Claims and time (cite the run behind every number); `/home/user/scaffold/AGENTS.md` § Communication (never claim a gate passed until you ran it and read the result). The conform-middleware brief at `/home/user/scaffold/tmp/units/conform/conform-middleware-brief.md` and the report at `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md` this round extends.

**Sites, as read at 18:46 UTC.** Line numbers can have moved; read each site before changing it.

- `tests/setup.test.ts:302`: `// so the eviction above is the given \`ttl\` and not the default.` → `// so the preceding eviction is the given \`ttl\` and not the default.`
- `tests/src/core/stores/DatabaseSessionStore.test.ts:23`: `// session it produces, so a store using its own step fails the proof below.` → `// session it produces, so a store using its own step fails the following proof.`
- The report: § Outcome (lines 5-7) states the gate chain green and § Gates (lines 85-91) tabulates exit 0 for every gate, while lines 388-399 record `npm run check` exit 2 (`fix1-check.txt`) and `npm test` at `3 failed | 32 passed (36)` in the `setup` project on an earlier staging, with neither section marked superseded; the § Files touched diffstat at line 78 (`1992 insertions / 1298 deletions`) predates the fix rounds; the `middleware-obj-2` control row at line 285 names its two capture files but no command, unlike the neighbouring rows.
- The Orchestrator ran `npm --prefix /home/user/fleet/middleware run check` at 18:46 UTC against the closure re-staged at 17:53 UTC from database's landed tip: exit 0 (`/home/user/scaffold/tmp/work/middleware-check-1846.log`), which settles the objective lane's referral on the `database.table('sessions')` inference; no type edit is owed.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/middleware run <script>`, `npm --prefix /home/user/fleet/middleware test`, `cd /home/user/fleet/middleware && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/middleware status --short`, `git -C /home/user/fleet/middleware diff`, `git -C /home/user/fleet/middleware diff --stat`, `node /home/user/scaffold/tmp/work/evidence.mjs middleware`, `cd /home/user/fleet/middleware && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the conform-middleware unit's uncommitted edits in the files the report's status names; leave every edit outside the Sites as it is.

## Scope

**Owned.** `tests/setup.test.ts` (the one comment), `tests/src/core/stores/DatabaseSessionStore.test.ts` (the one comment), `/home/user/scaffold/tmp/units/conform/conform-middleware-report.md`.

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, the vendored guide mirrors under `guides/`, `configs/**`, `.claude/**`, `scripts/**`) or `package.json`.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. **F-1.** Rewrite the two comments as the Sites name; re-run the case-insensitive sweep `\b(above|below)\b` over `tests/**` (excluding `node_modules` and the vendored files), rule every remaining hit by sense (the numeric and onion-position senses at `tests/src/server/MultipartParser.test.ts:110` and the like stay), and record the sweep with its pattern and path in the report's sweep table.
2. **F-2.** In the report, rewrite § Outcome's gate sentence and add a dated note before the § Gates table stating that the table's readings were taken at the pre-fix-round staging, that `check` and `test` later read nonzero on the cause the fix-round-1 deviation section records, that the Orchestrator's `check` at 18:46 UTC on the 17:53 UTC re-stage exits 0, and that the deciding run is the Orchestrator's at landing; then run the gate chain yourself on the current closure (`format:check`, `lint:check`, `check`, `build`, `test`, one plain command each), record each exit code in the § Gates table as the current reading with the date, and regenerate the § Files touched diffstat from `git -C /home/user/fleet/middleware diff --stat`.
3. **F-3.** Add the exact command that produced `obj-2-control-red.txt` and `obj-2-control-green.txt` to the `middleware-obj-2` control row, in the form the neighbouring rows use (read the project tag in the capture's header to name the project).
4. Append a `## Fix round 2` section to the report: each finding, the edit that closes it, the sweep, each gate with its exit code, the audit line.

## Method

Rows in order; the gate chain of row 2 doubles as the round's gates; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs middleware`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted comment is not found within three lines of the line named, or when a gate reddens: name the gate, the failing file and line, and the message, and change nothing outside the rows. Where a note sits or how a sentence is worded is yours to decide and record.

## Acceptance criteria

1. The `\b(above|below)\b` sweep over the non-vendored `tests/**` reads empty of document-reference senses.
2. The report's § Outcome and § Gates agree with its fix-round evidence, its diffstat is current, and the obj-2 control row names its command.
3. Every gate exits 0 on the current closure; the audit prints its single zero-drift line; `git status --short` lists only the unit's paths.
