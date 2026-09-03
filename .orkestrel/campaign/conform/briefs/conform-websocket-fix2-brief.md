# Unit conform-websocket fix round 2 — the header's last purity word and two report citations

## Role and engine

`builder` on Claude Sonnet, a native subagent, the sole writer in `/home/user/fleet/websocket`. Perform the assignment directly and spawn nothing.

## Objective

Close audit round 2's F1 (the file header at `tests/setup.ts:3` still calls the browser helpers `pure`) and F2 (the report cites `tests/integration.test.ts:3` for a clause the tree wraps across lines 3-4, and its sweep entry carries a garbled exclusion), with the gate chain green. Round 2 held every claim (`/home/user/scaffold/.orkestrel/campaign/conform/units/l2b/websocket-objective-r2.md`; read its F1 and F2 before editing).

## Context

**Host.** POSIX shell; `node_modules` holds the fleet closure staged with `npm install --no-save`; never run `npm install`, `npm ci`, or any command that rewrites `node_modules` or the lockfile. Read with Read, Grep, Glob; change with Edit, Write; Bash only for `npm --prefix /home/user/fleet/websocket run <script>`, `npm --prefix /home/user/fleet/websocket test`, `git -C /home/user/fleet/websocket status --short`, `git -C /home/user/fleet/websocket diff`, `node /home/user/scaffold/tmp/work/evidence.mjs websocket`, `cd /home/user/fleet/websocket && npx scaffold audit --offline`, one command per call, no other chain, no `;`, no `for`, no heredoc, no pipe except `2>&1 | tail -N`.

## Scope

**Owned.** `tests/setup.ts` (line 3 only), `/home/user/scaffold/tmp/units/conform/conform-websocket-report.md`.

**Off-limits.** Every other file.

**Tools and limits.** `Read`, `Grep`, `Glob`, `Edit`, `Write`, `Bash`. Never commit, stage beyond `git add -N`, push, install, delete a file, or run a discarding git command.

## Rows

1. **F1.** At `tests/setup.ts:3`, drop `pure` so the clause reads `and the browser WebSocket helpers.` (fit the sentence as it stands).
2. **F2.** In the report's `## Fix round 1` section, cite `tests/integration.test.ts:3-4` for the wrapped clause, and rewrite the sweep entry so it names the swept files without the parenthetical `setupPolicy.ts's excluded scope aside`, because the row's opening sentence already excludes `tests/setupPolicy.ts`.

## Method

Rows in order. Then `format:check`, `lint:check`, `check`, `build`, `test` one plain command each, then `cd /home/user/fleet/websocket && npx scaffold audit --offline`, then `node /home/user/scaffold/tmp/work/evidence.mjs websocket`.

## Execution

A native subagent reading this brief: perform the assignment directly and spawn nothing.

## Output

Add a `Fix round 2` lead with one line per row to the report's `## Fix round 1` section, then each gate command with its exit code and the audit's summary line. Return the same content as your final message. No process diary.

## Deviation contract

Stop and report — expected, found, exact evidence — when the quoted word is not at the line named, or when a gate reddens.

## Acceptance criteria

1. `\bpure\b` over `tests/setup.ts` returns no hit.
2. The report cites the wrapped clause's lines and names the swept files plainly.
3. Every gate exits 0 and the audit prints its single zero-drift line.
