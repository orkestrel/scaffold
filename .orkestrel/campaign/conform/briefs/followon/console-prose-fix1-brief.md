# Unit console-prose fix round 1 — the execution-order `now` in comments and one fence

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/console`. Perform the assignment directly and spawn nothing.

## Objective

Close the round-1 checker's refutation of claim 3 (`units/followon/console-prose-checker-luna.md`) as the Orchestrator ruled it: every `now` that marks a moment in an execution order takes a phrase that names the moment, and every `new` the checker listed stays, because each names a fresh instance or a replacement idea (the construction or replacement-idea sense the fleet ruled permitted in form's round 1).

## Context

**Law.** `/home/user/scaffold/.claude/rules/writing.md` § Claims and time and § Substitutions (`currently`, `now` → delete, or give the date; rule every hit by the sense its row bans) and `/home/user/scaffold/AGENTS.md` § Writing. The console-prose brief (`/home/user/scaffold/.orkestrel/campaign/conform/briefs/followon/console-prose-brief.md`) this round extends.

**Sites, as read at 18:09 UTC.** Line numbers are from the tree the unit left and can have moved; read each sentence whole before changing it.

- `src/core/factories.ts:120` (an `@example` fence comment): `// snapshots console.* now` → `// snapshots console.* at construction`.
- `src/core/factories.ts:125` and `src/browser/factories.ts:52`: `Snapshot the three console writers now — bound to their `console` receiver — so a later …` → `Snapshot the console writers at construction — bound to their `console` receiver — so a later …` (drop the count with the word).
- `src/core/Spinner.ts:110`: `so the new message shows without waiting for a tick` — `new` stays; change nothing unless the sentence carries a `now`.
- `tests/src/core/Capture.test.ts:43`: `The methods are now the wrappers, not the originals.` → `After `start`, the methods are the wrappers, not the originals.`
- `tests/src/core/Capture.test.ts:252`: `snapshots the `real` log NOW; console.log is now the wrapper` → `snapshots the `real` log at this call; after it, console.log is the wrapper`.
- `tests/src/core/Capture.test.ts:475`: `its console sink snapshots the real console.log now.` → `its console sink snapshots the real console.log at construction.`
- `tests/src/core/Spinner.test.ts:136`: `index now at 'y'` → `index at 'y' after the paint`.
- `tests/src/core/Spinner.test.ts:140`: `new message` stays; change nothing unless the line carries a `now`.
- `tests/src/core/factories.test.ts:276`: `snapshots the real console.log NOW` → `snapshots the real console.log at this call`.
- `tests/src/core/factories.test.ts:277`: `// Now PATCH console.log (as a Capture would)` → `// Then PATCH console.log (as a Capture would)`.
- `tests/src/core/factories.test.ts:401`: the title `… independent of the (now destroyed) capture` → `… independent of the destroyed capture`.
- `tests/src/server/ProcessCapture.test.ts:512`: `// bucket stdout now [o2, o3]; total now [e2, o3]` → `// bucket stdout after the write [o2, o3]; total [e2, o3]`.

Where a `describe` or `it` title changes, no snapshot or guide names it; confirm with a grep for the old title over `tests/**` and `guides/**` before and after.

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit; Bash only for `npm --prefix /home/user/fleet/console run <script>`, `npm --prefix /home/user/fleet/console test`, `cd /home/user/fleet/console && npx oxfmt --config .oxfmtrc.json <file>` (to converge a format failure), `git -C /home/user/fleet/console status --short`, `git -C /home/user/fleet/console diff`, `node /home/user/scaffold/tmp/work/evidence.mjs console`, `cd /home/user/fleet/console && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

**Standing condition.** The tree carries the console-prose unit's uncommitted edits (`README.md`, files under `src/**` and `tests/**` the report names); leave them as they are.

## Scope

**Owned.** The files the Sites list names, at the listed sites only; `/home/user/scaffold/tmp/units/followon/console-prose-report.md` (append only).

**Off-limits.** Everything else. Never edit a vendored file (`tests/setupPolicy.ts`, `tests/policy.test.ts`, `tests/config.test.ts`, `tests/distribution.test.ts`, `configs/**`, `.claude/**`, `scripts/**`).

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Bash`. Never commit, stage, push, delete a file, or run a discarding git command.

## Rows

1. Rewrite each `now` site as the Context names, fitting the replacement to its sentence and keeping the line under the formatter's width.
2. Re-run the case-insensitive sweep `\b(now|currently)\b` over `src/**` and the non-vendored `tests/**` and rule every remaining hit (`Date.now`, `performance.now`, and a value named `now` are permitted); record the `\bnew\b` hits the checker listed as permitted in the construction or replacement-idea sense, naming each.
3. Append a `## Fix round 1` section to the report: each site's old and new text, the sweeps with their rulings, each gate with its exit code, the audit line.

## Method

Rows in order; then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each; then the offline audit; then `node /home/user/scaffold/tmp/work/evidence.mjs console`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

The appended report section, returned as the final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when a quoted phrase is not found within three lines of the line named, or when a gate reddens on something the rows did not touch.

## Acceptance criteria

1. The `now` sweep over `src/**` and the non-vendored `tests/**` reads empty of execution-order and temporal senses.
2. `test:src` exits 0 with the retitled cases passing.
3. Every gate exits 0; the audit prints its single zero-drift line; `git status --short` lists only the console-prose unit's files plus the Sites files.
